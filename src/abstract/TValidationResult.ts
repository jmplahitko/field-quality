export type TValidationResult = {
	errors: { [name: string]: any };
	isValid: boolean;
	value: any;
}