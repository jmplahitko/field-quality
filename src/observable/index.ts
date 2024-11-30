/**
 * https://github.com/QuiiBz/influer/blob/main/src/index.ts
 * This initial implementation is based on the work by https://github.com/QuiiBz with the following changes:
 * 	1.  Allow for many observers (watchers) per property of the observed object,
 * 			thus dodging erroneous deletions of other observers.
 * 	2.	Observers should not be given the inherent ability to mutate state.
 * 	3.	Observers are created via selector instead of path string
 *  4. 	Proxy is revokable to allow for forcibly ending observation (Observable.conceal)
 */

import { ObservablesCache, Observable, Derive, ObserverCallback, Derivation, Transaction, NestedPaths } from './types';
import { createTransaction } from './transaction';
import recompose from './utils/recompose';

// These array methods do not detected by set or deleteProperty proxy handler traps, so we have to account for them ourselves.
const nonTrappableMutationMethods = ['pop', 'shift'];

export function createObservable<T extends object>(initialState: T): Observable<T> {
	let idPool: number = 0;
	const cache: ObservablesCache = {};
	const derivationCache = new Map<string, Derivation<any>>();
	let derivationStack: Derivation<any>[] = []; // Add stack for nested derivations
	let currentTransaction: Transaction<T> | null = null;

	const createIgnore = (key: string, id: number) => () => {
		cache[key] = cache[key]?.filter(x => x.id !== id);
	};

	// Construct the next property key in a dot-notation
	const constructPropertyKey = <T>(property: string | symbol, key: string): NestedPaths<T> =>
		key
			? `${key}.${property.toString()}` as NestedPaths<T>
			: property.toString() as NestedPaths<T>;

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
				if (derivation.observers.size > 0) {
					derivation.derive();
				}
			}
		});
	};

	const handler = <K extends {} | []>(key = ''): ProxyHandler<K> => ({
		get(target, property, receiver) {
			const value = Reflect.get(target, property, receiver);
			const propertyKey = constructPropertyKey(property, key);

			trackDependency(propertyKey);

			if (Array.isArray(target) && nonTrappableMutationMethods.includes(property as string)) {
				return function (...args: any[]) {
					const oldValue = Array.from(target);
					const result = (value as Function).apply(target, args);
					const newValue = target;

					if (currentTransaction) {
						currentTransaction.ensureSnapshot(key as NestedPaths<T>, oldValue);
					} else {
						notifyObservers(key, newValue, oldValue);
					}

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

			if (currentTransaction) {
				currentTransaction.ensureSnapshot(key as NestedPaths<T>, target);
				currentTransaction.ensureSnapshot(propertyKey, oldValue);
			}

			const result = Reflect.set(target, property, value, receiver);

			if (!currentTransaction && (oldValue !== value)) {
				notifyObservers(key as NestedPaths<T>, target, target);
				notifyObservers(propertyKey, value, oldValue);
			}

			return result;

		}
	});

	const { proxy, revoke } = Proxy.revocable(initialState, handler());

	const transaction = <R>(callback: () => R): R => {
		// Don't allow nested transactions
		if (currentTransaction) {
			throw new Error('Nested transactions are not supported');
		}

		currentTransaction = createTransaction(proxy);

		const result = currentTransaction.begin(callback,
			(snapshots) => {
				snapshots.forEach((target, path) => {
					const newValue = recompose(path, proxy);
					notifyObservers(path, newValue, target);
				});
			}
		);

		currentTransaction = null;

		return result;
	};

	/**
	 * @param {boolean} once - If the property should be ignored after the first call.
	 * @returns A function that takes a selector for a nested value to be observed, which returns a function that takes a callback to be called when the nested value changes.
	 */
	const observe = <O extends boolean>(once: O): (O extends true ? Observable<T>['observeOnce'] : Observable<T>['observe']) =>
		(selector) => {
			const key = selector;

			return (onChange) => {
				const id = ++idPool;
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

	const derive = <R>(derive: Derive<R, T>) => {
		const derivation = createDerivation(derive);
		const id = `derivation_${++idPool}`;
		derivationCache.set(id, derivation);

		derivation.derive();
		const derived = () => derivation.derive();

		derived.observe = derivation.observe;

		return derived;
	}

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
		derive,
		observe: observe(false),
		observeOnce: observe(true),
		transaction,
		conceal: () => revoke(),
	} as Observable<T>;
}