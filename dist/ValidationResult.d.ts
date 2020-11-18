import ValidationResultList from './ValidationResultList';
export default class ValidationResult {
    errors: {
        [predicateName: string]: string;
    };
    warnings: {
        [predicateName: string]: string;
    };
    propertyName: string;
    value: any;
    constructor(propertyName: string, value?: any);
    get isValid(): boolean;
    get errorCount(): number;
    get warningCount(): number;
    merge(result: ValidationResult): ValidationResult;
    toValidationResultList(): ValidationResultList;
    static merge(dest: ValidationResult, src: ValidationResult): ValidationResult;
}
