import { Field } from './Field';
import { Rule } from './Rule';
import { TValidationResult } from './abstract/TValidationResult';

export class Model {
	private _isValid: boolean = true;
	private _fields: { [fieldName: string]: Field } = {};
	private _messages: { [fieldName: string]: Array<string> } = {};
	private _rules: { [ruleName: string]: Rule } = {};

	get isValid(): boolean {
		return this._isValid;
	}

	get messages(): { [fieldName: string]: Array<string> } {
		return this._messages;
	}

	constructor(entity: { [key: string]: any }) {
		this.define(this);

		for (let prop in entity) {
			if (entity.hasOwnProperty(prop)) {
				const field = new Field(prop);
				const propValue = entity[prop];

				this._fields[prop] = field;

				if (!this._rules[prop]) {
					this._rules[prop] = this.ruleFor(prop);
				}

				this.set(prop, propValue);
			}
		}
	}

	protected define(model: Model) {
		console.warn('define not implemented');
	}

	protected ruleFor(fieldName: string): Rule {
		let rule = new Rule(fieldName);
		this._rules[fieldName] = rule;
		return rule
	}

	public get(fieldName: string): Field {
		let field = this._fields[fieldName];
		return field;
	}

	public set(fieldName: string, value: any): Field {
		let field = this._fields[fieldName];
		let rule = this._rules[fieldName];

		field.value = value;

		let result = rule.validate(field);

		this._messages[fieldName] = result.messages[fieldName];
		if (!result.isValid) {
			this._isValid = false;
		}

		return field;
	}

	public toObject() {

	}

	public toJSON(): string {
		return '';
	}

	// validate() {
	// 	let result: TValidationResult = {
	// 		isValid: true,
	// 		messages: {}
	// 	};

	// 	for (let fieldName in this._fields) {
	// 		let field = this.get(fieldName);

	// 		// TODO: Needs to be in a method - also happens in this.set()
	// 		result.messages[fieldName] = field.messages;
	// 		if (!field.isValid) {
	// 			result.isValid = false;
	// 		}
	// 	}

	// 	this._isValid = result.isValid;
	// 	this._messages = result.messages;

	// 	return result;
	// }
}