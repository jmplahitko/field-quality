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
}