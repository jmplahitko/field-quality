"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function simpleFluentInterfaceFor(rule, qualifier) {
    return {
        as(qualifierName) {
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
        cascade: rule.cascade.bind(rule),
        using: rule.using.bind(rule),
        when(precondition) {
            let qualifierMeta = rule.qualifiers.get(qualifier);
            if (qualifierMeta) {
                qualifierMeta.precondition = precondition;
                rule.qualifiers.set(qualifier, qualifierMeta);
            }
            return simpleFluentInterfaceFor(rule, qualifier);
        },
        withMessage(message) {
            let qualifierMeta = rule.qualifiers.get(qualifier);
            if (qualifierMeta) {
                qualifierMeta.message = message;
                rule.qualifiers.set(qualifier, qualifierMeta);
            }
            return rule;
        }
    };
}
exports.simpleFluentInterfaceFor = simpleFluentInterfaceFor;
