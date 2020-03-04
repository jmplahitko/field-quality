"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.beBoolean = beBoolean;
exports.beInRange = beInRange;
exports.beValidEnum = beValidEnum;
exports.length = length;
exports.lengthOrEmpty = lengthOrEmpty;
exports.match = match;
exports.max = max;
exports.min = min;
exports.notNull = notNull;
exports.notEmpty = notEmpty;

var _quality = require("./quality");

function beBoolean(value) {
  return (0, _quality.isBoolean)(value);
}

function beInRange(num1, num2) {
  return function beInRange(value) {
    return (0, _quality.isNumber)(value) && !isNaN(value) ? value >= num1 && value <= num2 : false;
  };
}

function beValidEnum(arr) {
  return function beValidEnum(value) {
    return arr.includes(value);
  };
}

function length(num1, num2) {
  return function beValidLength(value) {
    return ((0, _quality.isString)(value) || (0, _quality.isArray)(value)) && (0, _quality.isNumber)(value.length) ? value.length >= num1 && value.length <= num2 : false;
  };
}

function lengthOrEmpty(num1, num2) {
  return function beValidLengthOrEmpty(value) {
    if ((0, _quality.isNull)(value) || (0, _quality.isUndefined)(value)) {
      return true;
    } else {
      return ((0, _quality.isString)(value) || (0, _quality.isArray)(value)) && (0, _quality.isNumber)(value.length) ? value.length >= num1 && value.length <= num2 : false;
    }
  };
}

function match(rx) {
  return function matches(value) {
    return rx.test(value);
  };
}

function max(num) {
  return function beLessThan(val) {
    return val <= num;
  };
}

function min(num) {
  return function beGreaterThan(val) {
    return val >= num;
  };
}

function notNull(value) {
  return !(0, _quality.isNull)(value);
}

function notEmpty(value) {
  return (0, _quality.isNull)(value) || (0, _quality.isUndefined)(value) ? false : !(0, _quality.isEmpty)(value);
}