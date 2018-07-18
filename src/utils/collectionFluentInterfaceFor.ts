import { IValidatable } from '../abstract/IValidatable';

import { CollectionRule } from '../concrete/CollectionRule';
import { TPrecondition } from '../abstract/TPrecondition';

export function collectionFluentInterfaceFor(rule: CollectionRule, validatable: IValidatable) {
	return {
		length: rule.length.bind(rule),
		lengthOrEmpty: rule.lengthOrEmpty.bind(rule),
		must: rule.must.bind(rule),
		notNull: rule.notNull.bind(rule),
		notEmpty: rule.notEmpty.bind(rule),
		stopOnFirstFailure: rule.stopOnFirstFailure.bind(rule),
		cascade: rule.cascade.bind(rule),
		using: rule.using.bind(rule),
		where(precondition: TPrecondition): CollectionRule {
			let validatorMeta = rule.validators.get(validatable);
			if (validatorMeta) {
				validatorMeta.precondition = precondition;
				rule.validators.set(validatable, validatorMeta);
			}
			return rule;
		}
	};
}