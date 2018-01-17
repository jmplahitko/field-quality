import { IValidatable } from '../abstract/IValidatable';
import { TValidationResult } from '../abstract/TValidationResult';
import { Rule } from './Rule';
import { CollectionRule } from './CollectionRule';
export declare class Validator implements IValidatable {
    name: string;
    private _rules;
    constructor();
    protected define(validator: Validator): void;
    protected ruleFor(fieldName: string): Rule;
    protected ruleForEach(fieldName: string): CollectionRule;
    private getValidationResult(ruleName, value);
    validate(value: any, props?: Array<string>): TValidationResult;
}
