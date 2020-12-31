"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ValidationResultList = _interopRequireDefault(require("./ValidationResultList"));

var _quality = require("./utils/quality");

var _copy = _interopRequireDefault(require("./utils/copy"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
    this.value = value;
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
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
        useSourceValue: false
      };

      if (dest !== src) {
        dest.errors = _objectSpread(_objectSpread({}, dest.errors), src.errors);
        dest.warnings = _objectSpread(_objectSpread({}, dest.warnings), src.warnings);
      }

      if (!(0, _quality.isEqual)(dest.value, src.value) && options.useSourceValue) {
        dest.value = (0, _copy["default"])(src.value);
      }

      return dest;
    }
  }]);

  return ValidationResult;
}();

exports["default"] = ValidationResult;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9WYWxpZGF0aW9uUmVzdWx0LnRzIl0sIm5hbWVzIjpbIlZhbGlkYXRpb25SZXN1bHQiLCJwcm9wZXJ0eU5hbWUiLCJ2YWx1ZSIsInJlc3VsdCIsIm1lcmdlIiwiVmFsaWRhdGlvblJlc3VsdExpc3QiLCJlcnJvcnMiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwid2FybmluZ3MiLCJkZXN0Iiwic3JjIiwib3B0aW9ucyIsInVzZVNvdXJjZVZhbHVlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLGdCO0FBTXBCLDRCQUFZQyxZQUFaLEVBQWtDQyxLQUFsQyxFQUErQztBQUFBOztBQUFBLG9DQUxNLEVBS047O0FBQUEsc0NBSlEsRUFJUjs7QUFBQTs7QUFBQTs7QUFDOUMsU0FBS0QsWUFBTCxHQUFvQkEsWUFBcEI7QUFDQSxTQUFLQyxLQUFMLEdBQWFBLEtBQWI7QUFDQTs7OzswQkFjWUMsTSxFQUE0QztBQUN4RCxhQUFPSCxnQkFBZ0IsQ0FBQ0ksS0FBakIsQ0FBdUIsSUFBdkIsRUFBNkJELE1BQTdCLENBQVA7QUFDQTs7OzZDQUVxRDtBQUNyRCxhQUFPLElBQUlFLGdDQUFKLENBQXlCLENBQUMsSUFBRCxDQUF6QixFQUFpQyxLQUFLSixZQUF0QyxFQUFvRCxLQUFLQyxLQUF6RCxDQUFQO0FBQ0E7Ozt3QkFsQjZCO0FBQzdCLGFBQU8sc0JBQVEsS0FBS0ksTUFBYixDQUFQO0FBQ0E7Ozt3QkFFK0I7QUFDL0IsYUFBT0MsTUFBTSxDQUFDQyxJQUFQLENBQVksS0FBS0YsTUFBakIsRUFBeUJHLE1BQWhDO0FBQ0E7Ozt3QkFFaUM7QUFDakMsYUFBT0YsTUFBTSxDQUFDQyxJQUFQLENBQVksS0FBS0UsUUFBakIsRUFBMkJELE1BQWxDO0FBQ0E7OzswQkFVWUUsSSxFQUF3QkMsRyxFQUE2RztBQUFBLFVBQXRGQyxPQUFzRix1RUFBN0M7QUFBRUMsUUFBQUEsY0FBYyxFQUFFO0FBQWxCLE9BQTZDOztBQUNqSixVQUFJSCxJQUFJLEtBQUtDLEdBQWIsRUFBa0I7QUFDakJELFFBQUFBLElBQUksQ0FBQ0wsTUFBTCxtQ0FBbUJLLElBQUksQ0FBQ0wsTUFBeEIsR0FBbUNNLEdBQUcsQ0FBQ04sTUFBdkM7QUFDQUssUUFBQUEsSUFBSSxDQUFDRCxRQUFMLG1DQUFxQkMsSUFBSSxDQUFDRCxRQUExQixHQUF1Q0UsR0FBRyxDQUFDRixRQUEzQztBQUNBOztBQUVELFVBQUksQ0FBQyxzQkFBUUMsSUFBSSxDQUFDVCxLQUFiLEVBQW9CVSxHQUFHLENBQUNWLEtBQXhCLENBQUQsSUFBbUNXLE9BQU8sQ0FBQ0MsY0FBL0MsRUFBK0Q7QUFDOURILFFBQUFBLElBQUksQ0FBQ1QsS0FBTCxHQUFhLHNCQUFLVSxHQUFHLENBQUNWLEtBQVQsQ0FBYjtBQUNBOztBQUVELGFBQU9TLElBQVA7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWYWxpZGF0aW9uUmVzdWx0TGlzdCBmcm9tICcuL1ZhbGlkYXRpb25SZXN1bHRMaXN0JztcblxuaW1wb3J0IHsgaXNFbXB0eSwgaXNFcXVhbCB9IGZyb20gJy4vdXRpbHMvcXVhbGl0eSc7XG5pbXBvcnQgeyBUVmFsaWRhdGlvblJlc3VsdE1lcmdlT3B0aW9ucyB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IGNvcHkgZnJvbSAnLi91dGlscy9jb3B5JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmFsaWRhdGlvblJlc3VsdCB7XG5cdHB1YmxpYyBlcnJvcnM6IHsgW3ByZWRpY2F0ZU5hbWU6IHN0cmluZ106IHN0cmluZyB9ID0ge307XG5cdHB1YmxpYyB3YXJuaW5nczogeyBbcHJlZGljYXRlTmFtZTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcblx0cHVibGljIHByb3BlcnR5TmFtZTogc3RyaW5nO1xuXHRwdWJsaWMgdmFsdWU6IGFueTtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0eU5hbWU6IHN0cmluZywgdmFsdWU/OiBhbnkpIHtcblx0XHR0aGlzLnByb3BlcnR5TmFtZSA9IHByb3BlcnR5TmFtZTtcblx0XHR0aGlzLnZhbHVlID0gdmFsdWU7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IGlzVmFsaWQoKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIGlzRW1wdHkodGhpcy5lcnJvcnMpO1xuXHR9XG5cblx0cHVibGljIGdldCBlcnJvckNvdW50KCk6IG51bWJlciB7XG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuZXJyb3JzKS5sZW5ndGg7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IHdhcm5pbmdDb3VudCgpOiBudW1iZXIge1xuXHRcdHJldHVybiBPYmplY3Qua2V5cyh0aGlzLndhcm5pbmdzKS5sZW5ndGg7XG5cdH1cblxuXHRwdWJsaWMgbWVyZ2UocmVzdWx0OiBWYWxpZGF0aW9uUmVzdWx0KTogVmFsaWRhdGlvblJlc3VsdCB7XG5cdFx0cmV0dXJuIFZhbGlkYXRpb25SZXN1bHQubWVyZ2UodGhpcywgcmVzdWx0KTtcblx0fVxuXG5cdHB1YmxpYyB0b1ZhbGlkYXRpb25SZXN1bHRMaXN0KCk6IFZhbGlkYXRpb25SZXN1bHRMaXN0IHtcblx0XHRyZXR1cm4gbmV3IFZhbGlkYXRpb25SZXN1bHRMaXN0KFt0aGlzXSwgdGhpcy5wcm9wZXJ0eU5hbWUsIHRoaXMudmFsdWUpO1xuXHR9XG5cblx0c3RhdGljIG1lcmdlKGRlc3Q6IFZhbGlkYXRpb25SZXN1bHQsIHNyYzogVmFsaWRhdGlvblJlc3VsdCwgb3B0aW9uczogVFZhbGlkYXRpb25SZXN1bHRNZXJnZU9wdGlvbnMgPSB7IHVzZVNvdXJjZVZhbHVlOiBmYWxzZSB9KTogVmFsaWRhdGlvblJlc3VsdCB7XG5cdFx0aWYgKGRlc3QgIT09IHNyYykge1xuXHRcdFx0ZGVzdC5lcnJvcnMgPSB7IC4uLmRlc3QuZXJyb3JzLCAuLi5zcmMuZXJyb3JzIH07XG5cdFx0XHRkZXN0Lndhcm5pbmdzID0geyAuLi5kZXN0Lndhcm5pbmdzLCAuLi5zcmMud2FybmluZ3MgfTtcblx0XHR9XG5cblx0XHRpZiAoIWlzRXF1YWwoZGVzdC52YWx1ZSwgc3JjLnZhbHVlKSAmJiBvcHRpb25zLnVzZVNvdXJjZVZhbHVlKSB7XG5cdFx0XHRkZXN0LnZhbHVlID0gY29weShzcmMudmFsdWUpO1xuXHRcdH1cblxuXHRcdHJldHVybiBkZXN0O1xuXHR9XG59Il19