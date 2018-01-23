import { IValidatable } from '../abstract/IValidatable';
import { TValidationResult } from '../abstract/TValidationResult';
import { Rule } from './Rule';
import { CollectionRule } from './CollectionRule';
export declare class Validator implements IValidatable {
    name: string;
    private _rules;
    constructor();
    protected define(validator: Validator): void;
    protected ruleFor(propertyName: string): Rule;
    protected ruleForEach(propertyName: string): CollectionRule;
    private getValidationResult(propertyName, value);
    validate(value: any, props?: Array<string>): TValidationResult;
}
