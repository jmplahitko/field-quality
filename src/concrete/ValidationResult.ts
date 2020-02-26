import { quality } from '../utils/quality';
import ValidationResultList from './ValidationResultList';

const { isEmpty } = quality;

export default class ValidationResult {
	public errors: { [qualifierName: string]: string } = {};
	public warnings: { [qualifierName: string]: string } = {};
	public propertyName: string;
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

	public toValidationResultList(): ValidationResultList {
		return new ValidationResultList([this]);
	}

	static merge(result1: ValidationResult, result2: ValidationResult): ValidationResult {
		if (result1 !== result2) {
			result1.errors = { ...result1.errors, ...result2.errors };
			result1.warnings = { ...result1.warnings, ...result2.warnings };
			return result1;
		} else {
			throw new Error('ValidationResult cannot merge the same instance into itself.')
		}
	}
}