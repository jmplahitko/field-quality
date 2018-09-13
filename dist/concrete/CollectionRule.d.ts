import { IValidatable } from '../abstract/IValidatable';
import { TValidationResult } from '../abstract/TValidationResult';
import { Rule } from './Rule';
import { ValidationResult } from './ValidationResult';
import { TCollectionFilter } from '../abstract/TCollectionFilter';
import { TSubsetRuleCollection } from '../abstract/TSubsetRuleCollection';
export declare class CollectionRule extends Rule {
    protected _subsetRules: TSubsetRuleCollection;
    using(validatable: IValidatable): CollectionRule;
    where(filter: TCollectionFilter, define: (rule: Rule) => void): CollectionRule;
    protected __runSubsetRules(result: TValidationResult, collection: Array<any>, parentValue: any, customOptions: any): TValidationResult;
    validate(value: any, parentValue: any, customOptions?: any): ValidationResult;
}
