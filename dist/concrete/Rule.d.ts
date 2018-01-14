import { ISimpleFluentInterface } from '../abstract/ISimpleFluentInterface';
import { IValidatable } from '../abstract/IValidatable';
import { TQualifier } from '../abstract/TQualifier';
import { TQualifierCollection } from '../abstract/TQualifierCollection';
import { TValidationResult } from '../abstract/TValidationResult';
import { Validator } from './Validator';
export declare class Rule implements IValidatable {
    name: string;
    private _qualifiers;
    private _rules;
    private _validator;
    private _stopOnFirstFailure;
    readonly qualifiers: TQualifierCollection;
    constructor(name?: string);
    protected define(rule: Rule): void;
    length(num1: number, num2: number): ISimpleFluentInterface;
    matches(rx: RegExp): ISimpleFluentInterface;
    notNull(): ISimpleFluentInterface;
    notEmpty(): ISimpleFluentInterface;
    must(qualifier: TQualifier): ISimpleFluentInterface;
    setValidator(validator: Validator): void;
    stopOnFirstFailure(): void;
    using(rule: Rule): Rule;
    if(precondition: (validator: any) => boolean, define: (rule: Rule) => void): this;
    validate(parentValue: any, prop?: string): TValidationResult;
}
