"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _RuleApi = _interopRequireDefault(require("./RuleApi"));

var _Severity = _interopRequireDefault(require("./Severity"));

var _ValidationResult = _interopRequireDefault(require("./ValidationResult"));

var _ValidationResultList = _interopRequireDefault(require("./ValidationResultList"));

var _copy = _interopRequireDefault(require("./utils/copy"));

var _qualifiers = require("./utils/qualifiers");

var _quality = require("./utils/quality");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Rule = /*#__PURE__*/function () {
  function Rule(propertyName) {
    _classCallCheck(this, Rule);

    _defineProperty(this, "propertyName", void 0);

    _defineProperty(this, "_qualifiers", new Map());

    _defineProperty(this, "_validators", new Map());

    _defineProperty(this, "_stopOnFirstFailure", true);

    this.propertyName = propertyName || '';
  }

  _createClass(Rule, [{
    key: "enum",
    value: function _enum(allowedValues) {
      var _this = this;

      var beEnumeratedValue = (0, _qualifiers.beValidEnum)(allowedValues);
      var meta = {
        name: "beEnumeratedValue",
        message: function message() {
          return "".concat(_this.propertyName, " must be one of the following: \"").concat(allowedValues.join(', '), "\".");
        },
        precondition: null,
        isValidIfEmpty: true,
        severity: _Severity["default"]["default"]
      };

      this._qualifiers.set(beEnumeratedValue, meta);

      return new _RuleApi["default"](this, meta);
    }
  }, {
    key: "length",
    value: function length(min, max) {
      var _this2 = this;

      var beBetween = (0, _qualifiers.length)(min, max);
      var meta = {
        name: "beBetween".concat(min, "and").concat(max),
        message: function message() {
          return "".concat(_this2.propertyName, " must be between ").concat(min, " and ").concat(max, ".");
        },
        precondition: null,
        isValidIfEmpty: false,
        severity: _Severity["default"]["default"]
      };

      this._qualifiers.set(beBetween, meta);

      return new _RuleApi["default"](this, meta);
    }
  }, {
    key: "lengthOrEmpty",
    value: function lengthOrEmpty(min, max) {
      var _this3 = this;

      var beBetween = (0, _qualifiers.length)(min, max);
      var meta = {
        name: "beBetween".concat(min, "and").concat(max, "OrEmpty"),
        message: function message() {
          return "".concat(_this3.propertyName, " must be between ").concat(min, " and ").concat(max, ".");
        },
        precondition: null,
        isValidIfEmpty: true,
        severity: _Severity["default"]["default"]
      };

      this._qualifiers.set(beBetween, meta);

      return new _RuleApi["default"](this, meta);
    }
  }, {
    key: "matches",
    value: function matches(rx) {
      var _this4 = this;

      var matches = (0, _qualifiers.match)(rx);

      var matchRx = function matchRx(val) {
        return (0, _quality.isNull)(val) || matches(val);
      };

      var meta = {
        name: matchRx.name,
        message: function message() {
          return "".concat(_this4.propertyName, " is an invalid format.");
        },
        precondition: null,
        isValidIfEmpty: true,
        severity: _Severity["default"]["default"]
      };

      this._qualifiers.set(matchRx, meta);

      return new _RuleApi["default"](this, meta);
    }
  }, {
    key: "notNull",
    value: function notNull() {
      var _this5 = this;

      var meta = {
        name: _qualifiers.notNull.name,
        message: function message() {
          return "".concat(_this5.propertyName, " cannot be null.");
        },
        precondition: null,
        isValidIfEmpty: false,
        severity: _Severity["default"]["default"]
      };

      this._qualifiers.set(_qualifiers.notNull, meta);

      return new _RuleApi["default"](this, meta);
    }
  }, {
    key: "notEmpty",
    value: function notEmpty() {
      var _this6 = this;

      var meta = {
        name: _qualifiers.notEmpty.name,
        message: function message() {
          return "".concat(_this6.propertyName, " cannot be empty.");
        },
        precondition: null,
        isValidIfEmpty: false,
        severity: _Severity["default"]["default"]
      };

      this._qualifiers.set(_qualifiers.notEmpty, meta);

      return new _RuleApi["default"](this, meta);
    }
  }, {
    key: "max",
    value: function max(num) {
      var _this7 = this;

      var beLessThanOrEqual = (0, _qualifiers.max)(num);
      var meta = {
        name: 'beLessThanOrEqual',
        message: function message() {
          return "".concat(_this7.propertyName, " cannot be greater than or equal to ").concat(num, ".");
        },
        precondition: null,
        isValidIfEmpty: false,
        severity: _Severity["default"]["default"]
      };

      this._qualifiers.set(beLessThanOrEqual, meta);

      return new _RuleApi["default"](this, meta);
    }
  }, {
    key: "maxExclusiveOf",
    value: function maxExclusiveOf(num) {
      var _this8 = this;

      var beLessThan = (0, _qualifiers.max)(num - 1);
      var meta = {
        name: 'beLessThan',
        message: function message() {
          return "".concat(_this8.propertyName, " cannot be greater than ").concat(num, ".");
        },
        precondition: null,
        isValidIfEmpty: false,
        severity: _Severity["default"]["default"]
      };

      this._qualifiers.set(beLessThan, meta);

      return new _RuleApi["default"](this, meta);
    }
  }, {
    key: "min",
    value: function min(num) {
      var _this9 = this;

      var beGreaterThanOrEqual = (0, _qualifiers.min)(num);
      var meta = {
        name: 'beGreaterThanOrEqual',
        message: function message() {
          return "".concat(_this9.propertyName, " cannot be less than or equal to ").concat(num, ".");
        },
        precondition: null,
        isValidIfEmpty: false,
        severity: _Severity["default"]["default"]
      };

      this._qualifiers.set(beGreaterThanOrEqual, meta);

      return new _RuleApi["default"](this, meta);
    }
  }, {
    key: "minExclusiveOf",
    value: function minExclusiveOf(num) {
      var _this10 = this;

      var beGreaterThan = (0, _qualifiers.min)(num + 1);
      var meta = {
        name: 'beGreaterThan',
        message: function message() {
          return "".concat(_this10.propertyName, " cannot be less than ").concat(num, ".");
        },
        precondition: null,
        isValidIfEmpty: false,
        severity: _Severity["default"]["default"]
      };

      this._qualifiers.set(beGreaterThan, meta);

      return new _RuleApi["default"](this, meta);
    }
  }, {
    key: "must",
    value: function must(qualifier) {
      var _this11 = this;

      var meta = {
        name: qualifier.name,
        message: function message() {
          return "".concat(_this11.propertyName, " is invalid.");
        },
        precondition: null,
        isValidIfEmpty: false,
        severity: _Severity["default"]["default"]
      };

      this._qualifiers.set(qualifier, meta);

      return new _RuleApi["default"](this, meta);
    }
  }, {
    key: "cascade",
    value: function cascade() {
      this._stopOnFirstFailure = false;
    }
  }, {
    key: "using",
    value: function using(validatable) {
      validatable.propertyName = this.propertyName || validatable.propertyName || '';
      var meta = {
        name: validatable.propertyName,
        message: function message() {
          return '';
        },
        precondition: null,
        isValidIfEmpty: false,
        severity: _Severity["default"]["default"]
      };

      this._validators.set(validatable, meta);

      return this;
    }
  }, {
    key: "if",
    value: function _if(precondition, define) {
      var rule = new Rule(this.propertyName);
      var meta = {
        name: rule.propertyName,
        message: function message() {
          return '';
        },
        precondition: precondition,
        isValidIfEmpty: false,
        severity: _Severity["default"]["default"]
      };

      this._validators.set(rule, meta);

      define(rule);
      return this;
    }
  }, {
    key: "__runQualifiers",
    value: function __runQualifiers(propValue, parentValue, customOptions, results) {
      var result = new _ValidationResult["default"](this.propertyName, propValue);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._qualifiers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2),
              qualifier = _step$value[0],
              meta = _step$value[1];

          // We check if we should run the validator based on whether the property has a value
          if ((0, _quality.isEmpty)(propValue) && meta.isValidIfEmpty) {
            continue;
          } // We check for a precondition to exist for a qualifier before calling it


          if (!meta.precondition || meta.precondition(parentValue, customOptions)) {
            var isValid = qualifier(propValue, parentValue, customOptions);

            if (!isValid) {
              if (meta.severity === _Severity["default"].error) {
                result.errors[meta.name] = meta.message(propValue, parentValue, customOptions); // Short-circuit if we have to stopOnFirstFailure

                if (this._stopOnFirstFailure) {
                  break;
                }
              } else {
                result.warnings[meta.name] = meta.message(propValue, parentValue, customOptions);
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      results.push(result);
      return results;
    }
  }, {
    key: "__runValidators",
    value: function __runValidators(propValue, parentValue, customOptions, results) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this._validators[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _step2$value = _slicedToArray(_step2.value, 2),
              validator = _step2$value[0],
              meta = _step2$value[1];

          if (!meta.precondition || meta.precondition(parentValue, customOptions)) {
            var _resultList = validator.validate(propValue, parentValue, customOptions);

            results = results.merge(_resultList);

            if (!results.isValid && this._stopOnFirstFailure) {
              break;
            }
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return results;
    }
  }, {
    key: "__getPropertyResults",
    value: function __getPropertyResults(value, parentValue, customOptions, results) {
      results = this.__runQualifiers(value, parentValue, customOptions, results);

      if (results.isValid || !this._stopOnFirstFailure) {
        results = this.__runValidators(value, parentValue, customOptions, results);
      }

      return results;
    }
  }, {
    key: "validate",
    value: function validate(value, parentValue, customOptions) {
      value = (0, _copy["default"])(value);
      parentValue = (0, _copy["default"])(parentValue);
      var results = new _ValidationResultList["default"]([], this.propertyName, value);
      return this.__getPropertyResults(value, parentValue, customOptions, results);
    }
  }]);

  return Rule;
}();

exports["default"] = Rule;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9SdWxlLnRzIl0sIm5hbWVzIjpbIlJ1bGUiLCJwcm9wZXJ0eU5hbWUiLCJNYXAiLCJhbGxvd2VkVmFsdWVzIiwiYmVFbnVtZXJhdGVkVmFsdWUiLCJtZXRhIiwibmFtZSIsIm1lc3NhZ2UiLCJqb2luIiwicHJlY29uZGl0aW9uIiwiaXNWYWxpZElmRW1wdHkiLCJzZXZlcml0eSIsIlNldmVyaXR5IiwiX3F1YWxpZmllcnMiLCJzZXQiLCJSdWxlQXBpIiwibWluIiwibWF4IiwiYmVCZXR3ZWVuIiwicngiLCJtYXRjaGVzIiwibWF0Y2hSeCIsInZhbCIsIm5vdE51bGwiLCJub3RFbXB0eSIsIm51bSIsImJlTGVzc1RoYW5PckVxdWFsIiwiYmVMZXNzVGhhbiIsImJlR3JlYXRlclRoYW5PckVxdWFsIiwiYmVHcmVhdGVyVGhhbiIsInF1YWxpZmllciIsIl9zdG9wT25GaXJzdEZhaWx1cmUiLCJ2YWxpZGF0YWJsZSIsIl92YWxpZGF0b3JzIiwiZGVmaW5lIiwicnVsZSIsInByb3BWYWx1ZSIsInBhcmVudFZhbHVlIiwiY3VzdG9tT3B0aW9ucyIsInJlc3VsdHMiLCJyZXN1bHQiLCJWYWxpZGF0aW9uUmVzdWx0IiwiaXNWYWxpZCIsImVycm9yIiwiZXJyb3JzIiwid2FybmluZ3MiLCJwdXNoIiwidmFsaWRhdG9yIiwiX3Jlc3VsdExpc3QiLCJ2YWxpZGF0ZSIsIm1lcmdlIiwidmFsdWUiLCJfX3J1blF1YWxpZmllcnMiLCJfX3J1blZhbGlkYXRvcnMiLCJWYWxpZGF0aW9uUmVzdWx0TGlzdCIsIl9fZ2V0UHJvcGVydHlSZXN1bHRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBSUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxJO0FBTXBCLGdCQUFZQyxZQUFaLEVBQW1DO0FBQUE7O0FBQUE7O0FBQUEseUNBSnlDLElBQUlDLEdBQUosRUFJekM7O0FBQUEseUNBSHlDLElBQUlBLEdBQUos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TUFBQUEsS0FBSyxHQUFHLHNCQUFLQSxLQUFMLENBQVI7QUFDQWQsTUFBQUEsV0FBVyxHQUFHLHNCQUFLQSxXQUFMLENBQWQ7QUFFQSxVQUFJRSxPQUFPLEdBQUcsSUFBSWUsZ0NBQUosQ0FBeUIsRUFBekIsRUFBNkIsS0FBS3JELFlBQWxDLEVBQWdEa0QsS0FBaEQsQ0FBZDtBQUVBLGFBQU8sS0FBS0ksb0JBQUwsQ0FBMEJKLEtBQTFCLEVBQWlDZCxXQUFqQyxFQUE4Q0MsYUFBOUMsRUFBNkRDLE9BQTdELENBQVA7QUFFQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSdWxlQXBpIGZyb20gJy4vUnVsZUFwaSc7XG5pbXBvcnQgU2V2ZXJpdHkgZnJvbSAnLi9TZXZlcml0eSc7XG5pbXBvcnQgVmFsaWRhdGlvblJlc3VsdCBmcm9tICcuL1ZhbGlkYXRpb25SZXN1bHQnO1xuaW1wb3J0IFZhbGlkYXRpb25SZXN1bHRMaXN0IGZyb20gJy4vVmFsaWRhdGlvblJlc3VsdExpc3QnO1xuXG5pbXBvcnQgeyBJVmFsaWRhdGFibGUsIFRQcmVjb25kaXRpb24sIFRRdWFsaWZpZXIsIFRRdWFsaWZpZXJDb2xsZWN0aW9uLCBUVmFsaWRhdG9yQ29sbGVjdGlvbiB9IGZyb20gJy4vdHlwZXMnO1xuXG5pbXBvcnQgY29weSBmcm9tICcuL3V0aWxzL2NvcHknO1xuaW1wb3J0IHsgbGVuZ3RoLCBtYXRjaCwgbWF4LCBtaW4sIG5vdEVtcHR5LCBub3ROdWxsLCBiZVZhbGlkRW51bSB9IGZyb20gJy4vdXRpbHMvcXVhbGlmaWVycyc7XG5pbXBvcnQgeyBpc0VtcHR5LCBpc051bGwgfSBmcm9tICcuL3V0aWxzL3F1YWxpdHknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSdWxlPFRQYXJlbnRWYWx1ZSA9IGFueSwgVEN1c3RvbU9wdGlvbnMgPSBhbnk+IGltcGxlbWVudHMgSVZhbGlkYXRhYmxlPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+IHtcblx0cHVibGljIHByb3BlcnR5TmFtZTogc3RyaW5nO1xuXHRwcm90ZWN0ZWQgX3F1YWxpZmllcnM6IFRRdWFsaWZpZXJDb2xsZWN0aW9uPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+ID0gbmV3IE1hcCgpO1xuXHRwcm90ZWN0ZWQgX3ZhbGlkYXRvcnM6IFRWYWxpZGF0b3JDb2xsZWN0aW9uPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+ID0gbmV3IE1hcCgpO1xuXHRwcm90ZWN0ZWQgX3N0b3BPbkZpcnN0RmFpbHVyZTogYm9vbGVhbiA9IHRydWU7XG5cblx0Y29uc3RydWN0b3IocHJvcGVydHlOYW1lPzogc3RyaW5nKSB7XG5cdFx0dGhpcy5wcm9wZXJ0eU5hbWUgPSBwcm9wZXJ0eU5hbWUgfHwgJyc7XG5cdH1cblxuXHRwdWJsaWMgZW51bShhbGxvd2VkVmFsdWVzOiBBcnJheTxzdHJpbmd8bnVtYmVyPik6IFJ1bGVBcGk8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ge1xuXHRcdGxldCBiZUVudW1lcmF0ZWRWYWx1ZSA9IGJlVmFsaWRFbnVtKGFsbG93ZWRWYWx1ZXMpO1xuXG5cdFx0bGV0IG1ldGEgPSB7XG5cdFx0XHRuYW1lOiBgYmVFbnVtZXJhdGVkVmFsdWVgLFxuXHRcdFx0bWVzc2FnZTogKCkgPT4gIGAke3RoaXMucHJvcGVydHlOYW1lfSBtdXN0IGJlIG9uZSBvZiB0aGUgZm9sbG93aW5nOiBcIiR7YWxsb3dlZFZhbHVlcy5qb2luKCcsICcpfVwiLmAsXG5cdFx0XHRwcmVjb25kaXRpb246IG51bGwsXG5cdFx0XHRpc1ZhbGlkSWZFbXB0eTogdHJ1ZSxcblx0XHRcdHNldmVyaXR5OiBTZXZlcml0eS5kZWZhdWx0XG5cdFx0fTtcblxuXHRcdHRoaXMuX3F1YWxpZmllcnMuc2V0KGJlRW51bWVyYXRlZFZhbHVlLCBtZXRhKTtcblxuXHRcdHJldHVybiBuZXcgUnVsZUFwaTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPih0aGlzLCBtZXRhKTtcblx0fVxuXG5cdHB1YmxpYyBsZW5ndGgobWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogUnVsZUFwaTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiB7XG5cdFx0bGV0IGJlQmV0d2VlbiA9IGxlbmd0aChtaW4sIG1heCk7XG5cdFx0bGV0IG1ldGEgPSB7XG5cdFx0XHRuYW1lOiBgYmVCZXR3ZWVuJHttaW59YW5kJHttYXh9YCxcblx0XHRcdG1lc3NhZ2U6ICgpID0+ICBgJHt0aGlzLnByb3BlcnR5TmFtZX0gbXVzdCBiZSBiZXR3ZWVuICR7bWlufSBhbmQgJHttYXh9LmAsXG5cdFx0XHRwcmVjb25kaXRpb246IG51bGwsXG5cdFx0XHRpc1ZhbGlkSWZFbXB0eTogZmFsc2UsXG5cdFx0XHRzZXZlcml0eTogU2V2ZXJpdHkuZGVmYXVsdFxuXHRcdH07XG5cblx0XHR0aGlzLl9xdWFsaWZpZXJzLnNldChiZUJldHdlZW4sIG1ldGEpO1xuXG5cdFx0cmV0dXJuIG5ldyBSdWxlQXBpPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+KHRoaXMsIG1ldGEpO1xuXHR9XG5cblx0cHVibGljIGxlbmd0aE9yRW1wdHkobWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogUnVsZUFwaTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiB7XG5cdFx0bGV0IGJlQmV0d2VlbiA9IGxlbmd0aChtaW4sIG1heCk7XG5cdFx0bGV0IG1ldGEgPSB7XG5cdFx0XHRuYW1lOiBgYmVCZXR3ZWVuJHttaW59YW5kJHttYXh9T3JFbXB0eWAsXG5cdFx0XHRtZXNzYWdlOiAoKSA9PiAgYCR7dGhpcy5wcm9wZXJ0eU5hbWV9IG11c3QgYmUgYmV0d2VlbiAke21pbn0gYW5kICR7bWF4fS5gLFxuXHRcdFx0cHJlY29uZGl0aW9uOiBudWxsLFxuXHRcdFx0aXNWYWxpZElmRW1wdHk6IHRydWUsXG5cdFx0XHRzZXZlcml0eTogU2V2ZXJpdHkuZGVmYXVsdFxuXHRcdH07XG5cblx0XHR0aGlzLl9xdWFsaWZpZXJzLnNldChiZUJldHdlZW4sIG1ldGEpO1xuXG5cdFx0cmV0dXJuIG5ldyBSdWxlQXBpPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+KHRoaXMsIG1ldGEpO1xuXHR9XG5cblx0cHVibGljIG1hdGNoZXMocng6IFJlZ0V4cCk6IFJ1bGVBcGk8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ge1xuXHRcdGxldCBtYXRjaGVzID0gbWF0Y2gocngpO1xuXHRcdGxldCBtYXRjaFJ4ID0gKHZhbDogYW55KSA9PiBpc051bGwodmFsKSB8fCBtYXRjaGVzKHZhbCk7XG5cdFx0bGV0IG1ldGEgPSB7XG5cdFx0XHRuYW1lOiBtYXRjaFJ4Lm5hbWUsXG5cdFx0XHRtZXNzYWdlOiAoKSA9PiAgYCR7dGhpcy5wcm9wZXJ0eU5hbWV9IGlzIGFuIGludmFsaWQgZm9ybWF0LmAsXG5cdFx0XHRwcmVjb25kaXRpb246IG51bGwsXG5cdFx0XHRpc1ZhbGlkSWZFbXB0eTogdHJ1ZSxcblx0XHRcdHNldmVyaXR5OiBTZXZlcml0eS5kZWZhdWx0XG5cdFx0fTtcblxuXHRcdHRoaXMuX3F1YWxpZmllcnMuc2V0KG1hdGNoUngsIG1ldGEpO1xuXG5cdFx0cmV0dXJuIG5ldyBSdWxlQXBpPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+KHRoaXMsIG1ldGEpO1xuXHR9XG5cblx0cHVibGljIG5vdE51bGwoKTogUnVsZUFwaTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiB7XG5cdFx0bGV0IG1ldGEgPSB7XG5cdFx0XHRuYW1lOiBub3ROdWxsLm5hbWUsXG5cdFx0XHRtZXNzYWdlOiAoKSA9PiAgYCR7dGhpcy5wcm9wZXJ0eU5hbWV9IGNhbm5vdCBiZSBudWxsLmAsXG5cdFx0XHRwcmVjb25kaXRpb246IG51bGwsXG5cdFx0XHRpc1ZhbGlkSWZFbXB0eTogZmFsc2UsXG5cdFx0XHRzZXZlcml0eTogU2V2ZXJpdHkuZGVmYXVsdFxuXHRcdH07XG5cblx0XHR0aGlzLl9xdWFsaWZpZXJzLnNldChub3ROdWxsLCBtZXRhKTtcblxuXHRcdHJldHVybiBuZXcgUnVsZUFwaTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPih0aGlzLCBtZXRhKTtcblx0fVxuXG5cdHB1YmxpYyBub3RFbXB0eSgpOiBSdWxlQXBpPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+IHtcblx0XHRsZXQgbWV0YSA9IHtcblx0XHRcdG5hbWU6IG5vdEVtcHR5Lm5hbWUsXG5cdFx0XHRtZXNzYWdlOiAoKSA9PiAgYCR7dGhpcy5wcm9wZXJ0eU5hbWV9IGNhbm5vdCBiZSBlbXB0eS5gLFxuXHRcdFx0cHJlY29uZGl0aW9uOiBudWxsLFxuXHRcdFx0aXNWYWxpZElmRW1wdHk6IGZhbHNlLFxuXHRcdFx0c2V2ZXJpdHk6IFNldmVyaXR5LmRlZmF1bHRcblx0XHR9O1xuXG5cdFx0dGhpcy5fcXVhbGlmaWVycy5zZXQobm90RW1wdHksIG1ldGEpO1xuXG5cdFx0cmV0dXJuIG5ldyBSdWxlQXBpPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+KHRoaXMsIG1ldGEpO1xuXHR9XG5cblx0cHVibGljIG1heChudW06IG51bWJlcik6IFJ1bGVBcGk8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ge1xuXHRcdGxldCBiZUxlc3NUaGFuT3JFcXVhbCA9IG1heChudW0pO1xuXG5cdFx0bGV0IG1ldGEgPSB7XG5cdFx0XHRuYW1lOiAnYmVMZXNzVGhhbk9yRXF1YWwnLFxuXHRcdFx0bWVzc2FnZTogKCkgPT4gIGAke3RoaXMucHJvcGVydHlOYW1lfSBjYW5ub3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICR7bnVtfS5gLFxuXHRcdFx0cHJlY29uZGl0aW9uOiBudWxsLFxuXHRcdFx0aXNWYWxpZElmRW1wdHk6IGZhbHNlLFxuXHRcdFx0c2V2ZXJpdHk6IFNldmVyaXR5LmRlZmF1bHRcblx0XHR9O1xuXG5cdFx0dGhpcy5fcXVhbGlmaWVycy5zZXQoYmVMZXNzVGhhbk9yRXF1YWwgYXMgVFF1YWxpZmllciwgbWV0YSk7XG5cblx0XHRyZXR1cm4gbmV3IFJ1bGVBcGk8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4odGhpcywgbWV0YSk7XG5cdH1cblxuXHRwdWJsaWMgbWF4RXhjbHVzaXZlT2YobnVtOiBudW1iZXIpOiBSdWxlQXBpPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+IHtcblx0XHRsZXQgYmVMZXNzVGhhbiA9IG1heChudW0gLSAxKTtcblxuXHRcdGxldCBtZXRhID0ge1xuXHRcdFx0bmFtZTogJ2JlTGVzc1RoYW4nLFxuXHRcdFx0bWVzc2FnZTogKCkgPT4gIGAke3RoaXMucHJvcGVydHlOYW1lfSBjYW5ub3QgYmUgZ3JlYXRlciB0aGFuICR7bnVtfS5gLFxuXHRcdFx0cHJlY29uZGl0aW9uOiBudWxsLFxuXHRcdFx0aXNWYWxpZElmRW1wdHk6IGZhbHNlLFxuXHRcdFx0c2V2ZXJpdHk6IFNldmVyaXR5LmRlZmF1bHRcblx0XHR9O1xuXG5cdFx0dGhpcy5fcXVhbGlmaWVycy5zZXQoYmVMZXNzVGhhbiBhcyBUUXVhbGlmaWVyLCBtZXRhKTtcblxuXHRcdHJldHVybiBuZXcgUnVsZUFwaTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPih0aGlzLCBtZXRhKTtcblx0fVxuXG5cdHB1YmxpYyBtaW4obnVtOiBudW1iZXIpOiBSdWxlQXBpPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+IHtcblx0XHRsZXQgYmVHcmVhdGVyVGhhbk9yRXF1YWwgPSBtaW4obnVtKTtcblxuXHRcdGxldCBtZXRhID0ge1xuXHRcdFx0bmFtZTogJ2JlR3JlYXRlclRoYW5PckVxdWFsJyxcblx0XHRcdG1lc3NhZ2U6ICgpID0+ICBgJHt0aGlzLnByb3BlcnR5TmFtZX0gY2Fubm90IGJlIGxlc3MgdGhhbiBvciBlcXVhbCB0byAke251bX0uYCxcblx0XHRcdHByZWNvbmRpdGlvbjogbnVsbCxcblx0XHRcdGlzVmFsaWRJZkVtcHR5OiBmYWxzZSxcblx0XHRcdHNldmVyaXR5OiBTZXZlcml0eS5kZWZhdWx0XG5cdFx0fTtcblxuXHRcdHRoaXMuX3F1YWxpZmllcnMuc2V0KGJlR3JlYXRlclRoYW5PckVxdWFsIGFzIFRRdWFsaWZpZXIsIG1ldGEpO1xuXG5cdFx0cmV0dXJuIG5ldyBSdWxlQXBpPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+KHRoaXMsIG1ldGEpO1xuXHR9XG5cblx0cHVibGljIG1pbkV4Y2x1c2l2ZU9mKG51bTogbnVtYmVyKTogUnVsZUFwaTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiB7XG5cdFx0bGV0IGJlR3JlYXRlclRoYW4gPSBtaW4obnVtICsgMSk7XG5cblx0XHRsZXQgbWV0YSA9IHtcblx0XHRcdG5hbWU6ICdiZUdyZWF0ZXJUaGFuJyxcblx0XHRcdG1lc3NhZ2U6ICgpID0+ICBgJHt0aGlzLnByb3BlcnR5TmFtZX0gY2Fubm90IGJlIGxlc3MgdGhhbiAke251bX0uYCxcblx0XHRcdHByZWNvbmRpdGlvbjogbnVsbCxcblx0XHRcdGlzVmFsaWRJZkVtcHR5OiBmYWxzZSxcblx0XHRcdHNldmVyaXR5OiBTZXZlcml0eS5kZWZhdWx0XG5cdFx0fTtcblxuXHRcdHRoaXMuX3F1YWxpZmllcnMuc2V0KGJlR3JlYXRlclRoYW4gYXMgVFF1YWxpZmllciwgbWV0YSk7XG5cblx0XHRyZXR1cm4gbmV3IFJ1bGVBcGk8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4odGhpcywgbWV0YSk7XG5cdH1cblxuXHRwdWJsaWMgbXVzdChxdWFsaWZpZXI6IFRRdWFsaWZpZXI8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4pOiBSdWxlQXBpPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+IHtcblx0XHRsZXQgbWV0YSA9IHtcblx0XHRcdG5hbWU6IHF1YWxpZmllci5uYW1lLFxuXHRcdFx0bWVzc2FnZTogKCkgPT4gIGAke3RoaXMucHJvcGVydHlOYW1lfSBpcyBpbnZhbGlkLmAsXG5cdFx0XHRwcmVjb25kaXRpb246IG51bGwsXG5cdFx0XHRpc1ZhbGlkSWZFbXB0eTogZmFsc2UsXG5cdFx0XHRzZXZlcml0eTogU2V2ZXJpdHkuZGVmYXVsdFxuXHRcdH07XG5cblx0XHR0aGlzLl9xdWFsaWZpZXJzLnNldChxdWFsaWZpZXIsIG1ldGEpO1xuXG5cdFx0cmV0dXJuIG5ldyBSdWxlQXBpPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+KHRoaXMsIG1ldGEpO1xuXHR9XG5cblx0cHVibGljIGNhc2NhZGUoKTogdm9pZCB7XG5cdFx0dGhpcy5fc3RvcE9uRmlyc3RGYWlsdXJlID0gZmFsc2U7XG5cdH1cblxuXHRwdWJsaWMgdXNpbmcodmFsaWRhdGFibGU6IElWYWxpZGF0YWJsZTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPik6IFJ1bGUge1xuXHRcdHZhbGlkYXRhYmxlLnByb3BlcnR5TmFtZSA9IHRoaXMucHJvcGVydHlOYW1lIHx8IHZhbGlkYXRhYmxlLnByb3BlcnR5TmFtZSB8fCAnJztcblxuXHRcdGxldCBtZXRhID0ge1xuXHRcdFx0bmFtZTogdmFsaWRhdGFibGUucHJvcGVydHlOYW1lLFxuXHRcdFx0bWVzc2FnZTogKCkgPT4gICcnLFxuXHRcdFx0cHJlY29uZGl0aW9uOiBudWxsLFxuXHRcdFx0aXNWYWxpZElmRW1wdHk6IGZhbHNlLFxuXHRcdFx0c2V2ZXJpdHk6IFNldmVyaXR5LmRlZmF1bHRcblx0XHR9O1xuXG5cdFx0dGhpcy5fdmFsaWRhdG9ycy5zZXQodmFsaWRhdGFibGUsIG1ldGEpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cHVibGljIGlmKHByZWNvbmRpdGlvbjogVFByZWNvbmRpdGlvbjxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiwgZGVmaW5lOiAocnVsZTogUnVsZTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPikgPT4gdm9pZCk6IFJ1bGUge1xuXHRcdGxldCBydWxlID0gbmV3IFJ1bGUodGhpcy5wcm9wZXJ0eU5hbWUpO1xuXHRcdGxldCBtZXRhID0ge1xuXHRcdFx0bmFtZTogcnVsZS5wcm9wZXJ0eU5hbWUsXG5cdFx0XHRtZXNzYWdlOiAoKSA9PiAgJycsXG5cdFx0XHRwcmVjb25kaXRpb24sXG5cdFx0XHRpc1ZhbGlkSWZFbXB0eTogZmFsc2UsXG5cdFx0XHRzZXZlcml0eTogU2V2ZXJpdHkuZGVmYXVsdFxuXHRcdH07XG5cblx0XHR0aGlzLl92YWxpZGF0b3JzLnNldChydWxlLCBtZXRhKTtcblx0XHRkZWZpbmUocnVsZSk7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHByb3RlY3RlZCBfX3J1blF1YWxpZmllcnMocHJvcFZhbHVlOiBhbnksIHBhcmVudFZhbHVlOiBhbnksIGN1c3RvbU9wdGlvbnM6IGFueSwgcmVzdWx0czogVmFsaWRhdGlvblJlc3VsdExpc3QpOiBWYWxpZGF0aW9uUmVzdWx0TGlzdCB7XG5cdFx0Y29uc3QgcmVzdWx0ID0gbmV3IFZhbGlkYXRpb25SZXN1bHQodGhpcy5wcm9wZXJ0eU5hbWUsIHByb3BWYWx1ZSk7XG5cblx0XHRmb3IgKGxldCBbcXVhbGlmaWVyLCBtZXRhXSBvZiB0aGlzLl9xdWFsaWZpZXJzKSB7XG5cdFx0XHQvLyBXZSBjaGVjayBpZiB3ZSBzaG91bGQgcnVuIHRoZSB2YWxpZGF0b3IgYmFzZWQgb24gd2hldGhlciB0aGUgcHJvcGVydHkgaGFzIGEgdmFsdWVcblx0XHRcdGlmIChpc0VtcHR5KHByb3BWYWx1ZSkgJiYgbWV0YS5pc1ZhbGlkSWZFbXB0eSkge1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gV2UgY2hlY2sgZm9yIGEgcHJlY29uZGl0aW9uIHRvIGV4aXN0IGZvciBhIHF1YWxpZmllciBiZWZvcmUgY2FsbGluZyBpdFxuXHRcdFx0aWYgKCFtZXRhLnByZWNvbmRpdGlvbiB8fCBtZXRhLnByZWNvbmRpdGlvbihwYXJlbnRWYWx1ZSwgY3VzdG9tT3B0aW9ucykpIHtcblx0XHRcdFx0bGV0IGlzVmFsaWQgPSBxdWFsaWZpZXIocHJvcFZhbHVlLCBwYXJlbnRWYWx1ZSwgY3VzdG9tT3B0aW9ucyk7XG5cblx0XHRcdFx0aWYgKCFpc1ZhbGlkKSB7XG5cdFx0XHRcdFx0aWYgKG1ldGEuc2V2ZXJpdHkgPT09IFNldmVyaXR5LmVycm9yKSB7XG5cdFx0XHRcdFx0XHRyZXN1bHQuZXJyb3JzW21ldGEubmFtZV0gPSBtZXRhLm1lc3NhZ2UocHJvcFZhbHVlLCBwYXJlbnRWYWx1ZSwgY3VzdG9tT3B0aW9ucyk7XG5cblx0XHRcdFx0XHRcdC8vIFNob3J0LWNpcmN1aXQgaWYgd2UgaGF2ZSB0byBzdG9wT25GaXJzdEZhaWx1cmVcblx0XHRcdFx0XHRcdGlmICh0aGlzLl9zdG9wT25GaXJzdEZhaWx1cmUpIHtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJlc3VsdC53YXJuaW5nc1ttZXRhLm5hbWVdID0gbWV0YS5tZXNzYWdlKHByb3BWYWx1ZSwgcGFyZW50VmFsdWUsIGN1c3RvbU9wdGlvbnMpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJlc3VsdHMucHVzaChyZXN1bHQpO1xuXG5cdFx0cmV0dXJuIHJlc3VsdHM7XG5cdH1cblxuXHRwcm90ZWN0ZWQgX19ydW5WYWxpZGF0b3JzKHByb3BWYWx1ZTogYW55LCBwYXJlbnRWYWx1ZTogYW55LCBjdXN0b21PcHRpb25zOiBhbnksIHJlc3VsdHM6IFZhbGlkYXRpb25SZXN1bHRMaXN0KTogVmFsaWRhdGlvblJlc3VsdExpc3Qge1xuXHRcdGZvciAobGV0IFt2YWxpZGF0b3IsIG1ldGFdIG9mIHRoaXMuX3ZhbGlkYXRvcnMpIHtcblx0XHRcdGlmICghbWV0YS5wcmVjb25kaXRpb24gfHwgbWV0YS5wcmVjb25kaXRpb24ocGFyZW50VmFsdWUsIGN1c3RvbU9wdGlvbnMpKSB7XG5cdFx0XHRcdGxldCBfcmVzdWx0TGlzdDogVmFsaWRhdGlvblJlc3VsdExpc3QgPSB2YWxpZGF0b3IudmFsaWRhdGUocHJvcFZhbHVlLCBwYXJlbnRWYWx1ZSwgY3VzdG9tT3B0aW9ucyk7XG5cdFx0XHRcdHJlc3VsdHMgPSByZXN1bHRzLm1lcmdlKF9yZXN1bHRMaXN0KTtcblxuXHRcdFx0XHRpZiAoIXJlc3VsdHMuaXNWYWxpZCAmJiB0aGlzLl9zdG9wT25GaXJzdEZhaWx1cmUpIHtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHRzO1xuXHR9XG5cblx0cHJvdGVjdGVkIF9fZ2V0UHJvcGVydHlSZXN1bHRzKHZhbHVlOiBhbnksIHBhcmVudFZhbHVlOiBhbnksIGN1c3RvbU9wdGlvbnM6IGFueSwgcmVzdWx0czogVmFsaWRhdGlvblJlc3VsdExpc3QpOiBWYWxpZGF0aW9uUmVzdWx0TGlzdCB7XG5cdFx0cmVzdWx0cyA9IHRoaXMuX19ydW5RdWFsaWZpZXJzKHZhbHVlLCBwYXJlbnRWYWx1ZSwgY3VzdG9tT3B0aW9ucywgcmVzdWx0cyk7XG5cblx0XHRpZiAocmVzdWx0cy5pc1ZhbGlkIHx8ICF0aGlzLl9zdG9wT25GaXJzdEZhaWx1cmUpIHtcblx0XHRcdHJlc3VsdHMgPSB0aGlzLl9fcnVuVmFsaWRhdG9ycyh2YWx1ZSwgcGFyZW50VmFsdWUsIGN1c3RvbU9wdGlvbnMsIHJlc3VsdHMpO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHRzO1xuXHR9XG5cblx0cHVibGljIHZhbGlkYXRlKHZhbHVlOiBhbnksIHBhcmVudFZhbHVlPzogVFBhcmVudFZhbHVlLCBjdXN0b21PcHRpb25zPzogVEN1c3RvbU9wdGlvbnMpOiBWYWxpZGF0aW9uUmVzdWx0TGlzdCB7XG5cdFx0dmFsdWUgPSBjb3B5KHZhbHVlKTtcblx0XHRwYXJlbnRWYWx1ZSA9IGNvcHkocGFyZW50VmFsdWUpO1xuXG5cdFx0bGV0IHJlc3VsdHMgPSBuZXcgVmFsaWRhdGlvblJlc3VsdExpc3QoW10sIHRoaXMucHJvcGVydHlOYW1lLCB2YWx1ZSk7XG5cblx0XHRyZXR1cm4gdGhpcy5fX2dldFByb3BlcnR5UmVzdWx0cyh2YWx1ZSwgcGFyZW50VmFsdWUsIGN1c3RvbU9wdGlvbnMsIHJlc3VsdHMpO1xuXG5cdH1cbn0iXX0=