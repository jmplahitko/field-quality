"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RuleApi = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RuleApi =
/*#__PURE__*/
function () {
  function RuleApi(validatable, meta) {
    _classCallCheck(this, RuleApi);

    Object.defineProperty(this, "__rule", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "__meta", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: void 0
    });
    this.__rule = validatable;
    this.__meta = meta;
  }

  _createClass(RuleApi, [{
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