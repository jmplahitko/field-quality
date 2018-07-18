"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.quality = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

function isEqual(val1, val2) {
  if (is(val1, val2)) return true;

  if (isObject(val1) && isObject(val2)) {
    if (!is(Object.keys(val1).length, Object.keys(val2).length)) return false;

    for (var key in val1) {
      if (isEqual(val1[key], val2[key])) continue;
      return false;
    }

    return true;
  }

  if (isArray(val1) && isArray(val2)) {
    if (!is(val1.length, val2.length)) return false;
    var length = val1.length;

    for (var ndx = 0; ndx < length; ndx++) {
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

var quality = {
  hasAnyFlags: hasAnyFlags,
  hasFlags: hasFlags,
  is: is,
  isArray: isArray,
  isBlankObject: isBlankObject,
  isBoolean: isBoolean,
  isBufferArray: isBufferArray,
  isDate: isDate,
  isEmpty: isEmpty,
  isEqual: isEqual,
  isFunction: isFunction,
  isHash: isHash,
  isInteger: isInteger,
  isNaN: isNaN,
  isNull: isNull,
  isNumber: isNumber,
  isObject: isObject,
  isPromise: isPromise,
  isRegExp: isRegExp,
  isString: isString,
  isTypedArray: isTypedArray,
  isWindow: isWindow
};
exports.quality = quality;