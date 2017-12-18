import { Rule } from './Rule';
import { TValidationResult } from './abstract/TValidationResult';
import { IValidatable } from './abstract/IValidatable';
export declare class Model implements IValidatable {
    private _isValid;
    private _messages;
    private _fields;
    private _rules;
    readonly value: {
        [key: string]: any;
    };
    readonly isValid: boolean;
    readonly messages: {
        [fieldName: string]: Array<string>;
    };
    constructor(entity: {
        [key: string]: any;
    });
    protected make(entity: {
        [key: string]: any;
    }): Model;
    protected define(model: Model): void;
    protected ruleFor(fieldName: string): Rule;
    get(fieldName: string): IValidatable;
    set(value: {
        [key: string]: any;
    }): void;
    setValidity(result: TValidationResult): void;
    toObject(): {
        [key: string]: any;
    };
    toJSON(): string;
    validate(): IValidationResult;
}
