import CollectionRule from './CollectionRule';
import Rule from './Rule';
import ValidationResultList from './ValidationResultList';
import { IValidatable, TRuleCollection } from './types';

import getProperty from './utils/getProperty';
import { isEqual } from './utils/quality';
import normalizeValidateArgs from './utils/normalizeValidateArgs';

export default class Validator<TParentValue = any, TCustomOptions = any> implements IValidatable<TParentValue, TCustomOptions> {
	private _propertyName!: string | undefined;
	private _results: ValidationResultList = new ValidationResultList();
	private _rules: TRuleCollection<TParentValue, TCustomOptions> = {};

	public get propertyName() {
		return this._propertyName;
	}

	public set propertyName(propertyName: string | undefined) {
		this._propertyName = propertyName;
		this._results.propertyName = propertyName;
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
		const prevResult = this._results.get(propertyName);
		const value = getProperty(parentValue, propertyName);
		let resultList;

		if (outResultList) {
			resultList = outResultList;
			resultList.removeWithRelatedResults(propertyName);
		} else {
			resultList = new ValidationResultList([], propertyName, value);
		}

		if (prevResult && isEqual(prevResult.value, value)) {
			resultList.merge(this._results.getWithRelatedResults(propertyName));
		} else {
			const rules = this._rules[propertyName];

			for (let rule of rules) {
				let _results = rule.validate(value, parentValue, customOptions);
				resultList = resultList.merge(_results);
			}
		}

		return resultList;
	}

	// The overload is used internally in order to allow for Validator and Rule instances to be grouped together in
	// a TValidatorCollection. Note that if used externally, parentValue will be ignored and the third argument supplied
	// will be used as customOptions.
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

		this._results.clear();
		this._results.value = _value;
		this._results.merge(resultList);

		return resultList;
	}
}