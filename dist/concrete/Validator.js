"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Validator = void 0;

var _CollectionRule = require("./CollectionRule");

var _Rule = require("./Rule");

var _quality = require("../utils/quality");

var _copy = _interopRequireDefault(require("../utils/copy"));

var _ValidationResult = require("./ValidationResult");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var isEmpty = _quality.quality.isEmpty;

var Validator =
/*#__PURE__*/
function () {
  function Validator() {
    _classCallCheck(this, Validator);

    Object.defineProperty(this, "name", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "_rules", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {}
    });
    this.name = this.constructor.name.toLowerCase();
    this.define(this);
  }

  _createClass(Validator, [{
    key: "define",
    value: function define(validator) {
      console.warn('define not implemented');
    }
  }, {
    key: "ruleFor",
    value: function ruleFor(propertyName) {
      var rule = new _Rule.Rule(propertyName);

      if (!this._rules[propertyName]) {
        this._rules[propertyName] = [rule];
      } else {
        this._rules[propertyName].push(rule);
      }

      return rule;
    }
  }, {
    key: "ruleForEach",
    value: function ruleForEach(propertyName) {
      var rule = new _CollectionRule.CollectionRule(propertyName);

      if (!this._rules[propertyName]) {
        this._rules[propertyName] = [rule];
      } else {
        this._rules[propertyName].push(rule);
      }

      return rule;
    }
  }, {
    key: "getValidationResult",
    value: function getValidationResult(propertyName, value, parentValue) {
      var result = this._rules[propertyName].map(function (rule) {
        return rule.validate(value, parentValue);
      }).reduce(function (previousResult, currentResult) {
        return {
          isValid: previousResult.isValid === true ? currentResult.isValid : previousResult.isValid,
          errors: Object.assign(previousResult.errors, currentResult.errors),
          value: currentResult.value
        };
      });

      return result;
    }
  }, {
    key: "validate",
    value: function validate() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      value = (0, _copy.default)(value);
      var errors = {};

      for (var propName in this._rules) {
        var result = this.getValidationResult(propName, value[propName], value);

        if (!result.isValid) {
          errors[propName] = new _ValidationResult.ValidationResult(result);
        }
      }

      return new _ValidationResult.ValidationResult({
        errors: errors,
        isValid: isEmpty(errors),
        value: value
      });
    }
  }]);

  return Validator;
}();

exports.Validator = Validator;