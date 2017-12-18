import { TQualifier } from './abstract/TQualifier';
import { Field } from './Field';
import { TValidationResult } from './abstract/TValidationResult';
export declare class Rule {
    name: string;
    private _qualifiers;
    private _rules;
    constructor(name: string);
    use(rule: Rule): Rule;
    must(qualifier: TQualifier): {
        must: any;
        withMessage(message: string): Rule;
    };
    validate(field: Field): TValidationResult;
}
