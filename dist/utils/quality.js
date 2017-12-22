"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var quality;
(function (quality) {
    function is(val1, val2) {
        if (val1 === val2)
            return val1 !== 0 || 1 / val1 === 1 / val2;
        return val1 !== val1 && val2 !== val2;
    }
    quality.is = is;
    function isArray(val) {
        return null !== val && {}.toString.call(val) === '[object Array]';
    }
    quality.isArray = isArray;
    function isBoolean(val) {
        return typeof val === 'boolean';
    }
    quality.isBoolean = isBoolean;
    function isDate(val) {
        return val instanceof Date;
    }
    quality.isDate = isDate;
    function isUndefined(val) {
        return typeof val === 'undefined';
    }
    quality.isUndefined = isUndefined;
    function isEmpty(val) {
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
    quality.isEmpty = isEmpty;
    function isEqual(val1, val2) {
        if (is(val1, val2))
            return true;
        if (isObject(val1) && isObject(val2)) {
            if (!is(Object.keys(val1).length, Object.keys(val2).length))
                return false;
            for (let key in val1) {
                if (isEqual(val1[key], val2[key]))
                    continue;
                return false;
            }
            return true;
        }
        if (isArray(val1) && isArray(val2)) {
            if (!is(val1.length, val2.length))
                return false;
            let length = val1.length;
            for (let ndx = 0; ndx < length; ndx++) {
                if (isEqual(val1[ndx], val2[ndx]))
                    continue;
                return false;
            }
            return true;
        }
        if (isDate(val1) && isDate(val2))
            return is(val1.getTime(), val2.getTime());
        /** TODO:
         * Really not sure about this function check.
         * It works, but the intent isn't solid yet.
         * Keeping around for now...
         **/
        if (isFunction(val1) && isFunction(val2))
            return is(val1.toString(), val2.toString());
        return false;
    }
    quality.isEqual = isEqual;
    function isFunction(val) {
        return typeof val === 'function';
    }
    quality.isFunction = isFunction;
    function isHash(val) {
        return isObject(val) && !isArray(val) && !isFunction(val);
    }
    quality.isHash = isHash;
    function isInteger(val) {
        return isNumber(val) && val % 1 === 0;
    }
    quality.isInteger = isInteger;
    function isRegExp(val) {
        return val instanceof RegExp;
    }
    quality.isRegExp = isRegExp;
    function isString(val) {
        return typeof val === 'string';
    }
    quality.isString = isString;
    function isNull(val) {
        return val === null;
    }
    quality.isNull = isNull;
    function isNumber(val) {
        return typeof val === 'number' && !isNaN(val);
    }
    quality.isNumber = isNumber;
    function isObject(val) {
        return null !== val && {}.toString.call(val) === '[object Object]';
    }
    quality.isObject = isObject;
    function isPromise(val) {
        return !!val && isFunction(val.then);
    }
    quality.isPromise = isPromise;
})(quality = exports.quality || (exports.quality = {}));
