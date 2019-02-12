"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollectionRule = void 0;

var _Rule2 = require("./Rule");

var _ValidationResult = require("./ValidationResult");

var _copy = _interopRequireDefault(require("../utils/copy"));

var _quality = require("../utils/quality");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var isArray = _quality.quality.isArray,
    isEmpty = _quality.quality.isEmpty;

var CollectionRule =
/*#__PURE__*/
function (_Rule) {
  _inherits(CollectionRule, _Rule);

  function CollectionRule() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, CollectionRule);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CollectionRule)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_subsetRules", new Map());

    return _this;
  }

  _createClass(CollectionRule, [{
    key: "using",
    value: function using(validatable) {
      var meta = {
        name: validatable.name,
        message: '',
        precondition: null,
        isValidIfEmpty: false
      };

      this._validators.set(validatable, meta);

      return this;
    }
  }, {
    key: "where",
    value: function where(filter, define) {
      var rule = new _Rule2.Rule(this.name);
      var meta = {
        name: rule.name,
        filter: filter
      };

      this._subsetRules.set(rule, meta);

      define(rule);
      return this;
    }
  }, {
    key: "__runSubsetRules",
    value: function __runSubsetRules(result, collection, parentValue, customOptions) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var _step$value = _slicedToArray(_step.value, 2),
              rule = _step$value[0],
              meta = _step$value[1];

          var subset = collection.filter(function (value, index) {
            return meta.filter(value, index, collection, parentValue, customOptions);
          });
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = subset[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var value = _step2.value;

              var _result = rule.validate(value, value, customOptions);

              if (!_result.isValid) {
                var _collectionIndex = collection.indexOf(value);

                var errorKey = "[".concat(_collectionIndex, "]");

                if (result.errors[errorKey]) {
                  result.errors[errorKey] = (0, _copy.default)(_result, result.errors[errorKey]);
                } else {
                  result.errors[errorKey] = _result;
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
        };

        for (var _iterator = this._subsetRules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          _loop();
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

      return result;
    }
  }, {
    key: "validate",
    value: function validate(value, parentValue, customOptions) {
      var _this2 = this;

      value = (0, _copy.default)(value);
      parentValue = (0, _copy.default)(parentValue);

      if (isArray(value)) {
        var result = {
          errors: {},

          get isValid() {
            return isEmpty(this.errors);
          },

          value: value
        };
        value.map(function (_propValue, index) {
          var _result = _this2.__getValidationResult(_propValue, parentValue, customOptions);

          if (!_result.isValid) {
            result.errors["[".concat(index, "]")] = _result;
          }
        });

        if (result.isValid || !this._stopOnFirstFailure) {
          result = this.__runSubsetRules(result, value, parentValue, customOptions);
        }

        return new _ValidationResult.ValidationResult(result);
      } else {
        // propValue is not a collection at this point, and cannot be validated.
        // TODO: The beCollection error can be pulled out and defined as a qualifier.
        return new _ValidationResult.ValidationResult({
          errors: {
            beCollection: 'Must be a collection.'
          },
          isValid: false,
          value: value
        });
      }
    }
  }]);

  return CollectionRule;
}(_Rule2.Rule);

exports.CollectionRule = CollectionRule;