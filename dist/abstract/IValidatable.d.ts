import { TValidationResult } from "./TValidationResult";
export interface IValidatable {
    isValid: boolean;
    messages: {
        [key: string]: Array<string>;
    };
    value: any;
    set(value: any): any;
    setValidity(result: TValidationResult): void;
}
