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

var _predicates = require("./utils/predicates");

var _quality = require("./utils/quality");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Rule = /*#__PURE__*/function () {
  function Rule(propertyName) {
    _classCallCheck(this, Rule);

    _defineProperty(this, "propertyName", void 0);

    _defineProperty(this, "predicates", new Map());

    _defineProperty(this, "validators", new Map());

    _defineProperty(this, "stopOnFirstFailure", true);

    this.propertyName = propertyName || '';
  }

  _createClass(Rule, [{
    key: "enum",
    value: function _enum(allowedValues) {
      var _this = this;

      var beEnumeratedValue = (0, _predicates.beValidEnum)(allowedValues);
      var meta = {
        name: "beEnumeratedValue",
        message: function message() {
          return "".concat(_this.propertyName, " must be one of the following: \"").concat(allowedValues.join(', '), "\".");
        },
        precondition: null,
        isValidIfEmpty: true,
        severity: _Severity["default"]["default"]
      };
      this.predicates.set(beEnumeratedValue, meta);
      return new _RuleApi["default"](this, meta);
    }
  }, {
    key: "length",
    value: function length(min, max) {
      var _this2 = this;

      var beBetween = (0, _predicates.length)(min, max);
      var meta = {
        name: "beBetween".concat(min, "and").concat(max),
        message: function message() {
          return "".concat(_this2.propertyName, " must be between ").concat(min, " and ").concat(max, ".");
        },
        precondition: null,
        isValidIfEmpty: false,
        severity: _Severity["default"]["default"]
      };
      this.predicates.set(beBetween, meta);
      return new _RuleApi["default"](this, meta);
    }
  }, {
    key: "lengthOrEmpty",
    value: function lengthOrEmpty(min, max) {
      var _this3 = this;

      var beBetween = (0, _predicates.length)(min, max);
      var meta = {
        name: "beBetween".concat(min, "and").concat(max, "OrEmpty"),
        message: function message() {
          return "".concat(_this3.propertyName, " must be between ").concat(min, " and ").concat(max, ".");
        },
        precondition: null,
        isValidIfEmpty: true,
        severity: _Severity["default"]["default"]
      };
      this.predicates.set(beBetween, meta);
      return new _RuleApi["default"](this, meta);
    }
  }, {
    key: "matches",
    value: function matches(rx) {
      var _this4 = this;

      var matches = (0, _predicates.match)(rx);

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
      this.predicates.set(matchRx, meta);
      return new _RuleApi["default"](this, meta);
    }
  }, {
    key: "notNull",
    value: function notNull() {
      var _this5 = this;

      var meta = {
        name: _predicates.notNull.name,
        message: function message() {
          return "".concat(_this5.propertyName, " cannot be null.");
        },
        precondition: null,
        isValidIfEmpty: false,
        severity: _Severity["default"]["default"]
      };
      this.predicates.set(_predicates.notNull, meta);
      return new _RuleApi["default"](this, meta);
    }
  }, {
    key: "notEmpty",
    value: function notEmpty() {
      var _this6 = this;

      var meta = {
        name: _predicates.notEmpty.name,
        message: function message() {
          return "".concat(_this6.propertyName, " cannot be empty.");
        },
        precondition: null,
        isValidIfEmpty: false,
        severity: _Severity["default"]["default"]
      };
      this.predicates.set(_predicates.notEmpty, meta);
      return new _RuleApi["default"](this, meta);
    }
  }, {
    key: "max",
    value: function max(num) {
      var _this7 = this;

      var beLessThanOrEqual = (0, _predicates.max)(num);
      var meta = {
        name: 'beLessThanOrEqual',
        message: function message() {
          return "".concat(_this7.propertyName, " cannot be greater than or equal to ").concat(num, ".");
        },
        precondition: null,
        isValidIfEmpty: false,
        severity: _Severity["default"]["default"]
      };
      this.predicates.set(beLessThanOrEqual, meta);
      return new _RuleApi["default"](this, meta);
    }
  }, {
    key: "maxExclusiveOf",
    value: function maxExclusiveOf(num) {
      var _this8 = this;

      var beLessThan = (0, _predicates.max)(num - 1);
      var meta = {
        name: 'beLessThan',
        message: function message() {
          return "".concat(_this8.propertyName, " cannot be greater than ").concat(num, ".");
        },
        precondition: null,
        isValidIfEmpty: false,
        severity: _Severity["default"]["default"]
      };
      this.predicates.set(beLessThan, meta);
      return new _RuleApi["default"](this, meta);
    }
  }, {
    key: "min",
    value: function min(num) {
      var _this9 = this;

      var beGreaterThanOrEqual = (0, _predicates.min)(num);
      var meta = {
        name: 'beGreaterThanOrEqual',
        message: function message() {
          return "".concat(_this9.propertyName, " cannot be less than or equal to ").concat(num, ".");
        },
        precondition: null,
        isValidIfEmpty: false,
        severity: _Severity["default"]["default"]
      };
      this.predicates.set(beGreaterThanOrEqual, meta);
      return new _RuleApi["default"](this, meta);
    }
  }, {
    key: "minExclusiveOf",
    value: function minExclusiveOf(num) {
      var _this10 = this;

      var beGreaterThan = (0, _predicates.min)(num + 1);
      var meta = {
        name: 'beGreaterThan',
        message: function message() {
          return "".concat(_this10.propertyName, " cannot be less than ").concat(num, ".");
        },
        precondition: null,
        isValidIfEmpty: false,
        severity: _Severity["default"]["default"]
      };
      this.predicates.set(beGreaterThan, meta);
      return new _RuleApi["default"](this, meta);
    }
  }, {
    key: "must",
    value: function must(predicate) {
      var _this11 = this;

      var meta = {
        name: predicate.name,
        message: function message() {
          return "".concat(_this11.propertyName, " is invalid.");
        },
        precondition: null,
        isValidIfEmpty: false,
        severity: _Severity["default"]["default"]
      };
      this.predicates.set(predicate, meta);
      return new _RuleApi["default"](this, meta);
    }
  }, {
    key: "cascade",
    value: function cascade() {
      this.stopOnFirstFailure = false;
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
      this.validators.set(validatable, meta);
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
      this.validators.set(rule, meta);
      define(rule);
      return this;
    }
  }, {
    key: "runPredicates",
    value: function runPredicates(propValue, parentValue, customOptions, results) {
      var result = new _ValidationResult["default"](this.propertyName, propValue);

      var _iterator = _createForOfIteratorHelper(this.predicates),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 2),
              predicate = _step$value[0],
              meta = _step$value[1];

          // We check if we should run the validator based on whether the property has a value
          if ((0, _quality.isEmpty)(propValue) && meta.isValidIfEmpty) {
            continue;
          } // We check for a precondition to exist for a predicate before calling it


          if (!meta.precondition || meta.precondition(parentValue, customOptions)) {
            var isValid = predicate(propValue, parentValue, customOptions);

            if (!isValid) {
              if (meta.severity === _Severity["default"].error) {
                result.errors[meta.name] = meta.message(propValue, parentValue, customOptions); // Short-circuit if we have to stopOnFirstFailure

                if (this.stopOnFirstFailure) {
                  break;
                }
              } else {
                result.warnings[meta.name] = meta.message(propValue, parentValue, customOptions);
              }
            }
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      results.push(result);
      return results;
    }
  }, {
    key: "runValidators",
    value: function runValidators(propValue, parentValue, customOptions, results) {
      var _iterator2 = _createForOfIteratorHelper(this.validators),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _step2$value = _slicedToArray(_step2.value, 2),
              validator = _step2$value[0],
              meta = _step2$value[1];

          if (!meta.precondition || meta.precondition(parentValue, customOptions)) {
            var _resultList = validator.validate(propValue, parentValue, customOptions);

            results = results.merge(_resultList);

            if (!results.isValid && this.stopOnFirstFailure) {
              break;
            }
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return results;
    }
  }, {
    key: "getPropertyResults",
    value: function getPropertyResults(value, parentValue, customOptions, results) {
      results = this.runPredicates(value, parentValue, customOptions, results);

      if (results.isValid || !this.stopOnFirstFailure) {
        results = this.runValidators(value, parentValue, customOptions, results);
      }

      return results;
    }
  }, {
    key: "validate",
    value: function validate(value, parentValue, customOptions) {
      value = (0, _copy["default"])(value);
      parentValue = (0, _copy["default"])(parentValue);
      var results = new _ValidationResultList["default"]([], this.propertyName, value);
      return this.getPropertyResults(value, parentValue, customOptions, results);
    }
  }, {
    key: "isEmpty",
    get: function get() {
      return this.predicates.size === 0 && this.validators.size === 0;
    }
  }]);

  return Rule;
}();

exports["default"] = Rule;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9SdWxlLnRzIl0sIm5hbWVzIjpbIlJ1bGUiLCJwcm9wZXJ0eU5hbWUiLCJNYXAiLCJhbGxvd2VkVmFsdWVzIiwiYmVFbnVtZXJhdGVkVmFsdWUiLCJtZXRhIiwibmFtZSIsIm1lc3NhZ2UiLCJqb2luIiwicHJlY29uZGl0aW9uIiwiaXNWYWxpZElmRW1wdHkiLCJzZXZlcml0eSIsIlNldmVyaXR5IiwicHJlZGljYXRlcyIsInNldCIsIlJ1bGVBcGkiLCJtaW4iLCJtYXgiLCJiZUJldHdlZW4iLCJyeCIsIm1hdGNoZXMiLCJtYXRjaFJ4IiwidmFsIiwibm90TnVsbCIsIm5vdEVtcHR5IiwibnVtIiwiYmVMZXNzVGhhbk9yRXF1YWwiLCJiZUxlc3NUaGFuIiwiYmVHcmVhdGVyVGhhbk9yRXF1YWwiLCJiZUdyZWF0ZXJUaGFuIiwicHJlZGljYXRlIiwic3RvcE9uRmlyc3RGYWlsdXJlIiwidmFsaWRhdGFibGUiLCJ2YWxpZGF0b3JzIiwiZGVmaW5lIiwicnVsZSIsInByb3BWYWx1ZSIsInBhcmVudFZhbHVlIiwiY3VzdG9tT3B0aW9ucyIsInJlc3VsdHMiLCJyZXN1bHQiLCJWYWxpZGF0aW9uUmVzdWx0IiwiaXNWYWxpZCIsImVycm9yIiwiZXJyb3JzIiwid2FybmluZ3MiLCJwdXNoIiwidmFsaWRhdG9yIiwiX3Jlc3VsdExpc3QiLCJ2YWxpZGF0ZSIsIm1lcmdlIiwidmFsdWUiLCJydW5QcmVkaWNhdGVzIiwicnVuVmFsaWRhdG9ycyIsIlZhbGlkYXRpb25SZXN1bHRMaXN0IiwiZ2V0UHJvcGVydHlSZXN1bHRzIiwic2l6ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUlBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVxQkEsSTtBQU1wQixnQkFBWUMsWUFBWixFQUFtQztBQUFBOztBQUFBOztBQUFBLHdDQUp3QyxJQUFJQyxHQUFKLEVBSXhDOztBQUFBLHdDQUh3QyxJQUFJQSxH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QixLQUFLckQsWUFBbEMsRUFBZ0RrRCxLQUFoRCxDQUFkO0FBRUEsYUFBTyxLQUFLSSxrQkFBTCxDQUF3QkosS0FBeEIsRUFBK0JkLFdBQS9CLEVBQTRDQyxhQUE1QyxFQUEyREMsT0FBM0QsQ0FBUDtBQUVBOzs7d0JBalJhO0FBQ2IsYUFBTyxLQUFLMUIsVUFBTCxDQUFnQjJDLElBQWhCLEtBQXlCLENBQXpCLElBQThCLEtBQUt2QixVQUFMLENBQWdCdUIsSUFBaEIsS0FBeUIsQ0FBOUQ7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSdWxlQXBpIGZyb20gJy4vUnVsZUFwaSc7XG5pbXBvcnQgU2V2ZXJpdHkgZnJvbSAnLi9TZXZlcml0eSc7XG5pbXBvcnQgVmFsaWRhdGlvblJlc3VsdCBmcm9tICcuL1ZhbGlkYXRpb25SZXN1bHQnO1xuaW1wb3J0IFZhbGlkYXRpb25SZXN1bHRMaXN0IGZyb20gJy4vVmFsaWRhdGlvblJlc3VsdExpc3QnO1xuXG5pbXBvcnQgeyBJVmFsaWRhdGFibGUsIFRQcmVjb25kaXRpb24sIFRQcmVkaWNhdGUsIFRQcmVkaWNhdGVDb2xsZWN0aW9uLCBUVmFsaWRhdG9yQ29sbGVjdGlvbiB9IGZyb20gJy4vdHlwZXMnO1xuXG5pbXBvcnQgY29weSBmcm9tICcuL3V0aWxzL2NvcHknO1xuaW1wb3J0IHsgbGVuZ3RoLCBtYXRjaCwgbWF4LCBtaW4sIG5vdEVtcHR5LCBub3ROdWxsLCBiZVZhbGlkRW51bSB9IGZyb20gJy4vdXRpbHMvcHJlZGljYXRlcyc7XG5pbXBvcnQgeyBpc0VtcHR5LCBpc051bGwgfSBmcm9tICcuL3V0aWxzL3F1YWxpdHknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSdWxlPFRQYXJlbnRWYWx1ZSA9IGFueSwgVEN1c3RvbU9wdGlvbnMgPSBhbnk+IGltcGxlbWVudHMgSVZhbGlkYXRhYmxlPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+IHtcblx0cHVibGljIHByb3BlcnR5TmFtZTogc3RyaW5nO1xuXHRwcm90ZWN0ZWQgcHJlZGljYXRlczogVFByZWRpY2F0ZUNvbGxlY3Rpb248VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4gPSBuZXcgTWFwKCk7XG5cdHByb3RlY3RlZCB2YWxpZGF0b3JzOiBUVmFsaWRhdG9yQ29sbGVjdGlvbjxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiA9IG5ldyBNYXAoKTtcblx0cHJvdGVjdGVkIHN0b3BPbkZpcnN0RmFpbHVyZTogYm9vbGVhbiA9IHRydWU7XG5cblx0Y29uc3RydWN0b3IocHJvcGVydHlOYW1lPzogc3RyaW5nKSB7XG5cdFx0dGhpcy5wcm9wZXJ0eU5hbWUgPSBwcm9wZXJ0eU5hbWUgfHwgJyc7XG5cdH1cblxuXHRnZXQgaXNFbXB0eSgpIHtcblx0XHRyZXR1cm4gdGhpcy5wcmVkaWNhdGVzLnNpemUgPT09IDAgJiYgdGhpcy52YWxpZGF0b3JzLnNpemUgPT09IDA7XG5cdH1cblxuXHRwdWJsaWMgZW51bShhbGxvd2VkVmFsdWVzOiBBcnJheTxzdHJpbmd8bnVtYmVyPik6IFJ1bGVBcGk8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ge1xuXHRcdGxldCBiZUVudW1lcmF0ZWRWYWx1ZSA9IGJlVmFsaWRFbnVtKGFsbG93ZWRWYWx1ZXMpO1xuXG5cdFx0bGV0IG1ldGEgPSB7XG5cdFx0XHRuYW1lOiBgYmVFbnVtZXJhdGVkVmFsdWVgLFxuXHRcdFx0bWVzc2FnZTogKCkgPT4gIGAke3RoaXMucHJvcGVydHlOYW1lfSBtdXN0IGJlIG9uZSBvZiB0aGUgZm9sbG93aW5nOiBcIiR7YWxsb3dlZFZhbHVlcy5qb2luKCcsICcpfVwiLmAsXG5cdFx0XHRwcmVjb25kaXRpb246IG51bGwsXG5cdFx0XHRpc1ZhbGlkSWZFbXB0eTogdHJ1ZSxcblx0XHRcdHNldmVyaXR5OiBTZXZlcml0eS5kZWZhdWx0XG5cdFx0fTtcblxuXHRcdHRoaXMucHJlZGljYXRlcy5zZXQoYmVFbnVtZXJhdGVkVmFsdWUsIG1ldGEpO1xuXG5cdFx0cmV0dXJuIG5ldyBSdWxlQXBpPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+KHRoaXMsIG1ldGEpO1xuXHR9XG5cblx0cHVibGljIGxlbmd0aChtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBSdWxlQXBpPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+IHtcblx0XHRsZXQgYmVCZXR3ZWVuID0gbGVuZ3RoKG1pbiwgbWF4KTtcblx0XHRsZXQgbWV0YSA9IHtcblx0XHRcdG5hbWU6IGBiZUJldHdlZW4ke21pbn1hbmQke21heH1gLFxuXHRcdFx0bWVzc2FnZTogKCkgPT4gIGAke3RoaXMucHJvcGVydHlOYW1lfSBtdXN0IGJlIGJldHdlZW4gJHttaW59IGFuZCAke21heH0uYCxcblx0XHRcdHByZWNvbmRpdGlvbjogbnVsbCxcblx0XHRcdGlzVmFsaWRJZkVtcHR5OiBmYWxzZSxcblx0XHRcdHNldmVyaXR5OiBTZXZlcml0eS5kZWZhdWx0XG5cdFx0fTtcblxuXHRcdHRoaXMucHJlZGljYXRlcy5zZXQoYmVCZXR3ZWVuLCBtZXRhKTtcblxuXHRcdHJldHVybiBuZXcgUnVsZUFwaTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPih0aGlzLCBtZXRhKTtcblx0fVxuXG5cdHB1YmxpYyBsZW5ndGhPckVtcHR5KG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IFJ1bGVBcGk8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ge1xuXHRcdGxldCBiZUJldHdlZW4gPSBsZW5ndGgobWluLCBtYXgpO1xuXHRcdGxldCBtZXRhID0ge1xuXHRcdFx0bmFtZTogYGJlQmV0d2VlbiR7bWlufWFuZCR7bWF4fU9yRW1wdHlgLFxuXHRcdFx0bWVzc2FnZTogKCkgPT4gIGAke3RoaXMucHJvcGVydHlOYW1lfSBtdXN0IGJlIGJldHdlZW4gJHttaW59IGFuZCAke21heH0uYCxcblx0XHRcdHByZWNvbmRpdGlvbjogbnVsbCxcblx0XHRcdGlzVmFsaWRJZkVtcHR5OiB0cnVlLFxuXHRcdFx0c2V2ZXJpdHk6IFNldmVyaXR5LmRlZmF1bHRcblx0XHR9O1xuXG5cdFx0dGhpcy5wcmVkaWNhdGVzLnNldChiZUJldHdlZW4sIG1ldGEpO1xuXG5cdFx0cmV0dXJuIG5ldyBSdWxlQXBpPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+KHRoaXMsIG1ldGEpO1xuXHR9XG5cblx0cHVibGljIG1hdGNoZXMocng6IFJlZ0V4cCk6IFJ1bGVBcGk8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ge1xuXHRcdGxldCBtYXRjaGVzID0gbWF0Y2gocngpO1xuXHRcdGxldCBtYXRjaFJ4ID0gKHZhbDogYW55KSA9PiBpc051bGwodmFsKSB8fCBtYXRjaGVzKHZhbCk7XG5cdFx0bGV0IG1ldGEgPSB7XG5cdFx0XHRuYW1lOiBtYXRjaFJ4Lm5hbWUsXG5cdFx0XHRtZXNzYWdlOiAoKSA9PiAgYCR7dGhpcy5wcm9wZXJ0eU5hbWV9IGlzIGFuIGludmFsaWQgZm9ybWF0LmAsXG5cdFx0XHRwcmVjb25kaXRpb246IG51bGwsXG5cdFx0XHRpc1ZhbGlkSWZFbXB0eTogdHJ1ZSxcblx0XHRcdHNldmVyaXR5OiBTZXZlcml0eS5kZWZhdWx0XG5cdFx0fTtcblxuXHRcdHRoaXMucHJlZGljYXRlcy5zZXQobWF0Y2hSeCwgbWV0YSk7XG5cblx0XHRyZXR1cm4gbmV3IFJ1bGVBcGk8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4odGhpcywgbWV0YSk7XG5cdH1cblxuXHRwdWJsaWMgbm90TnVsbCgpOiBSdWxlQXBpPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+IHtcblx0XHRsZXQgbWV0YSA9IHtcblx0XHRcdG5hbWU6IG5vdE51bGwubmFtZSxcblx0XHRcdG1lc3NhZ2U6ICgpID0+ICBgJHt0aGlzLnByb3BlcnR5TmFtZX0gY2Fubm90IGJlIG51bGwuYCxcblx0XHRcdHByZWNvbmRpdGlvbjogbnVsbCxcblx0XHRcdGlzVmFsaWRJZkVtcHR5OiBmYWxzZSxcblx0XHRcdHNldmVyaXR5OiBTZXZlcml0eS5kZWZhdWx0XG5cdFx0fTtcblxuXHRcdHRoaXMucHJlZGljYXRlcy5zZXQobm90TnVsbCwgbWV0YSk7XG5cblx0XHRyZXR1cm4gbmV3IFJ1bGVBcGk8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4odGhpcywgbWV0YSk7XG5cdH1cblxuXHRwdWJsaWMgbm90RW1wdHkoKTogUnVsZUFwaTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiB7XG5cdFx0bGV0IG1ldGEgPSB7XG5cdFx0XHRuYW1lOiBub3RFbXB0eS5uYW1lLFxuXHRcdFx0bWVzc2FnZTogKCkgPT4gIGAke3RoaXMucHJvcGVydHlOYW1lfSBjYW5ub3QgYmUgZW1wdHkuYCxcblx0XHRcdHByZWNvbmRpdGlvbjogbnVsbCxcblx0XHRcdGlzVmFsaWRJZkVtcHR5OiBmYWxzZSxcblx0XHRcdHNldmVyaXR5OiBTZXZlcml0eS5kZWZhdWx0XG5cdFx0fTtcblxuXHRcdHRoaXMucHJlZGljYXRlcy5zZXQobm90RW1wdHksIG1ldGEpO1xuXG5cdFx0cmV0dXJuIG5ldyBSdWxlQXBpPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+KHRoaXMsIG1ldGEpO1xuXHR9XG5cblx0cHVibGljIG1heChudW06IG51bWJlcik6IFJ1bGVBcGk8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ge1xuXHRcdGxldCBiZUxlc3NUaGFuT3JFcXVhbCA9IG1heChudW0pO1xuXG5cdFx0bGV0IG1ldGEgPSB7XG5cdFx0XHRuYW1lOiAnYmVMZXNzVGhhbk9yRXF1YWwnLFxuXHRcdFx0bWVzc2FnZTogKCkgPT4gIGAke3RoaXMucHJvcGVydHlOYW1lfSBjYW5ub3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICR7bnVtfS5gLFxuXHRcdFx0cHJlY29uZGl0aW9uOiBudWxsLFxuXHRcdFx0aXNWYWxpZElmRW1wdHk6IGZhbHNlLFxuXHRcdFx0c2V2ZXJpdHk6IFNldmVyaXR5LmRlZmF1bHRcblx0XHR9O1xuXG5cdFx0dGhpcy5wcmVkaWNhdGVzLnNldChiZUxlc3NUaGFuT3JFcXVhbCBhcyBUUHJlZGljYXRlLCBtZXRhKTtcblxuXHRcdHJldHVybiBuZXcgUnVsZUFwaTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPih0aGlzLCBtZXRhKTtcblx0fVxuXG5cdHB1YmxpYyBtYXhFeGNsdXNpdmVPZihudW06IG51bWJlcik6IFJ1bGVBcGk8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ge1xuXHRcdGxldCBiZUxlc3NUaGFuID0gbWF4KG51bSAtIDEpO1xuXG5cdFx0bGV0IG1ldGEgPSB7XG5cdFx0XHRuYW1lOiAnYmVMZXNzVGhhbicsXG5cdFx0XHRtZXNzYWdlOiAoKSA9PiAgYCR7dGhpcy5wcm9wZXJ0eU5hbWV9IGNhbm5vdCBiZSBncmVhdGVyIHRoYW4gJHtudW19LmAsXG5cdFx0XHRwcmVjb25kaXRpb246IG51bGwsXG5cdFx0XHRpc1ZhbGlkSWZFbXB0eTogZmFsc2UsXG5cdFx0XHRzZXZlcml0eTogU2V2ZXJpdHkuZGVmYXVsdFxuXHRcdH07XG5cblx0XHR0aGlzLnByZWRpY2F0ZXMuc2V0KGJlTGVzc1RoYW4gYXMgVFByZWRpY2F0ZSwgbWV0YSk7XG5cblx0XHRyZXR1cm4gbmV3IFJ1bGVBcGk8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4odGhpcywgbWV0YSk7XG5cdH1cblxuXHRwdWJsaWMgbWluKG51bTogbnVtYmVyKTogUnVsZUFwaTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiB7XG5cdFx0bGV0IGJlR3JlYXRlclRoYW5PckVxdWFsID0gbWluKG51bSk7XG5cblx0XHRsZXQgbWV0YSA9IHtcblx0XHRcdG5hbWU6ICdiZUdyZWF0ZXJUaGFuT3JFcXVhbCcsXG5cdFx0XHRtZXNzYWdlOiAoKSA9PiAgYCR7dGhpcy5wcm9wZXJ0eU5hbWV9IGNhbm5vdCBiZSBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJHtudW19LmAsXG5cdFx0XHRwcmVjb25kaXRpb246IG51bGwsXG5cdFx0XHRpc1ZhbGlkSWZFbXB0eTogZmFsc2UsXG5cdFx0XHRzZXZlcml0eTogU2V2ZXJpdHkuZGVmYXVsdFxuXHRcdH07XG5cblx0XHR0aGlzLnByZWRpY2F0ZXMuc2V0KGJlR3JlYXRlclRoYW5PckVxdWFsIGFzIFRQcmVkaWNhdGUsIG1ldGEpO1xuXG5cdFx0cmV0dXJuIG5ldyBSdWxlQXBpPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+KHRoaXMsIG1ldGEpO1xuXHR9XG5cblx0cHVibGljIG1pbkV4Y2x1c2l2ZU9mKG51bTogbnVtYmVyKTogUnVsZUFwaTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiB7XG5cdFx0bGV0IGJlR3JlYXRlclRoYW4gPSBtaW4obnVtICsgMSk7XG5cblx0XHRsZXQgbWV0YSA9IHtcblx0XHRcdG5hbWU6ICdiZUdyZWF0ZXJUaGFuJyxcblx0XHRcdG1lc3NhZ2U6ICgpID0+ICBgJHt0aGlzLnByb3BlcnR5TmFtZX0gY2Fubm90IGJlIGxlc3MgdGhhbiAke251bX0uYCxcblx0XHRcdHByZWNvbmRpdGlvbjogbnVsbCxcblx0XHRcdGlzVmFsaWRJZkVtcHR5OiBmYWxzZSxcblx0XHRcdHNldmVyaXR5OiBTZXZlcml0eS5kZWZhdWx0XG5cdFx0fTtcblxuXHRcdHRoaXMucHJlZGljYXRlcy5zZXQoYmVHcmVhdGVyVGhhbiBhcyBUUHJlZGljYXRlLCBtZXRhKTtcblxuXHRcdHJldHVybiBuZXcgUnVsZUFwaTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPih0aGlzLCBtZXRhKTtcblx0fVxuXG5cdHB1YmxpYyBtdXN0KHByZWRpY2F0ZTogVFByZWRpY2F0ZTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPik6IFJ1bGVBcGk8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ge1xuXHRcdGxldCBtZXRhID0ge1xuXHRcdFx0bmFtZTogcHJlZGljYXRlLm5hbWUsXG5cdFx0XHRtZXNzYWdlOiAoKSA9PiAgYCR7dGhpcy5wcm9wZXJ0eU5hbWV9IGlzIGludmFsaWQuYCxcblx0XHRcdHByZWNvbmRpdGlvbjogbnVsbCxcblx0XHRcdGlzVmFsaWRJZkVtcHR5OiBmYWxzZSxcblx0XHRcdHNldmVyaXR5OiBTZXZlcml0eS5kZWZhdWx0XG5cdFx0fTtcblxuXHRcdHRoaXMucHJlZGljYXRlcy5zZXQocHJlZGljYXRlLCBtZXRhKTtcblxuXHRcdHJldHVybiBuZXcgUnVsZUFwaTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPih0aGlzLCBtZXRhKTtcblx0fVxuXG5cdHB1YmxpYyBjYXNjYWRlKCk6IHZvaWQge1xuXHRcdHRoaXMuc3RvcE9uRmlyc3RGYWlsdXJlID0gZmFsc2U7XG5cdH1cblxuXHRwdWJsaWMgdXNpbmcodmFsaWRhdGFibGU6IElWYWxpZGF0YWJsZTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPik6IFJ1bGUge1xuXHRcdHZhbGlkYXRhYmxlLnByb3BlcnR5TmFtZSA9IHRoaXMucHJvcGVydHlOYW1lIHx8IHZhbGlkYXRhYmxlLnByb3BlcnR5TmFtZSB8fCAnJztcblxuXHRcdGxldCBtZXRhID0ge1xuXHRcdFx0bmFtZTogdmFsaWRhdGFibGUucHJvcGVydHlOYW1lLFxuXHRcdFx0bWVzc2FnZTogKCkgPT4gICcnLFxuXHRcdFx0cHJlY29uZGl0aW9uOiBudWxsLFxuXHRcdFx0aXNWYWxpZElmRW1wdHk6IGZhbHNlLFxuXHRcdFx0c2V2ZXJpdHk6IFNldmVyaXR5LmRlZmF1bHRcblx0XHR9O1xuXG5cdFx0dGhpcy52YWxpZGF0b3JzLnNldCh2YWxpZGF0YWJsZSwgbWV0YSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRwdWJsaWMgaWYocHJlY29uZGl0aW9uOiBUUHJlY29uZGl0aW9uPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+LCBkZWZpbmU6IChydWxlOiBSdWxlPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+KSA9PiB2b2lkKTogUnVsZSB7XG5cdFx0bGV0IHJ1bGUgPSBuZXcgUnVsZSh0aGlzLnByb3BlcnR5TmFtZSk7XG5cdFx0bGV0IG1ldGEgPSB7XG5cdFx0XHRuYW1lOiBydWxlLnByb3BlcnR5TmFtZSxcblx0XHRcdG1lc3NhZ2U6ICgpID0+ICAnJyxcblx0XHRcdHByZWNvbmRpdGlvbixcblx0XHRcdGlzVmFsaWRJZkVtcHR5OiBmYWxzZSxcblx0XHRcdHNldmVyaXR5OiBTZXZlcml0eS5kZWZhdWx0XG5cdFx0fTtcblxuXHRcdHRoaXMudmFsaWRhdG9ycy5zZXQocnVsZSwgbWV0YSk7XG5cdFx0ZGVmaW5lKHJ1bGUpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRwcm90ZWN0ZWQgcnVuUHJlZGljYXRlcyhwcm9wVmFsdWU6IGFueSwgcGFyZW50VmFsdWU6IGFueSwgY3VzdG9tT3B0aW9uczogYW55LCByZXN1bHRzOiBWYWxpZGF0aW9uUmVzdWx0TGlzdCk6IFZhbGlkYXRpb25SZXN1bHRMaXN0IHtcblx0XHRjb25zdCByZXN1bHQgPSBuZXcgVmFsaWRhdGlvblJlc3VsdCh0aGlzLnByb3BlcnR5TmFtZSwgcHJvcFZhbHVlKTtcblxuXHRcdGZvciAobGV0IFtwcmVkaWNhdGUsIG1ldGFdIG9mIHRoaXMucHJlZGljYXRlcykge1xuXHRcdFx0Ly8gV2UgY2hlY2sgaWYgd2Ugc2hvdWxkIHJ1biB0aGUgdmFsaWRhdG9yIGJhc2VkIG9uIHdoZXRoZXIgdGhlIHByb3BlcnR5IGhhcyBhIHZhbHVlXG5cdFx0XHRpZiAoaXNFbXB0eShwcm9wVmFsdWUpICYmIG1ldGEuaXNWYWxpZElmRW1wdHkpIHtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFdlIGNoZWNrIGZvciBhIHByZWNvbmRpdGlvbiB0byBleGlzdCBmb3IgYSBwcmVkaWNhdGUgYmVmb3JlIGNhbGxpbmcgaXRcblx0XHRcdGlmICghbWV0YS5wcmVjb25kaXRpb24gfHwgbWV0YS5wcmVjb25kaXRpb24ocGFyZW50VmFsdWUsIGN1c3RvbU9wdGlvbnMpKSB7XG5cdFx0XHRcdGxldCBpc1ZhbGlkID0gcHJlZGljYXRlKHByb3BWYWx1ZSwgcGFyZW50VmFsdWUsIGN1c3RvbU9wdGlvbnMpO1xuXG5cdFx0XHRcdGlmICghaXNWYWxpZCkge1xuXHRcdFx0XHRcdGlmIChtZXRhLnNldmVyaXR5ID09PSBTZXZlcml0eS5lcnJvcikge1xuXHRcdFx0XHRcdFx0cmVzdWx0LmVycm9yc1ttZXRhLm5hbWVdID0gbWV0YS5tZXNzYWdlKHByb3BWYWx1ZSwgcGFyZW50VmFsdWUsIGN1c3RvbU9wdGlvbnMpO1xuXG5cdFx0XHRcdFx0XHQvLyBTaG9ydC1jaXJjdWl0IGlmIHdlIGhhdmUgdG8gc3RvcE9uRmlyc3RGYWlsdXJlXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5zdG9wT25GaXJzdEZhaWx1cmUpIHtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJlc3VsdC53YXJuaW5nc1ttZXRhLm5hbWVdID0gbWV0YS5tZXNzYWdlKHByb3BWYWx1ZSwgcGFyZW50VmFsdWUsIGN1c3RvbU9wdGlvbnMpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJlc3VsdHMucHVzaChyZXN1bHQpO1xuXG5cdFx0cmV0dXJuIHJlc3VsdHM7XG5cdH1cblxuXHRwcm90ZWN0ZWQgcnVuVmFsaWRhdG9ycyhwcm9wVmFsdWU6IGFueSwgcGFyZW50VmFsdWU6IGFueSwgY3VzdG9tT3B0aW9uczogYW55LCByZXN1bHRzOiBWYWxpZGF0aW9uUmVzdWx0TGlzdCk6IFZhbGlkYXRpb25SZXN1bHRMaXN0IHtcblx0XHRmb3IgKGxldCBbdmFsaWRhdG9yLCBtZXRhXSBvZiB0aGlzLnZhbGlkYXRvcnMpIHtcblx0XHRcdGlmICghbWV0YS5wcmVjb25kaXRpb24gfHwgbWV0YS5wcmVjb25kaXRpb24ocGFyZW50VmFsdWUsIGN1c3RvbU9wdGlvbnMpKSB7XG5cdFx0XHRcdGxldCBfcmVzdWx0TGlzdDogVmFsaWRhdGlvblJlc3VsdExpc3QgPSB2YWxpZGF0b3IudmFsaWRhdGUocHJvcFZhbHVlLCBwYXJlbnRWYWx1ZSwgY3VzdG9tT3B0aW9ucyk7XG5cdFx0XHRcdHJlc3VsdHMgPSByZXN1bHRzLm1lcmdlKF9yZXN1bHRMaXN0KTtcblxuXHRcdFx0XHRpZiAoIXJlc3VsdHMuaXNWYWxpZCAmJiB0aGlzLnN0b3BPbkZpcnN0RmFpbHVyZSkge1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdHM7XG5cdH1cblxuXHRwcm90ZWN0ZWQgZ2V0UHJvcGVydHlSZXN1bHRzKHZhbHVlOiBhbnksIHBhcmVudFZhbHVlOiBhbnksIGN1c3RvbU9wdGlvbnM6IGFueSwgcmVzdWx0czogVmFsaWRhdGlvblJlc3VsdExpc3QpOiBWYWxpZGF0aW9uUmVzdWx0TGlzdCB7XG5cdFx0cmVzdWx0cyA9IHRoaXMucnVuUHJlZGljYXRlcyh2YWx1ZSwgcGFyZW50VmFsdWUsIGN1c3RvbU9wdGlvbnMsIHJlc3VsdHMpO1xuXG5cdFx0aWYgKHJlc3VsdHMuaXNWYWxpZCB8fCAhdGhpcy5zdG9wT25GaXJzdEZhaWx1cmUpIHtcblx0XHRcdHJlc3VsdHMgPSB0aGlzLnJ1blZhbGlkYXRvcnModmFsdWUsIHBhcmVudFZhbHVlLCBjdXN0b21PcHRpb25zLCByZXN1bHRzKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0cztcblx0fVxuXG5cdHB1YmxpYyB2YWxpZGF0ZSh2YWx1ZTogYW55LCBwYXJlbnRWYWx1ZT86IFRQYXJlbnRWYWx1ZSwgY3VzdG9tT3B0aW9ucz86IFRDdXN0b21PcHRpb25zKTogVmFsaWRhdGlvblJlc3VsdExpc3Qge1xuXHRcdHZhbHVlID0gY29weSh2YWx1ZSk7XG5cdFx0cGFyZW50VmFsdWUgPSBjb3B5KHBhcmVudFZhbHVlKTtcblxuXHRcdGxldCByZXN1bHRzID0gbmV3IFZhbGlkYXRpb25SZXN1bHRMaXN0KFtdLCB0aGlzLnByb3BlcnR5TmFtZSwgdmFsdWUpO1xuXG5cdFx0cmV0dXJuIHRoaXMuZ2V0UHJvcGVydHlSZXN1bHRzKHZhbHVlLCBwYXJlbnRWYWx1ZSwgY3VzdG9tT3B0aW9ucywgcmVzdWx0cyk7XG5cblx0fVxufSJdfQ==