"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This is basically a class that creates a paired-down version of an IValidatable
 */
class ValidationResult {
    constructor(validatable) {
        this.isValid = true;
        this.messages = {};
        this.isValid = validatable.isValid;
        this.messages = validatable.messages;
        this.value = validatable.value;
    }
}
exports.ValidationResult = ValidationResult;
