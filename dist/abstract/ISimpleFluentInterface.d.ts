import { TQualifier } from './TQualifier';
import { Rule } from '../concrete/Rule';
import { IValidatable } from './IValidatable';
import { TPrecondition } from './TPrecondition';
export interface ISimpleFluentInterface {
    as(qualifierName: string): ISimpleFluentInterface;
    length(num1: number, num2: number): ISimpleFluentInterface;
    lengthOrEmpty(num1: number, num2: number): ISimpleFluentInterface;
    matches(rx: RegExp): ISimpleFluentInterface;
    must(qualifier: TQualifier): ISimpleFluentInterface;
    notEmpty(): ISimpleFluentInterface;
    notNull(): ISimpleFluentInterface;
    stopOnFirstFailure(): void;
    cascade(): void;
    using(validatable: IValidatable): Rule;
    when(precondition: TPrecondition): ISimpleFluentInterface;
    withMessage(message: string): Rule;
}
