import { NestedPaths } from '../types';

export function setDeepValue<T extends object>(path: NestedPaths<T>, target: T, value: any): void {
	const keys = path.split('.') as (keyof T)[];
	let current: any = target;

	for (let i = 0; i < keys.length - 1; i++) {
		const key = keys[i];
		if (!(key in current)) {
			current[key] = {};
		}
		current = current[key];
	}

	current[keys[keys.length - 1]] = value;
}