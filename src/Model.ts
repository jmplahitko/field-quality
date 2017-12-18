import { Field } from './Field';
import { Rule } from './Rule';
import { TValidationResult } from './abstract/TValidationResult';
import { TQualifier } from './abstract/TQualifier';
import { IValidatable } from './abstract/IValidatable';

export class Model implements IValidatable {
	private _isValid: boolean = true;
	private _messages: { [fieldName: string]: Array<string> } = {};

	private _fields: { [fieldName: string]: IValidatable } = {};
	private _rules: { [ruleName: string]: Rule } = {};

	get value(): { [key: string]: any } {
		return this.toObject();
	}

	get isValid(): boolean {
		return this._isValid;
	}

	get messages(): { [fieldName: string]: Array<string> } {
		return this._messages;
	}

	constructor(entity: { [key: string]: any }) {
		this.define(this);
		if (entity) {
			this.make(entity);
		}
	}

	protected make(entity: { [key: string]: any }): Model {
		let validationResult: TValidationResult = {
			value: null,
			isValid: true,
			messages: {}
		};

		for (let prop in entity) {
			if (entity.hasOwnProperty(prop)) {
				const propValue = entity[prop];
				const rule = this._rules[prop] || this.ruleFor(prop).using(new Rule(prop));
				let result;

				if (rule.entity) {
					let Entity = rule.entity;
					let model = new Entity(propValue);
					this._fields[prop] = model;
					result = rule.validate(model);
				} else {
					let field = new Field(prop, propValue);
					this._fields[prop] = field;
					result = rule.validate(field);
					// this.set({[prop]: propValue});
				}

				validationResult.messages[prop] = result.messages[prop];
			}
		}

		validationResult.value = this.value;
		// TODO: Clean this garbage up
		let isValid = true;
		for (let fieldName in this._fields) {
			if (!this._fields[fieldName].isValid) {
				validationResult.isValid = false;
				break;
			}
		}

		this.setValidity(validationResult);

		return this;
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

	public set(value: {[key: string]: any}) {
		for (let fieldName in value) {
			if (value.hasOwnProperty(fieldName)) {
				let field = this._fields[fieldName];
				let rule = this._rules[fieldName];

				if (field.value !== value) {
					field.set(value[fieldName]);
				}
				let result = rule.validate(field);

				this._messages[fieldName] = result.messages[fieldName];
				// TODO: Clean this garbage up
				let isValid = true;
				for (let fieldName in this._fields) {
					if (!this._fields[fieldName].isValid) {
						isValid = false;
						break;
					}
				}

				this._isValid = isValid;
			}
		}
	}

	public setValidity(result: TValidationResult): void {
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
}