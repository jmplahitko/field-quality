import { IValidatable } from '../abstract/IValidatable';
import { CollectionRule } from '../concrete/CollectionRule';
export declare function collectionFluentInterfaceFor(rule: CollectionRule, validatable: IValidatable): {
    length: any;
    matches: any;
    must: any;
    notNull: any;
    notEmpty: any;
    stopOnFirstFailure: any;
    using: any;
    where(precondition: (entity: any) => boolean): CollectionRule;
};
