import { IValidationResult } from "./abstract/IValidationResult";
import { IValidatable } from "./abstract/IValidatable";
import { Rule } from "./Rule";
import { TMessageCollection } from "./abstract/TMessageCollection";

export class Field implements IValidatable {
	private _currentValue: any = null;
	private _originalValue: any = null;
	private _previousValue: any = null;

	// happy or sad default?
	private _isValid: boolean = true;
	private _messages: TMessageCollection = {};

	constructor(public name: string, private _rule: Rule, value?: any) {
		this._currentValue = value || null;
		this._originalValue = value || null;
	}

	get value() {
		return this._currentValue;
	}

	get isValid(): boolean {
		return this._isValid;
	}

	public set(value: any) {
		this._previousValue = this._currentValue;
		this._currentValue = value;
		return this.validate();
	}

	public setValidity(result: IValidationResult): void {
		this._messages = result.isValid ? {} : result.messages;
		this._isValid = result.isValid;
	}

	get messages(): TMessageCollection {
		return this._messages;
	}

	public rollback(): void {
		this._currentValue = this._originalValue;
		this._previousValue = null;
	}

	public validate(): IValidationResult {
		let result = this._rule.validate(this);
		this.setValidity(result);
		return result;
	}
}