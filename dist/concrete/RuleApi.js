"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RuleApi = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RuleApi =
/*#__PURE__*/
function () {
  function RuleApi(validatable, meta) {
    _classCallCheck(this, RuleApi);

    _defineProperty(this, "__rule", void 0);

    _defineProperty(this, "__meta", void 0);

    this.__rule = validatable;
    this.__meta = meta;
  }

  _createClass(RuleApi, [{
    key: "enum",
    value: function _enum(allowedValues) {
      return this.__rule.enum(allowedValues);
    }
  }, {
    key: "length",
    value: function length(min, max) {
      return this.__rule.length(min, max);
    }
  }, {
    key: "lengthOrEmpty",
    value: function lengthOrEmpty(min, max) {
      return this.__rule.lengthOrEmpty(min, max);
    }
  }, {
    key: "matches",
    value: function matches(rx) {
      return this.__rule.matches(rx);
    }
  }, {
    key: "max",
    value: function max(num) {
      return this.__rule.max(num);
    }
  }, {
    key: "maxExclusiveOf",
    value: function maxExclusiveOf(num) {
      return this.__rule.maxExclusiveOf(num);
    }
  }, {
    key: "min",
    value: function min(num) {
      return this.__rule.min(num);
    }
  }, {
    key: "minExclusiveOf",
    value: function minExclusiveOf(num) {
      return this.__rule.minExclusiveOf(num);
    }
  }, {
    key: "must",
    value: function must(qualifier) {
      return this.__rule.must(qualifier);
    }
  }, {
    key: "notNull",
    value: function notNull() {
      return this.__rule.notNull();
    }
  }, {
    key: "notEmpty",
    value: function notEmpty() {
      return this.__rule.notEmpty();
    }
  }, {
    key: "stopOnFirstFailure",
    value: function stopOnFirstFailure() {
      return this.__rule.stopOnFirstFailure();
    }
  }, {
    key: "cascade",
    value: function cascade() {
      return this.__rule.cascade();
    }
  }, {
    key: "using",
    value: function using(validatable) {
      return this.__rule.using(validatable);
    }
  }, {
    key: "as",
    value: function as(qualifierName) {
      this.__meta.name = qualifierName;
      return this;
    }
  }, {
    key: "when",
    value: function when(precondition) {
      this.__meta.precondition = precondition;
      return this;
    }
  }, {
    key: "withMessage",
    value: function withMessage(message) {
      this.__meta.message = message;
      return this;
    }
  }]);

  return RuleApi;
}();

exports.RuleApi = RuleApi;