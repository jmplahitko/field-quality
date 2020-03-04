import Rule from './Rule';
import Severity from './Severity';
import ValidationResultList from './ValidationResultList';
export interface IValidatable {
    name?: string;
    validate(value: any, parentValue?: any, customOptions?: any): ValidationResultList;
}
export declare type TCollectionFilter = (value?: any, index?: number, collection?: Array<any>, parentValue?: any, customOptions?: any) => boolean;
export declare type TErrorCollection = {
    [ruleName: string]: string;
};
export declare type TMeta = {
    name: string;
    message: string;
    precondition: TPrecondition | null;
    isValidIfEmpty: boolean;
    severity: Severity;
};
export declare type TPrecondition = (parentValue?: any, customOptions?: any) => boolean;
export declare type TQualifier = (val: any, entity?: any, customOptions?: any) => boolean;
export declare type TQualifierCollection = Map<TQualifier, TMeta>;
export declare type TRuleCollection = {
    [ruleName: string]: Array<Rule>;
};
export declare type TSubsetRuleCollection = Map<IValidatable, TSubsetRuleMeta>;
export declare type TSubsetRuleMeta = {
    name: string;
    filter: TCollectionFilter;
};
export declare type TValidatorCollection = Map<IValidatable, TMeta>;
