"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CollectionRule_1 = require("./CollectionRule");
const Rule_1 = require("./Rule");
const quality_1 = require("../utils/quality");
const copy_1 = require("../utils/copy");
const ValidationResult_1 = require("./ValidationResult");
const getProperty_1 = require("../utils/getProperty");
const { isEmpty } = quality_1.quality;
class Validator {
    constructor() {
        this._rules = {};
        this.name = this.constructor.name.toLowerCase();
        this.define(this);
    }
    define(validator) {
        console.warn('define not implemented');
    }
    ruleFor(propertyName) {
        let rule = new Rule_1.Rule(propertyName);
        if (!this._rules[propertyName]) {
            this._rules[propertyName] = [rule];
        }
        else {
            this._rules[propertyName].push(rule);
        }
        return rule;
    }
    ruleForEach(propertyName) {
        let rule = new CollectionRule_1.CollectionRule(propertyName);
        if (!this._rules[propertyName]) {
            this._rules[propertyName] = [rule];
        }
        else {
            this._rules[propertyName].push(rule);
        }
        return rule;
    }
    getValidationResult(propertyName, value, parentValue, customOptions) {
        let rules = this._rules[propertyName];
        let result = {
            errors: {},
            get isValid() { return isEmpty(this.errors); },
            value
        };
        for (let rule in rules) {
            if (rules[rule] instanceof CollectionRule_1.CollectionRule) {
                let _result = rules[rule].validate(value, parentValue, customOptions);
                if (!_result.isValid) {
                    for (let errorProp in _result.errors) {
                        let propName = `${propertyName}${propertyName.includes('.') ? '.' : ''}${errorProp}`;
                        if (_result.errors[errorProp] instanceof ValidationResult_1.ValidationResult) {
                            if (result.errors.hasOwnProperty(propName)) {
                                result.errors[propName] = new ValidationResult_1.ValidationResult(Object.assign(result.errors[propName], _result.errors[errorProp]));
                            }
                            else {
                                result.errors[propName] = _result.errors[errorProp];
                            }
                        }
                        else {
                            result.errors[propertyName] = _result;
                        }
                    }
                }
            }
            else {
                let _result = rules[rule].validate(value, parentValue, customOptions);
                if (!_result.isValid) {
                    if (result.errors.hasOwnProperty(propertyName)) {
                        result.errors[propertyName] = new ValidationResult_1.ValidationResult(Object.assign(result.errors[propertyName], _result));
                    }
                    else {
                        result.errors[propertyName] = _result;
                    }
                }
            }
        }
        return result;
    }
    validate(value, parentValue, customOptions) {
        value = copy_1.default(value);
        if (arguments.length === 3) {
            parentValue = copy_1.default(arguments[1]);
            customOptions = copy_1.default(arguments[2]);
        }
        else if (arguments.length === 2) {
            parentValue = copy_1.default(value);
            customOptions = arguments[1];
        }
        else if (arguments.length === 1) {
            parentValue = copy_1.default(value);
        }
        let errors = {};
        for (let propName in this._rules) {
            let result = this.getValidationResult(propName, getProperty_1.default(value, propName), parentValue, customOptions);
            if (!result.isValid) {
                for (let errorProp in result.errors) {
                    errors[errorProp] = result.errors[errorProp];
                }
            }
        }
        return new ValidationResult_1.ValidationResult({
            errors,
            isValid: isEmpty(errors),
            value
        });
    }
}
exports.Validator = Validator;
