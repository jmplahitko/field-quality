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

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Rule = /*#__PURE__*/function () {
  function Rule(propertyName) {
    _classCallCheck(this, Rule);

    _defineProperty(this, "predicates", new Map());

    _defineProperty(this, "validators", new Map());

    _defineProperty(this, "stopOnFirstFailure", true);

    this.propertyName = propertyName || '';
  }

  _createClass(Rule, [{
    key: "isEmpty",
    get: function get() {
      return this.predicates.size === 0 && this.validators.size === 0;
    }
  }, {
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
  }]);

  return Rule;
}();

exports["default"] = Rule;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9SdWxlLnRzIl0sIm5hbWVzIjpbIlJ1bGUiLCJwcm9wZXJ0eU5hbWUiLCJNYXAiLCJwcmVkaWNhdGVzIiwic2l6ZSIsInZhbGlkYXRvcnMiLCJhbGxvd2VkVmFsdWVzIiwiYmVFbnVtZXJhdGVkVmFsdWUiLCJtZXRhIiwibmFtZSIsIm1lc3NhZ2UiLCJqb2luIiwicHJlY29uZGl0aW9uIiwiaXNWYWxpZElmRW1wdHkiLCJzZXZlcml0eSIsIlNldmVyaXR5Iiwic2V0IiwiUnVsZUFwaSIsIm1pbiIsIm1heCIsImJlQmV0d2VlbiIsInJ4IiwibWF0Y2hlcyIsIm1hdGNoUngiLCJ2YWwiLCJub3ROdWxsIiwibm90RW1wdHkiLCJudW0iLCJiZUxlc3NUaGFuT3JFcXVhbCIsImJlTGVzc1RoYW4iLCJiZUdyZWF0ZXJUaGFuT3JFcXVhbCIsImJlR3JlYXRlclRoYW4iLCJwcmVkaWNhdGUiLCJzdG9wT25GaXJzdEZhaWx1cmUiLCJ2YWxpZGF0YWJsZSIsImRlZmluZSIsInJ1bGUiLCJwcm9wVmFsdWUiLCJwYXJlbnRWYWx1ZSIsImN1c3RvbU9wdGlvbnMiLCJyZXN1bHRzIiwicmVzdWx0IiwiVmFsaWRhdGlvblJlc3VsdCIsImlzVmFsaWQiLCJlcnJvciIsImVycm9ycyIsIndhcm5pbmdzIiwicHVzaCIsInZhbGlkYXRvciIsIl9yZXN1bHRMaXN0IiwidmFsaWRhdGUiLCJtZXJnZSIsInZhbHVlIiwicnVuUHJlZGljYXRlcyIsInJ1blZhbGlkYXRvcnMiLCJWYWxpZGF0aW9uUmVzdWx0TGlzdCIsImdldFByb3BlcnR5UmVzdWx0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUlBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVxQkEsSTtBQU1wQixnQkFBWUMsWUFBWixFQUFtQztBQUFBOztBQUFBLHdDQUp3QyxJQUFJQyxHQUFKLEVBSXhDOztBQUFBLHdDQUh3QyxJQUFJQSxHQUFKLEVBR3hDOztBQUFBLGdEQUZLLElBRUw7O0FBQ2xDLFNBQUtELFlBQUwsR0FBb0JBLFlBQVksSUFBSSxFQUFwQztBQUNBOzs7O1NBRUQsZUFBYztBQUNiLGFBQU8sS0FBS0UsVUFBTCxDQUFnQkMsSUFBaEIsS0FBeUIsQ0FBekIsSUFBOEIsS0FBS0MsVUFBTCxDQUFnQkQsSUFBaEIsS0FBeUIsQ0FBOUQ7QUFDQTs7O1dBRUQsZUFBWUUsYUFBWixFQUF3RjtBQUFBOztBQUN2RixVQUFJQyxpQkFBaUIsR0FBRyw2QkFBWUQsYUFBWixDQUF4QjtBQUVBLFVBQUlFLElBQUksR0FBRztBQUNWQyxRQUFBQSxJQUFJLHFCQURNO0FBRVZDLFFBQUFBLE9BQU8sRUFBRTtBQUFBLDJCQUFVLEtBQUksQ0FBQ1QsWUFBZiw4Q0FBOERLLGFBQWEsQ0FBQ0ssSUFBZCxDQUFtQixJQUFuQixDQUE5RDtBQUFBLFNBRkM7QUFHVkMsUUFBQUEsWUFBWSxFQUFFLElBSEo7QUFJVkMsUUFBQUEsY0FBYyxFQUFFLElBSk47QUFLVkMsUUFBQUEsUUFBUSxFQUFFQztBQUxBLE9BQVg7QUFRQSxXQUFLWixVQUFMLENBQWdCYSxHQUFoQixDQUFvQlQsaUJBQXBCLEVBQXVDQyxJQUF2QztBQUVBLGFBQU8sSUFBSVMsbUJBQUosQ0FBMEMsSUFBMUMsRUFBZ0RULElBQWhELENBQVA7QUFDQTs7O1dBRUQsZ0JBQWNVLEdBQWQsRUFBMkJDLEdBQTNCLEVBQStFO0FBQUE7O0FBQzlFLFVBQUlDLFNBQVMsR0FBRyx3QkFBT0YsR0FBUCxFQUFZQyxHQUFaLENBQWhCO0FBQ0EsVUFBSVgsSUFBSSxHQUFHO0FBQ1ZDLFFBQUFBLElBQUkscUJBQWNTLEdBQWQsZ0JBQXVCQyxHQUF2QixDQURNO0FBRVZULFFBQUFBLE9BQU8sRUFBRTtBQUFBLDJCQUFVLE1BQUksQ0FBQ1QsWUFBZiw4QkFBK0NpQixHQUEvQyxrQkFBMERDLEdBQTFEO0FBQUEsU0FGQztBQUdWUCxRQUFBQSxZQUFZLEVBQUUsSUFISjtBQUlWQyxRQUFBQSxjQUFjLEVBQUUsS0FKTjtBQUtWQyxRQUFBQSxRQUFRLEVBQUVDO0FBTEEsT0FBWDtBQVFBLFdBQUtaLFVBQUwsQ0FBZ0JhLEdBQWhCLENBQW9CSSxTQUFwQixFQUErQlosSUFBL0I7QUFFQSxhQUFPLElBQUlTLG1CQUFKLENBQTBDLElBQTFDLEVBQWdEVCxJQUFoRCxDQUFQO0FBQ0E7OztXQUVELHVCQUFxQlUsR0FBckIsRUFBa0NDLEdBQWxDLEVBQXNGO0FBQUE7O0FBQ3JGLFVBQUlDLFNBQVMsR0FBRyx3QkFBT0YsR0FBUCxFQUFZQyxHQUFaLENBQWhCO0FBQ0EsVUFBSVgsSUFBSSxHQUFHO0FBQ1ZDLFFBQUFBLElBQUkscUJBQWNTLEdBQWQsZ0JBQXVCQyxHQUF2QixZQURNO0FBRVZULFFBQUFBLE9BQU8sRUFBRTtBQUFBLDJCQUFVLE1BQUksQ0FBQ1QsWUFBZiw4QkFBK0NpQixHQUEvQyxrQkFBMERDLEdBQTFEO0FBQUEsU0FGQztBQUdWUCxRQUFBQSxZQUFZLEVBQUUsSUFISjtBQUlWQyxRQUFBQSxjQUFjLEVBQUUsSUFKTjtBQUtWQyxRQUFBQSxRQUFRLEVBQUVDO0FBTEEsT0FBWDtBQVFBLFdBQUtaLFVBQUwsQ0FBZ0JhLEdBQWhCLENBQW9CSSxTQUFwQixFQUErQlosSUFBL0I7QUFFQSxhQUFPLElBQUlTLG1CQUFKLENBQTBDLElBQTFDLEVBQWdEVCxJQUFoRCxDQUFQO0FBQ0E7OztXQUVELGlCQUFlYSxFQUFmLEVBQWtFO0FBQUE7O0FBQ2pFLFVBQUlDLE9BQU8sR0FBRyx1QkFBTUQsRUFBTixDQUFkOztBQUNBLFVBQUlFLE9BQU8sR0FBRyxTQUFWQSxPQUFVLENBQUNDLEdBQUQ7QUFBQSxlQUFjLHFCQUFPQSxHQUFQLEtBQWVGLE9BQU8sQ0FBQ0UsR0FBRCxDQUFwQztBQUFBLE9BQWQ7O0FBQ0EsVUFBSWhCLElBQUksR0FBRztBQUNWQyxRQUFBQSxJQUFJLEVBQUVjLE9BQU8sQ0FBQ2QsSUFESjtBQUVWQyxRQUFBQSxPQUFPLEVBQUU7QUFBQSwyQkFBVSxNQUFJLENBQUNULFlBQWY7QUFBQSxTQUZDO0FBR1ZXLFFBQUFBLFlBQVksRUFBRSxJQUhKO0FBSVZDLFFBQUFBLGNBQWMsRUFBRSxJQUpOO0FBS1ZDLFFBQUFBLFFBQVEsRUFBRUM7QUFMQSxPQUFYO0FBUUEsV0FBS1osVUFBTCxDQUFnQmEsR0FBaEIsQ0FBb0JPLE9BQXBCLEVBQTZCZixJQUE3QjtBQUVBLGFBQU8sSUFBSVMsbUJBQUosQ0FBMEMsSUFBMUMsRUFBZ0RULElBQWhELENBQVA7QUFDQTs7O1dBRUQsbUJBQXdEO0FBQUE7O0FBQ3ZELFVBQUlBLElBQUksR0FBRztBQUNWQyxRQUFBQSxJQUFJLEVBQUVnQixvQkFBUWhCLElBREo7QUFFVkMsUUFBQUEsT0FBTyxFQUFFO0FBQUEsMkJBQVUsTUFBSSxDQUFDVCxZQUFmO0FBQUEsU0FGQztBQUdWVyxRQUFBQSxZQUFZLEVBQUUsSUFISjtBQUlWQyxRQUFBQSxjQUFjLEVBQUUsS0FKTjtBQUtWQyxRQUFBQSxRQUFRLEVBQUVDO0FBTEEsT0FBWDtBQVFBLFdBQUtaLFVBQUwsQ0FBZ0JhLEdBQWhCLENBQW9CUyxtQkFBcEIsRUFBNkJqQixJQUE3QjtBQUVBLGFBQU8sSUFBSVMsbUJBQUosQ0FBMEMsSUFBMUMsRUFBZ0RULElBQWhELENBQVA7QUFDQTs7O1dBRUQsb0JBQXlEO0FBQUE7O0FBQ3hELFVBQUlBLElBQUksR0FBRztBQUNWQyxRQUFBQSxJQUFJLEVBQUVpQixxQkFBU2pCLElBREw7QUFFVkMsUUFBQUEsT0FBTyxFQUFFO0FBQUEsMkJBQVUsTUFBSSxDQUFDVCxZQUFmO0FBQUEsU0FGQztBQUdWVyxRQUFBQSxZQUFZLEVBQUUsSUFISjtBQUlWQyxRQUFBQSxjQUFjLEVBQUUsS0FKTjtBQUtWQyxRQUFBQSxRQUFRLEVBQUVDO0FBTEEsT0FBWDtBQVFBLFdBQUtaLFVBQUwsQ0FBZ0JhLEdBQWhCLENBQW9CVSxvQkFBcEIsRUFBOEJsQixJQUE5QjtBQUVBLGFBQU8sSUFBSVMsbUJBQUosQ0FBMEMsSUFBMUMsRUFBZ0RULElBQWhELENBQVA7QUFDQTs7O1dBRUQsYUFBV21CLEdBQVgsRUFBK0Q7QUFBQTs7QUFDOUQsVUFBSUMsaUJBQWlCLEdBQUcscUJBQUlELEdBQUosQ0FBeEI7QUFFQSxVQUFJbkIsSUFBSSxHQUFHO0FBQ1ZDLFFBQUFBLElBQUksRUFBRSxtQkFESTtBQUVWQyxRQUFBQSxPQUFPLEVBQUU7QUFBQSwyQkFBVSxNQUFJLENBQUNULFlBQWYsaURBQWtFMEIsR0FBbEU7QUFBQSxTQUZDO0FBR1ZmLFFBQUFBLFlBQVksRUFBRSxJQUhKO0FBSVZDLFFBQUFBLGNBQWMsRUFBRSxLQUpOO0FBS1ZDLFFBQUFBLFFBQVEsRUFBRUM7QUFMQSxPQUFYO0FBUUEsV0FBS1osVUFBTCxDQUFnQmEsR0FBaEIsQ0FBb0JZLGlCQUFwQixFQUFxRHBCLElBQXJEO0FBRUEsYUFBTyxJQUFJUyxtQkFBSixDQUEwQyxJQUExQyxFQUFnRFQsSUFBaEQsQ0FBUDtBQUNBOzs7V0FFRCx3QkFBc0JtQixHQUF0QixFQUEwRTtBQUFBOztBQUN6RSxVQUFJRSxVQUFVLEdBQUcscUJBQUlGLEdBQUcsR0FBRyxDQUFWLENBQWpCO0FBRUEsVUFBSW5CLElBQUksR0FBRztBQUNWQyxRQUFBQSxJQUFJLEVBQUUsWUFESTtBQUVWQyxRQUFBQSxPQUFPLEVBQUU7QUFBQSwyQkFBVSxNQUFJLENBQUNULFlBQWYscUNBQXNEMEIsR0FBdEQ7QUFBQSxTQUZDO0FBR1ZmLFFBQUFBLFlBQVksRUFBRSxJQUhKO0FBSVZDLFFBQUFBLGNBQWMsRUFBRSxLQUpOO0FBS1ZDLFFBQUFBLFFBQVEsRUFBRUM7QUFMQSxPQUFYO0FBUUEsV0FBS1osVUFBTCxDQUFnQmEsR0FBaEIsQ0FBb0JhLFVBQXBCLEVBQThDckIsSUFBOUM7QUFFQSxhQUFPLElBQUlTLG1CQUFKLENBQTBDLElBQTFDLEVBQWdEVCxJQUFoRCxDQUFQO0FBQ0E7OztXQUVELGFBQVdtQixHQUFYLEVBQStEO0FBQUE7O0FBQzlELFVBQUlHLG9CQUFvQixHQUFHLHFCQUFJSCxHQUFKLENBQTNCO0FBRUEsVUFBSW5CLElBQUksR0FBRztBQUNWQyxRQUFBQSxJQUFJLEVBQUUsc0JBREk7QUFFVkMsUUFBQUEsT0FBTyxFQUFFO0FBQUEsMkJBQVUsTUFBSSxDQUFDVCxZQUFmLDhDQUErRDBCLEdBQS9EO0FBQUEsU0FGQztBQUdWZixRQUFBQSxZQUFZLEVBQUUsSUFISjtBQUlWQyxRQUFBQSxjQUFjLEVBQUUsS0FKTjtBQUtWQyxRQUFBQSxRQUFRLEVBQUVDO0FBTEEsT0FBWDtBQVFBLFdBQUtaLFVBQUwsQ0FBZ0JhLEdBQWhCLENBQW9CYyxvQkFBcEIsRUFBd0R0QixJQUF4RDtBQUVBLGFBQU8sSUFBSVMsbUJBQUosQ0FBMEMsSUFBMUMsRUFBZ0RULElBQWhELENBQVA7QUFDQTs7O1dBRUQsd0JBQXNCbUIsR0FBdEIsRUFBMEU7QUFBQTs7QUFDekUsVUFBSUksYUFBYSxHQUFHLHFCQUFJSixHQUFHLEdBQUcsQ0FBVixDQUFwQjtBQUVBLFVBQUluQixJQUFJLEdBQUc7QUFDVkMsUUFBQUEsSUFBSSxFQUFFLGVBREk7QUFFVkMsUUFBQUEsT0FBTyxFQUFFO0FBQUEsMkJBQVUsT0FBSSxDQUFDVCxZQUFmLGtDQUFtRDBCLEdBQW5EO0FBQUEsU0FGQztBQUdWZixRQUFBQSxZQUFZLEVBQUUsSUFISjtBQUlWQyxRQUFBQSxjQUFjLEVBQUUsS0FKTjtBQUtWQyxRQUFBQSxRQUFRLEVBQUVDO0FBTEEsT0FBWDtBQVFBLFdBQUtaLFVBQUwsQ0FBZ0JhLEdBQWhCLENBQW9CZSxhQUFwQixFQUFpRHZCLElBQWpEO0FBRUEsYUFBTyxJQUFJUyxtQkFBSixDQUEwQyxJQUExQyxFQUFnRFQsSUFBaEQsQ0FBUDtBQUNBOzs7V0FFRCxjQUFZd0IsU0FBWixFQUF3RztBQUFBOztBQUN2RyxVQUFJeEIsSUFBSSxHQUFHO0FBQ1ZDLFFBQUFBLElBQUksRUFBRXVCLFNBQVMsQ0FBQ3ZCLElBRE47QUFFVkMsUUFBQUEsT0FBTyxFQUFFO0FBQUEsMkJBQVUsT0FBSSxDQUFDVCxZQUFmO0FBQUEsU0FGQztBQUdWVyxRQUFBQSxZQUFZLEVBQUUsSUFISjtBQUlWQyxRQUFBQSxjQUFjLEVBQUUsS0FKTjtBQUtWQyxRQUFBQSxRQUFRLEVBQUVDO0FBTEEsT0FBWDtBQVFBLFdBQUtaLFVBQUwsQ0FBZ0JhLEdBQWhCLENBQW9CZ0IsU0FBcEIsRUFBK0J4QixJQUEvQjtBQUVBLGFBQU8sSUFBSVMsbUJBQUosQ0FBMEMsSUFBMUMsRUFBZ0RULElBQWhELENBQVA7QUFDQTs7O1dBRUQsbUJBQXVCO0FBQ3RCLFdBQUt5QixrQkFBTCxHQUEwQixLQUExQjtBQUNBOzs7V0FFRCxlQUFhQyxXQUFiLEVBQTRFO0FBQzNFQSxNQUFBQSxXQUFXLENBQUNqQyxZQUFaLEdBQTJCLEtBQUtBLFlBQUwsSUFBcUJpQyxXQUFXLENBQUNqQyxZQUFqQyxJQUFpRCxFQUE1RTtBQUVBLFVBQUlPLElBQUksR0FBRztBQUNWQyxRQUFBQSxJQUFJLEVBQUV5QixXQUFXLENBQUNqQyxZQURSO0FBRVZTLFFBQUFBLE9BQU8sRUFBRTtBQUFBLGlCQUFPLEVBQVA7QUFBQSxTQUZDO0FBR1ZFLFFBQUFBLFlBQVksRUFBRSxJQUhKO0FBSVZDLFFBQUFBLGNBQWMsRUFBRSxLQUpOO0FBS1ZDLFFBQUFBLFFBQVEsRUFBRUM7QUFMQSxPQUFYO0FBUUEsV0FBS1YsVUFBTCxDQUFnQlcsR0FBaEIsQ0FBb0JrQixXQUFwQixFQUFpQzFCLElBQWpDO0FBQ0EsYUFBTyxJQUFQO0FBQ0E7OztXQUVELGFBQVVJLFlBQVYsRUFBcUV1QixNQUFyRSxFQUF1STtBQUN0SSxVQUFJQyxJQUFJLEdBQUcsSUFBSXBDLElBQUosQ0FBUyxLQUFLQyxZQUFkLENBQVg7QUFDQSxVQUFJTyxJQUFJLEdBQUc7QUFDVkMsUUFBQUEsSUFBSSxFQUFFMkIsSUFBSSxDQUFDbkMsWUFERDtBQUVWUyxRQUFBQSxPQUFPLEVBQUU7QUFBQSxpQkFBTyxFQUFQO0FBQUEsU0FGQztBQUdWRSxRQUFBQSxZQUFZLEVBQVpBLFlBSFU7QUFJVkMsUUFBQUEsY0FBYyxFQUFFLEtBSk47QUFLVkMsUUFBQUEsUUFBUSxFQUFFQztBQUxBLE9BQVg7QUFRQSxXQUFLVixVQUFMLENBQWdCVyxHQUFoQixDQUFvQm9CLElBQXBCLEVBQTBCNUIsSUFBMUI7QUFDQTJCLE1BQUFBLE1BQU0sQ0FBQ0MsSUFBRCxDQUFOO0FBRUEsYUFBTyxJQUFQO0FBQ0E7OztXQUVELHVCQUF3QkMsU0FBeEIsRUFBd0NDLFdBQXhDLEVBQTBEQyxhQUExRCxFQUE4RUMsT0FBOUUsRUFBbUk7QUFDbEksVUFBTUMsTUFBTSxHQUFHLElBQUlDLDRCQUFKLENBQXFCLEtBQUt6QyxZQUExQixFQUF3Q29DLFNBQXhDLENBQWY7O0FBRGtJLGlEQUdwRyxLQUFLbEMsVUFIK0Y7QUFBQTs7QUFBQTtBQUdsSSw0REFBK0M7QUFBQTtBQUFBLGNBQXJDNkIsU0FBcUM7QUFBQSxjQUExQnhCLElBQTBCOztBQUM5QztBQUNBLGNBQUksc0JBQVE2QixTQUFSLEtBQXNCN0IsSUFBSSxDQUFDSyxjQUEvQixFQUErQztBQUM5QztBQUNBLFdBSjZDLENBTTlDOzs7QUFDQSxjQUFJLENBQUNMLElBQUksQ0FBQ0ksWUFBTixJQUFzQkosSUFBSSxDQUFDSSxZQUFMLENBQWtCMEIsV0FBbEIsRUFBK0JDLGFBQS9CLENBQTFCLEVBQXlFO0FBQ3hFLGdCQUFJSSxPQUFPLEdBQUdYLFNBQVMsQ0FBQ0ssU0FBRCxFQUFZQyxXQUFaLEVBQXlCQyxhQUF6QixDQUF2Qjs7QUFFQSxnQkFBSSxDQUFDSSxPQUFMLEVBQWM7QUFDYixrQkFBSW5DLElBQUksQ0FBQ00sUUFBTCxLQUFrQkMscUJBQVM2QixLQUEvQixFQUFzQztBQUNyQ0gsZ0JBQUFBLE1BQU0sQ0FBQ0ksTUFBUCxDQUFjckMsSUFBSSxDQUFDQyxJQUFuQixJQUEyQkQsSUFBSSxDQUFDRSxPQUFMLENBQWEyQixTQUFiLEVBQXdCQyxXQUF4QixFQUFxQ0MsYUFBckMsQ0FBM0IsQ0FEcUMsQ0FHckM7O0FBQ0Esb0JBQUksS0FBS04sa0JBQVQsRUFBNkI7QUFDNUI7QUFDQTtBQUNELGVBUEQsTUFPTztBQUNOUSxnQkFBQUEsTUFBTSxDQUFDSyxRQUFQLENBQWdCdEMsSUFBSSxDQUFDQyxJQUFyQixJQUE2QkQsSUFBSSxDQUFDRSxPQUFMLENBQWEyQixTQUFiLEVBQXdCQyxXQUF4QixFQUFxQ0MsYUFBckMsQ0FBN0I7QUFDQTtBQUNEO0FBQ0Q7QUFDRDtBQTFCaUk7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUE0QmxJQyxNQUFBQSxPQUFPLENBQUNPLElBQVIsQ0FBYU4sTUFBYjtBQUVBLGFBQU9ELE9BQVA7QUFDQTs7O1dBRUQsdUJBQXdCSCxTQUF4QixFQUF3Q0MsV0FBeEMsRUFBMERDLGFBQTFELEVBQThFQyxPQUE5RSxFQUFtSTtBQUFBLGtEQUNwRyxLQUFLbkMsVUFEK0Y7QUFBQTs7QUFBQTtBQUNsSSwrREFBK0M7QUFBQTtBQUFBLGNBQXJDMkMsU0FBcUM7QUFBQSxjQUExQnhDLElBQTBCOztBQUM5QyxjQUFJLENBQUNBLElBQUksQ0FBQ0ksWUFBTixJQUFzQkosSUFBSSxDQUFDSSxZQUFMLENBQWtCMEIsV0FBbEIsRUFBK0JDLGFBQS9CLENBQTFCLEVBQXlFO0FBQ3hFLGdCQUFJVSxXQUFpQyxHQUFHRCxTQUFTLENBQUNFLFFBQVYsQ0FBbUJiLFNBQW5CLEVBQThCQyxXQUE5QixFQUEyQ0MsYUFBM0MsQ0FBeEM7O0FBQ0FDLFlBQUFBLE9BQU8sR0FBR0EsT0FBTyxDQUFDVyxLQUFSLENBQWNGLFdBQWQsQ0FBVjs7QUFFQSxnQkFBSSxDQUFDVCxPQUFPLENBQUNHLE9BQVQsSUFBb0IsS0FBS1Ysa0JBQTdCLEVBQWlEO0FBQ2hEO0FBQ0E7QUFDRDtBQUNEO0FBVmlJO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBWWxJLGFBQU9PLE9BQVA7QUFDQTs7O1dBRUQsNEJBQTZCWSxLQUE3QixFQUF5Q2QsV0FBekMsRUFBMkRDLGFBQTNELEVBQStFQyxPQUEvRSxFQUFvSTtBQUNuSUEsTUFBQUEsT0FBTyxHQUFHLEtBQUthLGFBQUwsQ0FBbUJELEtBQW5CLEVBQTBCZCxXQUExQixFQUF1Q0MsYUFBdkMsRUFBc0RDLE9BQXRELENBQVY7O0FBRUEsVUFBSUEsT0FBTyxDQUFDRyxPQUFSLElBQW1CLENBQUMsS0FBS1Ysa0JBQTdCLEVBQWlEO0FBQ2hETyxRQUFBQSxPQUFPLEdBQUcsS0FBS2MsYUFBTCxDQUFtQkYsS0FBbkIsRUFBMEJkLFdBQTFCLEVBQXVDQyxhQUF2QyxFQUFzREMsT0FBdEQsQ0FBVjtBQUNBOztBQUVELGFBQU9BLE9BQVA7QUFDQTs7O1dBRUQsa0JBQWdCWSxLQUFoQixFQUE0QmQsV0FBNUIsRUFBd0RDLGFBQXhELEVBQThHO0FBQzdHYSxNQUFBQSxLQUFLLEdBQUcsc0JBQUtBLEtBQUwsQ0FBUjtBQUNBZCxNQUFBQSxXQUFXLEdBQUcsc0JBQUtBLFdBQUwsQ0FBZDtBQUVBLFVBQUlFLE9BQU8sR0FBRyxJQUFJZSxnQ0FBSixDQUF5QixFQUF6QixFQUE2QixLQUFLdEQsWUFBbEMsRUFBZ0RtRCxLQUFoRCxDQUFkO0FBRUEsYUFBTyxLQUFLSSxrQkFBTCxDQUF3QkosS0FBeEIsRUFBK0JkLFdBQS9CLEVBQTRDQyxhQUE1QyxFQUEyREMsT0FBM0QsQ0FBUDtBQUVBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJ1bGVBcGkgZnJvbSAnLi9SdWxlQXBpJztcbmltcG9ydCBTZXZlcml0eSBmcm9tICcuL1NldmVyaXR5JztcbmltcG9ydCBWYWxpZGF0aW9uUmVzdWx0IGZyb20gJy4vVmFsaWRhdGlvblJlc3VsdCc7XG5pbXBvcnQgVmFsaWRhdGlvblJlc3VsdExpc3QgZnJvbSAnLi9WYWxpZGF0aW9uUmVzdWx0TGlzdCc7XG5cbmltcG9ydCB7IElWYWxpZGF0YWJsZSwgVFByZWNvbmRpdGlvbiwgVFByZWRpY2F0ZSwgVFByZWRpY2F0ZUNvbGxlY3Rpb24sIFRWYWxpZGF0b3JDb2xsZWN0aW9uIH0gZnJvbSAnLi90eXBlcyc7XG5cbmltcG9ydCBjb3B5IGZyb20gJy4vdXRpbHMvY29weSc7XG5pbXBvcnQgeyBsZW5ndGgsIG1hdGNoLCBtYXgsIG1pbiwgbm90RW1wdHksIG5vdE51bGwsIGJlVmFsaWRFbnVtIH0gZnJvbSAnLi91dGlscy9wcmVkaWNhdGVzJztcbmltcG9ydCB7IGlzRW1wdHksIGlzTnVsbCB9IGZyb20gJy4vdXRpbHMvcXVhbGl0eSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJ1bGU8VFBhcmVudFZhbHVlID0gYW55LCBUQ3VzdG9tT3B0aW9ucyA9IGFueT4gaW1wbGVtZW50cyBJVmFsaWRhdGFibGU8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ge1xuXHRwdWJsaWMgcHJvcGVydHlOYW1lOiBzdHJpbmc7XG5cdHByb3RlY3RlZCBwcmVkaWNhdGVzOiBUUHJlZGljYXRlQ29sbGVjdGlvbjxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiA9IG5ldyBNYXAoKTtcblx0cHJvdGVjdGVkIHZhbGlkYXRvcnM6IFRWYWxpZGF0b3JDb2xsZWN0aW9uPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+ID0gbmV3IE1hcCgpO1xuXHRwcm90ZWN0ZWQgc3RvcE9uRmlyc3RGYWlsdXJlOiBib29sZWFuID0gdHJ1ZTtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0eU5hbWU/OiBzdHJpbmcpIHtcblx0XHR0aGlzLnByb3BlcnR5TmFtZSA9IHByb3BlcnR5TmFtZSB8fCAnJztcblx0fVxuXG5cdGdldCBpc0VtcHR5KCkge1xuXHRcdHJldHVybiB0aGlzLnByZWRpY2F0ZXMuc2l6ZSA9PT0gMCAmJiB0aGlzLnZhbGlkYXRvcnMuc2l6ZSA9PT0gMDtcblx0fVxuXG5cdHB1YmxpYyBlbnVtKGFsbG93ZWRWYWx1ZXM6IEFycmF5PHN0cmluZ3xudW1iZXI+KTogUnVsZUFwaTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiB7XG5cdFx0bGV0IGJlRW51bWVyYXRlZFZhbHVlID0gYmVWYWxpZEVudW0oYWxsb3dlZFZhbHVlcyk7XG5cblx0XHRsZXQgbWV0YSA9IHtcblx0XHRcdG5hbWU6IGBiZUVudW1lcmF0ZWRWYWx1ZWAsXG5cdFx0XHRtZXNzYWdlOiAoKSA9PiAgYCR7dGhpcy5wcm9wZXJ0eU5hbWV9IG11c3QgYmUgb25lIG9mIHRoZSBmb2xsb3dpbmc6IFwiJHthbGxvd2VkVmFsdWVzLmpvaW4oJywgJyl9XCIuYCxcblx0XHRcdHByZWNvbmRpdGlvbjogbnVsbCxcblx0XHRcdGlzVmFsaWRJZkVtcHR5OiB0cnVlLFxuXHRcdFx0c2V2ZXJpdHk6IFNldmVyaXR5LmRlZmF1bHRcblx0XHR9O1xuXG5cdFx0dGhpcy5wcmVkaWNhdGVzLnNldChiZUVudW1lcmF0ZWRWYWx1ZSwgbWV0YSk7XG5cblx0XHRyZXR1cm4gbmV3IFJ1bGVBcGk8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4odGhpcywgbWV0YSk7XG5cdH1cblxuXHRwdWJsaWMgbGVuZ3RoKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IFJ1bGVBcGk8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ge1xuXHRcdGxldCBiZUJldHdlZW4gPSBsZW5ndGgobWluLCBtYXgpO1xuXHRcdGxldCBtZXRhID0ge1xuXHRcdFx0bmFtZTogYGJlQmV0d2VlbiR7bWlufWFuZCR7bWF4fWAsXG5cdFx0XHRtZXNzYWdlOiAoKSA9PiAgYCR7dGhpcy5wcm9wZXJ0eU5hbWV9IG11c3QgYmUgYmV0d2VlbiAke21pbn0gYW5kICR7bWF4fS5gLFxuXHRcdFx0cHJlY29uZGl0aW9uOiBudWxsLFxuXHRcdFx0aXNWYWxpZElmRW1wdHk6IGZhbHNlLFxuXHRcdFx0c2V2ZXJpdHk6IFNldmVyaXR5LmRlZmF1bHRcblx0XHR9O1xuXG5cdFx0dGhpcy5wcmVkaWNhdGVzLnNldChiZUJldHdlZW4sIG1ldGEpO1xuXG5cdFx0cmV0dXJuIG5ldyBSdWxlQXBpPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+KHRoaXMsIG1ldGEpO1xuXHR9XG5cblx0cHVibGljIGxlbmd0aE9yRW1wdHkobWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogUnVsZUFwaTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiB7XG5cdFx0bGV0IGJlQmV0d2VlbiA9IGxlbmd0aChtaW4sIG1heCk7XG5cdFx0bGV0IG1ldGEgPSB7XG5cdFx0XHRuYW1lOiBgYmVCZXR3ZWVuJHttaW59YW5kJHttYXh9T3JFbXB0eWAsXG5cdFx0XHRtZXNzYWdlOiAoKSA9PiAgYCR7dGhpcy5wcm9wZXJ0eU5hbWV9IG11c3QgYmUgYmV0d2VlbiAke21pbn0gYW5kICR7bWF4fS5gLFxuXHRcdFx0cHJlY29uZGl0aW9uOiBudWxsLFxuXHRcdFx0aXNWYWxpZElmRW1wdHk6IHRydWUsXG5cdFx0XHRzZXZlcml0eTogU2V2ZXJpdHkuZGVmYXVsdFxuXHRcdH07XG5cblx0XHR0aGlzLnByZWRpY2F0ZXMuc2V0KGJlQmV0d2VlbiwgbWV0YSk7XG5cblx0XHRyZXR1cm4gbmV3IFJ1bGVBcGk8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4odGhpcywgbWV0YSk7XG5cdH1cblxuXHRwdWJsaWMgbWF0Y2hlcyhyeDogUmVnRXhwKTogUnVsZUFwaTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiB7XG5cdFx0bGV0IG1hdGNoZXMgPSBtYXRjaChyeCk7XG5cdFx0bGV0IG1hdGNoUnggPSAodmFsOiBhbnkpID0+IGlzTnVsbCh2YWwpIHx8IG1hdGNoZXModmFsKTtcblx0XHRsZXQgbWV0YSA9IHtcblx0XHRcdG5hbWU6IG1hdGNoUngubmFtZSxcblx0XHRcdG1lc3NhZ2U6ICgpID0+ICBgJHt0aGlzLnByb3BlcnR5TmFtZX0gaXMgYW4gaW52YWxpZCBmb3JtYXQuYCxcblx0XHRcdHByZWNvbmRpdGlvbjogbnVsbCxcblx0XHRcdGlzVmFsaWRJZkVtcHR5OiB0cnVlLFxuXHRcdFx0c2V2ZXJpdHk6IFNldmVyaXR5LmRlZmF1bHRcblx0XHR9O1xuXG5cdFx0dGhpcy5wcmVkaWNhdGVzLnNldChtYXRjaFJ4LCBtZXRhKTtcblxuXHRcdHJldHVybiBuZXcgUnVsZUFwaTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPih0aGlzLCBtZXRhKTtcblx0fVxuXG5cdHB1YmxpYyBub3ROdWxsKCk6IFJ1bGVBcGk8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ge1xuXHRcdGxldCBtZXRhID0ge1xuXHRcdFx0bmFtZTogbm90TnVsbC5uYW1lLFxuXHRcdFx0bWVzc2FnZTogKCkgPT4gIGAke3RoaXMucHJvcGVydHlOYW1lfSBjYW5ub3QgYmUgbnVsbC5gLFxuXHRcdFx0cHJlY29uZGl0aW9uOiBudWxsLFxuXHRcdFx0aXNWYWxpZElmRW1wdHk6IGZhbHNlLFxuXHRcdFx0c2V2ZXJpdHk6IFNldmVyaXR5LmRlZmF1bHRcblx0XHR9O1xuXG5cdFx0dGhpcy5wcmVkaWNhdGVzLnNldChub3ROdWxsLCBtZXRhKTtcblxuXHRcdHJldHVybiBuZXcgUnVsZUFwaTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPih0aGlzLCBtZXRhKTtcblx0fVxuXG5cdHB1YmxpYyBub3RFbXB0eSgpOiBSdWxlQXBpPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+IHtcblx0XHRsZXQgbWV0YSA9IHtcblx0XHRcdG5hbWU6IG5vdEVtcHR5Lm5hbWUsXG5cdFx0XHRtZXNzYWdlOiAoKSA9PiAgYCR7dGhpcy5wcm9wZXJ0eU5hbWV9IGNhbm5vdCBiZSBlbXB0eS5gLFxuXHRcdFx0cHJlY29uZGl0aW9uOiBudWxsLFxuXHRcdFx0aXNWYWxpZElmRW1wdHk6IGZhbHNlLFxuXHRcdFx0c2V2ZXJpdHk6IFNldmVyaXR5LmRlZmF1bHRcblx0XHR9O1xuXG5cdFx0dGhpcy5wcmVkaWNhdGVzLnNldChub3RFbXB0eSwgbWV0YSk7XG5cblx0XHRyZXR1cm4gbmV3IFJ1bGVBcGk8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4odGhpcywgbWV0YSk7XG5cdH1cblxuXHRwdWJsaWMgbWF4KG51bTogbnVtYmVyKTogUnVsZUFwaTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiB7XG5cdFx0bGV0IGJlTGVzc1RoYW5PckVxdWFsID0gbWF4KG51bSk7XG5cblx0XHRsZXQgbWV0YSA9IHtcblx0XHRcdG5hbWU6ICdiZUxlc3NUaGFuT3JFcXVhbCcsXG5cdFx0XHRtZXNzYWdlOiAoKSA9PiAgYCR7dGhpcy5wcm9wZXJ0eU5hbWV9IGNhbm5vdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJHtudW19LmAsXG5cdFx0XHRwcmVjb25kaXRpb246IG51bGwsXG5cdFx0XHRpc1ZhbGlkSWZFbXB0eTogZmFsc2UsXG5cdFx0XHRzZXZlcml0eTogU2V2ZXJpdHkuZGVmYXVsdFxuXHRcdH07XG5cblx0XHR0aGlzLnByZWRpY2F0ZXMuc2V0KGJlTGVzc1RoYW5PckVxdWFsIGFzIFRQcmVkaWNhdGUsIG1ldGEpO1xuXG5cdFx0cmV0dXJuIG5ldyBSdWxlQXBpPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+KHRoaXMsIG1ldGEpO1xuXHR9XG5cblx0cHVibGljIG1heEV4Y2x1c2l2ZU9mKG51bTogbnVtYmVyKTogUnVsZUFwaTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiB7XG5cdFx0bGV0IGJlTGVzc1RoYW4gPSBtYXgobnVtIC0gMSk7XG5cblx0XHRsZXQgbWV0YSA9IHtcblx0XHRcdG5hbWU6ICdiZUxlc3NUaGFuJyxcblx0XHRcdG1lc3NhZ2U6ICgpID0+ICBgJHt0aGlzLnByb3BlcnR5TmFtZX0gY2Fubm90IGJlIGdyZWF0ZXIgdGhhbiAke251bX0uYCxcblx0XHRcdHByZWNvbmRpdGlvbjogbnVsbCxcblx0XHRcdGlzVmFsaWRJZkVtcHR5OiBmYWxzZSxcblx0XHRcdHNldmVyaXR5OiBTZXZlcml0eS5kZWZhdWx0XG5cdFx0fTtcblxuXHRcdHRoaXMucHJlZGljYXRlcy5zZXQoYmVMZXNzVGhhbiBhcyBUUHJlZGljYXRlLCBtZXRhKTtcblxuXHRcdHJldHVybiBuZXcgUnVsZUFwaTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPih0aGlzLCBtZXRhKTtcblx0fVxuXG5cdHB1YmxpYyBtaW4obnVtOiBudW1iZXIpOiBSdWxlQXBpPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+IHtcblx0XHRsZXQgYmVHcmVhdGVyVGhhbk9yRXF1YWwgPSBtaW4obnVtKTtcblxuXHRcdGxldCBtZXRhID0ge1xuXHRcdFx0bmFtZTogJ2JlR3JlYXRlclRoYW5PckVxdWFsJyxcblx0XHRcdG1lc3NhZ2U6ICgpID0+ICBgJHt0aGlzLnByb3BlcnR5TmFtZX0gY2Fubm90IGJlIGxlc3MgdGhhbiBvciBlcXVhbCB0byAke251bX0uYCxcblx0XHRcdHByZWNvbmRpdGlvbjogbnVsbCxcblx0XHRcdGlzVmFsaWRJZkVtcHR5OiBmYWxzZSxcblx0XHRcdHNldmVyaXR5OiBTZXZlcml0eS5kZWZhdWx0XG5cdFx0fTtcblxuXHRcdHRoaXMucHJlZGljYXRlcy5zZXQoYmVHcmVhdGVyVGhhbk9yRXF1YWwgYXMgVFByZWRpY2F0ZSwgbWV0YSk7XG5cblx0XHRyZXR1cm4gbmV3IFJ1bGVBcGk8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4odGhpcywgbWV0YSk7XG5cdH1cblxuXHRwdWJsaWMgbWluRXhjbHVzaXZlT2YobnVtOiBudW1iZXIpOiBSdWxlQXBpPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+IHtcblx0XHRsZXQgYmVHcmVhdGVyVGhhbiA9IG1pbihudW0gKyAxKTtcblxuXHRcdGxldCBtZXRhID0ge1xuXHRcdFx0bmFtZTogJ2JlR3JlYXRlclRoYW4nLFxuXHRcdFx0bWVzc2FnZTogKCkgPT4gIGAke3RoaXMucHJvcGVydHlOYW1lfSBjYW5ub3QgYmUgbGVzcyB0aGFuICR7bnVtfS5gLFxuXHRcdFx0cHJlY29uZGl0aW9uOiBudWxsLFxuXHRcdFx0aXNWYWxpZElmRW1wdHk6IGZhbHNlLFxuXHRcdFx0c2V2ZXJpdHk6IFNldmVyaXR5LmRlZmF1bHRcblx0XHR9O1xuXG5cdFx0dGhpcy5wcmVkaWNhdGVzLnNldChiZUdyZWF0ZXJUaGFuIGFzIFRQcmVkaWNhdGUsIG1ldGEpO1xuXG5cdFx0cmV0dXJuIG5ldyBSdWxlQXBpPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+KHRoaXMsIG1ldGEpO1xuXHR9XG5cblx0cHVibGljIG11c3QocHJlZGljYXRlOiBUUHJlZGljYXRlPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+KTogUnVsZUFwaTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiB7XG5cdFx0bGV0IG1ldGEgPSB7XG5cdFx0XHRuYW1lOiBwcmVkaWNhdGUubmFtZSxcblx0XHRcdG1lc3NhZ2U6ICgpID0+ICBgJHt0aGlzLnByb3BlcnR5TmFtZX0gaXMgaW52YWxpZC5gLFxuXHRcdFx0cHJlY29uZGl0aW9uOiBudWxsLFxuXHRcdFx0aXNWYWxpZElmRW1wdHk6IGZhbHNlLFxuXHRcdFx0c2V2ZXJpdHk6IFNldmVyaXR5LmRlZmF1bHRcblx0XHR9O1xuXG5cdFx0dGhpcy5wcmVkaWNhdGVzLnNldChwcmVkaWNhdGUsIG1ldGEpO1xuXG5cdFx0cmV0dXJuIG5ldyBSdWxlQXBpPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+KHRoaXMsIG1ldGEpO1xuXHR9XG5cblx0cHVibGljIGNhc2NhZGUoKTogdm9pZCB7XG5cdFx0dGhpcy5zdG9wT25GaXJzdEZhaWx1cmUgPSBmYWxzZTtcblx0fVxuXG5cdHB1YmxpYyB1c2luZyh2YWxpZGF0YWJsZTogSVZhbGlkYXRhYmxlPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+KTogUnVsZSB7XG5cdFx0dmFsaWRhdGFibGUucHJvcGVydHlOYW1lID0gdGhpcy5wcm9wZXJ0eU5hbWUgfHwgdmFsaWRhdGFibGUucHJvcGVydHlOYW1lIHx8ICcnO1xuXG5cdFx0bGV0IG1ldGEgPSB7XG5cdFx0XHRuYW1lOiB2YWxpZGF0YWJsZS5wcm9wZXJ0eU5hbWUsXG5cdFx0XHRtZXNzYWdlOiAoKSA9PiAgJycsXG5cdFx0XHRwcmVjb25kaXRpb246IG51bGwsXG5cdFx0XHRpc1ZhbGlkSWZFbXB0eTogZmFsc2UsXG5cdFx0XHRzZXZlcml0eTogU2V2ZXJpdHkuZGVmYXVsdFxuXHRcdH07XG5cblx0XHR0aGlzLnZhbGlkYXRvcnMuc2V0KHZhbGlkYXRhYmxlLCBtZXRhKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHB1YmxpYyBpZihwcmVjb25kaXRpb246IFRQcmVjb25kaXRpb248VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4sIGRlZmluZTogKHJ1bGU6IFJ1bGU8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4pID0+IHZvaWQpOiBSdWxlIHtcblx0XHRsZXQgcnVsZSA9IG5ldyBSdWxlKHRoaXMucHJvcGVydHlOYW1lKTtcblx0XHRsZXQgbWV0YSA9IHtcblx0XHRcdG5hbWU6IHJ1bGUucHJvcGVydHlOYW1lLFxuXHRcdFx0bWVzc2FnZTogKCkgPT4gICcnLFxuXHRcdFx0cHJlY29uZGl0aW9uLFxuXHRcdFx0aXNWYWxpZElmRW1wdHk6IGZhbHNlLFxuXHRcdFx0c2V2ZXJpdHk6IFNldmVyaXR5LmRlZmF1bHRcblx0XHR9O1xuXG5cdFx0dGhpcy52YWxpZGF0b3JzLnNldChydWxlLCBtZXRhKTtcblx0XHRkZWZpbmUocnVsZSk7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHByb3RlY3RlZCBydW5QcmVkaWNhdGVzKHByb3BWYWx1ZTogYW55LCBwYXJlbnRWYWx1ZTogYW55LCBjdXN0b21PcHRpb25zOiBhbnksIHJlc3VsdHM6IFZhbGlkYXRpb25SZXN1bHRMaXN0KTogVmFsaWRhdGlvblJlc3VsdExpc3Qge1xuXHRcdGNvbnN0IHJlc3VsdCA9IG5ldyBWYWxpZGF0aW9uUmVzdWx0KHRoaXMucHJvcGVydHlOYW1lLCBwcm9wVmFsdWUpO1xuXG5cdFx0Zm9yIChsZXQgW3ByZWRpY2F0ZSwgbWV0YV0gb2YgdGhpcy5wcmVkaWNhdGVzKSB7XG5cdFx0XHQvLyBXZSBjaGVjayBpZiB3ZSBzaG91bGQgcnVuIHRoZSB2YWxpZGF0b3IgYmFzZWQgb24gd2hldGhlciB0aGUgcHJvcGVydHkgaGFzIGEgdmFsdWVcblx0XHRcdGlmIChpc0VtcHR5KHByb3BWYWx1ZSkgJiYgbWV0YS5pc1ZhbGlkSWZFbXB0eSkge1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gV2UgY2hlY2sgZm9yIGEgcHJlY29uZGl0aW9uIHRvIGV4aXN0IGZvciBhIHByZWRpY2F0ZSBiZWZvcmUgY2FsbGluZyBpdFxuXHRcdFx0aWYgKCFtZXRhLnByZWNvbmRpdGlvbiB8fCBtZXRhLnByZWNvbmRpdGlvbihwYXJlbnRWYWx1ZSwgY3VzdG9tT3B0aW9ucykpIHtcblx0XHRcdFx0bGV0IGlzVmFsaWQgPSBwcmVkaWNhdGUocHJvcFZhbHVlLCBwYXJlbnRWYWx1ZSwgY3VzdG9tT3B0aW9ucyk7XG5cblx0XHRcdFx0aWYgKCFpc1ZhbGlkKSB7XG5cdFx0XHRcdFx0aWYgKG1ldGEuc2V2ZXJpdHkgPT09IFNldmVyaXR5LmVycm9yKSB7XG5cdFx0XHRcdFx0XHRyZXN1bHQuZXJyb3JzW21ldGEubmFtZV0gPSBtZXRhLm1lc3NhZ2UocHJvcFZhbHVlLCBwYXJlbnRWYWx1ZSwgY3VzdG9tT3B0aW9ucyk7XG5cblx0XHRcdFx0XHRcdC8vIFNob3J0LWNpcmN1aXQgaWYgd2UgaGF2ZSB0byBzdG9wT25GaXJzdEZhaWx1cmVcblx0XHRcdFx0XHRcdGlmICh0aGlzLnN0b3BPbkZpcnN0RmFpbHVyZSkge1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmVzdWx0Lndhcm5pbmdzW21ldGEubmFtZV0gPSBtZXRhLm1lc3NhZ2UocHJvcFZhbHVlLCBwYXJlbnRWYWx1ZSwgY3VzdG9tT3B0aW9ucyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmVzdWx0cy5wdXNoKHJlc3VsdCk7XG5cblx0XHRyZXR1cm4gcmVzdWx0cztcblx0fVxuXG5cdHByb3RlY3RlZCBydW5WYWxpZGF0b3JzKHByb3BWYWx1ZTogYW55LCBwYXJlbnRWYWx1ZTogYW55LCBjdXN0b21PcHRpb25zOiBhbnksIHJlc3VsdHM6IFZhbGlkYXRpb25SZXN1bHRMaXN0KTogVmFsaWRhdGlvblJlc3VsdExpc3Qge1xuXHRcdGZvciAobGV0IFt2YWxpZGF0b3IsIG1ldGFdIG9mIHRoaXMudmFsaWRhdG9ycykge1xuXHRcdFx0aWYgKCFtZXRhLnByZWNvbmRpdGlvbiB8fCBtZXRhLnByZWNvbmRpdGlvbihwYXJlbnRWYWx1ZSwgY3VzdG9tT3B0aW9ucykpIHtcblx0XHRcdFx0bGV0IF9yZXN1bHRMaXN0OiBWYWxpZGF0aW9uUmVzdWx0TGlzdCA9IHZhbGlkYXRvci52YWxpZGF0ZShwcm9wVmFsdWUsIHBhcmVudFZhbHVlLCBjdXN0b21PcHRpb25zKTtcblx0XHRcdFx0cmVzdWx0cyA9IHJlc3VsdHMubWVyZ2UoX3Jlc3VsdExpc3QpO1xuXG5cdFx0XHRcdGlmICghcmVzdWx0cy5pc1ZhbGlkICYmIHRoaXMuc3RvcE9uRmlyc3RGYWlsdXJlKSB7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0cztcblx0fVxuXG5cdHByb3RlY3RlZCBnZXRQcm9wZXJ0eVJlc3VsdHModmFsdWU6IGFueSwgcGFyZW50VmFsdWU6IGFueSwgY3VzdG9tT3B0aW9uczogYW55LCByZXN1bHRzOiBWYWxpZGF0aW9uUmVzdWx0TGlzdCk6IFZhbGlkYXRpb25SZXN1bHRMaXN0IHtcblx0XHRyZXN1bHRzID0gdGhpcy5ydW5QcmVkaWNhdGVzKHZhbHVlLCBwYXJlbnRWYWx1ZSwgY3VzdG9tT3B0aW9ucywgcmVzdWx0cyk7XG5cblx0XHRpZiAocmVzdWx0cy5pc1ZhbGlkIHx8ICF0aGlzLnN0b3BPbkZpcnN0RmFpbHVyZSkge1xuXHRcdFx0cmVzdWx0cyA9IHRoaXMucnVuVmFsaWRhdG9ycyh2YWx1ZSwgcGFyZW50VmFsdWUsIGN1c3RvbU9wdGlvbnMsIHJlc3VsdHMpO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHRzO1xuXHR9XG5cblx0cHVibGljIHZhbGlkYXRlKHZhbHVlOiBhbnksIHBhcmVudFZhbHVlPzogVFBhcmVudFZhbHVlLCBjdXN0b21PcHRpb25zPzogVEN1c3RvbU9wdGlvbnMpOiBWYWxpZGF0aW9uUmVzdWx0TGlzdCB7XG5cdFx0dmFsdWUgPSBjb3B5KHZhbHVlKTtcblx0XHRwYXJlbnRWYWx1ZSA9IGNvcHkocGFyZW50VmFsdWUpO1xuXG5cdFx0bGV0IHJlc3VsdHMgPSBuZXcgVmFsaWRhdGlvblJlc3VsdExpc3QoW10sIHRoaXMucHJvcGVydHlOYW1lLCB2YWx1ZSk7XG5cblx0XHRyZXR1cm4gdGhpcy5nZXRQcm9wZXJ0eVJlc3VsdHModmFsdWUsIHBhcmVudFZhbHVlLCBjdXN0b21PcHRpb25zLCByZXN1bHRzKTtcblxuXHR9XG59Il19