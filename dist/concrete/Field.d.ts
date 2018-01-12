import { IValidatable } from '../abstract/IValidatable';
import { TErrorCollection } from '../abstract/TErrorCollection';
import { TValidationResult } from '../abstract/TValidationResult';
import { Validator } from './Validator';
import { Rule } from './Rule';
export declare class Field implements IValidatable {
    name: string;
    private _parent;
    private _rule;
    readonly isSerializable: boolean;
    private _currentValue;
    private _originalValue;
    private _previousValue;
    private _isValid;
    private _errors;
    constructor(name: string, _parent: Validator, _rule: Rule, value?: any, isSerializable?: boolean);
    readonly errors: TErrorCollection;
    readonly isValid: boolean;
    readonly value: any;
    readonly parent: any;
    get(): any;
    set(value: any): TValidationResult;
    serialize(): any;
    setValidity(result: TValidationResult): void;
    rollback(): TValidationResult;
    validate(): TValidationResult;
}
