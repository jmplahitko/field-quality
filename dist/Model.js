"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Field_1 = require("./Field");
const Rule_1 = require("./Rule");
const split_1 = require("./utils/split");
class Model {
    constructor(entity = {}) {
        this._isValid = true;
        this._errors = {};
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
    get errors() {
        return this._errors;
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
                    field = new Field_1.Field(prop, this, rule, propValue);
                }
                this._fields[prop] = field;
            }
        }
        // If a rule is defined, and has no field at this point, seed the field as null
        for (let ruleName in this._rules) {
            if (!(ruleName in this._fields)) {
                this._fields[ruleName] = new Field_1.Field(ruleName, this, this._rules[ruleName], null);
            }
        }
        return this.validate();
    }
    define(model) {
        console.warn('define not implemented');
    }
    ruleFor(fieldName) {
        if (!this._rules[fieldName]) {
            this._rules[fieldName] = new Rule_1.Rule(fieldName);
        }
        return this._rules[fieldName];
    }
    get(fieldName) {
        let fields = fieldName.split('.');
        let [head, tail] = split_1.default(fields, 1);
        let field = this._fields[head[0]];
        if (field && tail.length) {
            return field.get(tail.join('.'));
        }
        return field;
    }
    set(fieldNameOrValue, value) {
        if (typeof fieldNameOrValue === 'string') {
            let fieldName = fieldNameOrValue;
            let field = this.get(fieldNameOrValue);
            if (field) {
                if (field.value !== value) {
                    field.set(value);
                }
            }
            else {
                throw new ReferenceError(`Cannot set value of ${fieldName}, the Field is undefined.`);
            }
        }
        else {
            value = fieldNameOrValue;
            for (let fieldName in value) {
                if (value.hasOwnProperty(fieldName)) {
                    let field = this.get(fieldName);
                    if (field) {
                        if (field.value !== value) {
                            field.set(value[fieldName]);
                        }
                    }
                    else {
                        throw new ReferenceError(`Cannot set value of ${fieldName}, the Field is undefined.`);
                    }
                }
            }
        }
        return this.validate();
    }
    setValidity(result) {
        this._errors = result.errors;
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
        let errors = {};
        let validity = [];
        for (let fieldName in this._fields) {
            let _field = this._fields[fieldName];
            let _result = _field.validate();
            if (!_result.isValid) {
                errors[fieldName] = _result;
            }
            validity.push(_result.isValid);
        }
        let result = {
            value: this.value,
            isValid: !validity.includes(false),
            errors
        };
        this.setValidity(result);
        return result;
    }
}
exports.Model = Model;
