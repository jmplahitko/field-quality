"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidationResult = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ValidationResult =
/*#__PURE__*/
function () {
  function ValidationResult(validationResult) {
    _classCallCheck(this, ValidationResult);

    Object.defineProperty(this, "errors", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "isValid", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "value", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: void 0
    });
    this.errors = validationResult.errors;
    this.isValid = validationResult.isValid;
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