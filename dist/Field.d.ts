import { IValidationResult } from "./abstract/IValidationResult";
import { IValidatable } from "./abstract/IValidatable";
import { Rule } from "./Rule";
import { TMessageCollection } from "./abstract/TMessageCollection";
export declare class Field implements IValidatable {
    name: string;
    private _rule;
    private _currentValue;
    private _originalValue;
    private _previousValue;
    private _isValid;
    private _messages;
    constructor(name: string, _rule: Rule, value?: any);
    readonly value: any;
    readonly isValid: boolean;
    set(value: any): IValidationResult;
    setValidity(result: IValidationResult): void;
    readonly messages: TMessageCollection;
    rollback(): void;
    validate(): IValidationResult;
}
