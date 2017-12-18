import { TMessageCollection } from "./TMessageCollection";

export interface IValidationResult {
	value: any;
	isValid: boolean;
	messages: TMessageCollection;
}