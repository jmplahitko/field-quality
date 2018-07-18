"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const quality_1 = require("./quality");
const { isArray, isBoolean, isEmpty, isNull, isNumber, isString } = quality_1.quality;
function beBoolean(value) {
    return isNull(value) || isBoolean(value);
}
function beInRange(num1, num2) {
    return function beInRange(value) {
        return (isNumber(value) && !isNaN(value)) ? (value >= num1 && value <= num2) : false;
    };
}
function beValidEnum(arr) {
    return function beValidEnum(value) {
        return arr.includes(value);
    };
}
function length(num1, num2) {
    return function beValidLength(value) {
        return ((isString(value) || isArray(value)) && isNumber(value.length)) ? (value.length >= num1 && value.length <= num2) : false;
    };
}
function lengthOrEmpty(num1, num2) {
    return function beValidLengthOrEmpty(value) {
        if (isNull(value) || util_1.isUndefined(value)) {
            return true;
        }
        else {
            return ((isString(value) || isArray(value)) && isNumber(value.length)) ? (value.length >= num1 && value.length <= num2) : false;
        }
    };
}
function match(rx) {
    return function matches(value) {
        return rx.test(value);
    };
}
function notNull(value) {
    return !isNull(value);
}
function notEmpty(value) {
    return isNull(value) || util_1.isUndefined(value) ? false : !isEmpty(value);
}
exports.qualifiers = {
    beBoolean,
    beInRange,
    beValidEnum,
    length,
    lengthOrEmpty,
    match,
    notNull,
    notEmpty
};
