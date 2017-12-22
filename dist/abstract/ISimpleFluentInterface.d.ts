import { TQualifier } from "./TQualifier";
import { Rule } from "../Rule";
export interface ISimpleFluentInterface {
    length(num1: number, num2: number): ISimpleFluentInterface;
    match(rx: RegExp): ISimpleFluentInterface;
    must(qualifier: TQualifier): ISimpleFluentInterface;
    notEmpty(): ISimpleFluentInterface;
    notNull(): ISimpleFluentInterface;
    stopOnFirstFailure(): void;
    when(precondition: (entity: any) => boolean): ISimpleFluentInterface;
    withMessage(message: string): Rule;
}
