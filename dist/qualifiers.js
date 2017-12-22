"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const quality_1 = require("./utils/quality");
var qualifiers;
(function (qualifiers) {
    function notNull(value) {
        return !quality_1.quality.isNull(value);
    }
    qualifiers.notNull = notNull;
    function notEmpty(value) {
        return !quality_1.quality.isEmpty(value);
    }
    qualifiers.notEmpty = notEmpty;
})(qualifiers = exports.qualifiers || (exports.qualifiers = {}));
