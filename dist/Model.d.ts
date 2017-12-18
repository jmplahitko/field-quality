import { Rule } from './Rule';
import { IValidationResult } from './abstract/IValidationResult';
import { IValidatable } from './abstract/IValidatable';
import { TMessageCollection } from './abstract/TMessageCollection';
export declare class Model implements IValidatable {
    private _rule;
    private _isValid;
    private _messages;
    private _fields;
    private _rules;
    readonly value: {
        [key: string]: any;
    };
    readonly isValid: boolean;
    readonly messages: TMessageCollection;
    constructor(entity: {
        [key: string]: any;
    }, _rule?: Rule | undefined);
    protected make(entity: {
        [key: string]: any;
    }): IValidationResult;
    protected define(model: Model): void;
    protected ruleFor(fieldName: string): Rule;
    get(fieldName: string): IValidatable;
    set(value: {
        [key: string]: any;
    }): IValidationResult;
    setValidity(result: IValidationResult): void;
    toObject(): {
        [key: string]: any;
    };
    toJSON(): string;
    validate(): IValidationResult;
}
