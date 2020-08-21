import CollectionRule from './CollectionRule';
import Rule from './Rule';
import ValidationResultList from './ValidationResultList';
import { IValidatable, TRuleCollection } from './types';

import getProperty from './utils/getProperty';
import { isEqual } from './utils/quality';
import normalizeValidateArgs from './utils/normalizeValidateArgs';

export default class Validator<TParentValue = any, TCustomOptions = any> implements IValidatable<TParentValue, TCustomOptions> {
	private _propertyName!: string | undefined;
	private _rules: TRuleCollection<TParentValue, TCustomOptions> = {};

	public get propertyName() {
		return this._propertyName;
	}

	public set propertyName(propertyName: string | undefined) {
		this._propertyName = propertyName;
	}

	protected ruleFor(propertyName: string): Rule<TParentValue, TCustomOptions> {
		let rule = new Rule<TParentValue, TCustomOptions>(propertyName);

		if (!this._rules[propertyName]) {
			this._rules[propertyName] = [rule];
		} else {
			this._rules[propertyName].push(rule);
		}

		return rule;
	}

	protected ruleForEach(propertyName: string): CollectionRule<TParentValue, TCustomOptions> {
		let rule = new CollectionRule<TParentValue, TCustomOptions>(propertyName);

		if (!this._rules[propertyName]) {
			this._rules[propertyName] = [rule];
		} else {
			this._rules[propertyName].push(rule);
		}

		return rule;
	}

	public validateProperty(propertyName: string, parentValue: TParentValue, customOptions?: TCustomOptions, outResultList?: ValidationResultList): ValidationResultList {
		const value = getProperty(parentValue, propertyName);
		let resultList;

		if (outResultList) {
			resultList = outResultList;
			resultList.removeWithRelatedResults(propertyName);
		} else {
			resultList = new ValidationResultList([], propertyName, value);
		}

		const rules = this._rules[propertyName];

		for (let rule of rules) {
			let _results = rule.validate(value, parentValue, customOptions);
			resultList = resultList.merge(_results);
		}

		return resultList;
	}

	/**
	 * The overload is used internally in order to allow for Validator and Rule instances to be grouped together in
	 * a TValidatorCollection. Note that if used externally, parentValue will be ignored and the third argument supplied
	 * will be used as customOptions.
	 */
	public validate(value: any, parentValue?: TParentValue | TCustomOptions, customOptions?: TCustomOptions): ValidationResultList;
	public validate(value: any, customOptions?: TCustomOptions): ValidationResultList {
		let [_value, _parentValue, _customOptions] = normalizeValidateArgs<TParentValue, TCustomOptions>(value, arguments[1], arguments[2]);

		let resultList = new ValidationResultList([], this.propertyName || '', _value);

		for (let propertyName in this._rules) {
			let results = this.validateProperty(propertyName, _parentValue, _customOptions);
			resultList = resultList.merge(results);
		}

		if (this.propertyName) {
			resultList.propertyName = this.propertyName;
			resultList.forEach(result => result.propertyName = `${this.propertyName}.${result.propertyName}`);
		}

		return resultList;
	}

	public validateAsync(value: any, parentValue?: TParentValue | TCustomOptions, customOptions?: TCustomOptions): Promise<ValidationResultList>;
	public validateAsync(value: any, customOptions?: TCustomOptions): Promise<ValidationResultList> {
		const args: [any, TParentValue | TCustomOptions, TCustomOptions?] = [value, arguments[1], arguments[2]];

		return new Promise((resolve, reject) => {
			try {
				const result = this.validate(...args);
				resolve(result);
			} catch (e) {
				reject(e);
			}
		});
	}
}