import { TQualifier } from './abstract/TQualifier';
import { TQualifierMeta } from './abstract/TQualifierMeta';
import { Field } from './Field';
import { TValidationResult } from './abstract/TValidationResult';
import { IValidatable } from './abstract/IValidatable';
import { Model } from './Model';

export class Rule {
	private _qualifiers: Map<TQualifier, TQualifierMeta> = new Map();
	private _rules: Array<Rule> = [];
	private _entity: (new (entity: { [key: string]: any }) => Model)|null = null;

	get entity(): (new (entity: { [key: string]: any }) => Model)|null {
		return this._entity;
	}

	constructor(public name: string) {}

	public as(entity: new (entity: { [key: string]: any }) => Model) {
		this._entity = entity;
	}

	public asArrayOf() {

	}

	public using(rule: Rule): Rule {
		this._rules.push(rule);
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

	public validate(field: IValidatable): TValidationResult {
		if (this._entity) {
			let Entity = this._entity;
			let testEntity = new Entity(field.value);

			let result: TValidationResult = {
				value: field.value,
				isValid: testEntity.isValid,
				messages: { [this.name]: [] }
			}

			if (!result.isValid) {
				for (let _fieldName in testEntity.messages) {
					testEntity.messages[_fieldName].forEach(message => result.messages[this.name].push(message));
				}
			}

			field.setValidity(result);

			return result;
		} else {
			let result: TValidationResult = {
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

			this._rules.forEach(rule => {
				let _result = rule.validate(field);
				if (!_result.isValid) {
					result.messages[rule.name] = _result.messages[rule.name];
					result.isValid = false;
				}
			});

			field.setValidity(result);

			return result;
		}
	}
}