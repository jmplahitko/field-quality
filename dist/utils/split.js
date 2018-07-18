"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = split;

function split(arr, ndx) {
  var head = arr.slice(0, ndx);
  var tail = arr.slice(ndx);
  return [head, tail];
}