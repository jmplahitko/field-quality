import Rule from './Rule';
import ValidationResultList from './ValidationResultList';
import { IValidatable, TCollectionFilter, TSubsetRuleCollection } from './types';
export default class CollectionRule<TParentValue = any, TCustomOptions = any> extends Rule<TParentValue, TCustomOptions> {
    protected _subsetRules: TSubsetRuleCollection<TParentValue, TCustomOptions>;
    using(validatable: IValidatable<TParentValue, TCustomOptions>): CollectionRule<TParentValue, TCustomOptions>;
    where(filter: TCollectionFilter<TParentValue, TCustomOptions>, define: (rule: Rule<TParentValue, TCustomOptions>) => void): CollectionRule<TParentValue, TCustomOptions>;
    protected __runSubsetRules(value: any, index: number, collection: [], parentValue: any, customOptions: any, results: ValidationResultList): ValidationResultList;
    protected __getPropertyResults(collection: [], parentValue: any, customOptions: any, results: ValidationResultList): ValidationResultList;
}
