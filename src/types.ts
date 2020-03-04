
import Rule from './Rule';
import Severity from './Severity';
import ValidationResultList from './ValidationResultList'

export interface IValidatable {
	name?: string;
	validate(value: any, parentValue?: any, customOptions?: any): ValidationResultList;
}

export type TCollectionFilter = (value?: any, index?: number, collection?: Array<any>, parentValue?: any, customOptions?: any) => boolean;

export type TErrorCollection = {
	[ruleName: string]: string;
};

export type TMessageFactory = (value?: any, parentValue?: any, customOptions?: any) => string;

export type TMeta = {
	name: string;
	message: TMessageFactory;
	precondition: TPrecondition | null;
	isValidIfEmpty: boolean;
	severity: Severity;
};

export type TPrecondition = (parentValue?: any, customOptions?: any) => boolean;

export type TQualifier = (val: any, entity?: any, customOptions?: any) => boolean;

export type TQualifierCollection = Map<TQualifier, TMeta>;

export type TRuleCollection = { [ruleName: string]: Array<Rule> };

export type TSubsetRuleCollection = Map<IValidatable, TSubsetRuleMeta>;

export type TSubsetRuleMeta = {
	name: string,
	filter: TCollectionFilter
}

export type TValidatorCollection = Map<IValidatable, TMeta>;