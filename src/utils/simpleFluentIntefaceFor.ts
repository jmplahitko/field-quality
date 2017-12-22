import { Rule } from "../Rule";
import { TQualifier } from "../abstract/TQualifier";
import { ISimpleFluentInterface } from "../abstract/ISimpleFluentInterface";

export function simpleFluentInterfaceFor(rule: Rule, qualifier: TQualifier) {
	return {
		must: rule.must.bind(rule),
		notNull: rule.notNull.bind(rule),
		notEmpty: rule.notEmpty.bind(rule),
		stopOnFirstFailure: rule.stopOnFirstFailure.bind(rule),
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