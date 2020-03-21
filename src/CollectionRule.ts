import Rule from './Rule';
import Severity from './Severity';
import ValidationResult from './ValidationResult';
import ValidationResultList from './ValidationResultList';

import { IValidatable, TCollectionFilter, TSubsetRuleCollection } from './types';

import { isArray } from './utils/quality';

export default class CollectionRule<TParentValue = any, TCustomOptions = any> extends Rule<TParentValue, TCustomOptions> {
	protected _subsetRules: TSubsetRuleCollection<TParentValue, TCustomOptions> = new Map();

	public using(validatable: IValidatable<TParentValue, TCustomOptions>): CollectionRule<TParentValue, TCustomOptions> {
		validatable.propertyName = '';

		let meta = {
			name: validatable.propertyName,
			message: () => '',
			precondition: null,
			isValidIfEmpty: false,
			severity: Severity.default
		};

		this._validators.set(validatable, meta);
		return this;
	}

	public where(filter: TCollectionFilter<TParentValue, TCustomOptions>, define: (rule: Rule<TParentValue, TCustomOptions>) => void): CollectionRule<TParentValue, TCustomOptions> {
		let rule = new Rule<TParentValue, TCustomOptions>(this.propertyName);
		let meta = {
			name: rule.propertyName,
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
				const propertyName = `${this.propertyName}[${index}]`;
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
					result.propertyName = `${propertyName}${(ndx > 0 && result.propertyName) ? `.${result.propertyName}` : ''}`;
				});

				results = results.merge(resultList);
			}
		} else {
			const result = new ValidationResult(this.propertyName, collection);
			result.errors['beCollection'] = `${this.propertyName} must be a collection.`;
			results.push(result);
		}

		return results;
	}
}