"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getProperty;

var _quality = require("./quality");

function getProperty(obj, prop) {
  if (!(0, _quality.isObject)(obj)) {
    return;
  }

  if (obj.hasOwnProperty(prop)) {
    return obj[prop];
  } else {
    var props = prop.split('.');

    if (props.length > 1) {
      if (obj.hasOwnProperty(props[0])) {
        return getProperty(obj[props[0]], props.slice(1).join('.'));
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  }
}