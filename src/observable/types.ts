export type NestedPaths<T> = T extends object
	? {
		[K in keyof T]: K extends string
		? T[K] extends object
		? K | `${K}.${NestedPaths<T[K]>}`
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

export type Observable<T extends object> = {
	state: T,
	observe: <P extends NestedPaths<T>>(selector: NestedPaths<T>) => (onChange: ObserverCallback<PathValue<T, P>>) => () => void;
	observeOnce: <P extends NestedPaths<T>>(selector: NestedPaths<T>) => (onChange: ObserverCallback<PathValue<T, P>>) => () => void;
	conceal: () => void;
};
