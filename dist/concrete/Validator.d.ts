import { IValidatable } from '../abstract/IValidatable';
import { CollectionRule } from './CollectionRule';
import { Rule } from './Rule';
import { ValidationResult } from './ValidationResult';
export declare class Validator implements IValidatable {
    name: string;
    private _rules;
    constructor();
    protected define(validator: Validator): void;
    protected ruleFor(propertyName: string): Rule;
    protected ruleForEach(propertyName: string): CollectionRule;
    private getValidationResult(propertyName, value, parentValue, customOptions?);
    validate(value: any, customOptions?: any): ValidationResult;
}
