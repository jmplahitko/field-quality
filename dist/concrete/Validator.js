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

var _getProperty = _interopRequireDefault(require("../utils/getProperty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var isEmpty = _quality.quality.isEmpty;

var Validator =
/*#__PURE__*/
function () {
  function Validator() {
    _classCallCheck(this, Validator);

    _defineProperty(this, "name", void 0);

    _defineProperty(this, "_rules", {});

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
    value: function getValidationResult(propertyName, value, parentValue, customOptions) {
      var rules = this._rules[propertyName];
      var result = {
        errors: {},

        get isValid() {
          return isEmpty(this.errors);
        },

        value: value
      };

      for (var rule in rules) {
        if (rules[rule] instanceof _CollectionRule.CollectionRule) {
          var _result = rules[rule].validate(value, parentValue, customOptions);

          if (!_result.isValid) {
            for (var errorProp in _result.errors) {
              var propName = "".concat(propertyName).concat(propertyName.includes('.') ? '.' : '').concat(errorProp);

              if (_result.errors[errorProp] instanceof _ValidationResult.ValidationResult) {
                if (result.errors.hasOwnProperty(propName)) {
                  result.errors[propName] = new _ValidationResult.ValidationResult(Object.assign(result.errors[propName], _result.errors[errorProp]));
                } else {
                  result.errors[propName] = _result.errors[errorProp];
                }
              } else {
                result.errors[propName] = new _ValidationResult.ValidationResult(_result.errors[errorProp]);
              }
            }
          }
        } else {
          var _result2 = rules[rule].validate(value, parentValue, customOptions);

          if (!_result2.isValid) {
            if (result.errors.hasOwnProperty(propertyName)) {
              result.errors[propertyName] = new _ValidationResult.ValidationResult(Object.assign(result.errors[propertyName], _result2));
            } else {
              result.errors[propertyName] = _result2;
            }
          }
        }
      }

      return result;
    }
  }, {
    key: "validate",
    value: function validate(value, parentValue, customOptions) {
      value = (0, _copy.default)(value);

      if (arguments.length === 3) {
        parentValue = (0, _copy.default)(value);
        customOptions = (0, _copy.default)(arguments[2]);
      } else if (arguments.length === 2) {
        parentValue = (0, _copy.default)(value);
        customOptions = (0, _copy.default)(arguments[1]);
      } else if (arguments.length === 1) {
        parentValue = (0, _copy.default)(value);
      }

      var errors = {};

      for (var propName in this._rules) {
        var result = this.getValidationResult(propName, (0, _getProperty.default)(value, propName), parentValue, customOptions);

        if (!result.isValid) {
          for (var errorProp in result.errors) {
            errors[errorProp] = result.errors[errorProp];
          }
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