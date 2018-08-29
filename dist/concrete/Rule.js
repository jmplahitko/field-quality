"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Rule = void 0;

var _ValidationResult = require("./ValidationResult");

var _copy = _interopRequireDefault(require("../utils/copy"));

var _simpleFluentIntefaceFor = require("../utils/simpleFluentIntefaceFor");

var _qualifiers = require("../utils/qualifiers");

var _quality = require("../utils/quality");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return _sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _length = _qualifiers.qualifiers.length,
    match = _qualifiers.qualifiers.match,
    _notEmpty = _qualifiers.qualifiers.notEmpty,
    _notNull = _qualifiers.qualifiers.notNull;
var isEmpty = _quality.quality.isEmpty,
    isNull = _quality.quality.isNull;

var Rule =
/*#__PURE__*/
function () {
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

    Object.defineProperty(this, "name", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "_qualifiers", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: new Map()
    });
    Object.defineProperty(this, "_validators", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: new Map()
    });
    Object.defineProperty(this, "_stopOnFirstFailure", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: true
    });
    this.name = name || this.constructor.name;
    this.define(this);
  }

  _createClass(Rule, [{
    key: "define",
    value: function define(rule) {}
  }, {
    key: "length",
    value: function length(min, max) {
      var beBetween = _length(min, max);

      this._qualifiers.set(beBetween, {
        name: "beBetween".concat(min, "and").concat(max),
        message: "".concat(this.name, " must be between ").concat(min, " and ").concat(max),
        precondition: null
      });

      return (0, _simpleFluentIntefaceFor.simpleFluentInterfaceFor)(this, beBetween);
    }
  }, {
    key: "lengthOrEmpty",
    value: function lengthOrEmpty(min, max) {
      var beBetween = _length(min, max);

      this._qualifiers.set(beBetween, {
        name: "beBetween".concat(min, "and").concat(max, "OrEmpty"),
        message: "".concat(this.name, " must be between ").concat(min, " and ").concat(max),
        precondition: null
      });

      return (0, _simpleFluentIntefaceFor.simpleFluentInterfaceFor)(this, beBetween);
    }
  }, {
    key: "matches",
    value: function matches(rx) {
      var matches = match(rx);

      var matchRx = function matchRx(val) {
        return isNull(val) || matches(val);
      };

      this._qualifiers.set(matchRx, {
        name: matchRx.name,
        message: "".concat(this.name, " is an invalid format."),
        precondition: null
      });

      return (0, _simpleFluentIntefaceFor.simpleFluentInterfaceFor)(this, matchRx);
    }
  }, {
    key: "notNull",
    value: function notNull() {
      this._qualifiers.set(_notNull, {
        name: _notNull.name,
        message: "".concat(this.name, " cannot be null."),
        precondition: null
      });

      return (0, _simpleFluentIntefaceFor.simpleFluentInterfaceFor)(this, _notNull);
    }
  }, {
    key: "notEmpty",
    value: function notEmpty() {
      this._qualifiers.set(_notEmpty, {
        name: _notEmpty.name,
        message: "".concat(this.name, " cannot be empty."),
        precondition: null
      });

      return (0, _simpleFluentIntefaceFor.simpleFluentInterfaceFor)(this, _notEmpty);
    }
  }, {
    key: "must",
    value: function must(qualifier) {
      this._qualifiers.set(qualifier, {
        name: qualifier.name,
        message: "".concat(this.name, " is invalid."),
        precondition: null
      });

      return (0, _simpleFluentIntefaceFor.simpleFluentInterfaceFor)(this, qualifier);
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
      var rule = this;

      this._validators.set(validatable, {
        name: validatable.name,
        precondition: null
      });

      return this;
    }
  }, {
    key: "if",
    value: function _if(precondition, define) {
      var rule = new Rule(this.name);

      this._validators.set(rule, {
        name: rule.name,
        precondition: precondition
      });

      define(rule);
      return this;
    } // TODO: This method is pretty gross. This is just a sketch of the appropriate algorithm, just needs refactored.

  }, {
    key: "getValidationResult",
    value: function getValidationResult(propValue, parentValue, customOptions) {
      var result = {
        errors: {},

        get isValid() {
          return isEmpty(this.errors);
        },

        value: propValue // Check qualifiers first

      };
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._qualifiers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _ref3 = _step.value;

          var _ref2 = _slicedToArray(_ref3, 2);

          var _qualifier = _ref2[0];
          var _meta = _ref2[1];

          // We check for a precondition to exist for a qualifier before calling it
          if (!_meta.precondition || _meta.precondition(parentValue, customOptions)) {
            var isValid = _qualifier(propValue, parentValue, customOptions);

            if (!isValid) {
              result.errors[_meta.name] = _meta.message; // Short-circuit if we have to stopOnFirstFailure

              if (this._stopOnFirstFailure) {
                return new _ValidationResult.ValidationResult(result);
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return this.runValidators(result, propValue, parentValue, customOptions);
    }
  }, {
    key: "runValidators",
    value: function runValidators(result, propValue, parentValue, customOptions) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this._validators[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _ref6 = _step2.value;

          var _ref5 = _slicedToArray(_ref6, 2);

          var _validator = _ref5[0];
          var _meta2 = _ref5[1];

          if (!_meta2.precondition || _meta2.precondition(parentValue, customOptions)) {
            var _result = _validator.validate(propValue, parentValue, customOptions);

            if (!_result.isValid) {
              for (var ruleName in _result.errors) {
                result.errors[ruleName] = _result.errors[ruleName];
              }

              if (this._stopOnFirstFailure) {
                return new _ValidationResult.ValidationResult(result);
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return new _ValidationResult.ValidationResult(result);
    }
  }, {
    key: "validate",
    value: function validate(value, parentValue, customOptions) {
      value = (0, _copy.default)(value);
      parentValue = (0, _copy.default)(parentValue);
      return this.getValidationResult(value, parentValue, customOptions);
    }
  }]);

  return Rule;
}();

exports.Rule = Rule;