"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasAnyFlags = hasAnyFlags;
exports.hasFlags = hasFlags;
exports.is = is;
exports.isArray = isArray;
exports.isBufferArray = isBufferArray;
exports.isBlankObject = isBlankObject;
exports.isBoolean = isBoolean;
exports.isDate = isDate;
exports.isIso8601DateString = isIso8601DateString;
exports.isUndefined = isUndefined;
exports.isEmpty = isEmpty;
exports.isEqual = isEqual;
exports.isFunction = isFunction;
exports.isHash = isHash;
exports.isInteger = isInteger;
exports.isRegExp = isRegExp;
exports.isString = isString;
exports.isTypedArray = isTypedArray;
exports.isNull = isNull;
exports.isNumber = isNumber;
exports.isObject = isObject;
exports.isPromise = isPromise;
exports.isWindow = isWindow;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function simpleCompare(a, b) {
  return a === b || a !== a && b !== b;
}

function hasAnyFlags(flags, mask) {
  flags = parseInt(flags, 10);
  mask = parseInt(mask, 10);

  if (isNaN(flags) || isNaN(mask)) {
    return false;
  }

  return (mask & flags) !== 0;
}

function hasFlags(flags, mask) {
  flags = parseInt(flags, 10);
  mask = parseInt(mask, 10);

  if (isNaN(flags) || isNaN(mask)) {
    return false;
  }

  return (mask & flags) === mask;
}

function is(val1, val2) {
  if (val1 === val2) return val1 !== 0 || 1 / val1 === 1 / val2;
  return val1 !== val1 && val2 !== val2;
}

function isArray(val) {
  return null !== val && {}.toString.call(val) === '[object Array]';
}

function isBufferArray(val) {
  return Object.prototype.toString.call(val) === '[object ArrayBuffer]';
}

function isBlankObject(val) {
  return val !== null && _typeof(val) === 'object' && !Object.getPrototypeOf(val);
}

function isBoolean(val) {
  return typeof val === 'boolean';
}

function isDate(val) {
  return val instanceof Date;
}

function isIso8601DateString(val) {
  var iso8601 = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?(Z|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/i;
  return iso8601.test(val);
}

function isUndefined(val) {
  return typeof val === 'undefined';
}

function isEmpty(val) {
  var inheritedObjectRegex = /\[object [^\]]+\]/g;

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
    for (var key in val) {
      if (val.hasOwnProperty(key)) {
        return false;
      }
    }
  }

  return true;
}

function isEqual(o1, o2) {
  if (o1 === o2) return true;
  if (o1 === null || o2 === null) return false; // eslint-disable-next-line no-self-compare

  if (o1 !== o1 && o2 !== o2) return true; // NaN === NaN

  if (isIso8601DateString(o1)) {
    if (!isIso8601DateString(o2)) return false;
    return simpleCompare(new Date(o1).getTime(), new Date(o2).getTime());
  }

  var t1 = _typeof(o1),
      t2 = _typeof(o2),
      length,
      key,
      keySet;

  if (t1 === t2 && t1 === 'object') {
    if (Array.isArray(o1)) {
      if (!Array.isArray(o2)) return false;

      if ((length = o1.length) === o2.length) {
        for (key = 0; key < length; key++) {
          if (!isEqual(o1[key], o2[key])) return false;
        }

        return true;
      }
    } else if (isDate(o1)) {
      if (!isDate(o2)) return false; // @ts-ignore

      return simpleCompare(o1.getTime(), o2.getTime());
    } else if (isRegExp(o1)) {
      if (!isRegExp(o2)) return false;
      return o1.toString() === o2.toString();
    } else {
      if (isWindow(o1) || isWindow(o2) || Array.isArray(o2) || isDate(o2) || isRegExp(o2)) return false;
      keySet = Object.create(null);

      for (var _key in o1) {
        if (_key.charAt(0) === '$' || isFunction(o1[_key])) continue; // @ts-ignore

        if (!isEqual(o1[_key], o2[_key])) return false;
        keySet[_key] = true;
      }

      for (key in o2) {
        if (!(key in keySet) && key.charAt(0) !== '$' && !isUndefined(o2[key]) && !isFunction(o2[key])) return false;
      }

      return true;
    }
  }

  return false;
}

function isFunction(val) {
  return typeof val === 'function';
}

function isHash(val) {
  return isObject(val) && !isArray(val) && !isFunction(val);
}

function isInteger(val) {
  return isNumber(val) && val % 1 === 0;
}

function isRegExp(val) {
  return val instanceof RegExp;
}

function isString(val) {
  return typeof val === 'string';
}

function isTypedArray(val) {
  var TYPED_ARRAY_REGEXP = new RegExp(/^\[object (?:Uint8|Uint8Clamped|Uint16|Uint32|Int8|Int16|Int32|Float32|Float64)Array\]$/);
  return val && isNumber(val.length) && TYPED_ARRAY_REGEXP.test(Object.prototype.toString.call(val));
}

function isNull(val) {
  return val === null;
}

function isNumber(val) {
  return typeof val === 'number' && !isNaN(val);
}

function isObject(val) {
  return null !== val && {}.toString.call(val) === '[object Object]';
}

function isPromise(val) {
  return !!val && isFunction(val.then);
}

function isWindow(val) {
  return val && val.window === val;
}