import { TValidationResult } from "./TValidationResult";
import { Field } from "../Field";

export interface IValidatable {
	isValid: boolean;
	messages: {[key: string]: Array<string>},
	value: any,
	set(value: any): any;
	setValidity(result: TValidationResult): void;
}