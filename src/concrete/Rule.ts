import { IValidatable } from '../abstract/IValidatable';
import { TQualifier } from '../abstract/TQualifier';
import { TQualifierCollection } from '../abstract/TQualifierCollection';
import { TValidationResult } from '../abstract/TValidationResult';
import { TValidatorCollection } from '../abstract/TValidatorCollection';

import { ValidationResult } from './ValidationResult';

import copy from '../utils/copy';
import { qualifiers } from '../utils/qualifiers';
import { quality } from '../utils/quality';
import { RuleApi } from './RuleApi';
import { TPrecondition } from '../abstract/TPrecondition';

const { length, match, max, min, notEmpty, notNull, beValidEnum } = qualifiers;
const { isEmpty, isNull } = quality;

export class Rule implements IValidatable {
	public name: string;
	protected _qualifiers: TQualifierCollection = new Map();
	protected _validators: TValidatorCollection = new Map();
	protected _stopOnFirstFailure: boolean = true;

	get qualifiers(): TQualifierCollection {
		return this._qualifiers;
	}

	get validators(): TValidatorCollection {
		return this._validators;
	}

	constructor(name?: string) {
		this.name = name || this.constructor.name;
		this.define(this);
	}

	protected define(rule: Rule): void {}

	public enum(allowedValues: Array<string|number>) {
		let beEnumeratedValue = beValidEnum(allowedValues);

		let meta = {
			name: `beEnumeratedValue`,
			message: `${this.name} must be one of the following: "${allowedValues.join(', ')}".`,
			precondition: null,
			isValidIfEmpty: true
		};

		this._qualifiers.set(beEnumeratedValue, meta);

		return new RuleApi(this, meta)
	}

	public length(min: number, max: number) {
		let beBetween = length(min, max);
		let meta = {
			name: `beBetween${min}and${max}`,
			message: `${this.name} must be between ${min} and ${max}.`,
			precondition: null,
			isValidIfEmpty: true
		};

		this._qualifiers.set(beBetween, meta);

		return new RuleApi(this, meta);
	}

	public lengthOrEmpty(min: number, max: number) {
		let beBetween = length(min, max);
		let meta = {
			name: `beBetween${min}and${max}OrEmpty`,
			message: `${this.name} must be between ${min} and ${max}.`,
			precondition: null,
			isValidIfEmpty: true
		};

		this._qualifiers.set(beBetween, meta);

		return new RuleApi(this, meta);
	}

	public matches(rx: RegExp) {
		let matches = match(rx);
		let matchRx = (val: any) => isNull(val) || matches(val);
		let meta = {
			name: matchRx.name,
			message: `${this.name} is an invalid format.`,
			precondition: null,
			isValidIfEmpty: true
		};

		this._qualifiers.set(matchRx, meta);

		return new RuleApi(this, meta);
	}

	public notNull() {
		let meta = {
			name: notNull.name,
			message: `${this.name} cannot be null.`,
			precondition: null,
			isValidIfEmpty: false
		};

		this._qualifiers.set(notNull, meta);

		return new RuleApi(this, meta);
	}

	public notEmpty() {
		let meta = {
			name: notEmpty.name,
			message: `${this.name} cannot be empty.`,
			precondition: null,
			isValidIfEmpty: false
		};

		this._qualifiers.set(notEmpty, meta);

		return new RuleApi(this, meta);
	}

	public max(num: number) {
		let beLessThanOrEqual = max(num);

		let meta = {
			name: 'beLessThanOrEqual',
			message: `${this.name} cannot be greater than or equal to ${num}.`,
			precondition: null,
			isValidIfEmpty: false
		};

		this._qualifiers.set(beLessThanOrEqual, meta);

		return new RuleApi(this, meta);
	}

	public maxExclusiveOf(num: number) {
		let beLessThan = max(num - 1);

		let meta = {
			name: 'beLessThan',
			message: `${this.name} cannot be greater than ${num}.`,
			precondition: null,
			isValidIfEmpty: false
		};

		this._qualifiers.set(beLessThan, meta);

		return new RuleApi(this, meta);
	}

