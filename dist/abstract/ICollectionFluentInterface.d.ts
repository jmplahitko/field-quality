import { IValidatable } from './IValidatable';
import { CollectionRule } from '../concrete/CollectionRule';
import { TPrecondition } from './TPrecondition';
import { TQualifier } from './TQualifier';
export interface ICollectionFluentInterface {
    length(num1: number, num2: number): ICollectionFluentInterface;
    must(qualifier: TQualifier): ICollectionFluentInterface;
    notEmpty(): ICollectionFluentInterface;
    notNull(): ICollectionFluentInterface;
    stopOnFirstFailure(): void;
    cascade(): void;
    using(validatable: IValidatable): ICollectionFluentInterface;
    where(precondition: TPrecondition): CollectionRule;
}
