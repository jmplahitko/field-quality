import { TValidationResult } from "./abstract/TValidationResult";
import { IValidatable } from "./abstract/IValidatable";
export declare class Field implements IValidatable {
    name: string;
    private _currentValue;
    private _originalValue;
    private _previousValue;
    private _isValid;
    private _messages;
    constructor(name: string, value?: any);
    readonly value: any;
    readonly isValid: boolean;
    set(value: any): void;
    setValidity(result: TValidationResult): void;
    readonly messages: {
        [fieldName: string]: Array<string>;
    };
    rollback(): void;
}
