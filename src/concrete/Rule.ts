import { ISimpleFluentInterface } from '../abstract/ISimpleFluentInterface';
import { IValidatable } from '../abstract/IValidatable';
import { TQualifier } from '../abstract/TQualifier';
import { TQualifierCollection } from '../abstract/TQualifierCollection';
import { TValidationResult } from '../abstract/TValidationResult';

import { simpleFluentInterfaceFor } from '../utils/simpleFluentIntefaceFor';
import { qualifiers } from '../utils/qualifiers';
import { quality } from '../utils/quality';
import { Validator } from './Validator';
import { isArray } from 'util';
import { ICollectionFluentInterface } from '../abstract/ICollectionFluentInterface';
import { TValidatorCollection } from '../abstract/TValidatorCollection';
const { length, match, notEmpty, notNull } = qualifiers;
const { isEmpty } = quality;

export class Rule implements IValidatable {
	public name: string;
	protected _qualifiers: TQualifierCollection = new Map();
	protected _validators: TValidatorCollection = new Map();
	protected _stopOnFirstFailure: boolean = false;

	get qualifiers(): TQualifierCollection {
		return this._qualifiers;
	}

	get validators(): TValidatorCollection {
		return this._validators;
	}

	constructor(name?: string) {
		this.name = name || this.constructor.name.toLowerCase();
		this.define(this);
	}

	protected define(rule: Rule): void {}

	public length(num1: number, num2: number): ISimpleFluentInterface {
		let beBetween = length(num1, num2);
		this._qualifiers.set(beBetween, {
			name: `beBetween${num1}and${num2}`,
			message: `${this.name} must be between ${num1} and ${num2}`,
			precondition: null
		});

		return simpleFluentInterfaceFor(this, beBetween);
	}

	public matches(rx: RegExp): ISimpleFluentInterface {
		let matchRx = match(rx);
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
	}

	public using(validatable: IValidatable): Rule | ICollectionFluentInterface {
		let rule = this;
		this._validators.set(validatable, { name: validatable.name, precondition: null });
		return this;
	}

	public if(precondition: (validator: any) => boolean, define: (rule: Rule) => void) {
		let rule = new Rule(this.name);
		this._validators.set(rule, { name: rule.name, precondition });
		define(rule);
		return this;
	}

	// TODO: This method is pretty gross. This is just a sketch of the appropriate algorithm, just needs refactored.
	protected getValidationResult(propValue: any, parentValue: any): TValidationResult {
		let result: TValidationResult = {
			errors: {},
			get isValid() { return isEmpty(this.errors) },
			value: propValue
		}

		// Check qualifiers first
		for (let [qualifier, meta] of this._qualifiers) {
			// We check for a precondition to exist for a qualifier before calling it
			if (!meta.precondition || meta.precondition(parentValue)) {
				let isValid = qualifier(propValue);

				if (!isValid) {
					result.errors[meta.name] = meta.message;

					// Short-circuit if we have to stopOnFirstFailure
					if (this._stopOnFirstFailure) {
						return result;
					}
				}
			}
		}

		for (let [validator, meta] of this._validators) {
			if (!meta.precondition || meta.precondition(parentValue)) {
				let _result = validator.validate(propValue);
				if (!_result.isValid) {
					for (let ruleName in _result.errors) {
						result.errors[ruleName] = _result.errors[ruleName];
					}

					// TODO: We have some duplication here. Need to find a better solution.
					if (this._stopOnFirstFailure) {
						return result;
					}
				}
			}
		}

		return result;
	}

	public validate(parentValue: any, prop?: string): TValidationResult {
		const propValue = prop ? parentValue[prop] || null : parentValue;

		return this.getValidationResult(propValue, parentValue);
	}
}
