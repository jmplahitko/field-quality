import { ICollectionFluentInterface } from '../abstract/ICollectionFluentInterface';
import { IValidatable } from '../abstract/IValidatable';
import { Rule } from './Rule';
import { ValidationResult } from './ValidationResult';
export declare class CollectionRule extends Rule {
    using(validatable: IValidatable): ICollectionFluentInterface;
    validate(value: any, parentValue: any, customOptions?: any): ValidationResult;
}
