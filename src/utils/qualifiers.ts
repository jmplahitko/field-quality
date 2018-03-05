import { isUndefined } from 'util';
import { quality } from './quality';
const { isBoolean, isEmpty, isNull, isNumber } = quality;

function beBoolean(value: any) {
	return isNull(value) || isBoolean(value);
}

function beInRange(num1: number, num2: number) {
	return function beInRange(value: any) {
		return (value && isNumber(value)) ? (value >= num1 && value <= num2) : false;
	}
}

function beValidEnum(arr: Array<string|number>) {
	return function beValidEnum(value: any) {
		return arr.includes(value);
	}
}

function length(num1: number, num2: number) {
	return function beValidLength(value: any) {
		return (value && value.length && isNumber(value.length)) ? (value.length >= num1 && value.length <= num2) : false;
	}
}

function match(rx: RegExp) {
	return function matches(value: any) {
		return rx.test(value);
	}
}

function notNull(value: any) {
	return !isNull(value);
}

function notEmpty(value: any) {
	return isNull(value) || isUndefined(value) ? false : !isEmpty(value);
}

export const qualifiers = {
	beBoolean,
	beInRange,
	beValidEnum,
	length,
	match,
	notNull,
	notEmpty
}