import { TQualifier } from './abstract/TQualifier';
import { TValidationResult } from './abstract/TValidationResult';
import { IValidatable } from './abstract/IValidatable';
import { Model } from './Model';
export declare class Rule {
    name: string;
    private _qualifiers;
    private _rules;
    private _entity;
    readonly entity: (new (entity: {
        [key: string]: any;
    }) => Model) | null;
    constructor(name: string);
    as(entity: new (entity: {
        [key: string]: any;
    }) => Model): void;
    asArrayOf(): void;
    using(rule: Rule): Rule;
    must(qualifier: TQualifier): {
        must: any;
        withMessage(message: string): Rule;
    };
    validate(field: IValidatable): TValidationResult;
}
