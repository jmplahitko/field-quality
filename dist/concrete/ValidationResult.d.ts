import { TValidationResult } from '../abstract/TValidationResult';
export declare class ValidationResult {
    readonly errors: {
        [name: string]: any;
    };
    readonly isValid: boolean;
    readonly value: any;
    constructor(validationResult: TValidationResult);
    flatten(): {
        [key: string]: any;
    };
}
