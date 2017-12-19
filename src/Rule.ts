import { TQualifier } from './abstract/TQualifier';
import { TQualifierMeta } from './abstract/TQualifierMeta';
import { Field } from './Field';
// import { IValidatable } from './abstract/IValidatable';
import { Model } from './Model';
import { TModelConstructor } from './abstract/TModelConstructor';
import { TRuleCollection } from './abstract/TRuleCollection';
import { TValidationResult } from './abstract/TValidationResult';
import { TErrorCollection } from './abstract/TErrorCollection';

export class Rule {
	private _qualifiers: Map<TQualifier, TQualifierMeta> = new Map();
	private _rules: TRuleCollection = {};
	private _entity: TModelConstructor|null = null;

	get entity(): TModelConstructor|null {
		return this._entity;
	}

	constructor(public name: string) {}

	public as(entity: TModelConstructor) {
		this._entity = entity;
	}

	public asArrayOf() {

	}

	public using(rule: Rule): Rule {
		this._rules[rule.name] = rule;
		return this;
	}

	public must(qualifierName: string, qualifier: TQualifier) {
		let rule = this;
		this._qualifiers.set(qualifier, {
			name: qualifierName,
			message: `${this.name} is invalid.`
		});

		return {
			must: rule.must.bind(this),
			withMessage(message: string): Rule {
				let qualifierMeta = rule._qualifiers.get(qualifier);
				if (qualifierMeta) {
					qualifierMeta.message = message;
					rule._qualifiers.set(qualifier, qualifierMeta);
				}
				return rule;
			}
		};
	}

	public validate(field: Field): TValidationResult {
		let errors: TErrorCollection = {};
		let validity = [];

		for (let [qualifier, meta] of this._qualifiers) {
			let isValid = qualifier(field.value)
			if (!isValid) {
				errors[meta.name] = meta.message;
			}

			validity.push(isValid);
		}

		for (let ruleName in this._rules) {
			let rule = this._rules[ruleName];
			let _result = rule.validate(field);
			if (!_result.isValid) {
				for (let ruleNeme in _result.errors) {
					errors[ruleName] = _result.errors[ruleName];
				}
			}

			validity.push(_result.isValid);
		}

		let result = {
			value: field.value,
			isValid: !validity.includes(false),
			errors
		};

		return result;
	}
}