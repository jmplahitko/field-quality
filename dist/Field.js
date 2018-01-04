"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Field {
    constructor(name, _parent, _rule, value, isSerializable = true) {
        this.name = name;
        this._parent = _parent;
        this._rule = _rule;
        this.isSerializable = isSerializable;
        this._currentValue = null;
        this._originalValue = null;
        this._previousValue = null;
        this._isValid = true;
        this._errors = {};
        this._currentValue = value || null;
        this._originalValue = value || null;
    }
    get errors() {
        return this._errors;
    }
    get isValid() {
        return this._isValid;
    }
    get value() {
        return this._currentValue;
    }
    get parent() {
        return this._parent.value;
    }
    get() {
        return this.value;
    }
    set(value) {
        this._previousValue = this._currentValue;
        this._currentValue = value;
        return this.validate();
    }
    serialize() {
        return this.isSerializable ? this.value : undefined;
    }
    setValidity(result) {
        this._errors = result.errors;
        this._isValid = result.isValid;
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
