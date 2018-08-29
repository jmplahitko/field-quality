import { IValidatable } from './IValidatable';

import { CollectionRule } from '../concrete/CollectionRule';
import { TPrecondition } from './TPrecondition';
import { TQualifier } from './TQualifier';
import { ISimpleFluentInterface } from './ISimpleFluentInterface';

export interface ICollectionFluentInterface {
	length(num1: number, num2: number): ISimpleFluentInterface;
	lengthOrEmpty(num1: number, num2: number): ISimpleFluentInterface;
	must(qualifier: TQualifier): ISimpleFluentInterface;
	notEmpty(): ISimpleFluentInterface;
	notNull(): ISimpleFluentInterface;
	stopOnFirstFailure(): void;
	cascade(): void;
	using(validatable: IValidatable): ICollectionFluentInterface;
	where(precondition: TPrecondition): CollectionRule;
}