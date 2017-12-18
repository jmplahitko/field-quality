import { Field } from './Field';
import { Rule } from './Rule';
import { IValidationResult } from './abstract/IValidationResult';
import { TQualifier } from './abstract/TQualifier';
import { IValidatable } from './abstract/IValidatable';
import { TMessages } from './abstract/TMessages' ;
import { ValidationResult } from './ValidationResult';

export class Model implements IValidatable {
	private _isValid: boolean = true;
	private _messages: TMessages = {};

	private _fields: { [fieldName: string]: IValidatable } = {};
	private _rules: { [ruleName: string]: Rule } = {};

	get value(): { [key: string]: any } {
		return this.toObject();
	}

	get isValid(): boolean {
		return this._isValid;
	}

	get messages(): TMessages {
		return this._messages;
	}

	constructor(entity: { [key: string]: any }, private _rule?: Rule) {
		this.define(this);
		if (entity) {
			this.make(entity);
		}
	}

	protected make(entity: { [key: string]: any }): IValidationResult {
		for (let prop in entity) {
			if (entity.hasOwnProperty(prop)) {
				const propValue = entity[prop];
				const rule = this._rules[prop] || this.ruleFor(prop).using(new Rule(prop));

				let field;

				if (rule.entity) {
					let Entity = rule.entity;
					field = new Entity(propValue, rule);
				} else {
					field = new Field(prop, rule, propValue);
				}

				this._fields[prop] = field;
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
		if (this._rule) {
			return this._rule.validate(this);
		} else {
			let validity = [];
			let messages: TMessages = {};
			for (let fieldName in this._fields) {
				let result = this._fields[fieldName].validate();
				validity.push(result.isValid);
				messages[fieldName] = result.messages[fieldName];
			}

			this._messages = messages;
			this._isValid = !validity.includes(false);
			let result = new ValidationResult(this);
			this.setValidity(result);

			return result;
		}
	}
}