import { ICollectionFluentInterface } from '../abstract/ICollectionFluentInterface';
import { IValidatable } from '../abstract/IValidatable';
import { TValidationResult } from '../abstract/TValidationResult';

import { Rule } from './Rule';
import { ValidationResult } from './ValidationResult';

import { collectionFluentInterfaceFor } from '../utils/collectionFluentInterfaceFor';
import copy from '../utils/copy';
import { quality } from '../utils/quality';

const { isArray, isEmpty } = quality;

export class CollectionRule extends Rule {
	public using(validatable: IValidatable): ICollectionFluentInterface {
		let rule = this;
		this._validators.set(validatable, { name: validatable.name, precondition: null });

		return collectionFluentInterfaceFor(rule, validatable);
	}

	public validate(value: any, parentValue: any): ValidationResult {
		value = copy(value);
		parentValue = copy(parentValue);

		if (isArray(value)) {
			let result: TValidationResult = {
				errors: {},
				get isValid() { return isEmpty(this.errors) },
				value
			};

			value.forEach((_propValue: any, index: number) => {
				let _result = this.getValidationResult(_propValue, parentValue);

				if (!_result.isValid) {
					result.errors[`${this.name||''}[${index}]`] = _result;
				}
			});

			return new ValidationResult(result);
		} else {
			// propValue is not a collection at this point, and cannot be validated.
			// TODO: The beCollection error can be pulled out and defined as a qualifier.
			return new ValidationResult({
				errors: {
					beCollection: 'Must be a collection.'
				},
				isValid: false,
				value
			});
		}
	}
}
