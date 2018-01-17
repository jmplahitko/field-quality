import { ISimpleFluentInterface } from '../abstract/ISimpleFluentInterface';
import { IValidatable } from '../abstract/IValidatable';
import { TQualifier } from '../abstract/TQualifier';

import { CollectionRule } from '../concrete/CollectionRule';
import { Rule } from '../concrete/Rule';

export function collectionFluentInterfaceFor(rule: CollectionRule, validatable: IValidatable) {
	return {
		length: rule.length.bind(rule),
		matches: rule.matches.bind(rule),
		must: rule.must.bind(rule),
		notNull: rule.notNull.bind(rule),
		notEmpty: rule.notEmpty.bind(rule),
		stopOnFirstFailure: rule.stopOnFirstFailure.bind(rule),
		using: rule.using.bind(rule),
		where(precondition: (entity: any) => boolean): CollectionRule {
			let validatorMeta = rule.validators.get(validatable);
			if (validatorMeta) {
				validatorMeta.precondition = precondition;
				rule.validators.set(validatable, validatorMeta);
			}
			return rule;
		}
	};
}