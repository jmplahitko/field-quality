import RuleApi from './RuleApi';
import Severity from './Severity';
import ValidationResult from './ValidationResult';
import ValidationResultList from './ValidationResultList';

import { IValidatable, TPrecondition, TQualifier, TQualifierCollection, TValidatorCollection } from './types';

import copy from './utils/copy';
import { length, match, max, min, notEmpty, notNull, beValidEnum } from './utils/qualifiers';
import { isEmpty, isNull } from './utils/quality';

export default class Rule implements IValidatable {
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
		this.name = name || '';
	}

	public enum(allowedValues: Array<string|number>) {
		let beEnumeratedValue = beValidEnum(allowedValues);

		let meta = {
			name: `beEnumeratedValue`,
			message: `${this.name} must be one of the following: "${allowedValues.join(', ')}".`,
			precondition: null,
			isValidIfEmpty: true,
			severity: Severity.default
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
			isValidIfEmpty: true,
			severity: Severity.default
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
			isValidIfEmpty: true,
			severity: Severity.default
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
			isValidIfEmpty: true,
			severity: Severity.default
		};

		this._qualifiers.set(matchRx, meta);

		return new RuleApi(this, meta);
	}

	public notNull() {
		let meta = {
			name: notNull.name,
			message: `${this.name} cannot be null.`,
			precondition: null,
			isValidIfEmpty: false,
			severity: Severity.default
		};

		this._qualifiers.set(notNull, meta);

		return new RuleApi(this, meta);
	}

	public notEmpty() {
		let meta = {
			name: notEmpty.name,
			message: `${this.name} cannot be empty.`,
			precondition: null,
			isValidIfEmpty: false,
			severity: Severity.default
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
			isValidIfEmpty: false,
			severity: Severity.default
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
			isValidIfEmpty: false,
			severity: Severity.default
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
			isValidIfEmpty: false,
			severity: Severity.default
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
			isValidIfEmpty: false,
			severity: Severity.default
		};

		this._qualifiers.set(beGreaterThan, meta);

		return new RuleApi(this, meta);
	}

	public must(qualifier: TQualifier) {
		let meta = {
			name: qualifier.name,
			message: `${this.name} is invalid.`,
			precondition: null,
			isValidIfEmpty: false,
			severity: Severity.default
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
		validatable.name = this.name || validatable.name || '';

		let meta = {
			name: validatable.name,
			message: '',
			precondition: null,
			isValidIfEmpty: false,
			severity: Severity.default
		};

		validatable.name = this.name || validatable.name;

		this._validators.set(validatable, meta);
		return this;
	}

	public if(precondition: TPrecondition, define: (rule: Rule) => void): Rule {
		let rule = new Rule(this.name);
		let meta = {
			name: rule.name,
			message: '',
			precondition,
			isValidIfEmpty: false,
			severity: Severity.default
		};

		this._validators.set(rule, meta);
		define(rule);

		return this;
	}

	protected __runQualifiers(propValue: any, parentValue: any, customOptions: any, results: ValidationResultList): ValidationResultList {
		const result = new ValidationResult(this.name, propValue);

		for (let [qualifier, meta] of this._qualifiers) {
			// We check if we should run the validator based on whether the property has a value
			if (isEmpty(propValue) && meta.isValidIfEmpty) {
				continue;
			}

			// We check for a precondition to exist for a qualifier before calling it
			if (!meta.precondition || meta.precondition(parentValue, customOptions)) {
				let isValid = qualifier(propValue, parentValue, customOptions);

				if (!isValid) {
					if (meta.severity === Severity.error) {
						result.errors[meta.name] = meta.message;
					} else {
						result.warnings[meta.name] = meta.message;
					}

					// Short-circuit if we have to stopOnFirstFailure
					if (this._stopOnFirstFailure) {
						break;
					}
				}
			}
		}

		results.push(result);

		return results;
	}

	protected __runValidators(propValue: any, parentValue: any, customOptions: any, results: ValidationResultList): ValidationResultList {
		for (let [validator, meta] of this._validators) {
			if (!meta.precondition || meta.precondition(parentValue, customOptions)) {
				let _resultList: ValidationResultList = validator.validate(propValue, parentValue, customOptions);
				results = results.merge(_resultList);

				if (!results.isValid && this._stopOnFirstFailure) {
					break;
				}
			}
		}

		return results;
	}

	protected __getPropertyResults(value: any, parentValue: any, customOptions: any, results: ValidationResultList): ValidationResultList {
		results = this.__runQualifiers(value, parentValue, customOptions, results);

		if (results.isValid || !this._stopOnFirstFailure) {
			results = this.__runValidators(value, parentValue, customOptions, results);
		}

		return results;
	}

	public validate(value: any, parentValue?: any, customOptions?: any): ValidationResultList {
		value = copy(value);
		parentValue = copy(parentValue);

		let results = new ValidationResultList([], this.name, value);

		return this.__getPropertyResults(value, parentValue, customOptions, results);

	}
}