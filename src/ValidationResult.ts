import { IValidatable } from "./abstract/IValidatable";
import { TMessageCollection } from "./abstract/TMessageCollection";
import { IValidationResult } from "./abstract/IValidationResult";

/**
 * This is basically a class that creates a paired-down version of an IValidatable
 */
export class ValidationResult implements IValidationResult {
	public isValid: boolean = true;
	public messages: TMessageCollection = {};
	public value: any;

	constructor(validatable: IValidatable|IValidationResult) {
		this.isValid = validatable.isValid;
		this.messages = validatable.messages;
		this.value = validatable.value;
	}
}