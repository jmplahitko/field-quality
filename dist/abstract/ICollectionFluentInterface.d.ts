import { IValidatable } from './IValidatable';
import { CollectionRule } from '../concrete/CollectionRule';
import { TPrecondition } from './TPrecondition';
export interface ICollectionFluentInterface {
    length: any;
    matches: any;
    must: any;
    notNull: any;
    notEmpty: any;
    stopOnFirstFailure: any;
    using(validatable: IValidatable): ICollectionFluentInterface;
    where(precondition: TPrecondition): CollectionRule;
}
