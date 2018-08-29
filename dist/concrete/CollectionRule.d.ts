import { ICollectionFluentInterface } from '../abstract/ICollectionFluentInterface';
import { IValidatable } from '../abstract/IValidatable';
import { TValidationResult } from '../abstract/TValidationResult';
import { Rule } from './Rule';
import { ValidationResult } from './ValidationResult';
export declare class CollectionRule extends Rule {
    using(validatable: IValidatable): ICollectionFluentInterface;
    validate(value: any, parentValue: any, customOptions?: any): ValidationResult;
    protected runValidators(result: TValidationResult, propValue: any, parentValue: any, customOptions: any): ValidationResult;
}
