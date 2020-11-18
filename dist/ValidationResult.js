"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ValidationResultList = _interopRequireDefault(require("./ValidationResultList"));

var _quality = require("./utils/quality");

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
      if (dest !== src) {
        dest.errors = _objectSpread(_objectSpread({}, dest.errors), src.errors);
        dest.warnings = _objectSpread(_objectSpread({}, dest.warnings), src.warnings);
      }

      return dest;
    }
  }]);

  return ValidationResult;
}();

exports["default"] = ValidationResult;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9WYWxpZGF0aW9uUmVzdWx0LnRzIl0sIm5hbWVzIjpbIlZhbGlkYXRpb25SZXN1bHQiLCJwcm9wZXJ0eU5hbWUiLCJ2YWx1ZSIsInJlc3VsdCIsIm1lcmdlIiwiVmFsaWRhdGlvblJlc3VsdExpc3QiLCJlcnJvcnMiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwid2FybmluZ3MiLCJkZXN0Iiwic3JjIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLGdCO0FBTXBCLDRCQUFZQyxZQUFaLEVBQWtDQyxLQUFsQyxFQUErQztBQUFBOztBQUFBLG9DQUxNLEVBS047O0FBQUEsc0NBSlEsRUFJUjs7QUFBQTs7QUFBQTs7QUFDOUMsU0FBS0QsWUFBTCxHQUFvQkEsWUFBcEI7QUFDQSxTQUFLQyxLQUFMLEdBQWFBLEtBQWI7QUFDQTs7OzswQkFjWUMsTSxFQUE0QztBQUN4RCxhQUFPSCxnQkFBZ0IsQ0FBQ0ksS0FBakIsQ0FBdUIsSUFBdkIsRUFBNkJELE1BQTdCLENBQVA7QUFDQTs7OzZDQUVxRDtBQUNyRCxhQUFPLElBQUlFLGdDQUFKLENBQXlCLENBQUMsSUFBRCxDQUF6QixFQUFpQyxLQUFLSixZQUF0QyxFQUFvRCxLQUFLQyxLQUF6RCxDQUFQO0FBQ0E7Ozt3QkFsQjZCO0FBQzdCLGFBQU8sc0JBQVEsS0FBS0ksTUFBYixDQUFQO0FBQ0E7Ozt3QkFFK0I7QUFDL0IsYUFBT0MsTUFBTSxDQUFDQyxJQUFQLENBQVksS0FBS0YsTUFBakIsRUFBeUJHLE1BQWhDO0FBQ0E7Ozt3QkFFaUM7QUFDakMsYUFBT0YsTUFBTSxDQUFDQyxJQUFQLENBQVksS0FBS0UsUUFBakIsRUFBMkJELE1BQWxDO0FBQ0E7OzswQkFVWUUsSSxFQUF3QkMsRyxFQUF5QztBQUM3RSxVQUFJRCxJQUFJLEtBQUtDLEdBQWIsRUFBa0I7QUFDakJELFFBQUFBLElBQUksQ0FBQ0wsTUFBTCxtQ0FBbUJLLElBQUksQ0FBQ0wsTUFBeEIsR0FBbUNNLEdBQUcsQ0FBQ04sTUFBdkM7QUFDQUssUUFBQUEsSUFBSSxDQUFDRCxRQUFMLG1DQUFxQkMsSUFBSSxDQUFDRCxRQUExQixHQUF1Q0UsR0FBRyxDQUFDRixRQUEzQztBQUNBOztBQUVELGFBQU9DLElBQVA7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWYWxpZGF0aW9uUmVzdWx0TGlzdCBmcm9tICcuL1ZhbGlkYXRpb25SZXN1bHRMaXN0JztcblxuaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gJy4vdXRpbHMvcXVhbGl0eSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZhbGlkYXRpb25SZXN1bHQge1xuXHRwdWJsaWMgZXJyb3JzOiB7IFtwcmVkaWNhdGVOYW1lOiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9O1xuXHRwdWJsaWMgd2FybmluZ3M6IHsgW3ByZWRpY2F0ZU5hbWU6IHN0cmluZ106IHN0cmluZyB9ID0ge307XG5cdHB1YmxpYyBwcm9wZXJ0eU5hbWU6IHN0cmluZztcblx0cHVibGljIHZhbHVlOiBhbnk7XG5cblx0Y29uc3RydWN0b3IocHJvcGVydHlOYW1lOiBzdHJpbmcsIHZhbHVlPzogYW55KSB7XG5cdFx0dGhpcy5wcm9wZXJ0eU5hbWUgPSBwcm9wZXJ0eU5hbWU7XG5cdFx0dGhpcy52YWx1ZSA9IHZhbHVlO1xuXHR9XG5cblx0cHVibGljIGdldCBpc1ZhbGlkKCk6IGJvb2xlYW4ge1xuXHRcdHJldHVybiBpc0VtcHR5KHRoaXMuZXJyb3JzKTtcblx0fVxuXG5cdHB1YmxpYyBnZXQgZXJyb3JDb3VudCgpOiBudW1iZXIge1xuXHRcdHJldHVybiBPYmplY3Qua2V5cyh0aGlzLmVycm9ycykubGVuZ3RoO1xuXHR9XG5cblx0cHVibGljIGdldCB3YXJuaW5nQ291bnQoKTogbnVtYmVyIHtcblx0XHRyZXR1cm4gT2JqZWN0LmtleXModGhpcy53YXJuaW5ncykubGVuZ3RoO1xuXHR9XG5cblx0cHVibGljIG1lcmdlKHJlc3VsdDogVmFsaWRhdGlvblJlc3VsdCk6IFZhbGlkYXRpb25SZXN1bHQge1xuXHRcdHJldHVybiBWYWxpZGF0aW9uUmVzdWx0Lm1lcmdlKHRoaXMsIHJlc3VsdCk7XG5cdH1cblxuXHRwdWJsaWMgdG9WYWxpZGF0aW9uUmVzdWx0TGlzdCgpOiBWYWxpZGF0aW9uUmVzdWx0TGlzdCB7XG5cdFx0cmV0dXJuIG5ldyBWYWxpZGF0aW9uUmVzdWx0TGlzdChbdGhpc10sIHRoaXMucHJvcGVydHlOYW1lLCB0aGlzLnZhbHVlKTtcblx0fVxuXG5cdHN0YXRpYyBtZXJnZShkZXN0OiBWYWxpZGF0aW9uUmVzdWx0LCBzcmM6IFZhbGlkYXRpb25SZXN1bHQpOiBWYWxpZGF0aW9uUmVzdWx0IHtcblx0XHRpZiAoZGVzdCAhPT0gc3JjKSB7XG5cdFx0XHRkZXN0LmVycm9ycyA9IHsgLi4uZGVzdC5lcnJvcnMsIC4uLnNyYy5lcnJvcnMgfTtcblx0XHRcdGRlc3Qud2FybmluZ3MgPSB7IC4uLmRlc3Qud2FybmluZ3MsIC4uLnNyYy53YXJuaW5ncyB9O1xuXHRcdH1cblxuXHRcdHJldHVybiBkZXN0O1xuXHR9XG59Il19