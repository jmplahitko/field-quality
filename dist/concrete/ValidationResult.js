"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidationResult {
    constructor(validationResult) {
        this.errors = validationResult.errors;
        this.isValid = validationResult.isValid;
        this.value = validationResult.value;
    }
    flatten() {
        let result = {};
        for (let prop in this.errors) {
            if (!this.errors.hasOwnProperty(prop)) {
                continue;
            }
            if (this.errors[prop] instanceof ValidationResult) {
                let flattened = this.errors[prop].flatten();
                if (flattened instanceof ValidationResult) {
                    result[prop] = flattened;
                }
                else {
                    for (let _prop in flattened) {
                        if (!flattened.hasOwnProperty(_prop)) {
                            continue;
                        }
                        result[`${prop}.${_prop}`] = flattened[_prop];
                    }
                }
            }
            else {
                return this;
            }
        }
        return result;
    }
}
exports.ValidationResult = ValidationResult;
