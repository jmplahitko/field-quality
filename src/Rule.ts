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
import { qualifiers } from './qualifiers';
import { Field } from './Field';
const { notEmpty, notNull } = qualifiers;

export class Rule {
	private _qualifiers: TQualifierCollection = new Map();
	private _rules: TRuleCollection = {};
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

	public notNull(): ISimpleFluentInterface {
		let rule = this;
		this._qualifiers.set(notNull, {
			name: notNull.name,
			message: `${this.name} cannot be null.`,
			precondition: null
		});

		return simpleFluentInterfaceFor(this, notNull);
	}

	public notEmpty(): ISimpleFluentInterface {
		let rule = this;
		this._qualifiers.set(notEmpty, {
			name: notEmpty.name,
			message: `${this.name} cannot be empty.`,
			precondition: null
		});

		return simpleFluentInterfaceFor(this, notEmpty);
	}

	public must(qualifier: TQualifier): ISimpleFluentInterface {
		let rule = this;
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
		this._rules[rule.name] = rule;
		return this;
	}

	public validate(field: Field): TValidationResult {
		let errors: TErrorCollection = {};
		let validity = [];

		for (let [qualifier, meta] of this._qualifiers) {
			if (!meta.precondition || meta.precondition(field.parent)) {
				let isValid = qualifier(field.value);
				if (!isValid) {
					validity.push(isValid);
					errors[meta.name] = meta.message;

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

		for (let ruleName in this._rules) {
			let rule = this._rules[ruleName];
			let _result = rule.validate(field);
			if (!_result.isValid) {
				for (let ruleNeme in _result.errors) {
					errors[ruleName] = _result.errors[ruleName];
				}
			}

			validity.push(_result.isValid);
		}

		return {
			value: field.value,
			isValid: !validity.includes(false),
			errors
		};
	}
}
