import { IValidatable } from '../abstract/IValidatable';
import { TRuleCollection } from '../abstract/TRuleCollection';
import { TValidationResult } from '../abstract/TValidationResult';

import { CollectionRule } from './CollectionRule';
import { Rule } from './Rule';

import { quality } from '../utils/quality';
import copy from '../utils/copy';
import { ValidationResult } from './ValidationResult';
import getProperty from '../utils/getProperty';

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

	private getValidationResult(propertyName: string, value: any, parentValue: any): TValidationResult {
		let rules = this._rules[propertyName];
		let result: TValidationResult = {
			errors: {},
			get isValid() { return isEmpty(this.errors) },
			value
		};

		for (let rule in rules) {
			if (rules[rule] instanceof CollectionRule) {
				let _result = rules[rule].validate(value, parentValue);

				if (!_result.isValid) {
					for (let errorProp in _result.errors) {
						let propName = `${propertyName}${propertyName.includes('.') ? '.' : ''}${errorProp}`;

						if (_result.errors[errorProp] instanceof ValidationResult) {
							if (result.errors.hasOwnProperty(propName)) {
								result.errors[propName] = new ValidationResult(Object.assign(result.errors[propName], _result.errors[errorProp]));
							} else {
								result.errors[propName] = _result.errors[errorProp];
							}
						} else {
							result.errors[propertyName] = _result;
						}
					}
				}
			} else {
				let _result = rules[rule].validate(value, parentValue);

				if (!_result.isValid) {
					if (result.errors.hasOwnProperty(propertyName)) {
						result.errors[propertyName] = new ValidationResult(Object.assign(result.errors[propertyName], _result));
					} else {
						result.errors[propertyName] = _result;
					}
				}
			}
		}

		return result;
	}

	public validate(value: any = {}): ValidationResult {
		value = copy(value);

		let errors: { [ruleName: string]: ValidationResult } = {};

		for (let propName in this._rules) {
			let result = this.getValidationResult(propName, getProperty(value, propName), value);

			if (!result.isValid) {
				for (let errorProp in result.errors) {
					errors[errorProp] = result.errors[errorProp];
				}
			}
		}

		return new ValidationResult({
			errors,
			isValid: isEmpty(errors),
			value
		});
	}
}
