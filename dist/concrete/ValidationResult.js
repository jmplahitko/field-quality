"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidationResult = void 0;

var _quality = require("../utils/quality");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var isEmpty = _quality.quality.isEmpty;

var ValidationResult =
/*#__PURE__*/
function () {
  function ValidationResult(validationResult) {
    _classCallCheck(this, ValidationResult);

    _defineProperty(this, "errors", void 0);

    _defineProperty(this, "isValid", void 0);

    _defineProperty(this, "value", void 0);

    this.errors = validationResult.errors;
    this.isValid = isEmpty(this.errors);
    this.value = validationResult.value;
  }

  _createClass(ValidationResult, [{
    key: "flatten",
    value: function flatten() {
      var result = {};

      for (var prop in this.errors) {
        if (!this.errors.hasOwnProperty(prop)) {
          continue;
        }

        if (this.errors[prop] instanceof ValidationResult) {
          var flattened = this.errors[prop].flatten();

          if (flattened instanceof ValidationResult) {
            result[prop] = flattened;
          } else {
            for (var _prop in flattened) {
              if (!flattened.hasOwnProperty(_prop)) {
                continue;
              }

              result["".concat(prop, ".").concat(_prop)] = flattened[_prop];
            }
          }
        } else {
          return this;
        }
      }

      return result;
    }
  }]);

  return ValidationResult;
}();

exports.ValidationResult = ValidationResult;