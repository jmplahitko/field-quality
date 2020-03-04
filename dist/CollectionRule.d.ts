import Rule from './Rule';
import ValidationResultList from './ValidationResultList';
import { IValidatable, TCollectionFilter, TSubsetRuleCollection } from './types';
export default class CollectionRule extends Rule {
    protected _subsetRules: TSubsetRuleCollection;
    using(validatable: IValidatable): CollectionRule;
    where(filter: TCollectionFilter, define: (rule: Rule) => void): CollectionRule;
    protected __runSubsetRules(value: any, index: number, collection: [], parentValue: any, customOptions: any, results: ValidationResultList): ValidationResultList;
    protected __getPropertyResults(collection: [], parentValue: any, customOptions: any, results: ValidationResultList): ValidationResultList;
}
