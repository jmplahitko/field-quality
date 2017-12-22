import { IValidatable } from './abstract/IValidatable';
import { TValidationResult } from './abstract/TValidationResult';
import { TErrorCollection } from './abstract/TErrorCollection';
import { Rule } from './Rule';
import { Model } from './Model';
export declare class Field implements IValidatable {
    name: string;
    private _parent;
    private _rule;
    private _currentValue;
    private _originalValue;
    private _previousValue;
    private _isValid;
    private _errors;
    constructor(name: string, _parent: Model, _rule: Rule, value?: any);
    readonly errors: TErrorCollection;
    readonly isValid: boolean;
    readonly value: any;
    readonly parent: any;
    get(): any;
    set(value: any): TValidationResult;
    setValidity(result: TValidationResult): void;
    rollback(): TValidationResult;
    validate(): TValidationResult;
}
