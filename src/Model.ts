import { Field } from './Field';
import { Rule } from './Rule';
import { TQualifier } from './abstract/TQualifier';
import { IValidatable } from './abstract/IValidatable';
import { TFieldCollection } from './abstract/TFieldCollection';
import { TRuleCollection } from './abstract/TRuleCollection';
import { TValidationResult } from './abstract/TValidationResult';

export class Model implements IValidatable {
	public name: string;
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
				const rule = this._rules[prop] || this.ruleFor(prop).using(new Rule(prop));

				let field;

				if (rule.entity) {
					let Entity = rule.entity;
					field = new Entity(propValue);
				} else {
					field = new Field(prop, rule, propValue);
				}

				this._fields[prop] = field;
			}
		}

		// If a rule is defined, and has no field at this point, seed the field as null
		for (let ruleName in this._rules) {
			if (!(ruleName in this._fields)) {
				this._fields[ruleName] = new Field(ruleName, this._rules[ruleName], null);
			}
		}

		return this.validate();
	}

	protected define(model: Model) {
		console.warn('define not implemented');
	}

	protected ruleFor(fieldName: string): Rule {
		let rule = new Rule(fieldName);
		this._rules[fieldName] = rule;
		return rule
	}

	public get(fieldName: string) {
		let field = this._fields[fieldName];
		return field;
	}

	public set(value: any): TValidationResult {
		for (let fieldName in value) {
			if (value.hasOwnProperty(fieldName)) {
				let field = this._fields[fieldName];

				if (field.value !== value) {
					field.set(value[fieldName]);
				}
			}
		}

		return this.validate();
	}

	public setValidity(result: TValidationResult): void {
		this._errors = result.errors;
		this._isValid = result.isValid;
	}

	public toObject() {
		let target: {[key:string]: any} = {};

		for (let fieldName in this._fields) {
			target[fieldName] = this._fields[fieldName].value;
		}

		return target;
	}

	public toJSON(): string {
		return JSON.stringify(this.toObject());
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