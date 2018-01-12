import { ISimpleFluentInterface } from '../abstract/ISimpleFluentInterface';
import { TValidatorConstructor } from '../abstract/TValidatorConstructor';
import { TQualifier } from '../abstract/TQualifier';
import { TQualifierCollection } from '../abstract/TQualifierCollection';
import { TRuleConstructor } from '../abstract/TRuleConstructor';
import { TValidationResult } from '../abstract/TValidationResult';
import { Field } from './Field';
export declare class Rule {
    name: string;
    private _qualifiers;
    private _rules;
    private _entity;
    private _stopOnFirstFailure;
    readonly entity: TValidatorConstructor | null;
    readonly qualifiers: TQualifierCollection;
    constructor(name?: string);
    protected define(rule: Rule): void;
    length(num1: number, num2: number): ISimpleFluentInterface;
    matches(rx: RegExp): ISimpleFluentInterface;
    notNull(): ISimpleFluentInterface;
    notEmpty(): ISimpleFluentInterface;
    must(qualifier: TQualifier): ISimpleFluentInterface;
    setValidator(entity: TValidatorConstructor): void;
    stopOnFirstFailure(): void;
    using(PreDefinedRule: TRuleConstructor): Rule;
    if(precondition: (entity: any) => boolean, define: (rule: Rule) => void): this;
    validate(field: Field): TValidationResult;
}
