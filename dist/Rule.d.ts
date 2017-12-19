import { TQualifier } from './abstract/TQualifier';
import { Field } from './Field';
import { TModelConstructor } from './abstract/TModelConstructor';
import { TValidationResult } from './abstract/TValidationResult';
export declare class Rule {
    name: string;
    private _qualifiers;
    private _rules;
    private _entity;
    readonly entity: TModelConstructor | null;
    constructor(name: string);
    as(entity: TModelConstructor): void;
    asArrayOf(): void;
    using(rule: Rule): Rule;
    must(qualifierName: string, qualifier: TQualifier): {
        must: any;
        withMessage(message: string): Rule;
    };
    validate(field: Field): TValidationResult;
}
