import { Field } from "../Field";
import { IValidationResult } from "./IValidationResult";

export interface IValidatable {
	name: string;
	isValid: boolean;
	messages: {[key: string]: Array<string>},
	value: any,
	set(value: any): any;
	setValidity(result: IValidationResult): void;
	validate(): IValidationResult
}