import { IValidatable } from "./abstract/IValidatable";
import { Rule } from "./Rule";
import { TValidationResult } from "./abstract/TValidationResult";
import { TErrorCollection } from "./abstract/TErrorCollection";
export declare class Field implements IValidatable {
    name: string;
    private _rule;
    private _currentValue;
    private _originalValue;
    private _previousValue;
    private _isValid;
    private _errors;
    constructor(name: string, _rule: Rule, value?: any);
    readonly value: any;
    readonly isValid: boolean;
    set(value: any): TValidationResult;
    setValidity(result: TValidationResult): void;
    rollback(): TValidationResult;
    validate(): TValidationResult;
}
