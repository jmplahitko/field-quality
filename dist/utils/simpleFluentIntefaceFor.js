"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.simpleFluentInterfaceFor = simpleFluentInterfaceFor;

function simpleFluentInterfaceFor(rule, qualifier) {
  return {
    as: function as(qualifierName) {
      var qualifierMeta = rule.qualifiers.get(qualifier);

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
    when: function when(precondition) {
      var qualifierMeta = rule.qualifiers.get(qualifier);

      if (qualifierMeta) {
        qualifierMeta.precondition = precondition;
        rule.qualifiers.set(qualifier, qualifierMeta);
      }

      return simpleFluentInterfaceFor(rule, qualifier);
    },
    withMessage: function withMessage(message) {
      var qualifierMeta = rule.qualifiers.get(qualifier);

      if (qualifierMeta) {
        qualifierMeta.message = message;
        rule.qualifiers.set(qualifier, qualifierMeta);
      }

      return rule;
    }
  };
}