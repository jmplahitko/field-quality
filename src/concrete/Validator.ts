import { IValidatable } from '../abstract/IValidatable';
import { TRuleCollection } from '../abstract/TRuleCollection';
import { TValidationResult } from '../abstract/TValidationResult';

import { Rule } from './Rule';

import { quality } from '../utils/quality';
import { isString } from 'util';
const { isEmpty } = quality;

export class Validator implements IValidatable {
	private _rules: TRuleCollection = {};

	constructor() {
		this.define(this);
	}

	protected define(validator: Validator) {
		console.warn('define not implemented');
	}

	protected ruleFor(fieldName: string): Rule {
		if (!this._rules[fieldName]) {
			this._rules[fieldName] = new Rule(fieldName);
		}
		return this._rules[fieldName];
	}

	public validate(value: any, prop: string|Array<string> = []): TValidationResult {
		let props = isString(prop) ? [prop] : prop;
		let errors: { [ruleName: string]: TValidationResult } = {};

		if (isEmpty(props)) {
			for (let propName in this._rules) {
				let _result = this._rules[propName].validate(value, propName);
				if (!_result.isValid) {
					errors[propName] = _result;
				}
			}
		} else {
			for (let propName of props) {
				let _result = this._rules[propName].validate(value, propName);
				if (!_result.isValid) {
					errors[propName] = _result;
				}
			}
		}

		return {
			errors,
			isValid: isEmpty(errors),
			value
		}
	}
}
