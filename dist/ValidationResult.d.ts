import { IValidatable } from "./abstract/IValidatable";
import { TMessageCollection } from "./abstract/TMessageCollection";
import { IValidationResult } from "./abstract/IValidationResult";
/**
 * This is basically a class that creates a paired-down version of an IValidatable
 */
export declare class ValidationResult implements IValidationResult {
    isValid: boolean;
    messages: TMessageCollection;
    value: any;
    constructor(validatable: IValidatable | IValidationResult);
}
