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

		define(rule);
		this._subsetRules.set(rule, meta);

		return this;
	}

	protected __runSubsetRules(value: any, index: number, collection: [], parentValue: any, customOptions: any, results: ValidationResultList): ValidationResultList {
		for (let [rule, meta] of this._subsetRules) {
			if (meta.filter(value, index, collection, parentValue, customOptions)) {
				let resultList = rule.validate(value, parentValue, customOptions);
				results.merge(resultList);
			}
		}

		return results;
	}

	protected __getPropertyResults(collection: [], parentValue: any, customOptions: any, results: ValidationResultList): ValidationResultList {
		if (isArray(collection)) {
			for (let value of collection) {
				const index = collection.indexOf(value);
				const propertyName = `${this.name}[${index}]`;
				let resultList = new ValidationResultList([], propertyName);
				this.__runQualifiers(value, parentValue, customOptions, resultList);

				if (resultList.isValid || !this._stopOnFirstFailure) {
					this.__runValidators(value, parentValue, customOptions, resultList);

					if (resultList.isValid || !this._stopOnFirstFailure) {
						this.__runSubsetRules(value, index, collection, parentValue, customOptions, resultList);
					}
				}

				resultList.forEach((result, ndx) => {
					// a little nasty, but at this time we know the first result in this._results describes the collection itself,
					// and not the values it contains.
					result.propertyName = `${propertyName}${ndx > 0 ? `.${result.propertyName}` : ''}`;
				});

				results = results.merge(resultList);
			}
		} else {
			const result = new ValidationResult(this.name, collection);
			result.errors['beCollection'] = `${this.name} must be a collection.`;
			results.push(result);
		}

		return results;
	}
}