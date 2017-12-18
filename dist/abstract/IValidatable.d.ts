import { IValidationResult } from "./IValidationResult";
export interface IValidatable {
    isValid: boolean;
    messages: {
        [key: string]: Array<string>;
    };
    value: any;
    set(value: any): any;
    setValidity(result: IValidationResult): void;
    validate(): IValidationResult;
}
