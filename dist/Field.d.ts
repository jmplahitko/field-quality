import { TValidationResult } from "./abstract/TValidationResult";
export declare class Field {
    name: string;
    private _currentValue;
    private _originalValue;
    private _previousValue;
    private _isValid;
    private _messages;
    constructor(name: string, value?: any);
    value: any;
    readonly isValid: boolean;
    setValidity(result: TValidationResult): void;
    readonly messages: Array<string>;
    rollback(): void;
}
