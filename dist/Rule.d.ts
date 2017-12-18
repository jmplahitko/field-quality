import { TQualifier } from './abstract/TQualifier';
import { IValidatable } from './abstract/IValidatable';
import { IValidationResult } from './abstract/IValidationResult';
import { TModelConstructor } from './abstract/TModelConstructor';
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
    must(qualifier: TQualifier): {
        must: any;
        withMessage(message: string): Rule;
    };
    validate(field: IValidatable): IValidationResult;
}
