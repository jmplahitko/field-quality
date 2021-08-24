"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ValidationResultList = _interopRequireDefault(require("./ValidationResultList"));

var _quality = require("./utils/quality");

var _copy = _interopRequireDefault(require("./utils/copy"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

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

    this.propertyName = propertyName;
    this.value = value;
  }

  _createClass(ValidationResult, [{
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
  }, {
    key: "merge",
    value: function merge(result) {
      return ValidationResult.merge(this, result);
    }
  }, {
    key: "toValidationResultList",
    value: function toValidationResultList() {
      return new _ValidationResultList["default"]([this], this.propertyName, this.value);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9WYWxpZGF0aW9uUmVzdWx0LnRzIl0sIm5hbWVzIjpbIlZhbGlkYXRpb25SZXN1bHQiLCJwcm9wZXJ0eU5hbWUiLCJ2YWx1ZSIsImVycm9ycyIsIk9iamVjdCIsImtleXMiLCJsZW5ndGgiLCJ3YXJuaW5ncyIsInJlc3VsdCIsIm1lcmdlIiwiVmFsaWRhdGlvblJlc3VsdExpc3QiLCJkZXN0Iiwic3JjIiwib3B0aW9ucyIsInVzZVNvdXJjZVZhbHVlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLGdCO0FBTXBCLDRCQUFZQyxZQUFaLEVBQWtDQyxLQUFsQyxFQUErQztBQUFBOztBQUFBLG9DQUxNLEVBS047O0FBQUEsc0NBSlEsRUFJUjs7QUFDOUMsU0FBS0QsWUFBTCxHQUFvQkEsWUFBcEI7QUFDQSxTQUFLQyxLQUFMLEdBQWFBLEtBQWI7QUFDQTs7OztTQUVELGVBQThCO0FBQzdCLGFBQU8sc0JBQVEsS0FBS0MsTUFBYixDQUFQO0FBQ0E7OztTQUVELGVBQWdDO0FBQy9CLGFBQU9DLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLEtBQUtGLE1BQWpCLEVBQXlCRyxNQUFoQztBQUNBOzs7U0FFRCxlQUFrQztBQUNqQyxhQUFPRixNQUFNLENBQUNDLElBQVAsQ0FBWSxLQUFLRSxRQUFqQixFQUEyQkQsTUFBbEM7QUFDQTs7O1dBRUQsZUFBYUUsTUFBYixFQUF5RDtBQUN4RCxhQUFPUixnQkFBZ0IsQ0FBQ1MsS0FBakIsQ0FBdUIsSUFBdkIsRUFBNkJELE1BQTdCLENBQVA7QUFDQTs7O1dBRUQsa0NBQXNEO0FBQ3JELGFBQU8sSUFBSUUsZ0NBQUosQ0FBeUIsQ0FBQyxJQUFELENBQXpCLEVBQWlDLEtBQUtULFlBQXRDLEVBQW9ELEtBQUtDLEtBQXpELENBQVA7QUFDQTs7O1dBRUQsZUFBYVMsSUFBYixFQUFxQ0MsR0FBckMsRUFBa0o7QUFBQSxVQUF0RkMsT0FBc0YsdUVBQTdDO0FBQUVDLFFBQUFBLGNBQWMsRUFBRTtBQUFsQixPQUE2Qzs7QUFDakosVUFBSUgsSUFBSSxLQUFLQyxHQUFiLEVBQWtCO0FBQ2pCRCxRQUFBQSxJQUFJLENBQUNSLE1BQUwsbUNBQW1CUSxJQUFJLENBQUNSLE1BQXhCLEdBQW1DUyxHQUFHLENBQUNULE1BQXZDO0FBQ0FRLFFBQUFBLElBQUksQ0FBQ0osUUFBTCxtQ0FBcUJJLElBQUksQ0FBQ0osUUFBMUIsR0FBdUNLLEdBQUcsQ0FBQ0wsUUFBM0M7QUFDQTs7QUFFRCxVQUFJLENBQUMsc0JBQVFJLElBQUksQ0FBQ1QsS0FBYixFQUFvQlUsR0FBRyxDQUFDVixLQUF4QixDQUFELElBQW1DVyxPQUFPLENBQUNDLGNBQS9DLEVBQStEO0FBQzlESCxRQUFBQSxJQUFJLENBQUNULEtBQUwsR0FBYSxzQkFBS1UsR0FBRyxDQUFDVixLQUFULENBQWI7QUFDQTs7QUFFRCxhQUFPUyxJQUFQO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmFsaWRhdGlvblJlc3VsdExpc3QgZnJvbSAnLi9WYWxpZGF0aW9uUmVzdWx0TGlzdCc7XG5cbmltcG9ydCB7IGlzRW1wdHksIGlzRXF1YWwgfSBmcm9tICcuL3V0aWxzL3F1YWxpdHknO1xuaW1wb3J0IHsgVFZhbGlkYXRpb25SZXN1bHRNZXJnZU9wdGlvbnMgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCBjb3B5IGZyb20gJy4vdXRpbHMvY29weSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZhbGlkYXRpb25SZXN1bHQge1xuXHRwdWJsaWMgZXJyb3JzOiB7IFtwcmVkaWNhdGVOYW1lOiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9O1xuXHRwdWJsaWMgd2FybmluZ3M6IHsgW3ByZWRpY2F0ZU5hbWU6IHN0cmluZ106IHN0cmluZyB9ID0ge307XG5cdHB1YmxpYyBwcm9wZXJ0eU5hbWU6IHN0cmluZztcblx0cHVibGljIHZhbHVlOiBhbnk7XG5cblx0Y29uc3RydWN0b3IocHJvcGVydHlOYW1lOiBzdHJpbmcsIHZhbHVlPzogYW55KSB7XG5cdFx0dGhpcy5wcm9wZXJ0eU5hbWUgPSBwcm9wZXJ0eU5hbWU7XG5cdFx0dGhpcy52YWx1ZSA9IHZhbHVlO1xuXHR9XG5cblx0cHVibGljIGdldCBpc1ZhbGlkKCk6IGJvb2xlYW4ge1xuXHRcdHJldHVybiBpc0VtcHR5KHRoaXMuZXJyb3JzKTtcblx0fVxuXG5cdHB1YmxpYyBnZXQgZXJyb3JDb3VudCgpOiBudW1iZXIge1xuXHRcdHJldHVybiBPYmplY3Qua2V5cyh0aGlzLmVycm9ycykubGVuZ3RoO1xuXHR9XG5cblx0cHVibGljIGdldCB3YXJuaW5nQ291bnQoKTogbnVtYmVyIHtcblx0XHRyZXR1cm4gT2JqZWN0LmtleXModGhpcy53YXJuaW5ncykubGVuZ3RoO1xuXHR9XG5cblx0cHVibGljIG1lcmdlKHJlc3VsdDogVmFsaWRhdGlvblJlc3VsdCk6IFZhbGlkYXRpb25SZXN1bHQge1xuXHRcdHJldHVybiBWYWxpZGF0aW9uUmVzdWx0Lm1lcmdlKHRoaXMsIHJlc3VsdCk7XG5cdH1cblxuXHRwdWJsaWMgdG9WYWxpZGF0aW9uUmVzdWx0TGlzdCgpOiBWYWxpZGF0aW9uUmVzdWx0TGlzdCB7XG5cdFx0cmV0dXJuIG5ldyBWYWxpZGF0aW9uUmVzdWx0TGlzdChbdGhpc10sIHRoaXMucHJvcGVydHlOYW1lLCB0aGlzLnZhbHVlKTtcblx0fVxuXG5cdHN0YXRpYyBtZXJnZShkZXN0OiBWYWxpZGF0aW9uUmVzdWx0LCBzcmM6IFZhbGlkYXRpb25SZXN1bHQsIG9wdGlvbnM6IFRWYWxpZGF0aW9uUmVzdWx0TWVyZ2VPcHRpb25zID0geyB1c2VTb3VyY2VWYWx1ZTogZmFsc2UgfSk6IFZhbGlkYXRpb25SZXN1bHQge1xuXHRcdGlmIChkZXN0ICE9PSBzcmMpIHtcblx0XHRcdGRlc3QuZXJyb3JzID0geyAuLi5kZXN0LmVycm9ycywgLi4uc3JjLmVycm9ycyB9O1xuXHRcdFx0ZGVzdC53YXJuaW5ncyA9IHsgLi4uZGVzdC53YXJuaW5ncywgLi4uc3JjLndhcm5pbmdzIH07XG5cdFx0fVxuXG5cdFx0aWYgKCFpc0VxdWFsKGRlc3QudmFsdWUsIHNyYy52YWx1ZSkgJiYgb3B0aW9ucy51c2VTb3VyY2VWYWx1ZSkge1xuXHRcdFx0ZGVzdC52YWx1ZSA9IGNvcHkoc3JjLnZhbHVlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZGVzdDtcblx0fVxufSJdfQ==