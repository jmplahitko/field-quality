import { TValidationResult } from "./abstract/TValidationResult";
import { IValidatable } from "./abstract/IValidatable";

export class Field implements IValidatable {
	private _currentValue: any = null;
	private _originalValue: any = null;
	private _previousValue: any = null;

	// happy or sad default?
	private _isValid: boolean = true;
	private _messages: { [fieldName: string]: Array<string> } = {};

	constructor(public name: string, value?: any) {
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
	}

	public setValidity(result: TValidationResult): void {
		this._messages = result.isValid ? {} : result.messages;
		this._isValid = result.isValid;
	}

	get messages(): { [fieldName: string]: Array<string> } {
		return this._messages;
	}

	public rollback(): void {
		this._currentValue = this._originalValue;
		this._previousValue = null;
	}
}