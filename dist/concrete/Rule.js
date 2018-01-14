"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const simpleFluentIntefaceFor_1 = require("../utils/simpleFluentIntefaceFor");
const qualifiers_1 = require("../utils/qualifiers");
const quality_1 = require("../utils/quality");
const { length, match, notEmpty, notNull } = qualifiers_1.qualifiers;
const { isEmpty } = quality_1.quality;
class Rule {
    constructor(name) {
        this._qualifiers = new Map();
        this._rules = new Map();
        this._validator = null;
        this._stopOnFirstFailure = false;
        this.name = name || this.constructor.name.toLowerCase();
        this.define(this);
    }
    get qualifiers() {
        return this._qualifiers;
    }
    define(rule) { }
    length(num1, num2) {
        let beBetween = length(num1, num2);
        this._qualifiers.set(beBetween, {
            name: `beBetween${num1}and${num2}`,
            message: `${this.name} must be between ${num1} and ${num2}`,
            precondition: null
        });
        return simpleFluentIntefaceFor_1.simpleFluentInterfaceFor(this, beBetween);
    }
    matches(rx) {
        let matchRx = match(rx);
        this._qualifiers.set(matchRx, {
            name: matchRx.name,
            message: `${this.name} is an invalid format.`,
            precondition: null
        });
        return simpleFluentIntefaceFor_1.simpleFluentInterfaceFor(this, matchRx);
    }
    notNull() {
        this._qualifiers.set(notNull, {
            name: notNull.name,
            message: `${this.name} cannot be null.`,
            precondition: null
        });
        return simpleFluentIntefaceFor_1.simpleFluentInterfaceFor(this, notNull);
    }
    notEmpty() {
        this._qualifiers.set(notEmpty, {
            name: notEmpty.name,
            message: `${this.name} cannot be empty.`,
            precondition: null
        });
        return simpleFluentIntefaceFor_1.simpleFluentInterfaceFor(this, notEmpty);
    }
    must(qualifier) {
        this._qualifiers.set(qualifier, {
            name: qualifier.name,
            message: `${this.name} is invalid.`,
            precondition: null
        });
        return simpleFluentIntefaceFor_1.simpleFluentInterfaceFor(this, qualifier);
    }
    setValidator(validator) {
        this._validator = validator;
    }
    stopOnFirstFailure() {
        this._stopOnFirstFailure = true;
    }
    using(rule) {
        this._rules.set(rule, { name: rule.name, precondition: null });
        return this;
    }
    if(precondition, define) {
        let rule = new Rule(this.name);
        this._rules.set(rule, { name: rule.name, precondition });
        define(rule);
        return this;
    }
    // TODO: This method is pretty gross. This is just a sketch of the appropriate algorithm, just needs refactored.
    validate(parentValue, prop) {
        const propValue = prop ? parentValue[prop] || null : parentValue;
        let result = {
            errors: {},
            get isValid() { return isEmpty(this.errors); },
            value: propValue
        };
        // If there's a validator, delegate validation to it and short-circuit.
        if (this._validator) {
            return this._validator.validate(propValue);
        }
        // Check qualifiers first
        for (let [qualifier, meta] of this._qualifiers) {
            // We check for a precondition to exist for a qualifier before calling it
            if (!meta.precondition || meta.precondition(parentValue)) {
                let isValid = qualifier(propValue);
                if (!isValid) {
                    result.errors[meta.name] = meta.message;
                    // Short-circuit if we have to stopOnFirstFailure
                    if (this._stopOnFirstFailure) {
                        return result;
                    }
                }
            }
        }
        for (let [rule, meta] of this._rules) {
            if (!meta.precondition || meta.precondition(parentValue)) {
                let _result = rule.validate(propValue);
                if (!_result.isValid) {
                    for (let ruleName in _result.errors) {
                        result.errors[ruleName] = _result.errors[ruleName];
                    }
                    // TODO: We have some duplication here. Need to find a better solution.
                    if (this._stopOnFirstFailure) {
                        return result;
                    }
                }
            }
        }
        return result;
    }
}
exports.Rule = Rule;
