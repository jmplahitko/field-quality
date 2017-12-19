"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Field_1 = require("./Field");
const Rule_1 = require("./Rule");
const ValidationResult_1 = require("./ValidationResult");
class Model {
    constructor(entity = {}) {
        this._isValid = true;
        this._messages = {};
        this._fields = {};
        this._rules = {};
        this.name = this.constructor.name.toLowerCase();
        this.define(this);
            this.make(entity);
        }
    get value() {
        return this.toObject();
    }
    get isValid() {
        return this._isValid;
    }
    get messages() {
        return this._messages;
    }
    make(entity) {
        for (let prop in entity) {
            if (entity.hasOwnProperty(prop)) {
                const propValue = entity[prop];
                const rule = this._rules[prop] || this.ruleFor(prop).using(new Rule_1.Rule(prop));
                let field;
                if (rule.entity) {
                    let Entity = rule.entity;
                    field = new Entity(propValue);
                }
                else {
                    field = new Field_1.Field(prop, rule, propValue);
                }
                this._fields[prop] = field;
            }
        }
        return this.validate();
    }
    define(model) {
        console.warn('define not implemented');
    }
    ruleFor(fieldName) {
        let rule = new Rule_1.Rule(fieldName);
        this._rules[fieldName] = rule;
        return rule;
    }
    get(fieldName) {
        let field = this._fields[fieldName];
        return field;
    }
    set(value) {
        for (let fieldName in value) {
            if (value.hasOwnProperty(fieldName)) {
                let field = this._fields[fieldName];
                if (field.value !== value) {
                    field.set(value[fieldName]);
                }
            }
        }
        return this.validate();
    }
    setValidity(result) {
        this._messages = result.isValid ? {} : result.messages;
        this._isValid = result.isValid;
    }
    toObject() {
        let target = {};
        for (let fieldName in this._fields) {
            target[fieldName] = this._fields[fieldName].value;
        }
        return target;
    }
    toJSON() {
        return JSON.stringify(this.toObject());
    }
    validate() {
        let validity = [];
        let messages = {};
        for (let fieldName in this._fields) {
            let _result = this._fields[fieldName].validate();
            validity.push(_result.isValid);
            messages[fieldName] = _result.messages[fieldName];
        }
        let result = new ValidationResult_1.ValidationResult({
            value: this.value,
            isValid: !validity.includes(false),
            messages
        });
        this.setValidity(result);
        return result;
    }
}
exports.Model = Model;
