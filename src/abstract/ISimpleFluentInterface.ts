import { TQualifier } from "./TQualifier";
import { Rule } from "../Rule";

export interface ISimpleFluentInterface {
	must(qualifier: TQualifier): ISimpleFluentInterface;
	notEmpty(): ISimpleFluentInterface;
	notNull(): ISimpleFluentInterface;
	stopOnFirstFailure(): void;
	when(precondition: (entity: any) => boolean): ISimpleFluentInterface;
	withMessage(message: string): Rule;
}