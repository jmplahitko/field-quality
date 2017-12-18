"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Field_1 = require("./Field");
const Rule_1 = require("./Rule");
class Model {
    constructor(entity) {
        this._isValid = true;
        this._messages = {};
        this._fields = {};
        this._rules = {};
        this.define(this);
        if (entity) {
            this.make(entity);
        }
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
        let validationResult = {
            value: null,
            isValid: true,
            messages: {}
        };
        for (let prop in entity) {
            if (entity.hasOwnProperty(prop)) {
                const propValue = entity[prop];
                const rule = this._rules[prop] || this.ruleFor(prop).using(new Rule_1.Rule(prop));
                let result;
                if (rule.entity) {
                    let Entity = rule.entity;
                    let model = new Entity(propValue);
                    this._fields[prop] = model;
                    result = rule.validate(model);
                }
                else {
                    let field = new Field_1.Field(prop, propValue);
                    this._fields[prop] = field;
                    result = rule.validate(field);
                    // this.set({[prop]: propValue});
                }
                validationResult.messages[prop] = result.messages[prop];
            }
        }
        validationResult.value = this.value;
        // TODO: Clean this garbage up
        let isValid = true;
        for (let fieldName in this._fields) {
            if (!this._fields[fieldName].isValid) {
                validationResult.isValid = false;
                break;
            }
        }
        this.setValidity(validationResult);
        return this;
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
                let rule = this._rules[fieldName];
                if (field.value !== value) {
                    field.set(value[fieldName]);
                }
                let result = rule.validate(field);
                this._messages[fieldName] = result.messages[fieldName];
                // TODO: Clean this garbage up
                let isValid = true;
                for (let fieldName in this._fields) {
                    if (!this._fields[fieldName].isValid) {
                        isValid = false;
                        break;
                    }
                }
                this._isValid = isValid;
            }
        }
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
}
exports.Model = Model;
