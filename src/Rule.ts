import { IValidatable } from './abstract/IValidatable';
import { ISimpleFluentInterface } from './abstract/ISimpleFluentInterface';
import { TQualifier } from './abstract/TQualifier';
import { TQualifierMeta } from './abstract/TQualifierMeta';
import { TModelConstructor } from './abstract/TModelConstructor';
import { TRuleCollection } from './abstract/TRuleCollection';
import { TValidationResult } from './abstract/TValidationResult';
import { TErrorCollection } from './abstract/TErrorCollection';
import { TQualifierCollection } from './abstract/TQualifierCollection';

import { simpleFluentInterfaceFor } from './utils/simpleFluentIntefaceFor';
import { qualifiers } from './utils/qualifiers';
import { Field } from './Field';
import { Readable } from 'stream';
const { length, match, notEmpty, notNull } = qualifiers;

export class Rule {
	private _qualifiers: TQualifierCollection = new Map();
	private _rules: Map<Rule, {name: String, precondition: ((entity: any) => boolean)|null}> = new Map();
	private _entity: TModelConstructor | null = null;
	private _stopOnFirstFailure: boolean = false;

	get entity(): TModelConstructor | null {
		return this._entity;
	}

	get qualifiers(): TQualifierCollection {
		return this._qualifiers;
	}

	constructor(public name: string) {}

	public as(entity: TModelConstructor) {
		this._entity = entity;
	}

	public asArrayOf() {}

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

	public using(rule: Rule): Rule {
		this._rules.set(rule, { name: rule.name, precondition: null });
		return this;
	}

	public if(precondition: (entity: any) => boolean, define: (rule: Rule) => void) {
		let rule = new Rule(this.name);
		this._rules.set(rule, { name: rule.name, precondition });
		define(rule);
		return this;
	}

	// TODO: This method is pretty gross. This is just a sketch of the appropriate algorithm, just needs refactored.
	public validate(field: Field): TValidationResult {
		let errors: TErrorCollection = {};
		let validity = [];

		// Check qualifiers first
		for (let [qualifier, meta] of this._qualifiers) {
			// We check for a precondition to exist for a qualifier before calling it
			if (!meta.precondition || meta.precondition(field.parent)) {
				let isValid = qualifier(field.value);

				if (!isValid) {
					validity.push(isValid);
					errors[meta.name] = meta.message;

					// Short-circuit if we have to stopOnFirstFailure
					if (this._stopOnFirstFailure) {
						return {
							value: field.value,
							isValid: false,
							errors
						}
					}
				} else {
					validity.push(isValid);
				}
			}
		}

		for (let [rule, meta] of this._rules) {
			if (!meta.precondition || meta.precondition(field.parent)) {
				let _result = rule.validate(field);
				if (!_result.isValid) {
					for (let ruleName in _result.errors) {
						errors[ruleName] = _result.errors[ruleName];
						validity.push(_result.isValid);
					}

					// TODO: We have some duplication here. Need to find a better solution.
					if (this._stopOnFirstFailure) {
						return {
							value: field.value,
							isValid: false,
							errors
						}
					}
				} else {
					validity.push(_result.isValid);
				}
			}
		}

		return {
			value: field.value,
			isValid: !validity.includes(false),
			errors
		};
	}
}
