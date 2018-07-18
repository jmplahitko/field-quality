"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationResult_1 = require("./ValidationResult");
const copy_1 = require("../utils/copy");
const simpleFluentIntefaceFor_1 = require("../utils/simpleFluentIntefaceFor");
const qualifiers_1 = require("../utils/qualifiers");
const quality_1 = require("../utils/quality");
const { length, match, notEmpty, notNull } = qualifiers_1.qualifiers;
const { isEmpty, isNull } = quality_1.quality;
class Rule {
    constructor(name) {
        this._qualifiers = new Map();
        this._validators = new Map();
        this._stopOnFirstFailure = true;
        this.name = name || this.constructor.name;
        this.define(this);
    }
    get qualifiers() {
        return this._qualifiers;
    }
    get validators() {
        return this._validators;
    }
    define(rule) { }
    length(min, max) {
        let beBetween = length(min, max);
        this._qualifiers.set(beBetween, {
            name: `beBetween${min}and${max}`,
            message: `${this.name} must be between ${min} and ${max}`,
            precondition: null
        });
        return simpleFluentIntefaceFor_1.simpleFluentInterfaceFor(this, beBetween);
    }
    lengthOrEmpty(min, max) {
        let beBetween = length(min, max);
        this._qualifiers.set(beBetween, {
            name: `beBetween${min}and${max}OrEmpty`,
            message: `${this.name} must be between ${min} and ${max}`,
            precondition: null
        });
        return simpleFluentIntefaceFor_1.simpleFluentInterfaceFor(this, beBetween);
    }
    matches(rx) {
        let matches = match(rx);
        let matchRx = (val) => isNull(val) || matches(val);
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
    stopOnFirstFailure() {
        this._stopOnFirstFailure = true;
        console.warn(`FieldQuality Deprecation Warning: As of version 1.4.0, rules default stopOnFirstFailure to true. You can safely remove your call to .stopOnFirstFailure() on ${this.name}, or use the .cascade() method to change stopOnFirstFailure to false.`);
    }
    cascade() {
        this._stopOnFirstFailure = false;
    }
    using(validatable) {
        let rule = this;
        this._validators.set(validatable, { name: validatable.name, precondition: null });
        return this;
    }
    if(precondition, define) {
        let rule = new Rule(this.name);
        this._validators.set(rule, { name: rule.name, precondition });
        define(rule);
        return this;
    }
    // TODO: This method is pretty gross. This is just a sketch of the appropriate algorithm, just needs refactored.
    getValidationResult(propValue, parentValue, customOptions) {
        let result = {
            errors: {},
            get isValid() { return isEmpty(this.errors); },
            value: propValue
        };
        // Check qualifiers first
        for (let [qualifier, meta] of this._qualifiers) {
            // We check for a precondition to exist for a qualifier before calling it
            if (!meta.precondition || meta.precondition(parentValue, customOptions)) {
                let isValid = qualifier(propValue, parentValue, customOptions);
                if (!isValid) {
                    result.errors[meta.name] = meta.message;
                    // Short-circuit if we have to stopOnFirstFailure
                    if (this._stopOnFirstFailure) {
                        return new ValidationResult_1.ValidationResult(result);
                    }
                }
            }
        }
        for (let [validator, meta] of this._validators) {
            if (!meta.precondition || meta.precondition(parentValue, customOptions)) {
                let _result = validator.validate(propValue, parentValue, customOptions);
                if (!_result.isValid) {
                    for (let ruleName in _result.errors) {
                        result.errors[ruleName] = _result.errors[ruleName];
                    }
                    // TODO: We have some duplication here. Need to find a better solution.
                    if (this._stopOnFirstFailure) {
                        return new ValidationResult_1.ValidationResult(result);
                    }
                }
            }
        }
        return new ValidationResult_1.ValidationResult(result);
    }
    validate(value, parentValue, customOptions) {
        value = copy_1.default(value);
        parentValue = copy_1.default(parentValue);
        return this.getValidationResult(value, parentValue, customOptions);
    }
}
exports.Rule = Rule;
