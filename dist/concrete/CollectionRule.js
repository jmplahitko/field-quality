"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Rule_1 = require("./Rule");
const quality_1 = require("../utils/quality");
const collectionFluentInterfaceFor_1 = require("../utils/collectionFluentInterfaceFor");
const { isArray, isEmpty } = quality_1.quality;
class CollectionRule extends Rule_1.Rule {
    constructor(name) {
        super(name);
    }
    using(validatable) {
        let rule = this;
        this._validators.set(validatable, { name: validatable.name, precondition: null });
        return collectionFluentInterfaceFor_1.collectionFluentInterfaceFor(rule, validatable);
    }
    validate(parentValue, prop) {
        const propValue = prop ? parentValue[prop] || null : parentValue;
        if (isArray(propValue)) {
            let result = {
                errors: {},
                get isValid() { return isEmpty(this.errors); },
                value: propValue
            };
            propValue.forEach((_propValue, index) => {
                let _result = this.getValidationResult(_propValue, _propValue);
                if (!_result.isValid) {
                    result.errors[`${prop || ''}[${index}]`] = _result;
                }
            });
            return result;
        }
        else {
            return {
                errors: {
                    beCollection: 'Must be a collection.'
                },
                isValid: false,
                value: propValue
            };
        }
    }
}
exports.CollectionRule = CollectionRule;
