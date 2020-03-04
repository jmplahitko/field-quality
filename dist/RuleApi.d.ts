import Rule from './Rule';
import { IValidatable, TMeta, TPrecondition, TQualifier } from './types';
export default class RuleApi {
    protected __rule: Rule;
    protected __meta: TMeta;
    constructor(validatable: Rule, meta: TMeta);
    enum(allowedValues: Array<string | number>): RuleApi;
    length(min: number, max: number): RuleApi;
    lengthOrEmpty(min: number, max: number): RuleApi;
    matches(rx: RegExp): RuleApi;
    max(num: number): RuleApi;
    maxExclusiveOf(num: number): RuleApi;
    min(num: number): RuleApi;
    minExclusiveOf(num: number): RuleApi;
    must(qualifier: TQualifier): RuleApi;
    notNull(): RuleApi;
    notEmpty(): RuleApi;
    stopOnFirstFailure(): void;
    cascade(): void;
    using(validatable: IValidatable): any;
    as(qualifierName: string): this;
    asWarning(): void;
    when(precondition: TPrecondition): this;
    withMessage(message: string): this;
}
