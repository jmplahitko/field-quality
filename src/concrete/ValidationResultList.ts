import ValidationResult from './ValidationResult';

export default class ValidationResultList {
	protected _entries: ValidationResult[] = [];
	public propertyName: string|undefined;
	public value: any;

	constructor(args: ValidationResult[] = [], properytName?: string, value?: any) {
		this.propertyName = properytName;
		this.value = value;
		this._entries = this._entries.concat(args);
	}

	public get isValid() {
		return this._entries.filter(x => x.errorCount > 0).length === 0;
	}

	public get length() {
		return this._entries.length;
	}

	public push(result: ValidationResult) {
		let existingResult = this.get(result.propertyName);
		if (existingResult) {
			existingResult = existingResult.merge(result);
		} else {
			this._entries.push(result);
		}
	}

	public forEach(cb: (result: ValidationResult) => void) {
		this._entries.forEach(cb);
	}

	public get entries() {
		return this._entries;
	}

	public get withErrors(): ValidationResultList {
		return new ValidationResultList(this._entries.filter(x => x.errorCount > 0), this.propertyName, this.value);
	}

	public get withWarnings(): ValidationResultList {
		return new ValidationResultList(this._entries.filter(x => x.warningCount > 0), this.propertyName, this.value);
	}

	public get(propertyName: string): ValidationResult | void {
		return this._entries.find(x => x.propertyName === propertyName);
	}

	public merge(resultList: ValidationResultList) {
		return ValidationResultList.merge(this, resultList);
	}

	public toArray(): ValidationResult[] {
		return Array.from(this._entries);
	}

	public toObject(): { [propertyName: string]: ValidationResult } {
		const obj: { [propertyName: string]: ValidationResult } = {};
		this._entries.forEach(x => (obj[x.propertyName] = x));
		return obj;
	}

	static merge(dest: ValidationResultList, src: ValidationResultList): ValidationResultList {
		if (dest !== src) {
			src.forEach((result) => {
				dest.push(result);
			});

			return dest;
		} else {
			throw new Error('ValidationResult cannot merge the same instance into itself.')
		}
	}
}