import { TValidationResult } from './TValidationResult';
export interface IValidatable {
    name: string;
    validate(value: any, parentValue?: any, customOptions?: any): TValidationResult;
}
