"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Rule {
    constructor(name) {
        this.name = name;
        this._qualifiers = new Map();
        this._rules = {};
        this._entity = null;
    }
    get entity() {
        return this._entity;
    }
    as(entity) {
        this._entity = entity;
    }
    asArrayOf() { }
    using(rule) {
        this._rules[rule.name] = rule;
        return this;
    }
    must(qualifier) {
        let rule = this;
        this._qualifiers.set(qualifier, {
            name: qualifier.name,
            message: `${this.name} is invalid.`
        });
        return {
            must: rule.must.bind(this),
            withMessage(message) {
                let qualifierMeta = rule._qualifiers.get(qualifier);
                if (qualifierMeta) {
                    qualifierMeta.message = message;
                    rule._qualifiers.set(qualifier, qualifierMeta);
                }
                return rule;
            }
        };
    }
    validate(field) {
        let errors = {};
        let validity = [];
        for (let [qualifier, meta] of this._qualifiers) {
            let isValid = qualifier(field.value);
            if (!isValid) {
                errors[meta.name] = meta.message;
            }
            validity.push(isValid);
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
        let result = {
            value: field.value,
            isValid: !validity.includes(false),
            errors
        };
        return result;
    }
}
exports.Rule = Rule;
