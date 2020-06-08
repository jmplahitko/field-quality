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

	public forEach(cb: (value: ValidationResult, index: number, array: ValidationResult[]) => void) {
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

	public clear() {
		this._entries = [];
		this.value = null;
	}

	public get(propertyName: string): ValidationResult | void {
		return this._entries.find(x => x.propertyName === propertyName);
	}

	public getWithRelatedResults(propertyName: string): ValidationResultList {
		const found = new ValidationResultList([], propertyName);
		const exactResult = this.get(propertyName);

		if (exactResult) {
			found.value = exactResult.value;
			found.push(exactResult);
		}

		this._entries.forEach(x => {
			const matches = new RegExp(`^${propertyName}[\.|\[]`).test(x.propertyName);
			if (matches) {
				found.push(x);
			}
		});

		return found;
	}

	public merge(resultList: ValidationResultList) {
		return ValidationResultList.merge(this, resultList);
	}

	public push(result: ValidationResult) {
		let existingResult = this.get(result.propertyName);
		if (existingResult) {
			existingResult = existingResult.merge(result);
		} else {
			this._entries.push(result);
		}
	}

	public remove(propertyName: string): ValidationResult | null {
		const index = this._entries.findIndex((entry) => entry.propertyName === propertyName);
		let removed = null;

		if (index > -1) {
			removed = this._entries.splice(index, 1);
			return removed[0];
		}

		return removed;
	}

	public removeWithRelatedResults(propertyName: string): ValidationResultList {
		const removed = new ValidationResultList([], propertyName);
		const exactMatch = this.remove(propertyName);
		if (exactMatch) {
			removed.value = exactMatch.value;
			removed.push(exactMatch);
		}

		this._entries = this._entries.filter(x => {
			const matches = new RegExp(`^${propertyName}[\.|\[]`).test(x.propertyName);
			if (matches) {
				removed.push(x);
			}
			return !matches;
		});

		return removed;
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
		}

		return dest;
	}
}