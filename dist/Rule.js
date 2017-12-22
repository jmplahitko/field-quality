"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const simpleFluentIntefaceFor_1 = require("./utils/simpleFluentIntefaceFor");
const qualifiers_1 = require("./utils/qualifiers");
const { notEmpty, notNull } = qualifiers_1.qualifiers;
class Rule {
    constructor(name) {
        this.name = name;
        this._qualifiers = new Map();
        this._rules = {};
        this._entity = null;
        this._stopOnFirstFailure = false;
    }
    get entity() {
        return this._entity;
    }
    get qualifiers() {
        return this._qualifiers;
    }
    as(entity) {
        this._entity = entity;
    }
    asArrayOf() { }
    notNull() {
        let rule = this;
        this._qualifiers.set(notNull, {
            name: notNull.name,
            message: `${this.name} cannot be null.`,
            precondition: null
        });
        return simpleFluentIntefaceFor_1.simpleFluentInterfaceFor(this, notNull);
    }
    notEmpty() {
        let rule = this;
        this._qualifiers.set(notEmpty, {
            name: notEmpty.name,
            message: `${this.name} cannot be empty.`,
            precondition: null
        });
        return simpleFluentIntefaceFor_1.simpleFluentInterfaceFor(this, notEmpty);
    }
    must(qualifier) {
        let rule = this;
        this._qualifiers.set(qualifier, {
            name: qualifier.name,
            message: `${this.name} is invalid.`,
            precondition: null
        });
        return simpleFluentIntefaceFor_1.simpleFluentInterfaceFor(this, qualifier);
    }
    stopOnFirstFailure() {
        this._stopOnFirstFailure = true;
    }
    using(rule) {
        this._rules[rule.name] = rule;
        return this;
    }
    validate(field) {
        let errors = {};
        let validity = [];
        for (let [qualifier, meta] of this._qualifiers) {
            if (!meta.precondition || meta.precondition(field.parent)) {
                let isValid = qualifier(field.value);
                if (!isValid) {
                    validity.push(isValid);
                    errors[meta.name] = meta.message;
                    if (this._stopOnFirstFailure) {
                        return {
                            value: field.value,
                            isValid: false,
                            errors
                        };
                    }
                }
                else {
                    validity.push(isValid);
                }
            }
        }
        for (let ruleName in this._rules) {
            let rule = this._rules[ruleName];
            let _result = rule.validate(field);
            if (!_result.isValid) {
                for (let ruleNeme in _result.errors) {
                    errors[ruleName] = _result.errors[ruleName];
                }
            }
            validity.push(_result.isValid);
        }
        return {
            value: field.value,
            isValid: !validity.includes(false),
            errors
        };
    }
}
exports.Rule = Rule;
