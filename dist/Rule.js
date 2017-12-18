"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Rule {
    constructor(name) {
        this.name = name;
        this._qualifiers = new Map();
        this._rules = [];
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
        this._rules.push(rule);
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
            let Entity = this._entity;
            let testEntity = new Entity(field.value);
            let result = testEntity.validate();
            field.setValidity(result);
            return result;
        }
        else {
            let result = {
                value: field.value,
                isValid: true,
                messages: { [this.name]: [] }
            };
            for (let [qualifier, meta] of this._qualifiers) {
                if (!qualifier(field.value)) {
                    result.messages[this.name].push(meta.message);
                    result.isValid = false;
                }
            }
            this._rules.forEach(rule => {
                let _result = rule.validate(field);
                if (!_result.isValid) {
                    result.messages[rule.name] = _result.messages[rule.name];
                    result.isValid = false;
                }
            });
            field.setValidity(result);
            return result;
        }
    }
}
exports.Rule = Rule;
