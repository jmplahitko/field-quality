"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Rule_1 = require("./Rule");
const quality_1 = require("../utils/quality");
const util_1 = require("util");
const { isEmpty } = quality_1.quality;
class Validator {
    constructor() {
        this._rules = {};
        this.define(this);
    }
    define(validator) {
        console.warn('define not implemented');
    }
    ruleFor(fieldName) {
        if (!this._rules[fieldName]) {
            this._rules[fieldName] = new Rule_1.Rule(fieldName);
        }
        return this._rules[fieldName];
    }
    validate(value, prop = []) {
        let props = util_1.isString(prop) ? [prop] : prop;
        let errors = {};
        if (isEmpty(props)) {
            for (let propName in this._rules) {
                let _result = this._rules[propName].validate(value, propName);
                if (!_result.isValid) {
                    errors[propName] = _result;
                }
            }
        }
        else {
            for (let propName of props) {
                let _result = this._rules[propName].validate(value, propName);
                if (!_result.isValid) {
                    errors[propName] = _result;
                }
            }
        }
        return {
            errors,
            isValid: isEmpty(errors),
            value
        };
    }
}
exports.Validator = Validator;
