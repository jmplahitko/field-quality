import { TValidationResult } from '../abstract/TValidationResult';
import { quality } from '../utils/quality';

const { isEmpty } = quality;

export class ValidationResult {
	readonly errors: { [name: string]: any };
	readonly isValid: boolean;
	readonly value: any;

	constructor(validationResult: TValidationResult) {
		this.errors = validationResult.errors;
		this.isValid = isEmpty(this.errors);
		this.value = validationResult.value;
	}

	flatten() {
		let result: {[key: string]: any} = {};

		for (let prop in this.errors) {
			if (!this.errors.hasOwnProperty(prop)) { continue; }

			if (this.errors[prop] instanceof ValidationResult) {
				let flattened = this.errors[prop].flatten();

				if (flattened instanceof ValidationResult) {
					result[prop] = flattened;
				} else {
					for (let _prop in flattened) {
						if (!flattened.hasOwnProperty(_prop)) { continue; }
						result[`${prop}.${_prop}`] = flattened[_prop];
					}
				}
			} else {
				return this;
			}
		}


		return result;
	}
}