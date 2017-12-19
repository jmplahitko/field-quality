import { IValidatable } from "./abstract/IValidatable";
import { IValidationResult } from "./abstract/IValidationResult";
import { TFieldErrorCollection } from "./abstract/TFieldErrorCollection";
import { TModelErrorCollection } from "./abstract/TModelErrorCollection";
/**
 * This is basically a class that creates a paired-down version of an IValidatable
 */
export declare class ValidationResult implements IValidationResult {
    isValid: boolean;
    errors: TFieldErrorCollection | TModelErrorCollection;
    value: any;
    constructor(validatable: IValidatable | IValidationResult);
}
