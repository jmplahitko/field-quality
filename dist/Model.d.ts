import { Rule } from './Rule';
import { IValidatable } from './abstract/IValidatable';
import { TValidationResult } from './abstract/TValidationResult';
export declare class Model implements IValidatable {
    name: string;
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
    protected define(model: Model): void;
    protected ruleFor(fieldName: string): Rule;
    get(fieldName: string): IValidatable;
    set(value: any): TValidationResult;
    setValidity(result: TValidationResult): void;
    toObject(): {
        [key: string]: any;
    };
    toJSON(): string;
    validate(): TValidationResult;
}
