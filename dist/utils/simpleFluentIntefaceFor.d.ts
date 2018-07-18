import { ISimpleFluentInterface } from '../abstract/ISimpleFluentInterface';
import { TQualifier } from '../abstract/TQualifier';
import { Rule } from '../concrete/Rule';
import { TPrecondition } from '../abstract/TPrecondition';
export declare function simpleFluentInterfaceFor(rule: Rule, qualifier: TQualifier): {
    as(qualifierName: string): ISimpleFluentInterface;
    length: any;
    lengthOrEmpty: any;
    matches: any;
    must: any;
    notNull: any;
    notEmpty: any;
    stopOnFirstFailure: any;
    cascade: any;
    using: any;
    when(precondition: TPrecondition): ISimpleFluentInterface;
    withMessage(message: string): Rule;
};
