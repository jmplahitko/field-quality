"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ValidationResultList = _interopRequireDefault(require("./ValidationResultList"));

var _quality = require("./utils/quality");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ValidationResult = /*#__PURE__*/function () {
  function ValidationResult(propertyName, value) {
    _classCallCheck(this, ValidationResult);

    _defineProperty(this, "errors", {});

    _defineProperty(this, "warnings", {});

    _defineProperty(this, "propertyName", void 0);

    _defineProperty(this, "value", void 0);

    this.propertyName = propertyName;
    this.value = value !== null && value !== void 0 ? value : null;
  }

  _createClass(ValidationResult, [{
    key: "merge",
    value: function merge(result) {
      return ValidationResult.merge(this, result);
    }
  }, {
    key: "toValidationResultList",
    value: function toValidationResultList() {
      return new _ValidationResultList["default"]([this], this.propertyName, this.value);
    }
  }, {
    key: "isValid",
    get: function get() {
      return (0, _quality.isEmpty)(this.errors);
    }
  }, {
    key: "errorCount",
    get: function get() {
      return Object.keys(this.errors).length;
    }
  }, {
    key: "warningCount",
    get: function get() {
      return Object.keys(this.warnings).length;
    }
  }], [{
    key: "merge",
    value: function merge(dest, src) {
      if (dest !== src) {
        dest.errors = _objectSpread({}, dest.errors, src.errors);
        dest.warnings = _objectSpread({}, dest.warnings, src.warnings);
        return dest;
      } else {
        return dest;
      }
    }
  }]);

  return ValidationResult;
}();

exports["default"] = ValidationResult;