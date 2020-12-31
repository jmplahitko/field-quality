import { TValidationResultMergeOptions } from './types';
import ValidationResult from './ValidationResult';
export default class ValidationResultList {
    protected _entries: ValidationResult[];
    propertyName: string | undefined;
    value: any;
    constructor(args?: ValidationResult[], propertyName?: string, value?: any);
    get isValid(): boolean;
    get length(): number;
    forEach(cb: (value: ValidationResult, index: number, array: ValidationResult[]) => void): void;
    get entries(): ValidationResult[];
    get withErrors(): ValidationResultList;
    get withWarnings(): ValidationResultList;
    clear(): void;
    get(propertyName: string): ValidationResult | void;
    getWithRelatedResults(propertyName: string): ValidationResultList;
    merge(resultList: ValidationResultList): ValidationResultList;
    push(result: ValidationResult): void;
    remove(propertyName: string): ValidationResult | null;
    removeWithRelatedResults(propertyName: string): ValidationResultList;
    toArray(): ValidationResult[];
    toObject(): {
        [propertyName: string]: ValidationResult;
    };
    static merge(dest: ValidationResultList, src: ValidationResultList, options?: TValidationResultMergeOptions): ValidationResultList;
}
