import { TQualifier } from './abstract/TQualifier';
import { TQualifierMeta } from './abstract/TQualifierMeta';
import { Field } from './Field';
import { IValidatable } from './abstract/IValidatable';
import { Model } from './Model';
import { IValidationResult } from './abstract/IValidationResult';
import { TModelConstructor } from './abstract/TModelConstructor';
import { TRuleCollection } from './abstract/TRuleCollection';

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

	public must(qualifier: TQualifier) {
		let rule = this;
		this._qualifiers.set(qualifier, { message: `${this.name} is invalid` });
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

	public validate(field: IValidatable): IValidationResult {
		if (this._entity) {
			let Entity = this._entity;
			let testEntity = new Entity(field.value);
			let result = testEntity.validate();
			field.setValidity(result);

			return result;
		} else {
			let result: IValidationResult = {
				value: field.value,
				isValid: true,
				messages: { [this.name]: [] }
			};

			for (let [qualifier, meta] of this._qualifiers) {
				if (!qualifier(field.value)) {
					result.messages[this.name].push(meta.message);
					result.isValid = false;
				}
			}

			for (let ruleName in this._rules) {
				let rule = this._rules[ruleName];
				let _result = rule.validate(field);
				if (!_result.isValid) {
					result.messages[rule.name] = _result.messages[rule.name];
					result.isValid = false;
				}
			}

			field.setValidity(result);

			return result;
		}
	}
}