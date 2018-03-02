import { IValidatable } from '../abstract/IValidatable';
import { TValidationResult } from '../abstract/TValidationResult';
import { CollectionRule } from './CollectionRule';
import { Rule } from './Rule';
export declare class Validator implements IValidatable {
    name: string;
    private _rules;
    constructor();
    protected define(validator: Validator): void;
    protected ruleFor(propertyName: string): Rule;
    protected ruleForEach(propertyName: string): CollectionRule;
    private getValidationResult(propertyName, value, parentValue);
    validate(value?: any): TValidationResult;
}
