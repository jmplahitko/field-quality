
export function hasAnyFlags(flags: any, mask: any) {
	flags = parseInt(flags, 10);
	mask = parseInt(mask, 10);

	if (isNaN(flags) || isNaN(mask)) {
		return false;
	}

	return (mask & flags) !== 0;
}

export function hasFlags(flags: any, mask: any) {
	flags = parseInt(flags, 10);
	mask = parseInt(mask, 10);

	if (isNaN(flags) || isNaN(mask)) {
		return false;
	}

	return (mask & flags) === mask;
}

export function is(val1: any, val2: any) {
	if (val1 === val2) return val1 !== 0 || 1 / val1 === 1 / val2;
	return val1 !== val1 && val2 !== val2;
}

export function isArray(val: any) {
	return null !== val && {}.toString.call(val) === '[object Array]';
}

export function isBufferArray(val: any) {
	return Object.prototype.toString.call(val) === '[object ArrayBuffer]';
}

export function isBlankObject(val: any) {
	return val !== null && typeof val === 'object' && !Object.getPrototypeOf(val);
}

export function isBoolean(val: any) {
	return typeof val === 'boolean';
}

export function isDate(val: any) {
	return val instanceof Date;
}

export function isUndefined(val: any) {
	return typeof val === 'undefined';
}

export function isEmpty(val: any) {
	let inheritedObjectRegex = /\[object [^\]]+\]/g;
	if (isNull(val) || isUndefined(val) || isFunction(val)) {
		return true;
	}
	if ((isArray(val) || isString(val)) && val.length > 0) {
		return false;
	}
	if ((isArray(val) || isString(val)) && val.length === 0) {
		return true;
	}
	if (isNumber(val)) {
		return false;
	}
	if (isBoolean(val)) {
		return false;
	}
	if (isDate(val)) {
		return isNaN(val.getTime());
	}
	if (!isObject(val) && inheritedObjectRegex.test(Object.prototype.toString.call(val))) {
		return false;
	}
	if (isObject(val)) {
		for (let key in val) {
			if (val.hasOwnProperty(key)) {
				return false;
			}
		}
	}

	return true;
}

export function isEqual(val1: any, val2: any) {
	if (is(val1, val2)) return true;
	if (isObject(val1) && isObject(val2)) {
		if (!is(Object.keys(val1).length, Object.keys(val2).length)) return false;
		for (let key in val1) {
			if (isEqual(val1[key], val2[key])) continue;
			return false;
		}
		return true;
	}
	if (isArray(val1) && isArray(val2)) {
		if (!is(val1.length, val2.length)) return false;
		let length = val1.length;
		for (let ndx = 0; ndx < length; ndx++) {
			if (isEqual(val1[ndx], val2[ndx])) continue;
			return false;
		}
		return true;
	}
	if (isDate(val1) && isDate(val2)) return is(val1.getTime(), val2.getTime());
	/** TODO:
	 * Really not sure about this function check.
	 * It works, but the intent isn't solid yet.
	 * Keeping around for now...
	 **/
	if (isFunction(val1) && isFunction(val2)) return is(val1.toString(), val2.toString());
	return false;
}

export function isFunction(val: any) {
	return typeof val === 'function';
}

export function isHash(val: any) {
	return isObject(val) && !isArray(val) && !isFunction(val);
}

export function isInteger(val: any) {
	return isNumber(val) && val % 1 === 0;
}

export function isRegExp(val: any) {
	return val instanceof RegExp;
}

export function isString(val: any) {
	return typeof val === 'string';
}

export function isTypedArray(val: any) {
	const TYPED_ARRAY_REGEXP = new RegExp(/^\[object (?:Uint8|Uint8Clamped|Uint16|Uint32|Int8|Int16|Int32|Float32|Float64)Array\]$/);
	return val && isNumber(val.length) && TYPED_ARRAY_REGEXP.test(Object.prototype.toString.call(val));
}

export function isNull(val: any) {
	return val === null;
}

export function isNumber(val: any) {
	return typeof val === 'number' && !isNaN(val);
}

export function isObject(val: any) {
	return null !== val && {}.toString.call(val) === '[object Object]';
}

export function isPromise(val: any) {
	return !!val && isFunction(val.then);
}

export function isWindow(val: any) {
	return val && val.window === val;
}