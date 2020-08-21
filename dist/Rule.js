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

    _defineProperty(this, "qualifiers", new Map());

    _defineProperty(this, "validators", new Map());

    _defineProperty(this, "stopOnFirstFailure", true);

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
      this.qualifiers.set(beEnumeratedValue, meta);
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
      this.qualifiers.set(beBetween, meta);
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
      this.qualifiers.set(beBetween, meta);
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
      this.qualifiers.set(matchRx, meta);
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
      this.qualifiers.set(_qualifiers.notNull, meta);
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
      this.qualifiers.set(_qualifiers.notEmpty, meta);
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
      this.qualifiers.set(beLessThanOrEqual, meta);
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
      this.qualifiers.set(beLessThan, meta);
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
      this.qualifiers.set(beGreaterThanOrEqual, meta);
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
      this.qualifiers.set(beGreaterThan, meta);
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
      this.qualifiers.set(qualifier, meta);
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
    key: "runQualifiers",
    value: function runQualifiers(propValue, parentValue, customOptions, results) {
      var result = new _ValidationResult["default"](this.propertyName, propValue);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.qualifiers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
    key: "runValidators",
    value: function runValidators(propValue, parentValue, customOptions, results) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.validators[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
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
    key: "getPropertyResults",
    value: function getPropertyResults(value, parentValue, customOptions, results) {
      results = this.runQualifiers(value, parentValue, customOptions, results);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9SdWxlLnRzIl0sIm5hbWVzIjpbIlJ1bGUiLCJwcm9wZXJ0eU5hbWUiLCJNYXAiLCJhbGxvd2VkVmFsdWVzIiwiYmVFbnVtZXJhdGVkVmFsdWUiLCJtZXRhIiwibmFtZSIsIm1lc3NhZ2UiLCJqb2luIiwicHJlY29uZGl0aW9uIiwiaXNWYWxpZElmRW1wdHkiLCJzZXZlcml0eSIsIlNldmVyaXR5IiwicXVhbGlmaWVycyIsInNldCIsIlJ1bGVBcGkiLCJtaW4iLCJtYXgiLCJiZUJldHdlZW4iLCJyeCIsIm1hdGNoZXMiLCJtYXRjaFJ4IiwidmFsIiwibm90TnVsbCIsIm5vdEVtcHR5IiwibnVtIiwiYmVMZXNzVGhhbk9yRXF1YWwiLCJiZUxlc3NUaGFuIiwiYmVHcmVhdGVyVGhhbk9yRXF1YWwiLCJiZUdyZWF0ZXJUaGFuIiwicXVhbGlmaWVyIiwic3RvcE9uRmlyc3RGYWlsdXJlIiwidmFsaWRhdGFibGUiLCJ2YWxpZGF0b3JzIiwiZGVmaW5lIiwicnVsZSIsInByb3BWYWx1ZSIsInBhcmVudFZhbHVlIiwiY3VzdG9tT3B0aW9ucyIsInJlc3VsdHMiLCJyZXN1bHQiLCJWYWxpZGF0aW9uUmVzdWx0IiwiaXNWYWxpZCIsImVycm9yIiwiZXJyb3JzIiwid2FybmluZ3MiLCJwdXNoIiwidmFsaWRhdG9yIiwiX3Jlc3VsdExpc3QiLCJ2YWxpZGF0ZSIsIm1lcmdlIiwidmFsdWUiLCJydW5RdWFsaWZpZXJzIiwicnVuVmFsaWRhdG9ycyIsIlZhbGlkYXRpb25SZXN1bHRMaXN0IiwiZ2V0UHJvcGVydHlSZXN1bHRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBSUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxJO0FBTXBCLGdCQUFZQyxZQUFaLEVBQW1DO0FBQUE7O0FBQUE7O0FBQUEsd0NBSndDLElBQUlDLEdBQUosRUFJeEM7O0FBQUEsd0NBSHdDLElBQUlBLEdBQUosRUFHeEM7O0FB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Q0FkLE1BQUFBLFdBQVcsR0FBRyxzQkFBS0EsV0FBTCxDQUFkO0FBRUEsVUFBSUUsT0FBTyxHQUFHLElBQUllLGdDQUFKLENBQXlCLEVBQXpCLEVBQTZCLEtBQUtyRCxZQUFsQyxFQUFnRGtELEtBQWhELENBQWQ7QUFFQSxhQUFPLEtBQUtJLGtCQUFMLENBQXdCSixLQUF4QixFQUErQmQsV0FBL0IsRUFBNENDLGFBQTVDLEVBQTJEQyxPQUEzRCxDQUFQO0FBRUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUnVsZUFwaSBmcm9tICcuL1J1bGVBcGknO1xuaW1wb3J0IFNldmVyaXR5IGZyb20gJy4vU2V2ZXJpdHknO1xuaW1wb3J0IFZhbGlkYXRpb25SZXN1bHQgZnJvbSAnLi9WYWxpZGF0aW9uUmVzdWx0JztcbmltcG9ydCBWYWxpZGF0aW9uUmVzdWx0TGlzdCBmcm9tICcuL1ZhbGlkYXRpb25SZXN1bHRMaXN0JztcblxuaW1wb3J0IHsgSVZhbGlkYXRhYmxlLCBUUHJlY29uZGl0aW9uLCBUUXVhbGlmaWVyLCBUUXVhbGlmaWVyQ29sbGVjdGlvbiwgVFZhbGlkYXRvckNvbGxlY3Rpb24gfSBmcm9tICcuL3R5cGVzJztcblxuaW1wb3J0IGNvcHkgZnJvbSAnLi91dGlscy9jb3B5JztcbmltcG9ydCB7IGxlbmd0aCwgbWF0Y2gsIG1heCwgbWluLCBub3RFbXB0eSwgbm90TnVsbCwgYmVWYWxpZEVudW0gfSBmcm9tICcuL3V0aWxzL3F1YWxpZmllcnMnO1xuaW1wb3J0IHsgaXNFbXB0eSwgaXNOdWxsIH0gZnJvbSAnLi91dGlscy9xdWFsaXR5JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUnVsZTxUUGFyZW50VmFsdWUgPSBhbnksIFRDdXN0b21PcHRpb25zID0gYW55PiBpbXBsZW1lbnRzIElWYWxpZGF0YWJsZTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiB7XG5cdHB1YmxpYyBwcm9wZXJ0eU5hbWU6IHN0cmluZztcblx0cHJvdGVjdGVkIHF1YWxpZmllcnM6IFRRdWFsaWZpZXJDb2xsZWN0aW9uPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+ID0gbmV3IE1hcCgpO1xuXHRwcm90ZWN0ZWQgdmFsaWRhdG9yczogVFZhbGlkYXRvckNvbGxlY3Rpb248VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4gPSBuZXcgTWFwKCk7XG5cdHByb3RlY3RlZCBzdG9wT25GaXJzdEZhaWx1cmU6IGJvb2xlYW4gPSB0cnVlO1xuXG5cdGNvbnN0cnVjdG9yKHByb3BlcnR5TmFtZT86IHN0cmluZykge1xuXHRcdHRoaXMucHJvcGVydHlOYW1lID0gcHJvcGVydHlOYW1lIHx8ICcnO1xuXHR9XG5cblx0cHVibGljIGVudW0oYWxsb3dlZFZhbHVlczogQXJyYXk8c3RyaW5nfG51bWJlcj4pOiBSdWxlQXBpPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+IHtcblx0XHRsZXQgYmVFbnVtZXJhdGVkVmFsdWUgPSBiZVZhbGlkRW51bShhbGxvd2VkVmFsdWVzKTtcblxuXHRcdGxldCBtZXRhID0ge1xuXHRcdFx0bmFtZTogYGJlRW51bWVyYXRlZFZhbHVlYCxcblx0XHRcdG1lc3NhZ2U6ICgpID0+ICBgJHt0aGlzLnByb3BlcnR5TmFtZX0gbXVzdCBiZSBvbmUgb2YgdGhlIGZvbGxvd2luZzogXCIke2FsbG93ZWRWYWx1ZXMuam9pbignLCAnKX1cIi5gLFxuXHRcdFx0cHJlY29uZGl0aW9uOiBudWxsLFxuXHRcdFx0aXNWYWxpZElmRW1wdHk6IHRydWUsXG5cdFx0XHRzZXZlcml0eTogU2V2ZXJpdHkuZGVmYXVsdFxuXHRcdH07XG5cblx0XHR0aGlzLnF1YWxpZmllcnMuc2V0KGJlRW51bWVyYXRlZFZhbHVlLCBtZXRhKTtcblxuXHRcdHJldHVybiBuZXcgUnVsZUFwaTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPih0aGlzLCBtZXRhKTtcblx0fVxuXG5cdHB1YmxpYyBsZW5ndGgobWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogUnVsZUFwaTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiB7XG5cdFx0bGV0IGJlQmV0d2VlbiA9IGxlbmd0aChtaW4sIG1heCk7XG5cdFx0bGV0IG1ldGEgPSB7XG5cdFx0XHRuYW1lOiBgYmVCZXR3ZWVuJHttaW59YW5kJHttYXh9YCxcblx0XHRcdG1lc3NhZ2U6ICgpID0+ICBgJHt0aGlzLnByb3BlcnR5TmFtZX0gbXVzdCBiZSBiZXR3ZWVuICR7bWlufSBhbmQgJHttYXh9LmAsXG5cdFx0XHRwcmVjb25kaXRpb246IG51bGwsXG5cdFx0XHRpc1ZhbGlkSWZFbXB0eTogZmFsc2UsXG5cdFx0XHRzZXZlcml0eTogU2V2ZXJpdHkuZGVmYXVsdFxuXHRcdH07XG5cblx0XHR0aGlzLnF1YWxpZmllcnMuc2V0KGJlQmV0d2VlbiwgbWV0YSk7XG5cblx0XHRyZXR1cm4gbmV3IFJ1bGVBcGk8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4odGhpcywgbWV0YSk7XG5cdH1cblxuXHRwdWJsaWMgbGVuZ3RoT3JFbXB0eShtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBSdWxlQXBpPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+IHtcblx0XHRsZXQgYmVCZXR3ZWVuID0gbGVuZ3RoKG1pbiwgbWF4KTtcblx0XHRsZXQgbWV0YSA9IHtcblx0XHRcdG5hbWU6IGBiZUJldHdlZW4ke21pbn1hbmQke21heH1PckVtcHR5YCxcblx0XHRcdG1lc3NhZ2U6ICgpID0+ICBgJHt0aGlzLnByb3BlcnR5TmFtZX0gbXVzdCBiZSBiZXR3ZWVuICR7bWlufSBhbmQgJHttYXh9LmAsXG5cdFx0XHRwcmVjb25kaXRpb246IG51bGwsXG5cdFx0XHRpc1ZhbGlkSWZFbXB0eTogdHJ1ZSxcblx0XHRcdHNldmVyaXR5OiBTZXZlcml0eS5kZWZhdWx0XG5cdFx0fTtcblxuXHRcdHRoaXMucXVhbGlmaWVycy5zZXQoYmVCZXR3ZWVuLCBtZXRhKTtcblxuXHRcdHJldHVybiBuZXcgUnVsZUFwaTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPih0aGlzLCBtZXRhKTtcblx0fVxuXG5cdHB1YmxpYyBtYXRjaGVzKHJ4OiBSZWdFeHApOiBSdWxlQXBpPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+IHtcblx0XHRsZXQgbWF0Y2hlcyA9IG1hdGNoKHJ4KTtcblx0XHRsZXQgbWF0Y2hSeCA9ICh2YWw6IGFueSkgPT4gaXNOdWxsKHZhbCkgfHwgbWF0Y2hlcyh2YWwpO1xuXHRcdGxldCBtZXRhID0ge1xuXHRcdFx0bmFtZTogbWF0Y2hSeC5uYW1lLFxuXHRcdFx0bWVzc2FnZTogKCkgPT4gIGAke3RoaXMucHJvcGVydHlOYW1lfSBpcyBhbiBpbnZhbGlkIGZvcm1hdC5gLFxuXHRcdFx0cHJlY29uZGl0aW9uOiBudWxsLFxuXHRcdFx0aXNWYWxpZElmRW1wdHk6IHRydWUsXG5cdFx0XHRzZXZlcml0eTogU2V2ZXJpdHkuZGVmYXVsdFxuXHRcdH07XG5cblx0XHR0aGlzLnF1YWxpZmllcnMuc2V0KG1hdGNoUngsIG1ldGEpO1xuXG5cdFx0cmV0dXJuIG5ldyBSdWxlQXBpPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+KHRoaXMsIG1ldGEpO1xuXHR9XG5cblx0cHVibGljIG5vdE51bGwoKTogUnVsZUFwaTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiB7XG5cdFx0bGV0IG1ldGEgPSB7XG5cdFx0XHRuYW1lOiBub3ROdWxsLm5hbWUsXG5cdFx0XHRtZXNzYWdlOiAoKSA9PiAgYCR7dGhpcy5wcm9wZXJ0eU5hbWV9IGNhbm5vdCBiZSBudWxsLmAsXG5cdFx0XHRwcmVjb25kaXRpb246IG51bGwsXG5cdFx0XHRpc1ZhbGlkSWZFbXB0eTogZmFsc2UsXG5cdFx0XHRzZXZlcml0eTogU2V2ZXJpdHkuZGVmYXVsdFxuXHRcdH07XG5cblx0XHR0aGlzLnF1YWxpZmllcnMuc2V0KG5vdE51bGwsIG1ldGEpO1xuXG5cdFx0cmV0dXJuIG5ldyBSdWxlQXBpPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+KHRoaXMsIG1ldGEpO1xuXHR9XG5cblx0cHVibGljIG5vdEVtcHR5KCk6IFJ1bGVBcGk8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ge1xuXHRcdGxldCBtZXRhID0ge1xuXHRcdFx0bmFtZTogbm90RW1wdHkubmFtZSxcblx0XHRcdG1lc3NhZ2U6ICgpID0+ICBgJHt0aGlzLnByb3BlcnR5TmFtZX0gY2Fubm90IGJlIGVtcHR5LmAsXG5cdFx0XHRwcmVjb25kaXRpb246IG51bGwsXG5cdFx0XHRpc1ZhbGlkSWZFbXB0eTogZmFsc2UsXG5cdFx0XHRzZXZlcml0eTogU2V2ZXJpdHkuZGVmYXVsdFxuXHRcdH07XG5cblx0XHR0aGlzLnF1YWxpZmllcnMuc2V0KG5vdEVtcHR5LCBtZXRhKTtcblxuXHRcdHJldHVybiBuZXcgUnVsZUFwaTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPih0aGlzLCBtZXRhKTtcblx0fVxuXG5cdHB1YmxpYyBtYXgobnVtOiBudW1iZXIpOiBSdWxlQXBpPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+IHtcblx0XHRsZXQgYmVMZXNzVGhhbk9yRXF1YWwgPSBtYXgobnVtKTtcblxuXHRcdGxldCBtZXRhID0ge1xuXHRcdFx0bmFtZTogJ2JlTGVzc1RoYW5PckVxdWFsJyxcblx0XHRcdG1lc3NhZ2U6ICgpID0+ICBgJHt0aGlzLnByb3BlcnR5TmFtZX0gY2Fubm90IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAke251bX0uYCxcblx0XHRcdHByZWNvbmRpdGlvbjogbnVsbCxcblx0XHRcdGlzVmFsaWRJZkVtcHR5OiBmYWxzZSxcblx0XHRcdHNldmVyaXR5OiBTZXZlcml0eS5kZWZhdWx0XG5cdFx0fTtcblxuXHRcdHRoaXMucXVhbGlmaWVycy5zZXQoYmVMZXNzVGhhbk9yRXF1YWwgYXMgVFF1YWxpZmllciwgbWV0YSk7XG5cblx0XHRyZXR1cm4gbmV3IFJ1bGVBcGk8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4odGhpcywgbWV0YSk7XG5cdH1cblxuXHRwdWJsaWMgbWF4RXhjbHVzaXZlT2YobnVtOiBudW1iZXIpOiBSdWxlQXBpPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+IHtcblx0XHRsZXQgYmVMZXNzVGhhbiA9IG1heChudW0gLSAxKTtcblxuXHRcdGxldCBtZXRhID0ge1xuXHRcdFx0bmFtZTogJ2JlTGVzc1RoYW4nLFxuXHRcdFx0bWVzc2FnZTogKCkgPT4gIGAke3RoaXMucHJvcGVydHlOYW1lfSBjYW5ub3QgYmUgZ3JlYXRlciB0aGFuICR7bnVtfS5gLFxuXHRcdFx0cHJlY29uZGl0aW9uOiBudWxsLFxuXHRcdFx0aXNWYWxpZElmRW1wdHk6IGZhbHNlLFxuXHRcdFx0c2V2ZXJpdHk6IFNldmVyaXR5LmRlZmF1bHRcblx0XHR9O1xuXG5cdFx0dGhpcy5xdWFsaWZpZXJzLnNldChiZUxlc3NUaGFuIGFzIFRRdWFsaWZpZXIsIG1ldGEpO1xuXG5cdFx0cmV0dXJuIG5ldyBSdWxlQXBpPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+KHRoaXMsIG1ldGEpO1xuXHR9XG5cblx0cHVibGljIG1pbihudW06IG51bWJlcik6IFJ1bGVBcGk8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ge1xuXHRcdGxldCBiZUdyZWF0ZXJUaGFuT3JFcXVhbCA9IG1pbihudW0pO1xuXG5cdFx0bGV0IG1ldGEgPSB7XG5cdFx0XHRuYW1lOiAnYmVHcmVhdGVyVGhhbk9yRXF1YWwnLFxuXHRcdFx0bWVzc2FnZTogKCkgPT4gIGAke3RoaXMucHJvcGVydHlOYW1lfSBjYW5ub3QgYmUgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICR7bnVtfS5gLFxuXHRcdFx0cHJlY29uZGl0aW9uOiBudWxsLFxuXHRcdFx0aXNWYWxpZElmRW1wdHk6IGZhbHNlLFxuXHRcdFx0c2V2ZXJpdHk6IFNldmVyaXR5LmRlZmF1bHRcblx0XHR9O1xuXG5cdFx0dGhpcy5xdWFsaWZpZXJzLnNldChiZUdyZWF0ZXJUaGFuT3JFcXVhbCBhcyBUUXVhbGlmaWVyLCBtZXRhKTtcblxuXHRcdHJldHVybiBuZXcgUnVsZUFwaTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPih0aGlzLCBtZXRhKTtcblx0fVxuXG5cdHB1YmxpYyBtaW5FeGNsdXNpdmVPZihudW06IG51bWJlcik6IFJ1bGVBcGk8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ge1xuXHRcdGxldCBiZUdyZWF0ZXJUaGFuID0gbWluKG51bSArIDEpO1xuXG5cdFx0bGV0IG1ldGEgPSB7XG5cdFx0XHRuYW1lOiAnYmVHcmVhdGVyVGhhbicsXG5cdFx0XHRtZXNzYWdlOiAoKSA9PiAgYCR7dGhpcy5wcm9wZXJ0eU5hbWV9IGNhbm5vdCBiZSBsZXNzIHRoYW4gJHtudW19LmAsXG5cdFx0XHRwcmVjb25kaXRpb246IG51bGwsXG5cdFx0XHRpc1ZhbGlkSWZFbXB0eTogZmFsc2UsXG5cdFx0XHRzZXZlcml0eTogU2V2ZXJpdHkuZGVmYXVsdFxuXHRcdH07XG5cblx0XHR0aGlzLnF1YWxpZmllcnMuc2V0KGJlR3JlYXRlclRoYW4gYXMgVFF1YWxpZmllciwgbWV0YSk7XG5cblx0XHRyZXR1cm4gbmV3IFJ1bGVBcGk8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4odGhpcywgbWV0YSk7XG5cdH1cblxuXHRwdWJsaWMgbXVzdChxdWFsaWZpZXI6IFRRdWFsaWZpZXI8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4pOiBSdWxlQXBpPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+IHtcblx0XHRsZXQgbWV0YSA9IHtcblx0XHRcdG5hbWU6IHF1YWxpZmllci5uYW1lLFxuXHRcdFx0bWVzc2FnZTogKCkgPT4gIGAke3RoaXMucHJvcGVydHlOYW1lfSBpcyBpbnZhbGlkLmAsXG5cdFx0XHRwcmVjb25kaXRpb246IG51bGwsXG5cdFx0XHRpc1ZhbGlkSWZFbXB0eTogZmFsc2UsXG5cdFx0XHRzZXZlcml0eTogU2V2ZXJpdHkuZGVmYXVsdFxuXHRcdH07XG5cblx0XHR0aGlzLnF1YWxpZmllcnMuc2V0KHF1YWxpZmllciwgbWV0YSk7XG5cblx0XHRyZXR1cm4gbmV3IFJ1bGVBcGk8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4odGhpcywgbWV0YSk7XG5cdH1cblxuXHRwdWJsaWMgY2FzY2FkZSgpOiB2b2lkIHtcblx0XHR0aGlzLnN0b3BPbkZpcnN0RmFpbHVyZSA9IGZhbHNlO1xuXHR9XG5cblx0cHVibGljIHVzaW5nKHZhbGlkYXRhYmxlOiBJVmFsaWRhdGFibGU8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4pOiBSdWxlIHtcblx0XHR2YWxpZGF0YWJsZS5wcm9wZXJ0eU5hbWUgPSB0aGlzLnByb3BlcnR5TmFtZSB8fCB2YWxpZGF0YWJsZS5wcm9wZXJ0eU5hbWUgfHwgJyc7XG5cblx0XHRsZXQgbWV0YSA9IHtcblx0XHRcdG5hbWU6IHZhbGlkYXRhYmxlLnByb3BlcnR5TmFtZSxcblx0XHRcdG1lc3NhZ2U6ICgpID0+ICAnJyxcblx0XHRcdHByZWNvbmRpdGlvbjogbnVsbCxcblx0XHRcdGlzVmFsaWRJZkVtcHR5OiBmYWxzZSxcblx0XHRcdHNldmVyaXR5OiBTZXZlcml0eS5kZWZhdWx0XG5cdFx0fTtcblxuXHRcdHRoaXMudmFsaWRhdG9ycy5zZXQodmFsaWRhdGFibGUsIG1ldGEpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cHVibGljIGlmKHByZWNvbmRpdGlvbjogVFByZWNvbmRpdGlvbjxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiwgZGVmaW5lOiAocnVsZTogUnVsZTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPikgPT4gdm9pZCk6IFJ1bGUge1xuXHRcdGxldCBydWxlID0gbmV3IFJ1bGUodGhpcy5wcm9wZXJ0eU5hbWUpO1xuXHRcdGxldCBtZXRhID0ge1xuXHRcdFx0bmFtZTogcnVsZS5wcm9wZXJ0eU5hbWUsXG5cdFx0XHRtZXNzYWdlOiAoKSA9PiAgJycsXG5cdFx0XHRwcmVjb25kaXRpb24sXG5cdFx0XHRpc1ZhbGlkSWZFbXB0eTogZmFsc2UsXG5cdFx0XHRzZXZlcml0eTogU2V2ZXJpdHkuZGVmYXVsdFxuXHRcdH07XG5cblx0XHR0aGlzLnZhbGlkYXRvcnMuc2V0KHJ1bGUsIG1ldGEpO1xuXHRcdGRlZmluZShydWxlKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cHJvdGVjdGVkIHJ1blF1YWxpZmllcnMocHJvcFZhbHVlOiBhbnksIHBhcmVudFZhbHVlOiBhbnksIGN1c3RvbU9wdGlvbnM6IGFueSwgcmVzdWx0czogVmFsaWRhdGlvblJlc3VsdExpc3QpOiBWYWxpZGF0aW9uUmVzdWx0TGlzdCB7XG5cdFx0Y29uc3QgcmVzdWx0ID0gbmV3IFZhbGlkYXRpb25SZXN1bHQodGhpcy5wcm9wZXJ0eU5hbWUsIHByb3BWYWx1ZSk7XG5cblx0XHRmb3IgKGxldCBbcXVhbGlmaWVyLCBtZXRhXSBvZiB0aGlzLnF1YWxpZmllcnMpIHtcblx0XHRcdC8vIFdlIGNoZWNrIGlmIHdlIHNob3VsZCBydW4gdGhlIHZhbGlkYXRvciBiYXNlZCBvbiB3aGV0aGVyIHRoZSBwcm9wZXJ0eSBoYXMgYSB2YWx1ZVxuXHRcdFx0aWYgKGlzRW1wdHkocHJvcFZhbHVlKSAmJiBtZXRhLmlzVmFsaWRJZkVtcHR5KSB7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBXZSBjaGVjayBmb3IgYSBwcmVjb25kaXRpb24gdG8gZXhpc3QgZm9yIGEgcXVhbGlmaWVyIGJlZm9yZSBjYWxsaW5nIGl0XG5cdFx0XHRpZiAoIW1ldGEucHJlY29uZGl0aW9uIHx8IG1ldGEucHJlY29uZGl0aW9uKHBhcmVudFZhbHVlLCBjdXN0b21PcHRpb25zKSkge1xuXHRcdFx0XHRsZXQgaXNWYWxpZCA9IHF1YWxpZmllcihwcm9wVmFsdWUsIHBhcmVudFZhbHVlLCBjdXN0b21PcHRpb25zKTtcblxuXHRcdFx0XHRpZiAoIWlzVmFsaWQpIHtcblx0XHRcdFx0XHRpZiAobWV0YS5zZXZlcml0eSA9PT0gU2V2ZXJpdHkuZXJyb3IpIHtcblx0XHRcdFx0XHRcdHJlc3VsdC5lcnJvcnNbbWV0YS5uYW1lXSA9IG1ldGEubWVzc2FnZShwcm9wVmFsdWUsIHBhcmVudFZhbHVlLCBjdXN0b21PcHRpb25zKTtcblxuXHRcdFx0XHRcdFx0Ly8gU2hvcnQtY2lyY3VpdCBpZiB3ZSBoYXZlIHRvIHN0b3BPbkZpcnN0RmFpbHVyZVxuXHRcdFx0XHRcdFx0aWYgKHRoaXMuc3RvcE9uRmlyc3RGYWlsdXJlKSB7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRyZXN1bHQud2FybmluZ3NbbWV0YS5uYW1lXSA9IG1ldGEubWVzc2FnZShwcm9wVmFsdWUsIHBhcmVudFZhbHVlLCBjdXN0b21PcHRpb25zKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXN1bHRzLnB1c2gocmVzdWx0KTtcblxuXHRcdHJldHVybiByZXN1bHRzO1xuXHR9XG5cblx0cHJvdGVjdGVkIHJ1blZhbGlkYXRvcnMocHJvcFZhbHVlOiBhbnksIHBhcmVudFZhbHVlOiBhbnksIGN1c3RvbU9wdGlvbnM6IGFueSwgcmVzdWx0czogVmFsaWRhdGlvblJlc3VsdExpc3QpOiBWYWxpZGF0aW9uUmVzdWx0TGlzdCB7XG5cdFx0Zm9yIChsZXQgW3ZhbGlkYXRvciwgbWV0YV0gb2YgdGhpcy52YWxpZGF0b3JzKSB7XG5cdFx0XHRpZiAoIW1ldGEucHJlY29uZGl0aW9uIHx8IG1ldGEucHJlY29uZGl0aW9uKHBhcmVudFZhbHVlLCBjdXN0b21PcHRpb25zKSkge1xuXHRcdFx0XHRsZXQgX3Jlc3VsdExpc3Q6IFZhbGlkYXRpb25SZXN1bHRMaXN0ID0gdmFsaWRhdG9yLnZhbGlkYXRlKHByb3BWYWx1ZSwgcGFyZW50VmFsdWUsIGN1c3RvbU9wdGlvbnMpO1xuXHRcdFx0XHRyZXN1bHRzID0gcmVzdWx0cy5tZXJnZShfcmVzdWx0TGlzdCk7XG5cblx0XHRcdFx0aWYgKCFyZXN1bHRzLmlzVmFsaWQgJiYgdGhpcy5zdG9wT25GaXJzdEZhaWx1cmUpIHtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHRzO1xuXHR9XG5cblx0cHJvdGVjdGVkIGdldFByb3BlcnR5UmVzdWx0cyh2YWx1ZTogYW55LCBwYXJlbnRWYWx1ZTogYW55LCBjdXN0b21PcHRpb25zOiBhbnksIHJlc3VsdHM6IFZhbGlkYXRpb25SZXN1bHRMaXN0KTogVmFsaWRhdGlvblJlc3VsdExpc3Qge1xuXHRcdHJlc3VsdHMgPSB0aGlzLnJ1blF1YWxpZmllcnModmFsdWUsIHBhcmVudFZhbHVlLCBjdXN0b21PcHRpb25zLCByZXN1bHRzKTtcblxuXHRcdGlmIChyZXN1bHRzLmlzVmFsaWQgfHwgIXRoaXMuc3RvcE9uRmlyc3RGYWlsdXJlKSB7XG5cdFx0XHRyZXN1bHRzID0gdGhpcy5ydW5WYWxpZGF0b3JzKHZhbHVlLCBwYXJlbnRWYWx1ZSwgY3VzdG9tT3B0aW9ucywgcmVzdWx0cyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdHM7XG5cdH1cblxuXHRwdWJsaWMgdmFsaWRhdGUodmFsdWU6IGFueSwgcGFyZW50VmFsdWU/OiBUUGFyZW50VmFsdWUsIGN1c3RvbU9wdGlvbnM/OiBUQ3VzdG9tT3B0aW9ucyk6IFZhbGlkYXRpb25SZXN1bHRMaXN0IHtcblx0XHR2YWx1ZSA9IGNvcHkodmFsdWUpO1xuXHRcdHBhcmVudFZhbHVlID0gY29weShwYXJlbnRWYWx1ZSk7XG5cblx0XHRsZXQgcmVzdWx0cyA9IG5ldyBWYWxpZGF0aW9uUmVzdWx0TGlzdChbXSwgdGhpcy5wcm9wZXJ0eU5hbWUsIHZhbHVlKTtcblxuXHRcdHJldHVybiB0aGlzLmdldFByb3BlcnR5UmVzdWx0cyh2YWx1ZSwgcGFyZW50VmFsdWUsIGN1c3RvbU9wdGlvbnMsIHJlc3VsdHMpO1xuXG5cdH1cbn0iXX0=