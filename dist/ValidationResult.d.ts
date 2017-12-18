import { IValidatable } from "./abstract/IValidatable";
import { TMessages } from "./abstract/TMessages";
import { IValidationResult } from "./abstract/IValidationResult";
/**
 * This is basically a class that creates a paired-down version of an IValidatable
 */
export declare class ValidationResult implements IValidationResult {
    isValid: boolean;
    messages: TMessages;
    value: any;
    constructor(validatable: IValidatable);
}
