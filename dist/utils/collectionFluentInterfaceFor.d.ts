import { IValidatable } from '../abstract/IValidatable';
import { CollectionRule } from '../concrete/CollectionRule';
import { TPrecondition } from '../abstract/TPrecondition';
export declare function collectionFluentInterfaceFor(rule: CollectionRule, validatable: IValidatable): {
    length: any;
    lengthOrEmpty: any;
    must: any;
    notNull: any;
    notEmpty: any;
    stopOnFirstFailure: any;
    cascade: any;
    using: any;
    where(precondition: TPrecondition): CollectionRule;
};
