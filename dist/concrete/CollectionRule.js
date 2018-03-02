"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Rule_1 = require("./Rule");
const ValidationResult_1 = require("./ValidationResult");
const collectionFluentInterfaceFor_1 = require("../utils/collectionFluentInterfaceFor");
const copy_1 = require("../utils/copy");
const quality_1 = require("../utils/quality");
const { isArray, isEmpty } = quality_1.quality;
class CollectionRule extends Rule_1.Rule {
    using(validatable) {
        let rule = this;
        this._validators.set(validatable, { name: validatable.name, precondition: null });
        return collectionFluentInterfaceFor_1.collectionFluentInterfaceFor(rule, validatable);
    }
    validate(value, parentValue) {
        value = copy_1.default(value);
        parentValue = copy_1.default(parentValue);
        if (isArray(value)) {
            let result = {
                errors: {},
                get isValid() { return isEmpty(this.errors); },
                value
            };
            value.forEach((_propValue, index) => {
                let _result = this.getValidationResult(_propValue, parentValue);
                if (!_result.isValid) {
                    result.errors[`${this.name || ''}[${index}]`] = _result;
                }
            });
            return new ValidationResult_1.ValidationResult(result);
        }
        else {
            // propValue is not a collection at this point, and cannot be validated.
            // TODO: The beCollection error can be pulled out and defined as a qualifier.
            return new ValidationResult_1.ValidationResult({
                errors: {
                    beCollection: 'Must be a collection.'
                },
                isValid: false,
                value
            });
        }
    }
}
exports.CollectionRule = CollectionRule;
