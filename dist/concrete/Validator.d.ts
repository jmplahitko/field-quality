import { IValidatable } from '../abstract/IValidatable';
import { TValidationResult } from '../abstract/TValidationResult';
import { Rule } from './Rule';
export declare class Validator implements IValidatable {
    name: string;
    readonly isSerializable: boolean;
    private _isValid;
    private _errors;
    private _fields;
    private _rules;
    readonly value: {
        [key: string]: any;
    };
    readonly isValid: boolean;
    readonly errors: {};
    constructor(entity?: {
        [key: string]: any;
    });
    protected make(entity: {
        [key: string]: any;
    }): TValidationResult;
    protected define(validator: Validator): void;
    protected ruleFor(fieldName: string): Rule;
    get(fieldName: string): any;
    set(fieldNameOrValue: any, value?: any): TValidationResult;
    setValidity(result: TValidationResult): void;
    toObject(): Object;
    serialize(): Object;
    toJSON(): string;
    validate(): TValidationResult;
}
