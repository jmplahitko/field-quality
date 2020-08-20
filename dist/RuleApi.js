"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Severity = _interopRequireDefault(require("./Severity"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RuleApi = /*#__PURE__*/function () {
  function RuleApi(validatable, meta) {
    _classCallCheck(this, RuleApi);

    _defineProperty(this, "__rule", void 0);

    _defineProperty(this, "__meta", void 0);

    this.__rule = validatable;
    this.__meta = meta;
  }

  _createClass(RuleApi, [{
    key: "enum",
    value: function _enum(allowedValues) {
      return this.__rule["enum"](allowedValues);
    }
  }, {
    key: "if",
    value: function _if(precondition, define) {
      return this.__rule["if"](precondition, define);
    }
  }, {
    key: "length",
    value: function length(min, max) {
      return this.__rule.length(min, max);
    }
  }, {
    key: "lengthOrEmpty",
    value: function lengthOrEmpty(min, max) {
      return this.__rule.lengthOrEmpty(min, max);
    }
  }, {
    key: "matches",
    value: function matches(rx) {
      return this.__rule.matches(rx);
    }
  }, {
    key: "max",
    value: function max(num) {
      return this.__rule.max(num);
    }
  }, {
    key: "maxExclusiveOf",
    value: function maxExclusiveOf(num) {
      return this.__rule.maxExclusiveOf(num);
    }
  }, {
    key: "min",
    value: function min(num) {
      return this.__rule.min(num);
    }
  }, {
    key: "minExclusiveOf",
    value: function minExclusiveOf(num) {
      return this.__rule.minExclusiveOf(num);
    }
  }, {
    key: "must",
    value: function must(qualifier) {
      return this.__rule.must(qualifier);
    }
  }, {
    key: "notNull",
    value: function notNull() {
      return this.__rule.notNull();
    }
  }, {
    key: "notEmpty",
    value: function notEmpty() {
      return this.__rule.notEmpty();
    }
  }, {
    key: "cascade",
    value: function cascade() {
      return this.__rule.cascade();
    }
  }, {
    key: "using",
    value: function using(validatable) {
      return this.__rule.using(validatable);
    }
  }, {
    key: "as",
    value: function as(qualifierName) {
      this.__meta.name = qualifierName;
      return this;
    }
  }, {
    key: "asWarning",
    value: function asWarning() {
      this.__meta.severity = _Severity["default"].warning;
      return this;
    }
  }, {
    key: "when",
    value: function when(precondition) {
      this.__meta.precondition = precondition;
      return this;
    }
  }, {
    key: "withMessage",
    value: function withMessage(message) {
      this.__meta.message = message;
      return this;
    }
  }]);

  return RuleApi;
}();

