import Rule from './Rule';
import Severity from './Severity';

import { IValidatable, TMessageFactory, TValidatableMetadata, TPrecondition, TQualifier } from './types';

export default class RuleApi<TParentValue, TCustomOptions> {
	protected __rule: Rule<TParentValue, TCustomOptions>;
	protected __meta: TValidatableMetadata<TParentValue, TCustomOptions>;

	constructor(validatable: Rule<TParentValue, TCustomOptions>, meta: TValidatableMetadata<TParentValue, TCustomOptions>) {
		this.__rule = validatable;
		this.__meta = meta;
	}

	public enum(allowedValues: Array<string|number>) {
		return this.__rule.enum(allowedValues);
	}

	public length(min: number, max: number): RuleApi<TParentValue, TCustomOptions> {
		return this.__rule.length(min, max);
	}

	public lengthOrEmpty(min: number, max: number): RuleApi<TParentValue, TCustomOptions> {
		return this.__rule.lengthOrEmpty(min, max)
	}

	public matches(rx: RegExp): RuleApi<TParentValue, TCustomOptions> {
		return this.__rule.matches(rx);
	}

	public max(num: number): RuleApi<TParentValue, TCustomOptions> {
		return this.__rule.max(num);
	}

	public maxExclusiveOf(num: number): RuleApi<TParentValue, TCustomOptions> {
		return this.__rule.maxExclusiveOf(num);
	}

	public min(num: number): RuleApi<TParentValue, TCustomOptions> {
		return this.__rule.min(num);
	}

	public minExclusiveOf(num: number): RuleApi<TParentValue, TCustomOptions> {
		return this.__rule.minExclusiveOf(num);
	}

	public must(qualifier: TQualifier<TParentValue, TCustomOptions>): RuleApi<TParentValue, TCustomOptions> {
		return this.__rule.must(qualifier);
	}

	public notNull(): RuleApi<TParentValue, TCustomOptions> {
		return this.__rule.notNull();
	}

	public notEmpty(): RuleApi<TParentValue, TCustomOptions> {
		return this.__rule.notEmpty();
	}

	public cascade(): void {
		return this.__rule.cascade();
	}

	public using(validatable: IValidatable) {
		return this.__rule.using(validatable);
	}

	public as(qualifierName: string): RuleApi<TParentValue, TCustomOptions> {
		this.__meta.name = qualifierName;
		return this;
	}

	public asWarning(): RuleApi<TParentValue, TCustomOptions> {
		this.__meta.severity = Severity.warning;
		return this;
	}

	public when(precondition: TPrecondition<TParentValue, TCustomOptions>): RuleApi<TParentValue, TCustomOptions> {
		this.__meta.precondition = precondition;
		return this;
	}

	public withMessage(message: TMessageFactory<TParentValue, TCustomOptions>): RuleApi<TParentValue, TCustomOptions> {
		this.__meta.message = message;
		return this;
	}
}