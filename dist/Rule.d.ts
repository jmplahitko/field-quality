import { ISimpleFluentInterface } from './abstract/ISimpleFluentInterface';
import { TQualifier } from './abstract/TQualifier';
import { TModelConstructor } from './abstract/TModelConstructor';
import { TValidationResult } from './abstract/TValidationResult';
import { TQualifierCollection } from './abstract/TQualifierCollection';
import { Field } from './Field';
export declare class Rule {
    name: string;
    private _qualifiers;
    private _rules;
    private _entity;
    private _stopOnFirstFailure;
    readonly entity: TModelConstructor | null;
    readonly qualifiers: TQualifierCollection;
    constructor(name: string);
    as(entity: TModelConstructor): void;
    asArrayOf(): void;
    length(num1: number, num2: number): ISimpleFluentInterface;
    match(rx: RegExp): ISimpleFluentInterface;
    notNull(): ISimpleFluentInterface;
    notEmpty(): ISimpleFluentInterface;
    must(qualifier: TQualifier): ISimpleFluentInterface;
    stopOnFirstFailure(): void;
    using(rule: Rule): Rule;
    validate(field: Field): TValidationResult;
}
