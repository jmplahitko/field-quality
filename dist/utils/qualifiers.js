"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.qualifiers = void 0;

var _util = require("util");

var _quality = require("./quality");

var isArray = _quality.quality.isArray,
    isBoolean = _quality.quality.isBoolean,
    isEmpty = _quality.quality.isEmpty,
    isNull = _quality.quality.isNull,
    isNumber = _quality.quality.isNumber,
    isString = _quality.quality.isString;

function beBoolean(value) {
  return isNull(value) || isBoolean(value);
}

function beInRange(num1, num2) {
  return function beInRange(value) {
    return isNumber(value) && !isNaN(value) ? value >= num1 && value <= num2 : false;
  };
}

function beValidEnum(arr) {
  return function beValidEnum(value) {
    return arr.includes(value);
  };
}

function length(num1, num2) {
  return function beValidLength(value) {
    return (isString(value) || isArray(value)) && isNumber(value.length) ? value.length >= num1 && value.length <= num2 : false;
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
  return isNull(value) || (0, _util.isUndefined)(value) ? false : !isEmpty(value);
}

var qualifiers = {
  beBoolean: beBoolean,
  beInRange: beInRange,
  beValidEnum: beValidEnum,
  length: length,
  match: match,
  notNull: notNull,
  notEmpty: notEmpty
};
exports.qualifiers = qualifiers;