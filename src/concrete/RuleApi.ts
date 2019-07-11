import { Rule } from './Rule';
import { TMeta } from '../abstract/TMeta';
import { TPrecondition } from '../abstract/TPrecondition';
import { IValidatable } from '../abstract/IValidatable';
import { TQualifier } from '../abstract/TQualifier';

export class RuleApi {
	protected __rule: Rule;
	protected __meta: TMeta;

	constructor(validatable: Rule, meta: TMeta) {
		this.__rule = validatable;
		this.__meta = meta;
	}

	public enum(allowedValues: Array<string|number>) {
		return this.__rule.enum(allowedValues);
	}

	public length(min: number, max: number): RuleApi {
		return this.__rule.length(min, max);
	}

	public lengthOrEmpty(min: number, max: number): RuleApi {
		return this.__rule.lengthOrEmpty(min, max)
	}

	public matches(rx: RegExp): RuleApi {
		return this.__rule.matches(rx);
	}

	public max(num: number) {
		return this.__rule.max(num);
	}

	public maxExclusiveOf(num: number) {
		return this.__rule.maxExclusiveOf(num);
	}

	public min(num: number) {
		return this.__rule.min(num);
	}

	public minExclusiveOf(num: number) {
		return this.__rule.minExclusiveOf(num);
	}

	public must(qualifier: TQualifier): RuleApi {
		return this.__rule.must(qualifier);
	}

	public notNull(): RuleApi {
		return this.__rule.notNull();
	}

	public notEmpty(): RuleApi {
		return this.__rule.notEmpty();
	}

	public stopOnFirstFailure(): void {
		return this.__rule.stopOnFirstFailure();
	}

	public cascade(): void {
		return this.__rule.cascade();
	}

	public using(validatable: IValidatable): any {
		return this.__rule.using(validatable);
	}

	public as(qualifierName: string) {
		this.__meta.name = qualifierName;
		return this;
	}

	public when(precondition: TPrecondition) {
		this.__meta.precondition = precondition;
		return this;
	}

	public withMessage(message: string) {
		this.__meta.message = message;
		return this;
	}
}