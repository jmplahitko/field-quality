import { IValidatable } from '../abstract/IValidatable';
import { TValidationResult } from '../abstract/TValidationResult';
import { TErrorCollection } from '../abstract/TErrorCollection';

import { Rule } from './Rule';
import { Model } from './Model';

export class Field implements IValidatable {
	private _currentValue: any = null;
	private _originalValue: any = null;
	private _previousValue: any = null;

	private _isValid: boolean = true;
	private _errors: TErrorCollection = {};

	constructor(public name: string, private _parent: Model, private _rule: Rule, value?: any, readonly isSerializable: boolean = true) {
		this._currentValue = value || null;
		this._originalValue = value || null;
	}

	get errors(): TErrorCollection {
		return this._errors;
	}

	get isValid(): boolean {
		return this._isValid;
	}

	get value(): any {
		return this._currentValue;
	}

	get parent(): any {
		return this._parent.value;
	}

	public get() {
		return this.value;
	}

	public set(value: any): TValidationResult {
		this._previousValue = this._currentValue;
		this._currentValue = value;
		return this.validate();
	}

	public serialize() {
		return this.isSerializable ? this.value : undefined;
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
