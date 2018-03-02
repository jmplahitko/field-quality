import { IValidatable } from '../abstract/IValidatable';
import { TRuleCollection } from '../abstract/TRuleCollection';
import { TValidationResult } from '../abstract/TValidationResult';

import { CollectionRule } from './CollectionRule';
import { Rule } from './Rule';

import { quality } from '../utils/quality';
import copy from '../utils/copy';

const { isEmpty } = quality;

export class Validator implements IValidatable {
	public name: string;
	private _rules: TRuleCollection = {};

	constructor() {
		this.name = this.constructor.name.toLowerCase();
		this.define(this);
	}

	protected define(validator: Validator) {
		console.warn('define not implemented');
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

	private getValidationResult(propertyName: string, value: any, parentValue: any) {
		let result = this._rules[propertyName]
			.map(rule => rule.validate(value, parentValue))
			.reduce(( previousResult, currentResult) => ({
				isValid: previousResult.isValid === true ? currentResult.isValid : previousResult.isValid,
				errors: Object.assign(previousResult.errors, currentResult.errors),
				value: currentResult.value,
			}));

		return result;
	}

	public validate(value: any = {}): TValidationResult {
		value = copy(value);

		let errors: { [ruleName: string]: TValidationResult } = {};

		for (let propName in this._rules) {
			let result = this.getValidationResult(propName, value[propName], value);

			if (!result.isValid) {
				errors[propName] = result;
			}
		}

		return {
			errors,
			isValid: isEmpty(errors),
			value
		}
	}
}
