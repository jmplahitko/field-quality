import { NestedPaths } from '../types';

/**
 * Recompose a value from the given keys in the given object.
 *
 * @example
 * const obj = { a: { b: { c: { d: 'e' } } } };
 * const key = 'a.b.c.d';
 *
 * recompose(obj, key) // 'e'
 *
 * @param {Object} obj - The object to recompose from.
 * @param {string} key - The key to recompose.
 *
 * @returns
 */
export default function recompose<T extends object>(key: NestedPaths<T>, object: T): any {
	const parts = key.split('.');
	const newObj = object[parts[0]];

	if (parts[1]) {
		parts.splice(0, 1);
		return recompose(parts.join('.'), newObj);
	}

	return newObj;
}