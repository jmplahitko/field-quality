import Rule from './Rule';
import { IValidatable, TMessageFactory, TValidatableMetadata, TPrecondition, TPredicate } from './types';
export default class RuleApi<TParentValue, TCustomOptions> {
    protected rule: Rule<TParentValue, TCustomOptions>;
    protected meta: TValidatableMetadata<TParentValue, TCustomOptions>;
    constructor(validatable: Rule<TParentValue, TCustomOptions>, meta: TValidatableMetadata<TParentValue, TCustomOptions>);
    enum(allowedValues: Array<string | number>): RuleApi<TParentValue, TCustomOptions>;
    if(precondition: TPrecondition<TParentValue, TCustomOptions>, define: (rule: Rule<TParentValue, TCustomOptions>) => void): Rule<TParentValue, TCustomOptions>;
    length(min: number, max: number): RuleApi<TParentValue, TCustomOptions>;
    lengthOrEmpty(min: number, max: number): RuleApi<TParentValue, TCustomOptions>;
    matches(rx: RegExp): RuleApi<TParentValue, TCustomOptions>;
    max(num: number): RuleApi<TParentValue, TCustomOptions>;
    maxExclusiveOf(num: number): RuleApi<TParentValue, TCustomOptions>;
    min(num: number): RuleApi<TParentValue, TCustomOptions>;
    minExclusiveOf(num: number): RuleApi<TParentValue, TCustomOptions>;
    must(predicate: TPredicate<TParentValue, TCustomOptions>): RuleApi<TParentValue, TCustomOptions>;
    notNull(): RuleApi<TParentValue, TCustomOptions>;
    notEmpty(): RuleApi<TParentValue, TCustomOptions>;
    cascade(): void;
    using(validatable: IValidatable): Rule<any, any>;
    as(predicateName: string): RuleApi<TParentValue, TCustomOptions>;
    asWarning(): RuleApi<TParentValue, TCustomOptions>;
    when(precondition: TPrecondition<TParentValue, TCustomOptions>): RuleApi<TParentValue, TCustomOptions>;
    withMessage(message: TMessageFactory<TParentValue, TCustomOptions>): RuleApi<TParentValue, TCustomOptions>;
}
