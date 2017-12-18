import { TValidationResult } from "./abstract/TValidationResult";

export class Field {
	private _currentValue: any = null;
	private _originalValue: any = null;
	private _previousValue: any = null;

	// happy or sad default?
	private _isValid: boolean = true;
	private _messages: Array<string> = [];

	constructor(public name: string, value?: any) {
		this._currentValue = value || null;
		this._originalValue = value || null;
	}

	get value() {
		return this._currentValue;
	}

	set value(val) {
		this._previousValue = this._currentValue;
		this._currentValue = val;
	}

	get isValid(): boolean {
		return this._isValid;
	}

	public setValidity(result: TValidationResult): void {
		this._messages = result.isValid ? [] : result.messages[this.name];
		this._isValid = result.isValid;
	}

	get messages(): Array<string> {
		return this._messages;
	}

	public rollback(): void {
		this._currentValue = this._originalValue;
		this._previousValue = null;
	}
}