import ValidationResultList from './ValidationResultList';
export default class ValidationResult {
    errors: {
        [qualifierName: string]: string;
    };
    warnings: {
        [qualifierName: string]: string;
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
