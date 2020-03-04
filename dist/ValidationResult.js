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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9WYWxpZGF0aW9uUmVzdWx0LnRzIl0sIm5hbWVzIjpbIlZhbGlkYXRpb25SZXN1bHQiLCJwcm9wZXJ0eU5hbWUiLCJ2YWx1ZSIsInJlc3VsdCIsIm1lcmdlIiwiVmFsaWRhdGlvblJlc3VsdExpc3QiLCJlcnJvcnMiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwid2FybmluZ3MiLCJkZXN0Iiwic3JjIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxnQjtBQU1wQiw0QkFBWUMsWUFBWixFQUFrQ0MsS0FBbEMsRUFBK0M7QUFBQTs7QUFBQSxvQ0FMTSxFQUtOOztBQUFBLHNDQUpRLEVBSVI7O0FBQUE7O0FBQUE7O0FBQzlDLFNBQUtELFlBQUwsR0FBb0JBLFlBQXBCO0FBQ0EsU0FBS0MsS0FBTCxHQUFhQSxLQUFiLGFBQWFBLEtBQWIsY0FBYUEsS0FBYixHQUFzQixJQUF0QjtBQUNBOzs7OzBCQWNZQyxNLEVBQTRDO0FBQ3hELGFBQU9ILGdCQUFnQixDQUFDSSxLQUFqQixDQUF1QixJQUF2QixFQUE2QkQsTUFBN0IsQ0FBUDtBQUNBOzs7NkNBRXFEO0FBQ3JELGFBQU8sSUFBSUUsZ0NBQUosQ0FBeUIsQ0FBQyxJQUFELENBQXpCLEVBQWlDLEtBQUtKLFlBQXRDLEVBQW9ELEtBQUtDLEtBQXpELENBQVA7QUFDQTs7O3dCQWxCNkI7QUFDN0IsYUFBTyxzQkFBUSxLQUFLSSxNQUFiLENBQVA7QUFDQTs7O3dCQUUrQjtBQUMvQixhQUFPQyxNQUFNLENBQUNDLElBQVAsQ0FBWSxLQUFLRixNQUFqQixFQUF5QkcsTUFBaEM7QUFDQTs7O3dCQUVpQztBQUNqQyxhQUFPRixNQUFNLENBQUNDLElBQVAsQ0FBWSxLQUFLRSxRQUFqQixFQUEyQkQsTUFBbEM7QUFDQTs7OzBCQVVZRSxJLEVBQXdCQyxHLEVBQXlDO0FBQzdFLFVBQUlELElBQUksS0FBS0MsR0FBYixFQUFrQjtBQUNqQkQsUUFBQUEsSUFBSSxDQUFDTCxNQUFMLHFCQUFtQkssSUFBSSxDQUFDTCxNQUF4QixFQUFtQ00sR0FBRyxDQUFDTixNQUF2QztBQUNBSyxRQUFBQSxJQUFJLENBQUNELFFBQUwscUJBQXFCQyxJQUFJLENBQUNELFFBQTFCLEVBQXVDRSxHQUFHLENBQUNGLFFBQTNDO0FBQ0EsZUFBT0MsSUFBUDtBQUNBLE9BSkQsTUFJTztBQUNOLGVBQU9BLElBQVA7QUFDQTtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZhbGlkYXRpb25SZXN1bHRMaXN0IGZyb20gJy4vVmFsaWRhdGlvblJlc3VsdExpc3QnO1xuXG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSAnLi91dGlscy9xdWFsaXR5JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmFsaWRhdGlvblJlc3VsdCB7XG5cdHB1YmxpYyBlcnJvcnM6IHsgW3F1YWxpZmllck5hbWU6IHN0cmluZ106IHN0cmluZyB9ID0ge307XG5cdHB1YmxpYyB3YXJuaW5nczogeyBbcXVhbGlmaWVyTmFtZTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcblx0cHVibGljIHByb3BlcnR5TmFtZTogc3RyaW5nO1xuXHRwdWJsaWMgdmFsdWU6IGFueTtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0eU5hbWU6IHN0cmluZywgdmFsdWU/OiBhbnkpIHtcblx0XHR0aGlzLnByb3BlcnR5TmFtZSA9IHByb3BlcnR5TmFtZTtcblx0XHR0aGlzLnZhbHVlID0gdmFsdWUgPz8gbnVsbDtcblx0fVxuXG5cdHB1YmxpYyBnZXQgaXNWYWxpZCgpOiBib29sZWFuIHtcblx0XHRyZXR1cm4gaXNFbXB0eSh0aGlzLmVycm9ycyk7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IGVycm9yQ291bnQoKTogbnVtYmVyIHtcblx0XHRyZXR1cm4gT2JqZWN0LmtleXModGhpcy5lcnJvcnMpLmxlbmd0aDtcblx0fVxuXG5cdHB1YmxpYyBnZXQgd2FybmluZ0NvdW50KCk6IG51bWJlciB7XG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKHRoaXMud2FybmluZ3MpLmxlbmd0aDtcblx0fVxuXG5cdHB1YmxpYyBtZXJnZShyZXN1bHQ6IFZhbGlkYXRpb25SZXN1bHQpOiBWYWxpZGF0aW9uUmVzdWx0IHtcblx0XHRyZXR1cm4gVmFsaWRhdGlvblJlc3VsdC5tZXJnZSh0aGlzLCByZXN1bHQpO1xuXHR9XG5cblx0cHVibGljIHRvVmFsaWRhdGlvblJlc3VsdExpc3QoKTogVmFsaWRhdGlvblJlc3VsdExpc3Qge1xuXHRcdHJldHVybiBuZXcgVmFsaWRhdGlvblJlc3VsdExpc3QoW3RoaXNdLCB0aGlzLnByb3BlcnR5TmFtZSwgdGhpcy52YWx1ZSk7XG5cdH1cblxuXHRzdGF0aWMgbWVyZ2UoZGVzdDogVmFsaWRhdGlvblJlc3VsdCwgc3JjOiBWYWxpZGF0aW9uUmVzdWx0KTogVmFsaWRhdGlvblJlc3VsdCB7XG5cdFx0aWYgKGRlc3QgIT09IHNyYykge1xuXHRcdFx0ZGVzdC5lcnJvcnMgPSB7IC4uLmRlc3QuZXJyb3JzLCAuLi5zcmMuZXJyb3JzIH07XG5cdFx0XHRkZXN0Lndhcm5pbmdzID0geyAuLi5kZXN0Lndhcm5pbmdzLCAuLi5zcmMud2FybmluZ3MgfTtcblx0XHRcdHJldHVybiBkZXN0O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gZGVzdDtcblx0XHR9XG5cdH1cbn0iXX0=