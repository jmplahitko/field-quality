import { IValidatable } from './IValidatable';
import { CollectionRule } from '../concrete/CollectionRule';
export interface ICollectionFluentInterface {
    length: any;
    matches: any;
    must: any;
    notNull: any;
    notEmpty: any;
    stopOnFirstFailure: any;
    using(validatable: IValidatable): ICollectionFluentInterface;
    where(precondition: (entity: any) => boolean): CollectionRule;
}
