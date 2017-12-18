"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Field_1 = require("./Field");
const Rule_1 = require("./Rule");
class Model {
    constructor(entity) {
        this._isValid = true;
        this._fields = {};
        this._messages = {};
        this._rules = {};
        this.define(this);
        for (let prop in entity) {
            if (entity.hasOwnProperty(prop)) {
                const field = new Field_1.Field(prop);
                const propValue = entity[prop];
                this._fields[prop] = field;
                if (!this._rules[prop]) {
                    this._rules[prop] = this.ruleFor(prop);
                }
                this.set(prop, propValue);
            }
        }
    }
    get isValid() {
        return this._isValid;
    }
    get messages() {
        return this._messages;
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
    set(fieldName, value) {
        let field = this._fields[fieldName];
        let rule = this._rules[fieldName];
        field.value = value;
        let result = rule.validate(field);
        this._messages[fieldName] = result.messages[fieldName];
        if (!result.isValid) {
            this._isValid = false;
        }
        return field;
    }
    toObject() {
    }
    toJSON() {
        return '';
    }
}
exports.Model = Model;
