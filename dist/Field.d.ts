import { IValidatable } from './abstract/IValidatable';
import { TValidationResult } from './abstract/TValidationResult';
import { TErrorCollection } from './abstract/TErrorCollection';
import { Rule } from './Rule';
export declare class Field implements IValidatable {
    name: string;
    private _rule;
    private _currentValue;
    private _originalValue;
    private _previousValue;
    private _isValid;
    private _errors;
    constructor(name: string, _rule: Rule, value?: any);
    readonly errors: TErrorCollection;
    readonly isValid: boolean;
    readonly value: any;
    get(): any;
    set(value: any): TValidationResult;
    setValidity(result: TValidationResult): void;
    rollback(): TValidationResult;
    validate(): TValidationResult;
}
