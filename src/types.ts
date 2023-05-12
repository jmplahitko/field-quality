
import Rule from './Rule';
import Severity from './Severity';
import ValidationResultList from './ValidationResultList'

export interface IValidatable<TParentValue = any, TCustomOptions = any> {
	propertyName?: string;
	validate(value: any, parentValue?: TParentValue, customOptions?: TCustomOptions): ValidationResultList;
}

export interface IValidated {
	isValid: boolean;
}

export type TSelector<T> = (src: T) => any;

export type TCollectionFilter<TParentValue, TCustomOptions> = (value: any, index: number, collection: Array<any>, parentValue: TParentValue, customOptions: TCustomOptions) => boolean;

export type TErrorCollection = {
	[ruleName: string]: string;
};

export type TMessageFactory<TParentValue, TCustomOptions> = (value: any, parentValue?: TParentValue, customOptions?: TCustomOptions) => string;

export enum RequirementType {
	validation = 'validation',
	behavioral = 'behavioral'
}

export type Requirement<TParentValue, TCustomOptions> = {
	name: string;
	message: TMessageFactory<TParentValue, TCustomOptions> | null;
	precondition: TPrecondition<TParentValue, TCustomOptions> | null;
	stopOnFirstFailure: boolean;
	isValidIfEmpty: boolean;
	severity: Severity;
	type: RequirementType;
	validate?: (val: any, parentValue: TParentValue, customOptions?: TCustomOptions) => IValidated
}
export interface IReturnRequirement<T, U> {
	(req: Requirement<T, U>): Requirement<T, U>
};

export type TValidationResultMergeOptions = {
	useSourceValue: boolean;
}

export type TPrecondition<TParentValue = any, TCustomOptions = any> = (parentValue: TParentValue, customOptions?: TCustomOptions) => boolean;

export type TPredicate<TParentValue = any, TCustomOptions = any> = (value: any, parentValue: TParentValue, customOptions?: TCustomOptions) => boolean;

export type TPredicateWrapper<TParentValue = any, TCustomOptions = any> = (value: any, parentValue: TParentValue, customOptions?: TCustomOptions) => IValidated;

export type TPredicateCollection<TParentValue, TCustomOptions> = Map<TPredicate<TParentValue, TCustomOptions>, Requirement<TParentValue, TCustomOptions>>;

export type TRuleCollection<TParentValue, TCustomOptions> = { [ruleName: string]: Array<Rule<TParentValue, TCustomOptions>> };

export type TSubsetRuleCollection<TParentValue, TCustomOptions> = Map<IValidatable<TParentValue, TCustomOptions>, TSubsetRuleMetadata<TParentValue, TCustomOptions>>;

export type TSubsetRuleMetadata<TParentValue = any, TCustomOptions = any> = {
	name: string,
	filter: TCollectionFilter<TParentValue, TCustomOptions>
}

export type TValidatorCollection<TParentValue, TCustomOptions> = Map<IValidatable<TParentValue, TCustomOptions>, Requirement<TParentValue, TCustomOptions>>;