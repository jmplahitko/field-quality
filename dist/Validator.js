"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _CollectionRule = _interopRequireDefault(require("./CollectionRule"));

var _Rule = _interopRequireDefault(require("./Rule"));

var _ValidationResultList = _interopRequireDefault(require("./ValidationResultList"));

var _copy = _interopRequireDefault(require("./utils/copy"));

var _getProperty = _interopRequireDefault(require("./utils/getProperty"));

var _quality = require("./utils/quality");

var _normalizeValidateArgs = _interopRequireDefault(require("./utils/normalizeValidateArgs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Validator = /*#__PURE__*/function () {
  function Validator() {
    _classCallCheck(this, Validator);

    _defineProperty(this, "_name", void 0);

    _defineProperty(this, "_results", new _ValidationResultList["default"]());

    _defineProperty(this, "_rules", {});
  }

  _createClass(Validator, [{
    key: "ruleFor",
    value: function ruleFor(propertyName) {
      var rule = new _Rule["default"](propertyName);

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
      var rule = new _CollectionRule["default"](propertyName);

      if (!this._rules[propertyName]) {
        this._rules[propertyName] = [rule];
      } else {
        this._rules[propertyName].push(rule);
      }

      return rule;
    }
  }, {
    key: "validateProperty",
    value: function validateProperty(propertyName, parentValue, customOptions, outResultList) {
      var prevResult = this._results.get(propertyName);

      var value = (0, _getProperty["default"])(parentValue, propertyName);
      var resultList;

      if (outResultList) {
        resultList = outResultList;
        resultList.removeWithRelatedResults(propertyName);
      } else {
        resultList = new _ValidationResultList["default"]([], propertyName, value);
      }

      if (prevResult && (0, _quality.isEqual)(prevResult.value, value)) {
        resultList.merge(this._results.getWithRelatedResults(propertyName));
      } else {
        var rules = this._rules[propertyName];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = rules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var rule = _step.value;

            var _results = rule.validate(value, parentValue, customOptions);

            resultList = resultList.merge(_results);
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
      }

      return resultList;
    }
  }, {
    key: "validate",
    value: function validate(value, parentValue, customOptions) {
      var _this = this;

      var _normalizeValidateArg = (0, _normalizeValidateArgs["default"])(value, parentValue, customOptions),
          _normalizeValidateArg2 = _slicedToArray(_normalizeValidateArg, 3),
          _value = _normalizeValidateArg2[0],
          _parentValue = _normalizeValidateArg2[1],
          _customOptions = _normalizeValidateArg2[2];

      _parentValue = (0, _copy["default"])(_value);
      var resultList = new _ValidationResultList["default"]([], this.name || '', _value);

      for (var propertyName in this._rules) {
        var results = this.validateProperty(propertyName, _parentValue, _customOptions);
        resultList = resultList.merge(results);
      }

      if (this.name) {
        resultList.propertyName = this.name;
        resultList.forEach(function (result) {
          return result.propertyName = "".concat(_this.name, ".").concat(result.propertyName);
        });
      }

      this._results.clear();

      this._results.value = _value;

      this._results.merge(resultList);

      return resultList;
    }
  }, {
    key: "name",
    get: function get() {
      return this._name;
    },
    set: function set(name) {
      this._name = name;
      this._results.propertyName = name;
    }
  }]);

  return Validator;
}();

exports["default"] = Validator;