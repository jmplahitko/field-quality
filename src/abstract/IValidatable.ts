import { Field } from "../Field";
import { TValidationResult } from "./TValidationResult";

export interface IValidatable {
	value: any;
	set(value: any): TValidationResult;
	setValidity(result: TValidationResult): void;
	validate(): TValidationResult
}