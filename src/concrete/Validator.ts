import { IValidatable } from '../abstract/IValidatable';
import { TRuleCollection } from '../abstract/TRuleCollection';
import { TValidationResult } from '../abstract/TValidationResult';

import { Rule } from './Rule';
import { CollectionRule } from './CollectionRule';

import { quality } from '../utils/quality';
import { isString } from 'util';
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

	private getValidationResult(propertyName: string, value: any) {
		let result = this._rules[propertyName]
			.map(rule => rule.validate(value, propertyName))
			.reduce(( previousResult, currentResult) => ({
				isValid: previousResult.isValid === true ? currentResult.isValid : previousResult.isValid,
				errors: Object.assign(previousResult.errors, currentResult.errors),
				value: currentResult.value,
			}));

		return result;
	}

	public validate(value: any, props: Array<string> = []): TValidationResult {
		value = copy(value);

		let errors: { [ruleName: string]: TValidationResult } = {};

		let propsToValidate = isEmpty(props) ? Object.keys(this._rules) : props;

		for (let propName of propsToValidate) {
			let result = this.getValidationResult(propName, value);

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
