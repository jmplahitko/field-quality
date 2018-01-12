import { Field } from './Field';
import { Rule } from './Rule';
import { IValidatable } from '../abstract/IValidatable';
import { TFieldCollection } from '../abstract/TFieldCollection';
import { TRuleCollection } from '../abstract/TRuleCollection';
import { TValidationResult } from '../abstract/TValidationResult';
import split from '../utils/split';
import { EmptyRule } from './EmptyRule';

export class Model implements IValidatable {
	public name: string;
	readonly isSerializable: boolean = true;
	private _isValid: boolean = true;
	private _errors = {};

	private _fields: TFieldCollection = {};
	private _rules: TRuleCollection = {};

	get value(): { [key: string]: any } {
		return this.toObject();
	}

	get isValid(): boolean {
		return this._isValid;
	}

	get errors() {
		return this._errors;
	}

	constructor(entity: { [key: string]: any } = {}) {
		this.name = this.constructor.name.toLowerCase();
		this.define(this);
		this.make(entity);
	}

	protected make(entity: { [key: string]: any }): TValidationResult {
		for (let prop in entity) {
			if (entity.hasOwnProperty(prop)) {
				const propValue = entity[prop];
				let rule, field;

				// If there's a rule defined for the property, get the rule, and create the field via Model or Field objects
				if (this._rules[prop]) {
					rule = this._rules[prop];

					if (rule.entity) {
						let Entity = rule.entity;
						field = new Entity(propValue);
					} else {
						field = new Field(prop, this, rule, propValue, true);
					}
				} else {
					// No rule found, treat field as valid for sake of validation and ignore when serialized to an object or JSON
					rule = this.ruleFor(prop).using(EmptyRule);
					field = new Field(prop, this, rule, propValue, false);
				}

				this._fields[prop] = field;
			}
		}

		// If a rule is defined, and has no field at this point, seed the field as null
		for (let ruleName in this._rules) {
			if (!(ruleName in this._fields)) {
				this._fields[ruleName] = new Field(ruleName, this, this._rules[ruleName], null);
			}
		}

		return this.validate();
	}

	protected define(model: Model) {
		console.warn('define not implemented');
	}

	protected ruleFor(fieldName: string): Rule {
		if (!this._rules[fieldName]) {
			this._rules[fieldName] = new Rule(fieldName);
		}
		return this._rules[fieldName];
	}

	public get(fieldName: string) {
		let fields = fieldName.split('.');
		let [head, tail] = split(fields, 1);

		let field = this._fields[head[0]];

		if (field && tail.length) {
			return field.get(tail.join('.'));
		}

		return field;
	}

	public set(fieldNameOrValue: any, value?: any): TValidationResult {
		if (typeof fieldNameOrValue === 'string') {
			let fieldName = fieldNameOrValue;
			let field = this.get(fieldNameOrValue);
			if (field) {
				if (field.value !== value) {
					field.set(value);
				}
			} else {
				throw new ReferenceError(`Cannot set value of ${fieldName}, the Field is undefined.`);
			}
		} else {
			value = fieldNameOrValue;
			for (let fieldName in value) {
				if (value.hasOwnProperty(fieldName)) {
					let field = this.get(fieldName);
					if (field) {
						if (field.value !== value) {
							field.set(value[fieldName]);
						}
					} else {
						throw new ReferenceError(`Cannot set value of ${fieldName}, the Field is undefined.`);
					}
				}
			}
		}

		return this.validate();
	}

	public setValidity(result: TValidationResult): void {
		this._errors = result.errors;
		this._isValid = result.isValid;
	}

	public toObject(): Object {
		let target: { [key: string]: any } = {};

		for (let fieldName in this._fields) {
			target[fieldName] = this._fields[fieldName].value;
		}

		return target;
	}

	public serialize(): Object {
		let target: { [key: string]: any } = {};

		for (let fieldName in this._fields) {
			let field = this._fields[fieldName];
			if (field.isSerializable) {
				target[fieldName] = this._fields[fieldName].serialize();
			}
		}

		return target;
	}

	public toJSON(): string {
		return JSON.stringify(this.serialize());
	}

	public validate(): TValidationResult {
		let errors: { [fieldName: string]: TValidationResult } = {};
		let validity = [];

		for (let fieldName in this._fields) {
			let _field = this._fields[fieldName];
			let _result = _field.validate();
			if (!_result.isValid) {
				errors[fieldName] = _result;
			}

			validity.push(_result.isValid);
		}

		let result = {
			value: this.value,
			isValid: !validity.includes(false),
			errors
		};

		this.setValidity(result);

		return result;
	}
}
