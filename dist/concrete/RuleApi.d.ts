import { Rule } from './Rule';
import { TMeta } from '../abstract/TMeta';
import { TPrecondition } from '../abstract/TPrecondition';
import { IValidatable } from '../abstract/IValidatable';
import { TQualifier } from '../abstract/TQualifier';
export declare class RuleApi {
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
    when(precondition: TPrecondition): this;
    withMessage(message: string): this;
}
