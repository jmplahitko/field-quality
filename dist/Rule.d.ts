import RuleApi from './RuleApi';
import ValidationResultList from './ValidationResultList';
import { IValidatable, TPrecondition, TQualifier, TQualifierCollection, TValidatorCollection } from './types';
export default class Rule<TParentValue = any, TCustomOptions = any> implements IValidatable<TParentValue, TCustomOptions> {
    propertyName: string;
    protected _qualifiers: TQualifierCollection<TParentValue, TCustomOptions>;
    protected _validators: TValidatorCollection<TParentValue, TCustomOptions>;
    protected _stopOnFirstFailure: boolean;
    constructor(propertyName?: string);
    enum(allowedValues: Array<string | number>): RuleApi<TParentValue, TCustomOptions>;
    length(min: number, max: number): RuleApi<TParentValue, TCustomOptions>;
    lengthOrEmpty(min: number, max: number): RuleApi<TParentValue, TCustomOptions>;
    matches(rx: RegExp): RuleApi<TParentValue, TCustomOptions>;
    notNull(): RuleApi<TParentValue, TCustomOptions>;
    notEmpty(): RuleApi<TParentValue, TCustomOptions>;
    max(num: number): RuleApi<TParentValue, TCustomOptions>;
    maxExclusiveOf(num: number): RuleApi<TParentValue, TCustomOptions>;
    min(num: number): RuleApi<TParentValue, TCustomOptions>;
    minExclusiveOf(num: number): RuleApi<TParentValue, TCustomOptions>;
    must(qualifier: TQualifier<TParentValue, TCustomOptions>): RuleApi<TParentValue, TCustomOptions>;
    cascade(): void;
    using(validatable: IValidatable<TParentValue, TCustomOptions>): Rule;
    if(precondition: TPrecondition<TParentValue, TCustomOptions>, define: (rule: Rule<TParentValue, TCustomOptions>) => void): Rule;
    protected __runQualifiers(propValue: any, parentValue: any, customOptions: any, results: ValidationResultList): ValidationResultList;
    protected __runValidators(propValue: any, parentValue: any, customOptions: any, results: ValidationResultList): ValidationResultList;
    protected __getPropertyResults(value: any, parentValue: any, customOptions: any, results: ValidationResultList): ValidationResultList;
    validate(value: any, parentValue?: TParentValue, customOptions?: TCustomOptions): ValidationResultList;
}
