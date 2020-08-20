import CollectionRule from './CollectionRule';
import Rule from './Rule';
import ValidationResultList from './ValidationResultList';
import { IValidatable } from './types';
export default class Validator<TParentValue = any, TCustomOptions = any> implements IValidatable<TParentValue, TCustomOptions> {
    private _propertyName;
    private _rules;
    get propertyName(): string | undefined;
    set propertyName(propertyName: string | undefined);
    protected ruleFor(propertyName: string): Rule<TParentValue, TCustomOptions>;
    protected ruleForEach(propertyName: string): CollectionRule<TParentValue, TCustomOptions>;
    validateProperty(propertyName: string, parentValue: TParentValue, customOptions?: TCustomOptions, outResultList?: ValidationResultList): ValidationResultList;
    /**
     * The overload is used internally in order to allow for Validator and Rule instances to be grouped together in
     * a TValidatorCollection. Note that if used externally, parentValue will be ignored and the third argument supplied
     * will be used as customOptions.
     */
    validate(value: any, parentValue?: TParentValue | TCustomOptions, customOptions?: TCustomOptions): ValidationResultList;
}
