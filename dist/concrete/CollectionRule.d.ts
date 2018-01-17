import { ICollectionFluentInterface } from '../abstract/ICollectionFluentInterface';
import { IValidatable } from '../abstract/IValidatable';
import { TValidationResult } from '../abstract/TValidationResult';
import { Rule } from './Rule';
export declare class CollectionRule extends Rule {
    constructor(name?: string);
    using(validatable: IValidatable): ICollectionFluentInterface;
    validate(parentValue: any, prop?: string): TValidationResult;
}