exports["default"] = RuleApi;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9SdWxlQXBpLnRzIl0sIm5hbWVzIjpbIlJ1bGVBcGkiLCJ2YWxpZGF0YWJsZSIsIm1ldGEiLCJfX3J1bGUiLCJfX21ldGEiLCJhbGxvd2VkVmFsdWVzIiwicHJlY29uZGl0aW9uIiwiZGVmaW5lIiwibWluIiwibWF4IiwibGVuZ3RoIiwibGVuZ3RoT3JFbXB0eSIsInJ4IiwibWF0Y2hlcyIsIm51bSIsIm1heEV4Y2x1c2l2ZU9mIiwibWluRXhjbHVzaXZlT2YiLCJxdWFsaWZpZXIiLCJtdXN0Iiwibm90TnVsbCIsIm5vdEVtcHR5IiwiY2FzY2FkZSIsInVzaW5nIiwicXVhbGlmaWVyTmFtZSIsIm5hbWUiLCJzZXZlcml0eSIsIlNldmVyaXR5Iiwid2FybmluZyIsIm1lc3NhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBSXFCQSxPO0FBSXBCLG1CQUFZQyxXQUFaLEVBQTZEQyxJQUE3RCxFQUF1SDtBQUFBOztBQUFBOztBQUFBOztBQUN0SCxTQUFLQyxNQUFMLEdBQWNGLFdBQWQ7QUFDQSxTQUFLRyxNQUFMLEdBQWNGLElBQWQ7QUFDQTs7OzswQkFFV0csYSxFQUFxQztBQUNoRCxhQUFPLEtBQUtGLE1BQUwsU0FBaUJFLGFBQWpCLENBQVA7QUFDQTs7O3dCQUVTQyxZLEVBQTJEQyxNLEVBQWdHO0FBQ3BLLGFBQU8sS0FBS0osTUFBTCxPQUFlRyxZQUFmLEVBQTZCQyxNQUE3QixDQUFQO0FBQ0E7OzsyQkFFYUMsRyxFQUFhQyxHLEVBQW9EO0FBQzlFLGFBQU8sS0FBS04sTUFBTCxDQUFZTyxNQUFaLENBQW1CRixHQUFuQixFQUF3QkMsR0FBeEIsQ0FBUDtBQUNBOzs7a0NBRW9CRCxHLEVBQWFDLEcsRUFBb0Q7QUFDckYsYUFBTyxLQUFLTixNQUFMLENBQVlRLGFBQVosQ0FBMEJILEdBQTFCLEVBQStCQyxHQUEvQixDQUFQO0FBQ0E7Ozs0QkFFY0csRSxFQUFtRDtBQUNqRSxhQUFPLEtBQUtULE1BQUwsQ0FBWVUsT0FBWixDQUFvQkQsRUFBcEIsQ0FBUDtBQUNBOzs7d0JBRVVFLEcsRUFBb0Q7QUFDOUQsYUFBTyxLQUFLWCxNQUFMLENBQVlNLEdBQVosQ0FBZ0JLLEdBQWhCLENBQVA7QUFDQTs7O21DQUVxQkEsRyxFQUFvRDtBQUN6RSxhQUFPLEtBQUtYLE1BQUwsQ0FBWVksY0FBWixDQUEyQkQsR0FBM0IsQ0FBUDtBQUNBOzs7d0JBRVVBLEcsRUFBb0Q7QUFDOUQsYUFBTyxLQUFLWCxNQUFMLENBQVlLLEdBQVosQ0FBZ0JNLEdBQWhCLENBQVA7QUFDQTs7O21DQUVxQkEsRyxFQUFvRDtBQUN6RSxhQUFPLEtBQUtYLE1BQUwsQ0FBWWEsY0FBWixDQUEyQkYsR0FBM0IsQ0FBUDtBQUNBOzs7eUJBRVdHLFMsRUFBNEY7QUFDdkcsYUFBTyxLQUFLZCxNQUFMLENBQVllLElBQVosQ0FBaUJELFNBQWpCLENBQVA7QUFDQTs7OzhCQUV1RDtBQUN2RCxhQUFPLEtBQUtkLE1BQUwsQ0FBWWdCLE9BQVosRUFBUDtBQUNBOzs7K0JBRXdEO0FBQ3hELGFBQU8sS0FBS2hCLE1BQUwsQ0FBWWlCLFFBQVosRUFBUDtBQUNBOzs7OEJBRXNCO0FBQ3RCLGFBQU8sS0FBS2pCLE1BQUwsQ0FBWWtCLE9BQVosRUFBUDtBQUNBOzs7MEJBRVlwQixXLEVBQTJCO0FBQ3ZDLGFBQU8sS0FBS0UsTUFBTCxDQUFZbUIsS0FBWixDQUFrQnJCLFdBQWxCLENBQVA7QUFDQTs7O3VCQUVTc0IsYSxFQUE4RDtBQUN2RSxXQUFLbkIsTUFBTCxDQUFZb0IsSUFBWixHQUFtQkQsYUFBbkI7QUFDQSxhQUFPLElBQVA7QUFDQTs7O2dDQUV5RDtBQUN6RCxXQUFLbkIsTUFBTCxDQUFZcUIsUUFBWixHQUF1QkMscUJBQVNDLE9BQWhDO0FBQ0EsYUFBTyxJQUFQO0FBQ0E7Ozt5QkFFV3JCLFksRUFBa0c7QUFDN0csV0FBS0YsTUFBTCxDQUFZRSxZQUFaLEdBQTJCQSxZQUEzQjtBQUNBLGFBQU8sSUFBUDtBQUNBOzs7Z0NBRWtCc0IsTyxFQUErRjtBQUNqSCxXQUFLeEIsTUFBTCxDQUFZd0IsT0FBWixHQUFzQkEsT0FBdEI7QUFDQSxhQUFPLElBQVA7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSdWxlIGZyb20gJy4vUnVsZSc7XG5pbXBvcnQgU2V2ZXJpdHkgZnJvbSAnLi9TZXZlcml0eSc7XG5cbmltcG9ydCB7IElWYWxpZGF0YWJsZSwgVE1lc3NhZ2VGYWN0b3J5LCBUVmFsaWRhdGFibGVNZXRhZGF0YSwgVFByZWNvbmRpdGlvbiwgVFF1YWxpZmllciB9IGZyb20gJy4vdHlwZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSdWxlQXBpPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+IHtcblx0cHJvdGVjdGVkIF9fcnVsZTogUnVsZTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPjtcblx0cHJvdGVjdGVkIF9fbWV0YTogVFZhbGlkYXRhYmxlTWV0YWRhdGE8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz47XG5cblx0Y29uc3RydWN0b3IodmFsaWRhdGFibGU6IFJ1bGU8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4sIG1ldGE6IFRWYWxpZGF0YWJsZU1ldGFkYXRhPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+KSB7XG5cdFx0dGhpcy5fX3J1bGUgPSB2YWxpZGF0YWJsZTtcblx0XHR0aGlzLl9fbWV0YSA9IG1ldGE7XG5cdH1cblxuXHRwdWJsaWMgZW51bShhbGxvd2VkVmFsdWVzOiBBcnJheTxzdHJpbmd8bnVtYmVyPikge1xuXHRcdHJldHVybiB0aGlzLl9fcnVsZS5lbnVtKGFsbG93ZWRWYWx1ZXMpO1xuXHR9XG5cblx0cHVibGljIGlmKHByZWNvbmRpdGlvbjogVFByZWNvbmRpdGlvbjxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiwgZGVmaW5lOiAocnVsZTogUnVsZTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPikgPT4gdm9pZCk6IFJ1bGU8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ge1xuXHRcdHJldHVybiB0aGlzLl9fcnVsZS5pZihwcmVjb25kaXRpb24sIGRlZmluZSk7XG5cdH1cblxuXHRwdWJsaWMgbGVuZ3RoKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IFJ1bGVBcGk8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ge1xuXHRcdHJldHVybiB0aGlzLl9fcnVsZS5sZW5ndGgobWluLCBtYXgpO1xuXHR9XG5cblx0cHVibGljIGxlbmd0aE9yRW1wdHkobWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogUnVsZUFwaTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiB7XG5cdFx0cmV0dXJuIHRoaXMuX19ydWxlLmxlbmd0aE9yRW1wdHkobWluLCBtYXgpXG5cdH1cblxuXHRwdWJsaWMgbWF0Y2hlcyhyeDogUmVnRXhwKTogUnVsZUFwaTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiB7XG5cdFx0cmV0dXJuIHRoaXMuX19ydWxlLm1hdGNoZXMocngpO1xuXHR9XG5cblx0cHVibGljIG1heChudW06IG51bWJlcik6IFJ1bGVBcGk8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ge1xuXHRcdHJldHVybiB0aGlzLl9fcnVsZS5tYXgobnVtKTtcblx0fVxuXG5cdHB1YmxpYyBtYXhFeGNsdXNpdmVPZihudW06IG51bWJlcik6IFJ1bGVBcGk8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ge1xuXHRcdHJldHVybiB0aGlzLl9fcnVsZS5tYXhFeGNsdXNpdmVPZihudW0pO1xuXHR9XG5cblx0cHVibGljIG1pbihudW06IG51bWJlcik6IFJ1bGVBcGk8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ge1xuXHRcdHJldHVybiB0aGlzLl9fcnVsZS5taW4obnVtKTtcblx0fVxuXG5cdHB1YmxpYyBtaW5FeGNsdXNpdmVPZihudW06IG51bWJlcik6IFJ1bGVBcGk8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ge1xuXHRcdHJldHVybiB0aGlzLl9fcnVsZS5taW5FeGNsdXNpdmVPZihudW0pO1xuXHR9XG5cblx0cHVibGljIG11c3QocXVhbGlmaWVyOiBUUXVhbGlmaWVyPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+KTogUnVsZUFwaTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiB7XG5cdFx0cmV0dXJuIHRoaXMuX19ydWxlLm11c3QocXVhbGlmaWVyKTtcblx0fVxuXG5cdHB1YmxpYyBub3ROdWxsKCk6IFJ1bGVBcGk8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ge1xuXHRcdHJldHVybiB0aGlzLl9fcnVsZS5ub3ROdWxsKCk7XG5cdH1cblxuXHRwdWJsaWMgbm90RW1wdHkoKTogUnVsZUFwaTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiB7XG5cdFx0cmV0dXJuIHRoaXMuX19ydWxlLm5vdEVtcHR5KCk7XG5cdH1cblxuXHRwdWJsaWMgY2FzY2FkZSgpOiB2b2lkIHtcblx0XHRyZXR1cm4gdGhpcy5fX3J1bGUuY2FzY2FkZSgpO1xuXHR9XG5cblx0cHVibGljIHVzaW5nKHZhbGlkYXRhYmxlOiBJVmFsaWRhdGFibGUpIHtcblx0XHRyZXR1cm4gdGhpcy5fX3J1bGUudXNpbmcodmFsaWRhdGFibGUpO1xuXHR9XG5cblx0cHVibGljIGFzKHF1YWxpZmllck5hbWU6IHN0cmluZyk6IFJ1bGVBcGk8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ge1xuXHRcdHRoaXMuX19tZXRhLm5hbWUgPSBxdWFsaWZpZXJOYW1lO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cHVibGljIGFzV2FybmluZygpOiBSdWxlQXBpPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+IHtcblx0XHR0aGlzLl9fbWV0YS5zZXZlcml0eSA9IFNldmVyaXR5Lndhcm5pbmc7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRwdWJsaWMgd2hlbihwcmVjb25kaXRpb246IFRQcmVjb25kaXRpb248VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4pOiBSdWxlQXBpPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+IHtcblx0XHR0aGlzLl9fbWV0YS5wcmVjb25kaXRpb24gPSBwcmVjb25kaXRpb247XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRwdWJsaWMgd2l0aE1lc3NhZ2UobWVzc2FnZTogVE1lc3NhZ2VGYWN0b3J5PFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+KTogUnVsZUFwaTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiB7XG5cdFx0dGhpcy5fX21ldGEubWVzc2FnZSA9IG1lc3NhZ2U7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn0iXX0=