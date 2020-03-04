"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = normalizeValidateArgs;

var _copy = _interopRequireDefault(require("../utils/copy"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function normalizeValidateArgs(value, parentValue, customOptions) {
  value = (0, _copy["default"])(value);

  if (arguments.length === 3) {
    parentValue = (0, _copy["default"])(arguments[1]);
    customOptions = (0, _copy["default"])(arguments[2]);
  } else if (arguments.length === 2) {
    parentValue = undefined;
    customOptions = (0, _copy["default"])(arguments[1]);
  }

  return [value, parentValue, customOptions];
}