import { IValidatable } from "./abstract/IValidatable";
import { Rule } from "./Rule";
import { TValidationResult } from "./abstract/TValidationResult";
import { TErrorCollection } from "./abstract/TErrorCollection";

export class Field implements IValidatable {
	private _currentValue: any = null;
	private _originalValue: any = null;
	private _previousValue: any = null;

	// happy or sad default?
	private _isValid: boolean = true;
	private _errors: TErrorCollection = {};

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

	public set(value: any): TValidationResult {
		this._previousValue = this._currentValue;
		this._currentValue = value;
		return this.validate();
	}

	public setValidity(result: TValidationResult): void {
		this._errors = result.errors;
		this._isValid = result.isValid;
	}

	public rollback(): TValidationResult {
		this._currentValue = this._originalValue;
		this._previousValue = null;
		return this.validate();
	}

	public validate(): TValidationResult {
		let result = this._rule.validate(this);
		this.setValidity(result);
		return result;
	}
}