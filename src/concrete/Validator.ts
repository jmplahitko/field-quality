import { IValidatable } from '../abstract/IValidatable';
import { TRuleCollection } from '../abstract/TRuleCollection';

import CollectionRule from './CollectionRule';
import Rule from './Rule';

import copy from '../utils/copy';
import ValidationResultList from './ValidationResultList';
import getProperty from '../utils/getProperty';
import normalizeValidateArgs from '../utils/normalizeValidateArgs';
import { isEqual } from '../utils/quality';


export default class Validator implements IValidatable {
	private _name!: string | undefined;
	private _results: ValidationResultList = new ValidationResultList();
	private _rules: TRuleCollection = {};

	constructor() {

	}

	public get name() {
		return this._name;
	}

	public set name(name: string | undefined) {
		this._name = name;
		this._results.propertyName = name;
	}

	protected ruleFor(propertyName: string): Rule {
		let rule = new Rule(propertyName);

		if (!this._rules[propertyName]) {
			this._rules[propertyName] = [rule];
		} else {
			this._rules[propertyName].push(rule);
		}

		return rule;
	}

	protected ruleForEach(propertyName: string): CollectionRule {
		let rule = new CollectionRule(propertyName);

		if (!this._rules[propertyName]) {
			this._rules[propertyName] = [rule];
		} else {
			this._rules[propertyName].push(rule);
		}

		return rule;
	}

	public validateProperty(propertyName: string, parentValue: any, customOptions?: any): ValidationResultList {
		const prevResult = this._results.get(propertyName);
		const value = getProperty(parentValue, propertyName);
		let resultList;

		if (prevResult && isEqual(prevResult.value, value)) {
			resultList = this._results.getWithRelatedResults(propertyName);
		} else {
			const rules = this._rules[propertyName];
			resultList = new ValidationResultList([], propertyName, value);

			for (let rule of rules) {
				let _results = rule.validate(value, parentValue, customOptions);
				resultList = resultList.merge(_results);
			}
		}

		return resultList;
	}

	public validate(value: any, customOptions?: any): ValidationResultList;
	public validate(value: any, parentValue?: any, customOptions?: any): ValidationResultList {
		let [_value, _parentValue, _customOptions] = normalizeValidateArgs(value, parentValue, customOptions);
		_parentValue = copy(_value);

		let resultList = new ValidationResultList([], this.name || '', _value);

		for (let propertyName in this._rules) {
			let results = this.validateProperty(propertyName, _parentValue, _customOptions);
			resultList = resultList.merge(results);
		}

		if (this.name) {
			resultList.propertyName = this.name;
			resultList.forEach(result => result.propertyName = `${this.name}.${result.propertyName}`);
		}

		this._results = resultList;

		return resultList;
	}
}
