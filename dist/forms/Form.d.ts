import Validator from '../Validator';
import ValidationResultList from '../ValidationResultList';
import ValidationResult from '../ValidationResult';
import { FormOptions, InitialFormData } from './types';
export default class Form<T> {
    private _properties;
    private _propertyDebounces;
    private _forms;
    private _emitter;
    private _name;
    customValidationOptions?: any;
    data: T;
    debounce: number;
    validationResults: ValidationResultList;
    validator: Validator<T>;
    constructor(data: InitialFormData<T>, validator?: Validator<T>, customValidationOptions?: any, options?: FormOptions);
    get name(): string;
    set name(name: string);
    get errors(): {
        [propertyName: string]: ValidationResult;
    };
    get isValid(): boolean;
    get isDirty(): boolean;
    get warnings(): {
        [propertyName: string]: ValidationResult;
    };
    onValidated(listener: (validationResults: ValidationResultList) => void): () => void;
    reset(pristine?: boolean): void;
    setValidationResults(validationResults: ValidationResult[]): ValidationResultList;
    validate(): ValidationResultList;
    private _mergeValidationResults;
}
