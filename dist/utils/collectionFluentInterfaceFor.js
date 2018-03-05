"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collectionFluentInterfaceFor = collectionFluentInterfaceFor;

function collectionFluentInterfaceFor(rule, validatable) {
  return {
    length: rule.length.bind(rule),
    matches: rule.matches.bind(rule),
    must: rule.must.bind(rule),
    notNull: rule.notNull.bind(rule),
    notEmpty: rule.notEmpty.bind(rule),
    stopOnFirstFailure: rule.stopOnFirstFailure.bind(rule),
    using: rule.using.bind(rule),
    where: function where(precondition) {
      var validatorMeta = rule.validators.get(validatable);

      if (validatorMeta) {
        validatorMeta.precondition = precondition;
        rule.validators.set(validatable, validatorMeta);
      }

      return rule;
    }
  };
}