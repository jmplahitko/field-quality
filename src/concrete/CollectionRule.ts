import { IValidatable } from '../abstract/IValidatable';
import { TValidationResult } from '../abstract/TValidationResult';

import { Rule } from './Rule';
import { ValidationResult } from './ValidationResult';

import copy from '../utils/copy';
import { quality } from '../utils/quality';
import { TCollectionFilter } from '../abstract/TCollectionFilter';
import { TSubsetRuleCollection } from '../abstract/TSubsetRuleCollection';

const { isArray, isEmpty } = quality;

export class CollectionRule extends Rule {
	protected _subsetRules: TSubsetRuleCollection = new Map();

	public using(validatable: IValidatable): CollectionRule {
		let meta = {
			name: validatable.name,
			message: '',
			precondition: null,
			isValidIfEmpty: false
		};

		this._validators.set(validatable, meta);
		return this;
	}

	public where(filter: TCollectionFilter, define: (rule: Rule) => void): CollectionRule {
		let rule = new Rule(this.name);
		let meta = {
			name: rule.name,
			filter
		};

		this._subsetRules.set(rule, meta);
		define(rule);

		return this;
	}

	protected __runSubsetRules(result: TValidationResult, collection: Array<any>, parentValue: any, customOptions: any): TValidationResult {
		for (let [rule, meta] of this._subsetRules) {
			let subset = collection.filter((value: any, index: number) => meta.filter(value, index, collection, parentValue, customOptions));

			for (let value of subset) {
				let _result = rule.validate(value, value, customOptions);
				if (!_result.isValid) {
					let _collectionIndex = collection.indexOf(value);
					let errorKey = `[${_collectionIndex}]`;
					if (result.errors[errorKey]) {
						result.errors[errorKey] = copy(_result, result.errors[errorKey]);
					} else {
						result.errors[errorKey] = _result;
					}
				}
			}
		}

		return result;
	}

	public validate(value: any, parentValue: any, customOptions?: any): ValidationResult {
		value = copy(value);
		parentValue = copy(parentValue);

		if (isArray(value)) {
			let result: TValidationResult = {
				errors: {},
				get isValid() { return isEmpty(this.errors) },
				value
			};

			value.map((_propValue: any, index: number) => {
				let _result = this.__getValidationResult(_propValue, parentValue, customOptions);

				if (!_result.isValid) {
					result.errors[`[${index}]`] = _result;
				}
			});

			if (result.isValid || !this._stopOnFirstFailure) {
				result = this.__runSubsetRules(result, value, parentValue, customOptions);
			}

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
