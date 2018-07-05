import { ISimpleFluentInterface } from '../abstract/ISimpleFluentInterface';
import { TQualifier } from '../abstract/TQualifier';

import { Rule } from '../concrete/Rule';

export function simpleFluentInterfaceFor(rule: Rule, qualifier: TQualifier) {
	return {
		as(qualifierName: string): ISimpleFluentInterface {
			let qualifierMeta = rule.qualifiers.get(qualifier);
			if (qualifierMeta) {
				qualifierMeta.name = qualifierName;
				rule.qualifiers.set(qualifier, qualifierMeta);
			}

			return simpleFluentInterfaceFor(rule, qualifier);
		},
		length: rule.length.bind(rule),
		matches: rule.matches.bind(rule),
		must: rule.must.bind(rule),
		notNull: rule.notNull.bind(rule),
		notEmpty: rule.notEmpty.bind(rule),
		stopOnFirstFailure: rule.stopOnFirstFailure.bind(rule),
		using: rule.using.bind(rule),
		when(precondition: (entity: any) => boolean): ISimpleFluentInterface {
			let qualifierMeta = rule.qualifiers.get(qualifier);
			if (qualifierMeta) {
				qualifierMeta.precondition = precondition;
				rule.qualifiers.set(qualifier, qualifierMeta);
			}
			return simpleFluentInterfaceFor(rule, qualifier);
		},
		withMessage(message: string): Rule {
			let qualifierMeta = rule.qualifiers.get(qualifier);
			if (qualifierMeta) {
				qualifierMeta.message = message;
				rule.qualifiers.set(qualifier, qualifierMeta);
			}
			return rule;
		}
	};
}