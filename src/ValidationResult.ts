import { IValidatable } from "./abstract/IValidatable";
import { TMessages } from "./abstract/TMessages";
import { IValidationResult } from "./abstract/IValidationResult";

/**
 * This is basically a class that creates a paired-down version of an IValidatable
 */
export class ValidationResult implements IValidationResult {
	public isValid: boolean = true;
	public messages: TMessages = {};
	public value: any;

	constructor(validatable: IValidatable) {
		this.isValid = validatable.isValid;
		this.messages = validatable.messages;
		this.value = validatable.value;
	}
}