import { Rule } from "../Rule";
import { TQualifier } from "../abstract/TQualifier";
import { ISimpleFluentInterface } from "../abstract/ISimpleFluentInterface";
export declare function simpleFluentInterfaceFor(rule: Rule, qualifier: TQualifier): {
    must: any;
    notNull: any;
    notEmpty: any;
    stopOnFirstFailure: any;
    when(precondition: (entity: any) => boolean): ISimpleFluentInterface;
    withMessage(message: string): Rule;
};
