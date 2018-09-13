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

	length(min: number, max: number): RuleApi {
		return this.__rule.length(min, max);
	}

	lengthOrEmpty(min: number, max: number): RuleApi {
		return this.__rule.lengthOrEmpty(min, max)
	}

	matches(rx: RegExp): RuleApi {
		return this.__rule.matches(rx);
	}

	must(qualifier: TQualifier): RuleApi {
		return this.__rule.must(qualifier);
	}

	notNull(): RuleApi {
		return this.__rule.notNull();
	}

	notEmpty(): RuleApi {
		return this.__rule.notEmpty();
	}

	stopOnFirstFailure(): void {
		return this.__rule.stopOnFirstFailure();
	}

	cascade(): void {
		return this.__rule.cascade();
	}

	using(validatable: IValidatable): any {
		return this.__rule.using(validatable);
	}

	as(qualifierName: string) {
		this.__meta.name = qualifierName;
		return this;
	}

	when(precondition: TPrecondition) {
		this.__meta.precondition = precondition;
		return this;
	}

	withMessage(message: string) {
		this.__meta.message = message;
		return this;
	}
}