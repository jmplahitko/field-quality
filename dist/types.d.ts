import Rule from './Rule';
import Severity from './Severity';
import ValidationResultList from './ValidationResultList';
export interface IValidatable<TParentValue = any, TCustomOptions = any> {
    propertyName?: string;
    validate(value: any, parentValue?: TParentValue, customOptions?: TCustomOptions): ValidationResultList;
}
export declare type TSelector<T> = (src: T) => any;
export declare type TCollectionFilter<TParentValue, TCustomOptions> = (value: any, index: number, collection: Array<any>, parentValue: TParentValue, customOptions: TCustomOptions) => boolean;
export declare type TErrorCollection = {
    [ruleName: string]: string;
};
export declare type TMessageFactory<TParentValue = any, TCustomOptions = any> = (value: any, parentValue: TParentValue, customOptions: TCustomOptions) => string;
export declare type TValidatableMetadata<TParentValue = any, TCustomOptions = any> = {
    name: string;
    message: TMessageFactory<TParentValue, TCustomOptions>;
    precondition: TPrecondition<TParentValue, TCustomOptions> | null;
    isValidIfEmpty: boolean;
    severity: Severity;
};
export declare type TPrecondition<TParentValue = any, TCustomOptions = any> = (parentValue: TParentValue, customOptions: TCustomOptions) => boolean;
export declare type TQualifier<TParentValue = any, TCustomOptions = any> = (value: any, parentValue: TParentValue, customOptions: TCustomOptions) => boolean;
export declare type TQualifierCollection<TParentValue, TCustomOptions> = Map<TQualifier<TParentValue, TCustomOptions>, TValidatableMetadata<TParentValue, TCustomOptions>>;
export declare type TRuleCollection<TParentValue, TCustomOptions> = {
    [ruleName: string]: Array<Rule<TParentValue, TCustomOptions>>;
};
export declare type TSubsetRuleCollection<TParentValue, TCustomOptions> = Map<IValidatable<TParentValue, TCustomOptions>, TSubsetRuleMetadata<TParentValue, TCustomOptions>>;
export declare type TSubsetRuleMetadata<TParentValue = any, TCustomOptions = any> = {
    name: string;
    filter: TCollectionFilter<TParentValue, TCustomOptions>;
};
export declare type TValidatorCollection<TParentValue, TCustomOptions> = Map<IValidatable<TParentValue, TCustomOptions>, TValidatableMetadata<TParentValue, TCustomOptions>>;
