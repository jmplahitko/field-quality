"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Rule_1 = require("./Rule");
const CollectionRule_1 = require("./CollectionRule");
const quality_1 = require("../utils/quality");
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
    ruleFor(fieldName) {
        let rule = new Rule_1.Rule(fieldName);
        if (!this._rules[fieldName]) {
            this._rules[fieldName] = [rule];
        }
        else {
            this._rules[fieldName].push(rule);
        }
        return rule;
    }
    ruleForEach(fieldName) {
        let rule = new CollectionRule_1.CollectionRule(fieldName);
        if (!this._rules[fieldName]) {
            this._rules[fieldName] = [rule];
        }
        else {
            this._rules[fieldName].push(rule);
        }
        return rule;
    }
    getValidationResult(ruleName, value) {
        let result = this._rules[ruleName]
            .map(rule => rule.validate(value, ruleName))
            .reduce((previousResult, currentResult) => ({
            isValid: previousResult.isValid === true ? currentResult.isValid : previousResult.isValid,
            errors: Object.assign(previousResult.errors, currentResult.errors),
            value: currentResult.value,
        }));
        return result;
    }
    validate(value, props = []) {
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
