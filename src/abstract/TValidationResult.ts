export type TValidationResult = {
	isValid: boolean;
	messages: { [fieldName: string]: Array<string> };
}