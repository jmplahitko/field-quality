import { ISimpleFluentInterface } from '../abstract/ISimpleFluentInterface';
import { IValidatable } from '../abstract/IValidatable';
import { TQualifier } from '../abstract/TQualifier';
import { TQualifierCollection } from '../abstract/TQualifierCollection';
import { TValidationResult } from '../abstract/TValidationResult';
import { ICollectionFluentInterface } from '../abstract/ICollectionFluentInterface';
import { TValidatorCollection } from '../abstract/TValidatorCollection';
export declare class Rule implements IValidatable {
    name: string;
    protected _qualifiers: TQualifierCollection;
    protected _validators: TValidatorCollection;
    protected _stopOnFirstFailure: boolean;
    readonly qualifiers: TQualifierCollection;
    readonly validators: TValidatorCollection;
    constructor(name?: string);
    protected define(rule: Rule): void;
    length(min: number, max: number): ISimpleFluentInterface;
    matches(rx: RegExp): ISimpleFluentInterface;
    notNull(): ISimpleFluentInterface;
    notEmpty(): ISimpleFluentInterface;
    must(qualifier: TQualifier): ISimpleFluentInterface;
    stopOnFirstFailure(): void;
    using(validatable: IValidatable): Rule | ICollectionFluentInterface;
    if(precondition: (parentValue: any) => boolean, define: (rule: Rule) => void): Rule;
    protected getValidationResult(propValue: any, parentValue: any): TValidationResult;
    validate(parentValue: any, prop?: string): TValidationResult;
}
