import { ICollectionFluentInterface } from '../abstract/ICollectionFluentInterface';
import { ISimpleFluentInterface } from '../abstract/ISimpleFluentInterface';
import { IValidatable } from '../abstract/IValidatable';
import { TQualifier } from '../abstract/TQualifier';
import { TQualifierCollection } from '../abstract/TQualifierCollection';
import { TValidationResult } from '../abstract/TValidationResult';
import { TValidatorCollection } from '../abstract/TValidatorCollection';

import { ValidationResult } from './ValidationResult';

import copy from '../utils/copy';
import { simpleFluentInterfaceFor } from '../utils/simpleFluentIntefaceFor';
import { qualifiers } from '../utils/qualifiers';
import { quality } from '../utils/quality';

const { length, match, notEmpty, notNull } = qualifiers;
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

	public length(min: number, max: number): ISimpleFluentInterface {
		let beBetween = length(min, max);
		this._qualifiers.set(beBetween, {
			name: `beBetween${min}and${max}`,
			message: `${this.name} must be between ${min} and ${max}`,
			precondition: null
		});

		return simpleFluentInterfaceFor(this, beBetween);
	}

	public matches(rx: RegExp): ISimpleFluentInterface {
		let matches = match(rx);
		let matchRx = (val: any) => isNull(val) || matches(val);
		this._qualifiers.set(matchRx, {
			name: matchRx.name,
			message: `${this.name} is an invalid format.`,
			precondition: null
		});

		return simpleFluentInterfaceFor(this, matchRx);
	}

	public notNull(): ISimpleFluentInterface {
		this._qualifiers.set(notNull, {
			name: notNull.name,
			message: `${this.name} cannot be null.`,
			precondition: null
		});

		return simpleFluentInterfaceFor(this, notNull);
	}

	public notEmpty(): ISimpleFluentInterface {
		this._qualifiers.set(notEmpty, {
			name: notEmpty.name,
			message: `${this.name} cannot be empty.`,
			precondition: null
		});

		return simpleFluentInterfaceFor(this, notEmpty);
	}

	public must(qualifier: TQualifier): ISimpleFluentInterface {
		this._qualifiers.set(qualifier, {
			name: qualifier.name,
			message: `${this.name} is invalid.`,
			precondition: null
		});

		return simpleFluentInterfaceFor(this, qualifier);
	}

	public stopOnFirstFailure(): void {
		this._stopOnFirstFailure = true;
		console.warn(`FieldQuality Deprecation Warning: As of version 1.4.0, rules default stopOnFirstFailure to true. You can safely remove your call to .stopOnFirstFailure() on ${this.name}, or use the .cascade() method to change stopOnFirstFailure to false.`)
	}

	public cascade(): void {
		this._stopOnFirstFailure = false;
	}

	public using(validatable: IValidatable): Rule | ICollectionFluentInterface {
		let rule = this;
		this._validators.set(validatable, { name: validatable.name, precondition: null });
		return this;
	}

	public if(precondition: (parentValue: any) => boolean, define: (rule: Rule) => void): Rule {
		let rule = new Rule(this.name);
		this._validators.set(rule, { name: rule.name, precondition });
		define(rule);
		return this;
	}

	// TODO: This method is pretty gross. This is just a sketch of the appropriate algorithm, just needs refactored.
	protected getValidationResult(propValue: any, parentValue: any, customOptions: any): ValidationResult {
		let result: TValidationResult = {
			errors: {},
			get isValid() { return isEmpty(this.errors) },
			value: propValue
		}

		// Check qualifiers first
		for (let [qualifier, meta] of this._qualifiers) {
			// We check for a precondition to exist for a qualifier before calling it
			if (!meta.precondition || meta.precondition(parentValue, customOptions)) {
				let isValid = qualifier(propValue, parentValue, customOptions);

				if (!isValid) {
					result.errors[meta.name] = meta.message;

					// Short-circuit if we have to stopOnFirstFailure
					if (this._stopOnFirstFailure) {
						return new ValidationResult(result);
					}
				}
			}
		}

		for (let [validator, meta] of this._validators) {
			if (!meta.precondition || meta.precondition(parentValue, customOptions)) {
				let _result = validator.validate(propValue, parentValue, customOptions);
				if (!_result.isValid) {
					for (let ruleName in _result.errors) {
						result.errors[ruleName] = _result.errors[ruleName];
					}

					// TODO: We have some duplication here. Need to find a better solution.
					if (this._stopOnFirstFailure) {
						return new ValidationResult(result);
					}
				}
			}
		}

		return new ValidationResult(result);
	}

	public validate(value: any, parentValue: any, customOptions?: any): TValidationResult {
		value = copy(value);
		parentValue = copy(parentValue);

		return this.getValidationResult(value, parentValue, customOptions);
	}
}