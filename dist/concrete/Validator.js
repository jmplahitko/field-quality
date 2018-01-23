"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Rule_1 = require("./Rule");
const CollectionRule_1 = require("./CollectionRule");
const quality_1 = require("../utils/quality");
const copy_1 = require("../utils/copy");
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
    getValidationResult(propertyName, value) {
        let result = this._rules[propertyName]
            .map(rule => rule.validate(value, propertyName))
            .reduce((previousResult, currentResult) => ({
            isValid: previousResult.isValid === true ? currentResult.isValid : previousResult.isValid,
            errors: Object.assign(previousResult.errors, currentResult.errors),
            value: currentResult.value,
        }));
        return result;
    }
    validate(value, props = []) {
        value = copy_1.default(value);
        let errors = {};
        let propsToValidate = isEmpty(props) ? Object.keys(this._rules) : props;
        for (let propName of propsToValidate) {
            let result = this.getValidationResult(propName, value);
            if (!result.isValid) {
                errors[propName] = result;
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
