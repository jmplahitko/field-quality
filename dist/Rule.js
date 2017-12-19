"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationResult_1 = require("./ValidationResult");
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
    asArrayOf() {
    }
    using(rule) {
        this._rules[rule.name] = rule;
        return this;
    }
    must(qualifier) {
        let rule = this;
        this._qualifiers.set(qualifier, { message: `${this.name} is invalid` });
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
        if (this._entity) {
            return field.validate();
            ;
        }
        else {
            let messages = { [this.name]: [] };
            let validity = [];
            for (let [qualifier, meta] of this._qualifiers) {
                if (!qualifier(field.value)) {
                    messages[this.name].push(meta.message);
                    validity.push(false);
                }
                else {
                    validity.push(true);
                }
            }
            for (let ruleName in this._rules) {
                let rule = this._rules[ruleName];
                let _result = rule.validate(field);
                messages[this.name] = _result.messages[rule.name];
                validity.push(_result.isValid);
            }
            let result = new ValidationResult_1.ValidationResult({
                value: field.value,
                isValid: !validity.includes(false),
                messages: messages
            });
            return result;
        }
    }
}
exports.Rule = Rule;
