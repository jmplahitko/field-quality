import { Field } from './Field';
import { Rule } from './Rule';
export declare class Model {
    private _isValid;
    private _fields;
    private _messages;
    private _rules;
    readonly isValid: boolean;
    readonly messages: {
        [fieldName: string]: Array<string>;
    };
    constructor(entity: {
        [key: string]: any;
    });
    protected define(model: Model): void;
    protected ruleFor(fieldName: string): Rule;
    get(fieldName: string): Field;
    set(fieldName: string, value: any): Field;
    toObject(): void;
    toJSON(): string;
}
