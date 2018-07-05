import { ISimpleFluentInterface } from '../abstract/ISimpleFluentInterface';
import { TQualifier } from '../abstract/TQualifier';
import { Rule } from '../concrete/Rule';
export declare function simpleFluentInterfaceFor(rule: Rule, qualifier: TQualifier): {
    as(qualifierName: string): ISimpleFluentInterface;
    length: any;
    matches: any;
    must: any;
    notNull: any;
    notEmpty: any;
    stopOnFirstFailure: any;
    using: any;
    when(precondition: (entity: any) => boolean): ISimpleFluentInterface;
    withMessage(message: string): Rule;
};
