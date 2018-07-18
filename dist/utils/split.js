"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function split(arr, ndx) {
    let head = arr.slice(0, ndx);
    let tail = arr.slice(ndx);
    return [head, tail];
}
exports.default = split;
