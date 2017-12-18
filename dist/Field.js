"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Field {
    constructor(name, value) {
        this.name = name;
        this._currentValue = null;
        this._originalValue = null;
        this._previousValue = null;
        // happy or sad default?
        this._isValid = true;
        this._messages = [];
        this._currentValue = value || null;
        this._originalValue = value || null;
    }
    get value() {
        return this._currentValue;
    }
    set value(val) {
        this._previousValue = this._currentValue;
        this._currentValue = val;
    }
    get isValid() {
        return this._isValid;
    }
    setValidity(result) {
        this._messages = result.isValid ? [] : result.messages[this.name];
        this._isValid = result.isValid;
    }
    get messages() {
        return this._messages;
    }
    rollback() {
        this._currentValue = this._originalValue;
        this._previousValue = null;
    }
}
exports.Field = Field;
