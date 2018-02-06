"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const quality_1 = require("./quality");
const { isBoolean, isEmpty, isNull, isNumber } = quality_1.quality;
var qualifiers;
(function (qualifiers) {
    function beBoolean(value) {
        return isNull(value) || isBoolean(value);
    }
    qualifiers.beBoolean = beBoolean;
    function beInRange(num1, num2) {
        return function beInRange(value) {
            return (value && isNumber(value)) ? (value >= num1 && value <= num2) : false;
        };
    }
    qualifiers.beInRange = beInRange;
    function beValidEnum(arr) {
        return function beValidEnum(value) {
            return arr.includes(value);
        };
    }
    qualifiers.beValidEnum = beValidEnum;
    function length(num1, num2) {
        return function beValidLength(value) {
            return (value && value.length && isNumber(value.length)) ? (value.length >= num1 && value.length <= num2) : false;
        };
    }
    qualifiers.length = length;
    function match(rx) {
        return function matches(value) {
            return rx.test(value);
        };
    }
    qualifiers.match = match;
    function notNull(value) {
        return !isNull(value);
    }
    qualifiers.notNull = notNull;
    function notEmpty(value) {
        return isNull(value) || util_1.isUndefined(value) ? false : !isEmpty(value);
    }
    qualifiers.notEmpty = notEmpty;
})(qualifiers = exports.qualifiers || (exports.qualifiers = {}));
