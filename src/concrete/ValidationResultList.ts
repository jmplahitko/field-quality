import ValidationResult from './ValidationResult';

export default class ValidationResultList {
	private _entries: ValidationResult[] = [];

	constructor(args: ValidationResult[] = []) {
		this._entries = this._entries.concat(args);
	}

	public get isValid() {
		return this._entries.filter(x => x.errorCount > 0).length === 0;
	}

	public get length() {
		return this._entries.length;
	}

	public get withErrors(): ValidationResultList {
		return new ValidationResultList(this._entries.filter(x => x.errorCount > 0));
	}

	public get withWarnings(): ValidationResultList {
		return new ValidationResultList(this._entries.filter(x => x.warningCount > 0));
	}

	public get(propertyName: string): ValidationResult | void {
		return this._entries.find(x => x.propertyName === propertyName);
	}

	public toObject(): { [propertyName: string]: ValidationResult } {
		const obj: { [propertyName: string]: ValidationResult } = {};
		this._entries.forEach(x => (obj[x.propertyName] = x));
		return obj;
	}
}