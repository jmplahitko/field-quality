import CollectionRule from './CollectionRule';
import Rule from './Rule';
import ValidationResultList from './ValidationResultList';
import { IValidatable } from './types';
export default class Validator implements IValidatable {
    private _name;
    private _results;
    private _rules;
    constructor();
    get name(): string | undefined;
    set name(name: string | undefined);
    protected ruleFor(propertyName: string): Rule;
    protected ruleForEach(propertyName: string): CollectionRule;
    validateProperty(propertyName: string, parentValue: any, customOptions?: any, outResultList?: ValidationResultList): ValidationResultList;
    validate(value: any, customOptions?: any): ValidationResultList;
}
