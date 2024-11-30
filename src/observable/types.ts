export type NestedPaths<T> = T extends object
	? {
		[K in keyof T]: K extends string
		? T[K] extends object
		? K | `${K}.${NestedPaths<T[K]>}`  // Handle nested objects
		: K
		: never;
	}[keyof T]
	: never;

export type PathValue<T, P extends string> =
	P extends keyof T
	? T[P]
	: P extends `${infer K}.${infer R}`
	? K extends keyof T
	? PathValue<T[K], R>
	: never
	: never;

export type ObservablesCache = {
	[key: string]: Array<Observer<any>>;
};

export type Observer<P> = {
	id: number;
	onChange: ObserverCallback<P>;
	once: boolean;
	ignore: () => void
};

export type ObserverCallback<V> = (newValue: V, oldValue: V) => void;

export type Derive<T, S extends object> = (state: S) => T;

export interface Derivation<T> {
	value: T;
	dirty: boolean;
	deps: Set<string>;
	observers: Set<ObserverCallback<T>>;
	derive: () => T;
	observe: (callback: ObserverCallback<T>) => () => void;
}

export interface Derived<T> extends Derivation<T> {
	(): T;
	observe: (callback: ObserverCallback<T>) => () => void;
}

export interface Observable<T extends object> {
	state: T;
	derive: <R>(derive: Derive<R, T>) => Derived<R>;
	observe: <P extends NestedPaths<T>>(selector: NestedPaths<T>) => (onChange: ObserverCallback<PathValue<T, P>>) => () => void;
	observeOnce: <P extends NestedPaths<T>>(selector: NestedPaths<T>) => (onChange: ObserverCallback<PathValue<T, P>>) => () => void;
	transaction: <R>(callback: () => R) => R;
	conceal: () => void;
}

export interface Transaction<T> {
	changes: Set<string>;
	ensureSnapshot: (key: NestedPaths<T>, target: any) => any;
	begin: <R>(
		callback: () => R,
		onCommit?: (snapshots: Map<NestedPaths<T>, any>) => void,
		onRollback?: () => void
	) => R;
}
