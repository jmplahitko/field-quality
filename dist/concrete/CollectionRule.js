"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollectionRule = void 0;

var _Rule2 = require("./Rule");

var _ValidationResult = require("./ValidationResult");

var _collectionFluentInterfaceFor = require("../utils/collectionFluentInterfaceFor");

var _copy = _interopRequireDefault(require("../utils/copy"));

var _quality = require("../utils/quality");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isArray = _quality.quality.isArray,
    isEmpty = _quality.quality.isEmpty;

var CollectionRule =
/*#__PURE__*/
function (_Rule) {
  _inherits(CollectionRule, _Rule);

  function CollectionRule() {
    _classCallCheck(this, CollectionRule);

    return _possibleConstructorReturn(this, (CollectionRule.__proto__ || Object.getPrototypeOf(CollectionRule)).apply(this, arguments));
  }

  _createClass(CollectionRule, [{
    key: "using",
    value: function using(validatable) {
      var rule = this;

      this._validators.set(validatable, {
        name: validatable.name,
        precondition: null
      });

      return (0, _collectionFluentInterfaceFor.collectionFluentInterfaceFor)(rule, validatable);
    }
  }, {
    key: "validate",
    value: function validate(value, parentValue, customOptions) {
      var _this = this;

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
        value.forEach(function (_propValue, index) {
          var _result = _this.getValidationResult(_propValue, parentValue, customOptions);

          if (!_result.isValid) {
            result.errors["[".concat(index, "]")] = _result;
          }
        });
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