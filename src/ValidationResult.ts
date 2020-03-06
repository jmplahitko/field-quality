import ValidationResultList from './ValidationResultList';

import { isEmpty } from './utils/quality';

export default class ValidationResult {
	public errors: { [qualifierName: string]: string } = {};
	public warnings: { [qualifierName: string]: string } = {};
	public propertyName: string;
	public value: any;

	constructor(propertyName: string, value?: any) {
		this.propertyName = propertyName;
		this.value = value ?? null;
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
		return new ValidationResultList([this], this.propertyName, this.value);
	}

	static merge(dest: ValidationResult, src: ValidationResult): ValidationResult {
		if (dest !== src) {
			dest.errors = { ...dest.errors, ...src.errors };
			dest.warnings = { ...dest.warnings, ...src.warnings };
			return dest;
		} else {
			return dest;
		}
	}
}