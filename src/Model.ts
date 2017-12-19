import { Field } from './Field';
import { Rule } from './Rule';
import { IValidationResult } from './abstract/IValidationResult';
import { TQualifier } from './abstract/TQualifier';
import { IValidatable } from './abstract/IValidatable';
import { TMessageCollection } from './abstract/TMessageCollection' ;
import { ValidationResult } from './ValidationResult';
import { TFieldCollection } from './abstract/TFieldCollection';
import { TRuleCollection } from './abstract/TRuleCollection';

export class Model implements IValidatable {
	public name: string;
	private _isValid: boolean = true;
	private _messages: TMessageCollection = {};

	private _fields: TFieldCollection = {};
	private _rules: TRuleCollection = {};

	get value(): { [key: string]: any } {
		return this.toObject();
	}

	get isValid(): boolean {
		return this._isValid;
	}

	get messages(): TMessageCollection {
		return this._messages;
	}

	constructor(entity: { [key: string]: any } = {}) {
		this.name = this.constructor.name.toLowerCase();
		this.define(this);
		this.make(entity);
	}

	protected make(entity: { [key: string]: any }): IValidationResult {
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

	protected ruleFor(fieldName: string) {
		let rule = new Rule(fieldName);
		this._rules[fieldName] = rule;
		return rule
	}

	public get(fieldName: string): IValidatable {
		let field = this._fields[fieldName];
		return field;
	}

	public set(value: {[key: string]: any}): IValidationResult {
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

	public setValidity(result: IValidationResult): void {
		this._messages = result.isValid ? {} : result.messages;
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

	public validate(): IValidationResult {
		let validity = [];
		let messages: TMessageCollection = {};

		for (let fieldName in this._fields) {
			let _result = this._fields[fieldName].validate();
			validity.push(_result.isValid);
			messages[fieldName] = _result.messages[fieldName];
		}

		let result = new ValidationResult({
			value: this.value,
			isValid: !validity.includes(false),
			messages
		});

		this.setValidity(result);

		return result;
	}
}