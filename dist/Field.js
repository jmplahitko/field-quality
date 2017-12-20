"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Field {
    constructor(name, _rule, value) {
        this.name = name;
        this._rule = _rule;
        this._currentValue = null;
        this._originalValue = null;
        this._previousValue = null;
        // happy or sad default?
        this._isValid = true;
        this._errors = {};
        this._currentValue = value || null;
        this._originalValue = value || null;
    }
    get value() {
        return this._currentValue;
    }
    get isValid() {
        return this._isValid;
    }
    set(value) {
        this._previousValue = this._currentValue;
        this._currentValue = value;
        return this.validate();
    }
    setValidity(result) {
        this._errors = result.errors;
        this._isValid = result.isValid;
    }
    get errors() {
        return this._errors;
    }
    rollback() {
        this._currentValue = this._originalValue;
        this._previousValue = null;
        return this.validate();
    }
    validate() {
        let result = this._rule.validate(this);
        this.setValidity(result);
        return result;
    }
}
exports.Field = Field;
