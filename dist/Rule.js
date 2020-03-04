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
  _createClass(Rule, [{
    key: "qualifiers",
    get: function get() {
      return this._qualifiers;
    }
  }, {
    key: "validators",
    get: function get() {
      return this._validators;
    }
  }]);

  function Rule(name) {
    _classCallCheck(this, Rule);

    _defineProperty(this, "name", void 0);

    _defineProperty(this, "_qualifiers", new Map());

    _defineProperty(this, "_validators", new Map());

    _defineProperty(this, "_stopOnFirstFailure", true);

    this.name = name || '';
  }

  _createClass(Rule, [{
    key: "enum",
    value: function _enum(allowedValues) {
      var beEnumeratedValue = (0, _qualifiers.beValidEnum)(allowedValues);
      var meta = {
        name: "beEnumeratedValue",
        message: "".concat(this.name, " must be one of the following: \"").concat(allowedValues.join(', '), "\"."),
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
      var beBetween = (0, _qualifiers.length)(min, max);
      var meta = {
        name: "beBetween".concat(min, "and").concat(max),
        message: "".concat(this.name, " must be between ").concat(min, " and ").concat(max, "."),
        precondition: null,
        isValidIfEmpty: true,
        severity: _Severity["default"]["default"]
      };

      this._qualifiers.set(beBetween, meta);

      return new _RuleApi["default"](this, meta);
    }
  }, {
    key: "lengthOrEmpty",
    value: function lengthOrEmpty(min, max) {
      var beBetween = (0, _qualifiers.length)(min, max);
      var meta = {
        name: "beBetween".concat(min, "and").concat(max, "OrEmpty"),
        message: "".concat(this.name, " must be between ").concat(min, " and ").concat(max, "."),
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
      var matches = (0, _qualifiers.match)(rx);

      var matchRx = function matchRx(val) {
        return (0, _quality.isNull)(val) || matches(val);
      };

      var meta = {
        name: matchRx.name,
        message: "".concat(this.name, " is an invalid format."),
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
      var meta = {
        name: _qualifiers.notNull.name,
        message: "".concat(this.name, " cannot be null."),
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
      var meta = {
        name: _qualifiers.notEmpty.name,
        message: "".concat(this.name, " cannot be empty."),
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
      var beLessThanOrEqual = (0, _qualifiers.max)(num);
      var meta = {
        name: 'beLessThanOrEqual',
        message: "".concat(this.name, " cannot be greater than or equal to ").concat(num, "."),
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
      var beLessThan = (0, _qualifiers.max)(num - 1);
      var meta = {
        name: 'beLessThan',
        message: "".concat(this.name, " cannot be greater than ").concat(num, "."),
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
      var beGreaterThanOrEqual = (0, _qualifiers.min)(num);
      var meta = {
        name: 'beGreaterThanOrEqual',
        message: "".concat(this.name, " cannot be less than or equal to ").concat(num, "."),
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
      var beGreaterThan = (0, _qualifiers.min)(num + 1);
      var meta = {
        name: 'beGreaterThan',
        message: "".concat(this.name, " cannot be less than ").concat(num, "."),
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
      var meta = {
        name: qualifier.name,
        message: "".concat(this.name, " is invalid."),
        precondition: null,
        isValidIfEmpty: false,
        severity: _Severity["default"]["default"]
      };

      this._qualifiers.set(qualifier, meta);

      return new _RuleApi["default"](this, meta);
    }
  }, {
    key: "stopOnFirstFailure",
    value: function stopOnFirstFailure() {
      this._stopOnFirstFailure = true;
      console.warn("FieldQuality Deprecation Warning: As of version 1.4.0, rules default stopOnFirstFailure to true. You can safely remove your call to .stopOnFirstFailure() on ".concat(this.name, ", or use the .cascade() method to change stopOnFirstFailure to false."));
    }
  }, {
    key: "cascade",
    value: function cascade() {
      this._stopOnFirstFailure = false;
    }
  }, {
    key: "using",
    value: function using(validatable) {
      validatable.name = this.name || validatable.name || '';
      var meta = {
        name: validatable.name,
        message: '',
        precondition: null,
        isValidIfEmpty: false,
        severity: _Severity["default"]["default"]
      };
      validatable.name = this.name || validatable.name;

      this._validators.set(validatable, meta);

      return this;
    }
  }, {
    key: "if",
    value: function _if(precondition, define) {
      var rule = new Rule(this.name);
      var meta = {
        name: rule.name,
        message: '',
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
      var result = new _ValidationResult["default"](this.name, propValue);
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
                result.errors[meta.name] = meta.message;
              } else {
                result.warnings[meta.name] = meta.message;
              } // Short-circuit if we have to stopOnFirstFailure


              if (this._stopOnFirstFailure) {
                break;
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
      var results = new _ValidationResultList["default"]([], this.name, value);
      return this.__getPropertyResults(value, parentValue, customOptions, results);
    }
  }]);

  return Rule;
}();

exports["default"] = Rule;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9SdWxlLnRzIl0sIm5hbWVzIjpbIlJ1bGUiLCJfcXVhbGlmaWVycyIsIl92YWxpZGF0b3JzIiwibmFtZSIsIk1hcCIsImFsbG93ZWRWYWx1ZXMiLCJiZUVudW1lcmF0ZWRWYWx1ZSIsIm1ldGEiLCJtZXNzYWdlIiwiam9pbiIsInByZWNvbmRpdGlvbiIsImlzVmFsaWRJZkVtcHR5Iiwic2V2ZXJpdHkiLCJTZXZlcml0eSIsInNldCIsIlJ1bGVBcGkiLCJtaW4iLCJtYXgiLCJiZUJldHdlZW4iLCJyeCIsIm1hdGNoZXMiLCJtYXRjaFJ4IiwidmFsIiwibm90TnVsbCIsIm5vdEVtcHR5IiwibnVtIiwiYmVMZXNzVGhhbk9yRXF1YWwiLCJiZUxlc3NUaGFuIiwiYmVHcmVhdGVyVGhhbk9yRXF1YWwiLCJiZUdyZWF0ZXJUaGFuIiwicXVhbGlmaWVyIiwiX3N0b3BPbkZpcnN0RmFpbHVyZSIsImNvbnNvbGUiLCJ3YXJuIiwidmFsaWRhdGFibGUiLCJkZWZpbmUiLCJydWxlIiwicHJvcFZhbHVlIiwicGFyZW50VmFsdWUiLCJjdXN0b21PcHRpb25zIiwicmVzdWx0cyIsInJlc3VsdCIsIlZhbGlkYXRpb25SZXN1bHQiLCJpc1ZhbGlkIiwiZXJyb3IiLCJlcnJvcnMiLCJ3YXJuaW5ncyIsInB1c2giLCJ2YWxpZGF0b3IiLCJfcmVzdWx0TGlzdCIsInZhbGlkYXRlIiwibWVyZ2UiLCJ2YWx1ZSIsIl9fcnVuUXVhbGlmaWVycyIsIl9fcnVuVmFsaWRhdG9ycyIsIlZhbGlkYXRpb25SZXN1bHRMaXN0IiwiX19nZXRQcm9wZXJ0eVJlc3VsdHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFJQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLEk7Ozt3QkFNbUI7QUFDdEMsYUFBTyxLQUFLQyxXQUFaO0FBQ0E7Ozt3QkFFc0M7QUFDdEMsYUFBTyxLQUFLQyxXQUFaO0FBQ0E7OztBQUVELGdCQUFZQyxJ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QUE2REMsT0FBN0QsQ0FBUDtBQUVBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJ1bGVBcGkgZnJvbSAnLi9SdWxlQXBpJztcbmltcG9ydCBTZXZlcml0eSBmcm9tICcuL1NldmVyaXR5JztcbmltcG9ydCBWYWxpZGF0aW9uUmVzdWx0IGZyb20gJy4vVmFsaWRhdGlvblJlc3VsdCc7XG5pbXBvcnQgVmFsaWRhdGlvblJlc3VsdExpc3QgZnJvbSAnLi9WYWxpZGF0aW9uUmVzdWx0TGlzdCc7XG5cbmltcG9ydCB7IElWYWxpZGF0YWJsZSwgVFByZWNvbmRpdGlvbiwgVFF1YWxpZmllciwgVFF1YWxpZmllckNvbGxlY3Rpb24sIFRWYWxpZGF0b3JDb2xsZWN0aW9uIH0gZnJvbSAnLi90eXBlcyc7XG5cbmltcG9ydCBjb3B5IGZyb20gJy4vdXRpbHMvY29weSc7XG5pbXBvcnQgeyBsZW5ndGgsIG1hdGNoLCBtYXgsIG1pbiwgbm90RW1wdHksIG5vdE51bGwsIGJlVmFsaWRFbnVtIH0gZnJvbSAnLi91dGlscy9xdWFsaWZpZXJzJztcbmltcG9ydCB7IGlzRW1wdHksIGlzTnVsbCB9IGZyb20gJy4vdXRpbHMvcXVhbGl0eSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJ1bGUgaW1wbGVtZW50cyBJVmFsaWRhdGFibGUge1xuXHRwdWJsaWMgbmFtZTogc3RyaW5nO1xuXHRwcm90ZWN0ZWQgX3F1YWxpZmllcnM6IFRRdWFsaWZpZXJDb2xsZWN0aW9uID0gbmV3IE1hcCgpO1xuXHRwcm90ZWN0ZWQgX3ZhbGlkYXRvcnM6IFRWYWxpZGF0b3JDb2xsZWN0aW9uID0gbmV3IE1hcCgpO1xuXHRwcm90ZWN0ZWQgX3N0b3BPbkZpcnN0RmFpbHVyZTogYm9vbGVhbiA9IHRydWU7XG5cblx0Z2V0IHF1YWxpZmllcnMoKTogVFF1YWxpZmllckNvbGxlY3Rpb24ge1xuXHRcdHJldHVybiB0aGlzLl9xdWFsaWZpZXJzO1xuXHR9XG5cblx0Z2V0IHZhbGlkYXRvcnMoKTogVFZhbGlkYXRvckNvbGxlY3Rpb24ge1xuXHRcdHJldHVybiB0aGlzLl92YWxpZGF0b3JzO1xuXHR9XG5cblx0Y29uc3RydWN0b3IobmFtZT86IHN0cmluZykge1xuXHRcdHRoaXMubmFtZSA9IG5hbWUgfHwgJyc7XG5cdH1cblxuXHRwdWJsaWMgZW51bShhbGxvd2VkVmFsdWVzOiBBcnJheTxzdHJpbmd8bnVtYmVyPikge1xuXHRcdGxldCBiZUVudW1lcmF0ZWRWYWx1ZSA9IGJlVmFsaWRFbnVtKGFsbG93ZWRWYWx1ZXMpO1xuXG5cdFx0bGV0IG1ldGEgPSB7XG5cdFx0XHRuYW1lOiBgYmVFbnVtZXJhdGVkVmFsdWVgLFxuXHRcdFx0bWVzc2FnZTogYCR7dGhpcy5uYW1lfSBtdXN0IGJlIG9uZSBvZiB0aGUgZm9sbG93aW5nOiBcIiR7YWxsb3dlZFZhbHVlcy5qb2luKCcsICcpfVwiLmAsXG5cdFx0XHRwcmVjb25kaXRpb246IG51bGwsXG5cdFx0XHRpc1ZhbGlkSWZFbXB0eTogdHJ1ZSxcblx0XHRcdHNldmVyaXR5OiBTZXZlcml0eS5kZWZhdWx0XG5cdFx0fTtcblxuXHRcdHRoaXMuX3F1YWxpZmllcnMuc2V0KGJlRW51bWVyYXRlZFZhbHVlLCBtZXRhKTtcblxuXHRcdHJldHVybiBuZXcgUnVsZUFwaSh0aGlzLCBtZXRhKVxuXHR9XG5cblx0cHVibGljIGxlbmd0aChtaW46IG51bWJlciwgbWF4OiBudW1iZXIpIHtcblx0XHRsZXQgYmVCZXR3ZWVuID0gbGVuZ3RoKG1pbiwgbWF4KTtcblx0XHRsZXQgbWV0YSA9IHtcblx0XHRcdG5hbWU6IGBiZUJldHdlZW4ke21pbn1hbmQke21heH1gLFxuXHRcdFx0bWVzc2FnZTogYCR7dGhpcy5uYW1lfSBtdXN0IGJlIGJldHdlZW4gJHttaW59IGFuZCAke21heH0uYCxcblx0XHRcdHByZWNvbmRpdGlvbjogbnVsbCxcblx0XHRcdGlzVmFsaWRJZkVtcHR5OiB0cnVlLFxuXHRcdFx0c2V2ZXJpdHk6IFNldmVyaXR5LmRlZmF1bHRcblx0XHR9O1xuXG5cdFx0dGhpcy5fcXVhbGlmaWVycy5zZXQoYmVCZXR3ZWVuLCBtZXRhKTtcblxuXHRcdHJldHVybiBuZXcgUnVsZUFwaSh0aGlzLCBtZXRhKTtcblx0fVxuXG5cdHB1YmxpYyBsZW5ndGhPckVtcHR5KG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcikge1xuXHRcdGxldCBiZUJldHdlZW4gPSBsZW5ndGgobWluLCBtYXgpO1xuXHRcdGxldCBtZXRhID0ge1xuXHRcdFx0bmFtZTogYGJlQmV0d2VlbiR7bWlufWFuZCR7bWF4fU9yRW1wdHlgLFxuXHRcdFx0bWVzc2FnZTogYCR7dGhpcy5uYW1lfSBtdXN0IGJlIGJldHdlZW4gJHttaW59IGFuZCAke21heH0uYCxcblx0XHRcdHByZWNvbmRpdGlvbjogbnVsbCxcblx0XHRcdGlzVmFsaWRJZkVtcHR5OiB0cnVlLFxuXHRcdFx0c2V2ZXJpdHk6IFNldmVyaXR5LmRlZmF1bHRcblx0XHR9O1xuXG5cdFx0dGhpcy5fcXVhbGlmaWVycy5zZXQoYmVCZXR3ZWVuLCBtZXRhKTtcblxuXHRcdHJldHVybiBuZXcgUnVsZUFwaSh0aGlzLCBtZXRhKTtcblx0fVxuXG5cdHB1YmxpYyBtYXRjaGVzKHJ4OiBSZWdFeHApIHtcblx0XHRsZXQgbWF0Y2hlcyA9IG1hdGNoKHJ4KTtcblx0XHRsZXQgbWF0Y2hSeCA9ICh2YWw6IGFueSkgPT4gaXNOdWxsKHZhbCkgfHwgbWF0Y2hlcyh2YWwpO1xuXHRcdGxldCBtZXRhID0ge1xuXHRcdFx0bmFtZTogbWF0Y2hSeC5uYW1lLFxuXHRcdFx0bWVzc2FnZTogYCR7dGhpcy5uYW1lfSBpcyBhbiBpbnZhbGlkIGZvcm1hdC5gLFxuXHRcdFx0cHJlY29uZGl0aW9uOiBudWxsLFxuXHRcdFx0aXNWYWxpZElmRW1wdHk6IHRydWUsXG5cdFx0XHRzZXZlcml0eTogU2V2ZXJpdHkuZGVmYXVsdFxuXHRcdH07XG5cblx0XHR0aGlzLl9xdWFsaWZpZXJzLnNldChtYXRjaFJ4LCBtZXRhKTtcblxuXHRcdHJldHVybiBuZXcgUnVsZUFwaSh0aGlzLCBtZXRhKTtcblx0fVxuXG5cdHB1YmxpYyBub3ROdWxsKCkge1xuXHRcdGxldCBtZXRhID0ge1xuXHRcdFx0bmFtZTogbm90TnVsbC5uYW1lLFxuXHRcdFx0bWVzc2FnZTogYCR7dGhpcy5uYW1lfSBjYW5ub3QgYmUgbnVsbC5gLFxuXHRcdFx0cHJlY29uZGl0aW9uOiBudWxsLFxuXHRcdFx0aXNWYWxpZElmRW1wdHk6IGZhbHNlLFxuXHRcdFx0c2V2ZXJpdHk6IFNldmVyaXR5LmRlZmF1bHRcblx0XHR9O1xuXG5cdFx0dGhpcy5fcXVhbGlmaWVycy5zZXQobm90TnVsbCwgbWV0YSk7XG5cblx0XHRyZXR1cm4gbmV3IFJ1bGVBcGkodGhpcywgbWV0YSk7XG5cdH1cblxuXHRwdWJsaWMgbm90RW1wdHkoKSB7XG5cdFx0bGV0IG1ldGEgPSB7XG5cdFx0XHRuYW1lOiBub3RFbXB0eS5uYW1lLFxuXHRcdFx0bWVzc2FnZTogYCR7dGhpcy5uYW1lfSBjYW5ub3QgYmUgZW1wdHkuYCxcblx0XHRcdHByZWNvbmRpdGlvbjogbnVsbCxcblx0XHRcdGlzVmFsaWRJZkVtcHR5OiBmYWxzZSxcblx0XHRcdHNldmVyaXR5OiBTZXZlcml0eS5kZWZhdWx0XG5cdFx0fTtcblxuXHRcdHRoaXMuX3F1YWxpZmllcnMuc2V0KG5vdEVtcHR5LCBtZXRhKTtcblxuXHRcdHJldHVybiBuZXcgUnVsZUFwaSh0aGlzLCBtZXRhKTtcblx0fVxuXG5cdHB1YmxpYyBtYXgobnVtOiBudW1iZXIpIHtcblx0XHRsZXQgYmVMZXNzVGhhbk9yRXF1YWwgPSBtYXgobnVtKTtcblxuXHRcdGxldCBtZXRhID0ge1xuXHRcdFx0bmFtZTogJ2JlTGVzc1RoYW5PckVxdWFsJyxcblx0XHRcdG1lc3NhZ2U6IGAke3RoaXMubmFtZX0gY2Fubm90IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAke251bX0uYCxcblx0XHRcdHByZWNvbmRpdGlvbjogbnVsbCxcblx0XHRcdGlzVmFsaWRJZkVtcHR5OiBmYWxzZSxcblx0XHRcdHNldmVyaXR5OiBTZXZlcml0eS5kZWZhdWx0XG5cdFx0fTtcblxuXHRcdHRoaXMuX3F1YWxpZmllcnMuc2V0KGJlTGVzc1RoYW5PckVxdWFsLCBtZXRhKTtcblxuXHRcdHJldHVybiBuZXcgUnVsZUFwaSh0aGlzLCBtZXRhKTtcblx0fVxuXG5cdHB1YmxpYyBtYXhFeGNsdXNpdmVPZihudW06IG51bWJlcikge1xuXHRcdGxldCBiZUxlc3NUaGFuID0gbWF4KG51bSAtIDEpO1xuXG5cdFx0bGV0IG1ldGEgPSB7XG5cdFx0XHRuYW1lOiAnYmVMZXNzVGhhbicsXG5cdFx0XHRtZXNzYWdlOiBgJHt0aGlzLm5hbWV9IGNhbm5vdCBiZSBncmVhdGVyIHRoYW4gJHtudW19LmAsXG5cdFx0XHRwcmVjb25kaXRpb246IG51bGwsXG5cdFx0XHRpc1ZhbGlkSWZFbXB0eTogZmFsc2UsXG5cdFx0XHRzZXZlcml0eTogU2V2ZXJpdHkuZGVmYXVsdFxuXHRcdH07XG5cblx0XHR0aGlzLl9xdWFsaWZpZXJzLnNldChiZUxlc3NUaGFuLCBtZXRhKTtcblxuXHRcdHJldHVybiBuZXcgUnVsZUFwaSh0aGlzLCBtZXRhKTtcblx0fVxuXG5cdHB1YmxpYyBtaW4obnVtOiBudW1iZXIpIHtcblx0XHRsZXQgYmVHcmVhdGVyVGhhbk9yRXF1YWwgPSBtaW4obnVtKTtcblxuXHRcdGxldCBtZXRhID0ge1xuXHRcdFx0bmFtZTogJ2JlR3JlYXRlclRoYW5PckVxdWFsJyxcblx0XHRcdG1lc3NhZ2U6IGAke3RoaXMubmFtZX0gY2Fubm90IGJlIGxlc3MgdGhhbiBvciBlcXVhbCB0byAke251bX0uYCxcblx0XHRcdHByZWNvbmRpdGlvbjogbnVsbCxcblx0XHRcdGlzVmFsaWRJZkVtcHR5OiBmYWxzZSxcblx0XHRcdHNldmVyaXR5OiBTZXZlcml0eS5kZWZhdWx0XG5cdFx0fTtcblxuXHRcdHRoaXMuX3F1YWxpZmllcnMuc2V0KGJlR3JlYXRlclRoYW5PckVxdWFsLCBtZXRhKTtcblxuXHRcdHJldHVybiBuZXcgUnVsZUFwaSh0aGlzLCBtZXRhKTtcblx0fVxuXG5cdHB1YmxpYyBtaW5FeGNsdXNpdmVPZihudW06IG51bWJlcikge1xuXHRcdGxldCBiZUdyZWF0ZXJUaGFuID0gbWluKG51bSArIDEpO1xuXG5cdFx0bGV0IG1ldGEgPSB7XG5cdFx0XHRuYW1lOiAnYmVHcmVhdGVyVGhhbicsXG5cdFx0XHRtZXNzYWdlOiBgJHt0aGlzLm5hbWV9IGNhbm5vdCBiZSBsZXNzIHRoYW4gJHtudW19LmAsXG5cdFx0XHRwcmVjb25kaXRpb246IG51bGwsXG5cdFx0XHRpc1ZhbGlkSWZFbXB0eTogZmFsc2UsXG5cdFx0XHRzZXZlcml0eTogU2V2ZXJpdHkuZGVmYXVsdFxuXHRcdH07XG5cblx0XHR0aGlzLl9xdWFsaWZpZXJzLnNldChiZUdyZWF0ZXJUaGFuLCBtZXRhKTtcblxuXHRcdHJldHVybiBuZXcgUnVsZUFwaSh0aGlzLCBtZXRhKTtcblx0fVxuXG5cdHB1YmxpYyBtdXN0KHF1YWxpZmllcjogVFF1YWxpZmllcikge1xuXHRcdGxldCBtZXRhID0ge1xuXHRcdFx0bmFtZTogcXVhbGlmaWVyLm5hbWUsXG5cdFx0XHRtZXNzYWdlOiBgJHt0aGlzLm5hbWV9IGlzIGludmFsaWQuYCxcblx0XHRcdHByZWNvbmRpdGlvbjogbnVsbCxcblx0XHRcdGlzVmFsaWRJZkVtcHR5OiBmYWxzZSxcblx0XHRcdHNldmVyaXR5OiBTZXZlcml0eS5kZWZhdWx0XG5cdFx0fTtcblxuXHRcdHRoaXMuX3F1YWxpZmllcnMuc2V0KHF1YWxpZmllciwgbWV0YSk7XG5cblx0XHRyZXR1cm4gbmV3IFJ1bGVBcGkodGhpcywgbWV0YSk7XG5cdH1cblxuXHRwdWJsaWMgc3RvcE9uRmlyc3RGYWlsdXJlKCk6IHZvaWQge1xuXHRcdHRoaXMuX3N0b3BPbkZpcnN0RmFpbHVyZSA9IHRydWU7XG5cdFx0Y29uc29sZS53YXJuKGBGaWVsZFF1YWxpdHkgRGVwcmVjYXRpb24gV2FybmluZzogQXMgb2YgdmVyc2lvbiAxLjQuMCwgcnVsZXMgZGVmYXVsdCBzdG9wT25GaXJzdEZhaWx1cmUgdG8gdHJ1ZS4gWW91IGNhbiBzYWZlbHkgcmVtb3ZlIHlvdXIgY2FsbCB0byAuc3RvcE9uRmlyc3RGYWlsdXJlKCkgb24gJHt0aGlzLm5hbWV9LCBvciB1c2UgdGhlIC5jYXNjYWRlKCkgbWV0aG9kIHRvIGNoYW5nZSBzdG9wT25GaXJzdEZhaWx1cmUgdG8gZmFsc2UuYClcblx0fVxuXG5cdHB1YmxpYyBjYXNjYWRlKCk6IHZvaWQge1xuXHRcdHRoaXMuX3N0b3BPbkZpcnN0RmFpbHVyZSA9IGZhbHNlO1xuXHR9XG5cblx0cHVibGljIHVzaW5nKHZhbGlkYXRhYmxlOiBJVmFsaWRhdGFibGUpOiBSdWxlIHtcblx0XHR2YWxpZGF0YWJsZS5uYW1lID0gdGhpcy5uYW1lIHx8IHZhbGlkYXRhYmxlLm5hbWUgfHwgJyc7XG5cblx0XHRsZXQgbWV0YSA9IHtcblx0XHRcdG5hbWU6IHZhbGlkYXRhYmxlLm5hbWUsXG5cdFx0XHRtZXNzYWdlOiAnJyxcblx0XHRcdHByZWNvbmRpdGlvbjogbnVsbCxcblx0XHRcdGlzVmFsaWRJZkVtcHR5OiBmYWxzZSxcblx0XHRcdHNldmVyaXR5OiBTZXZlcml0eS5kZWZhdWx0XG5cdFx0fTtcblxuXHRcdHZhbGlkYXRhYmxlLm5hbWUgPSB0aGlzLm5hbWUgfHwgdmFsaWRhdGFibGUubmFtZTtcblxuXHRcdHRoaXMuX3ZhbGlkYXRvcnMuc2V0KHZhbGlkYXRhYmxlLCBtZXRhKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHB1YmxpYyBpZihwcmVjb25kaXRpb246IFRQcmVjb25kaXRpb24sIGRlZmluZTogKHJ1bGU6IFJ1bGUpID0+IHZvaWQpOiBSdWxlIHtcblx0XHRsZXQgcnVsZSA9IG5ldyBSdWxlKHRoaXMubmFtZSk7XG5cdFx0bGV0IG1ldGEgPSB7XG5cdFx0XHRuYW1lOiBydWxlLm5hbWUsXG5cdFx0XHRtZXNzYWdlOiAnJyxcblx0XHRcdHByZWNvbmRpdGlvbixcblx0XHRcdGlzVmFsaWRJZkVtcHR5OiBmYWxzZSxcblx0XHRcdHNldmVyaXR5OiBTZXZlcml0eS5kZWZhdWx0XG5cdFx0fTtcblxuXHRcdHRoaXMuX3ZhbGlkYXRvcnMuc2V0KHJ1bGUsIG1ldGEpO1xuXHRcdGRlZmluZShydWxlKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cHJvdGVjdGVkIF9fcnVuUXVhbGlmaWVycyhwcm9wVmFsdWU6IGFueSwgcGFyZW50VmFsdWU6IGFueSwgY3VzdG9tT3B0aW9uczogYW55LCByZXN1bHRzOiBWYWxpZGF0aW9uUmVzdWx0TGlzdCk6IFZhbGlkYXRpb25SZXN1bHRMaXN0IHtcblx0XHRjb25zdCByZXN1bHQgPSBuZXcgVmFsaWRhdGlvblJlc3VsdCh0aGlzLm5hbWUsIHByb3BWYWx1ZSk7XG5cblx0XHRmb3IgKGxldCBbcXVhbGlmaWVyLCBtZXRhXSBvZiB0aGlzLl9xdWFsaWZpZXJzKSB7XG5cdFx0XHQvLyBXZSBjaGVjayBpZiB3ZSBzaG91bGQgcnVuIHRoZSB2YWxpZGF0b3IgYmFzZWQgb24gd2hldGhlciB0aGUgcHJvcGVydHkgaGFzIGEgdmFsdWVcblx0XHRcdGlmIChpc0VtcHR5KHByb3BWYWx1ZSkgJiYgbWV0YS5pc1ZhbGlkSWZFbXB0eSkge1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gV2UgY2hlY2sgZm9yIGEgcHJlY29uZGl0aW9uIHRvIGV4aXN0IGZvciBhIHF1YWxpZmllciBiZWZvcmUgY2FsbGluZyBpdFxuXHRcdFx0aWYgKCFtZXRhLnByZWNvbmRpdGlvbiB8fCBtZXRhLnByZWNvbmRpdGlvbihwYXJlbnRWYWx1ZSwgY3VzdG9tT3B0aW9ucykpIHtcblx0XHRcdFx0bGV0IGlzVmFsaWQgPSBxdWFsaWZpZXIocHJvcFZhbHVlLCBwYXJlbnRWYWx1ZSwgY3VzdG9tT3B0aW9ucyk7XG5cblx0XHRcdFx0aWYgKCFpc1ZhbGlkKSB7XG5cdFx0XHRcdFx0aWYgKG1ldGEuc2V2ZXJpdHkgPT09IFNldmVyaXR5LmVycm9yKSB7XG5cdFx0XHRcdFx0XHRyZXN1bHQuZXJyb3JzW21ldGEubmFtZV0gPSBtZXRhLm1lc3NhZ2U7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJlc3VsdC53YXJuaW5nc1ttZXRhLm5hbWVdID0gbWV0YS5tZXNzYWdlO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIFNob3J0LWNpcmN1aXQgaWYgd2UgaGF2ZSB0byBzdG9wT25GaXJzdEZhaWx1cmVcblx0XHRcdFx0XHRpZiAodGhpcy5fc3RvcE9uRmlyc3RGYWlsdXJlKSB7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXN1bHRzLnB1c2gocmVzdWx0KTtcblxuXHRcdHJldHVybiByZXN1bHRzO1xuXHR9XG5cblx0cHJvdGVjdGVkIF9fcnVuVmFsaWRhdG9ycyhwcm9wVmFsdWU6IGFueSwgcGFyZW50VmFsdWU6IGFueSwgY3VzdG9tT3B0aW9uczogYW55LCByZXN1bHRzOiBWYWxpZGF0aW9uUmVzdWx0TGlzdCk6IFZhbGlkYXRpb25SZXN1bHRMaXN0IHtcblx0XHRmb3IgKGxldCBbdmFsaWRhdG9yLCBtZXRhXSBvZiB0aGlzLl92YWxpZGF0b3JzKSB7XG5cdFx0XHRpZiAoIW1ldGEucHJlY29uZGl0aW9uIHx8IG1ldGEucHJlY29uZGl0aW9uKHBhcmVudFZhbHVlLCBjdXN0b21PcHRpb25zKSkge1xuXHRcdFx0XHRsZXQgX3Jlc3VsdExpc3Q6IFZhbGlkYXRpb25SZXN1bHRMaXN0ID0gdmFsaWRhdG9yLnZhbGlkYXRlKHByb3BWYWx1ZSwgcGFyZW50VmFsdWUsIGN1c3RvbU9wdGlvbnMpO1xuXHRcdFx0XHRyZXN1bHRzID0gcmVzdWx0cy5tZXJnZShfcmVzdWx0TGlzdCk7XG5cblx0XHRcdFx0aWYgKCFyZXN1bHRzLmlzVmFsaWQgJiYgdGhpcy5fc3RvcE9uRmlyc3RGYWlsdXJlKSB7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0cztcblx0fVxuXG5cdHByb3RlY3RlZCBfX2dldFByb3BlcnR5UmVzdWx0cyh2YWx1ZTogYW55LCBwYXJlbnRWYWx1ZTogYW55LCBjdXN0b21PcHRpb25zOiBhbnksIHJlc3VsdHM6IFZhbGlkYXRpb25SZXN1bHRMaXN0KTogVmFsaWRhdGlvblJlc3VsdExpc3Qge1xuXHRcdHJlc3VsdHMgPSB0aGlzLl9fcnVuUXVhbGlmaWVycyh2YWx1ZSwgcGFyZW50VmFsdWUsIGN1c3RvbU9wdGlvbnMsIHJlc3VsdHMpO1xuXG5cdFx0aWYgKHJlc3VsdHMuaXNWYWxpZCB8fCAhdGhpcy5fc3RvcE9uRmlyc3RGYWlsdXJlKSB7XG5cdFx0XHRyZXN1bHRzID0gdGhpcy5fX3J1blZhbGlkYXRvcnModmFsdWUsIHBhcmVudFZhbHVlLCBjdXN0b21PcHRpb25zLCByZXN1bHRzKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0cztcblx0fVxuXG5cdHB1YmxpYyB2YWxpZGF0ZSh2YWx1ZTogYW55LCBwYXJlbnRWYWx1ZT86IGFueSwgY3VzdG9tT3B0aW9ucz86IGFueSk6IFZhbGlkYXRpb25SZXN1bHRMaXN0IHtcblx0XHR2YWx1ZSA9IGNvcHkodmFsdWUpO1xuXHRcdHBhcmVudFZhbHVlID0gY29weShwYXJlbnRWYWx1ZSk7XG5cblx0XHRsZXQgcmVzdWx0cyA9IG5ldyBWYWxpZGF0aW9uUmVzdWx0TGlzdChbXSwgdGhpcy5uYW1lLCB2YWx1ZSk7XG5cblx0XHRyZXR1cm4gdGhpcy5fX2dldFByb3BlcnR5UmVzdWx0cyh2YWx1ZSwgcGFyZW50VmFsdWUsIGN1c3RvbU9wdGlvbnMsIHJlc3VsdHMpO1xuXG5cdH1cbn0iXX0=