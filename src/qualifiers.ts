import { quality } from './utils/quality';

export namespace qualifiers {
	export function notNull(value: any) {
		return !quality.isNull(value);
	}
	export function notEmpty(value: any) {
		return !quality.isEmpty(value);
	}
}