	public min(num: number) {
		let beGreaterThanOrEqual = min(num);

		let meta = {
			name: 'beGreaterThanOrEqual',
			message: `${this.name} cannot be less than or equal to ${num}.`,
			precondition: null,
			isValidIfEmpty: false
		};

		this._qualifiers.set(beGreaterThanOrEqual, meta);

		return new RuleApi(this, meta);
	}

	public minExclusiveOf(num: number) {
		let beGreaterThan = min(num + 1);

		let meta = {
			name: 'beGreaterThan',
			message: `${this.name} cannot be less than ${num}.`,
			precondition: null,
			isValidIfEmpty: false
		};

		this._qualifiers.set(beGreaterThan, meta);

		return new RuleApi(this, meta);
	}

	public must(qualifier: TQualifier) {
		let meta = {
			name: qualifier.name,
			message: `${this.name} is invalid.`,
			precondition: null,
			isValidIfEmpty: false
		};

		this._qualifiers.set(qualifier, meta);

		return new RuleApi(this, meta);
	}

	public stopOnFirstFailure(): void {
		this._stopOnFirstFailure = true;
		console.warn(`FieldQuality Deprecation Warning: As of version 1.4.0, rules default stopOnFirstFailure to true. You can safely remove your call to .stopOnFirstFailure() on ${this.name}, or use the .cascade() method to change stopOnFirstFailure to false.`)
	}

	public cascade(): void {
		this._stopOnFirstFailure = false;
	}

	public using(validatable: IValidatable): Rule {
		let meta = {
			name: validatable.name,
			message: '',
			precondition: null,
			isValidIfEmpty: false
		};

		this._validators.set(validatable, meta);
		return this;
	}

	public if(precondition: TPrecondition, define: (rule: Rule) => void): Rule {
		let rule = new Rule(this.name);
		let meta = {
			name: rule.name,
			message: '',
			precondition,
			isValidIfEmpty: false
		};

		this._validators.set(rule, meta);
		define(rule);

		return this;
	}

	// TODO: This method is pretty gross. This is just a sketch of the appropriate algorithm, just needs refactored.
	protected __getValidationResult(propValue: any, parentValue: any, customOptions: any): TValidationResult {
		let result: TValidationResult = {
			errors: {},
			get isValid() { return isEmpty(this.errors) },
			value: propValue
		}

		// Check qualifiers first
		result = this.__runQualifiers(result, propValue, parentValue, customOptions);
		if (result.isValid || !this._stopOnFirstFailure) {
			result = this.__runValidators(result, propValue, parentValue, customOptions);
		}


		return result;
	}

	protected __runQualifiers(result: TValidationResult, propValue: any, parentValue: any, customOptions: any): TValidationResult {
		for (let [qualifier, meta] of this._qualifiers) {
			// We check if we should run the validator based on whether the property has a value
			if (isEmpty(propValue) && meta.isValidIfEmpty) {
				continue;
			}

			// We check for a precondition to exist for a qualifier before calling it
			if (!meta.precondition || meta.precondition(parentValue, customOptions)) {
				let isValid = qualifier(propValue, parentValue, customOptions);

				if (!isValid) {
					result.errors[meta.name] = meta.message;

					// Short-circuit if we have to stopOnFirstFailure
					if (this._stopOnFirstFailure) {
						break;
					}
				}
			}
		}

		return result;
	}

	protected __runValidators(result: TValidationResult, propValue: any, parentValue: any, customOptions: any): TValidationResult {
		for (let [validator, meta] of this._validators) {
			if (!meta.precondition || meta.precondition(parentValue, customOptions)) {
				let _result = validator.validate(propValue, parentValue, customOptions);
				if (!_result.isValid) {
					for (let ruleName in _result.errors) {
						result.errors[ruleName] = _result.errors[ruleName];
					}

					if (this._stopOnFirstFailure) {
						break;
					}
				}
			}
		}

		return result;
	}

	public validate(value: any, parentValue: any, customOptions?: any): ValidationResult {
		value = copy(value);
		parentValue = copy(parentValue);

		let result = this.__getValidationResult(value, parentValue, customOptions);

		return new ValidationResult(result);
	}
}