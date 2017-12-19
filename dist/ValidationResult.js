"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This is basically a class that creates a paired-down version of an IValidatable
 */
class ValidationResult {
    constructor(validatable) {
        this.isValid = true;
        this.errors = {};
        this.value = null;
        this.errors = validatable.errors;
        this.isValid = validatable.isValid;
        this.value = validatable.value;
    }
}
exports.ValidationResult = ValidationResult;
