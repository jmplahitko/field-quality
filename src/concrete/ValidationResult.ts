import { quality } from '../utils/quality';

const { isEmpty } = quality;

export default class ValidationResult {
	public errors: { [qualifierName: string]: string } = {};
	public warnings: { [qualifierName: string]: string } = {};
	readonly propertyName: string;
	readonly value: any;

	constructor(propertyName: string, value: any) {
		this.propertyName = propertyName;
		this.value = value;
	}

	public get isValid(): boolean {
		return isEmpty(this.errors);
	}

	public get errorCount(): number {
		return Object.keys(this.errors).length;
	}

	public get warningCount(): number {
		return Object.keys(this.warnings).length;
	}

	public merge(result: ValidationResult): ValidationResult {
		return ValidationResult.merge(this, result);
	}

	static merge(result1: ValidationResult, result2: ValidationResult): ValidationResult {
		const result = new ValidationResult(result1.propertyName, result1.value);
		result.errors = { ...result1.errors, ...result2.errors };
		result.warnings = { ...result1.warnings, ...result2.warnings };
		return result;
	}
}