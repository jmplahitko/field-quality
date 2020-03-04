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