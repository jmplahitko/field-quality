/**
 * https://github.com/QuiiBz/influer/blob/main/src/index.ts
 * This initial implementation is based on the work by https://github.com/QuiiBz with the following changes:
 * 	1.  Allow for many observers (watchers) per property of the observed object,
 * 			thus dodging erroneous deletions of other observers.
 * 	2.	Observers should not be given the inherent ability to mutate state.
 * 	3.	Observers are created via selector instead of path string
 *  4. 	Proxy is revokable to allow for forcibly ending observation (Observable.conceal)
 */

import { ObservablesCache, Observable, Derive, Derived, ObserverCallback, Derivation } from './types';
import recompose from './utils/recompose';

// These array methods do not detected by set or deleteProperty proxy handler traps, so we have to account for them ourselves.
const nonTrappableMutationMethods = ['pop', 'shift'];

export function createObservable<T extends object>(initialState: T): Observable<T> {
	let idpool: number = 0;
	const cache: ObservablesCache = {};
	const derivationCache = new Map<string, Derivation<any>>();
	let derivationStack: Derivation<any>[] = []; // Add stack for nested derivations

	const createIgnore = (key: string, id: number) => () => {
		cache[key] = cache[key]?.filter(x => x.id !== id);
	};

	// Construct the next property key in a dot-notation
	const constructPropertyKey = (property: string | symbol, key?: string): string =>
		key
			? `${key}.${property.toString()}`
			: property.toString();

	const notifyObservers = (propertyKey: string, newValue: any, oldValue: any) => {
		// First notify direct observers
		const observers = cache[propertyKey];
		if (observers?.length) {
			observers.forEach(observer => {
				const { onChange, once, ignore } = observer;
				if (once) ignore();
				onChange(newValue, oldValue);
			});
		}

		// Then notify affected derivations
		derivationCache.forEach(derivation => {
			if (derivation.deps.has(propertyKey)) {
				derivation.dirty = true;
				// Recompute and notify observers if there are any
				if (derivation.observers.size > 0) {
					const oldValue = derivation.value;
					const newValue = derivation.derive();
					derivation.observers.forEach(observer =>
						observer(newValue, oldValue)
					);
				}
			}
		});
	};

	const handler = <K extends {} | []>(key: string = ''): ProxyHandler<K> => ({
		get(target, property, receiver) {
			const value = Reflect.get(target, property, receiver);
			const propertyKey = constructPropertyKey(property, key);

			// Track dependency
			trackDependency(propertyKey);

			if (Array.isArray(target) && nonTrappableMutationMethods.includes(property as string)) {
				return function (...args: any[]) {
					const oldValue = Array.from(target);
					const result = (value as Function).apply(target, args);
					const newValue = target;

					notifyObservers(key, newValue, oldValue);

					return result;
				};
			}

			if (value && typeof value === 'object') {
				return new Proxy(value, handler(propertyKey));
			}

			return value;
		},

		set(target, property, value, receiver) {
			if (Array.isArray(target) && property === 'length') {
				return Reflect.set(target, property, value, receiver);
			}

			const propertyKey = constructPropertyKey(property, key);
			const oldValue = Reflect.get(target, property, receiver);

			if (Array.isArray(target)) {
				const oldArrayValue = Array.from(target);
				const result = Reflect.set(target, property, value, receiver);

				if (oldValue !== value) {
					notifyObservers(propertyKey, value, oldValue);
					notifyObservers(key, target, oldArrayValue);
				}

				return result;
			} else {
				const oldObjectValue = { ...target };
				const result = Reflect.set(target, property, value, receiver);

				if (oldValue !== value) {
					notifyObservers(propertyKey, value, oldValue);
					notifyObservers(key, target, oldObjectValue);
				}

				return result;
			}
		}
	});

	const { proxy, revoke } = Proxy.revocable(initialState, handler());
	/**
	 * @param {boolean} once - If the property should be ignored after the first call.
	 * @returns A function that takes a selector for a nested value to be observed, which returns a function that takes a callback to be called when the nested value changes.
	 */
	const observe = <O extends boolean>(once: O): (O extends true ? Observable<T>['observeOnce'] : Observable<T>['observe']) =>
		(selector) => {
			const key = selector;

			return (onChange) => {
				const id = ++idpool;
				const ignore = createIgnore(key, id);

				cache[key] = cache[key] ?? [];
				const observer = {
					id,
					onChange,
					once,
					ignore,
				};

				cache[key]?.push(observer);

				return () => ignore();
			};
		};

	function trackDependency(path: string) {
		if (derivationStack.length > 0) {
			derivationStack[derivationStack.length - 1].deps.add(path);
			// console.log(derivationStack)
		}
	}

	const createDerivation = <R>(derive: Derive<R, T>): Derivation<R> => {
		let isDeriving = false;

		const derivation: Derivation<R> = {
			value: undefined as R,
			dirty: true,
			deps: new Set<string>(),
			observers: new Set<ObserverCallback<R>>(),
			derive: () => {
				if (derivation.dirty || !derivation.value) {
					// Detect circular dependencies
					if (isDeriving) {
						throw new Error('Circular dependency detected in computed value');
					}

					isDeriving = true;
					derivationStack.push(derivation);

					const oldValue = derivation.value;
					derivation.value = derive(proxy);

					derivationStack.pop();
					isDeriving = false;
					derivation.dirty = false;

					// Notify observers if value changed
					if (oldValue !== derivation.value && derivation.observers.size > 0) {
						derivation.observers.forEach(observer => observer(derivation.value, oldValue));
					}
				}

				return derivation.value;
			},
			observe: (callback: ObserverCallback<R>) => {
				derivation.observers.add(callback);
				return () => derivation.observers.delete(callback);
			}
		};
		return derivation;
	};

	return {
		state: proxy,
		observe: observe(false),
		observeOnce: observe(true),
		conceal: () => revoke(),
		derive: <R>(derive: Derive<R, T>) => {
			const derivation = createDerivation(derive);
			const id = `derivation_${++idpool}`;
			derivationCache.set(id, derivation);

			derivation.derive();
			const derived = () => derivation.derive();

			// Add observation capability to computed values
			derived.observe = derivation.observe;

			return derived;
		}
	} as Observable<T>;
}