import { IValidatable } from '../abstract/IValidatable';

import Rule from './Rule';
import ValidationResult from './ValidationResult';
import ValidationResultList from './ValidationResultList';

import copy from '../utils/copy';
import { isArray } from '../utils/quality';
import { TCollectionFilter } from '../abstract/TCollectionFilter';
import { TSubsetRuleCollection } from '../abstract/TSubsetRuleCollection';
import Severity from '../abstract/Severity';

export default class CollectionRule extends Rule {
	protected _subsetRules: TSubsetRuleCollection = new Map();

	public using(validatable: IValidatable): CollectionRule {
		validatable.name = '';

		let meta = {
			name: validatable.name,
			message: '',
			precondition: null,
			isValidIfEmpty: false,
			severity: Severity.default
		};

		this._validators.set(validatable, meta);
		return this;
	}

	public where(filter: TCollectionFilter, define: (rule: Rule) => void): CollectionRule {
		let rule = new Rule(this.name);
		let meta = {
			name: rule.name,
			filter
		};

		this._subsetRules.set(rule, meta);
		define(rule);

		return this;
	}

	protected __runSubsetRules(collection: Array<any>, parentValue: any, customOptions: any): ValidationResultList {
		let resultList = new ValidationResultList(this.name, collection);

		for (let [rule, meta] of this._subsetRules) {
			let filteredCollection = collection.filter((value: any, index: number) => meta.filter(value, index, collection, parentValue, customOptions));

			for (let value of filteredCollection) {
				let index = collection.indexOf(value);
				let _results = rule.validate(value, value, customOptions);
				_results.forEach((result: ValidationResult) => result.propertyName = `${result.propertyName}[${index}]`);
				resultList = resultList.merge(_results);
			}
		}

		return resultList;
	}

	public validate(collection: any[], parentValue?: any, customOptions?: any): ValidationResultList {
		collection = copy(collection);
		parentValue = copy(parentValue);
		let resultList = new ValidationResultList(this.name, collection);

		if (isArray(collection)) {
			for (let value of collection) {
				let index = collection.indexOf(value);
				let qualifierResultList = this.__runQualifiers(value, parentValue, customOptions);
				qualifierResultList.forEach(result => result.propertyName = `${this.name}[${index}]`);
				resultList = resultList.merge(qualifierResultList);

				if (qualifierResultList.isValid || !this._stopOnFirstFailure) {
					const validatableResultList = this.__runValidators(value, parentValue, customOptions);
					validatableResultList.forEach(result => result.propertyName = `${this.name}[${index}].${result.propertyName}`);
					resultList = resultList.merge(validatableResultList);
				}
			}

			if (resultList.isValid || !this._stopOnFirstFailure) {
				const _results = this.__runSubsetRules(collection, parentValue, customOptions);
				resultList = resultList.merge(_results);
			}
		} else {
			const result = new ValidationResult(this.name, collection);
			result.errors['beCollection'] = `${this.name} must be a collection.`;
			resultList.push(result);
		}

		return resultList;
	}
}
