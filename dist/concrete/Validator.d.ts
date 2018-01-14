import { IValidatable } from '../abstract/IValidatable';
import { TValidationResult } from '../abstract/TValidationResult';
import { Rule } from './Rule';
export declare class Validator implements IValidatable {
    private _rules;
    constructor();
    protected define(validator: Validator): void;
    protected ruleFor(fieldName: string): Rule;
    validate(value: any, prop?: string | Array<string>): TValidationResult;
}
