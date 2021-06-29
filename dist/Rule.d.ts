import RuleApi from './RuleApi';
import ValidationResultList from './ValidationResultList';
import { IValidatable, TPrecondition, TPredicate, TPredicateCollection, TValidatorCollection } from './types';
export default class Rule<TParentValue = any, TCustomOptions = any> implements IValidatable<TParentValue, TCustomOptions> {
    propertyName: string;
    protected predicates: TPredicateCollection<TParentValue, TCustomOptions>;
    protected validators: TValidatorCollection<TParentValue, TCustomOptions>;
    protected stopOnFirstFailure: boolean;
    constructor(propertyName?: string);
    get isEmpty(): boolean;
    enum(allowedValues: Array<string | number>): RuleApi<TParentValue, TCustomOptions>;
    length(min: number, max: number): RuleApi<TParentValue, TCustomOptions>;
    lengthOrEmpty(min: number, max: number): RuleApi<TParentValue, TCustomOptions>;
    matches(rx: RegExp): RuleApi<TParentValue, TCustomOptions>;
    notNull(): RuleApi<TParentValue, TCustomOptions>;
    notEmpty(): RuleApi<TParentValue, TCustomOptions>;
    max(num: number): RuleApi<TParentValue, TCustomOptions>;
    maxExclusiveOf(num: number): RuleApi<TParentValue, TCustomOptions>;
    min(num: number): RuleApi<TParentValue, TCustomOptions>;
    minExclusiveOf(num: number): RuleApi<TParentValue, TCustomOptions>;
    must(predicate: TPredicate<TParentValue, TCustomOptions>): RuleApi<TParentValue, TCustomOptions>;
    cascade(): void;
    using(validatable: IValidatable<TParentValue, TCustomOptions>): Rule;
    if(precondition: TPrecondition<TParentValue, TCustomOptions>, define: (rule: Rule<TParentValue, TCustomOptions>) => void): Rule;
    protected runPredicates(propValue: any, parentValue: any, customOptions: any, results: ValidationResultList): ValidationResultList;
    protected runValidators(propValue: any, parentValue: any, customOptions: any, results: ValidationResultList): ValidationResultList;
    protected getPropertyResults(value: any, parentValue: any, customOptions: any, results: ValidationResultList): ValidationResultList;
    validate(value: any, parentValue?: TParentValue, customOptions?: TCustomOptions): ValidationResultList;
}
