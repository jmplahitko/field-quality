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
    key: "stopOnFirstFailure",
    value: function stopOnFirstFailure() {
      return this.__rule.stopOnFirstFailure();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9SdWxlQXBpLnRzIl0sIm5hbWVzIjpbIlJ1bGVBcGkiLCJ2YWxpZGF0YWJsZSIsIm1ldGEiLCJfX3J1bGUiLCJfX21ldGEiLCJhbGxvd2VkVmFsdWVzIiwibWluIiwibWF4IiwibGVuZ3RoIiwibGVuZ3RoT3JFbXB0eSIsInJ4IiwibWF0Y2hlcyIsIm51bSIsIm1heEV4Y2x1c2l2ZU9mIiwibWluRXhjbHVzaXZlT2YiLCJxdWFsaWZpZXIiLCJtdXN0Iiwibm90TnVsbCIsIm5vdEVtcHR5Iiwic3RvcE9uRmlyc3RGYWlsdXJlIiwiY2FzY2FkZSIsInVzaW5nIiwicXVhbGlmaWVyTmFtZSIsIm5hbWUiLCJzZXZlcml0eSIsIlNldmVyaXR5Iiwid2FybmluZyIsInByZWNvbmRpdGlvbiIsIm1lc3NhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBSXFCQSxPO0FBSXBCLG1CQUFZQyxXQUFaLEVBQStCQyxJQUEvQixFQUE0QztBQUFBOztBQUFBOztBQUFBOztBQUMzQyxTQUFLQyxNQUFMLEdBQWNGLFdBQWQ7QUFDQSxTQUFLRyxNQUFMLEdBQWNGLElBQWQ7QUFDQTs7OzswQkFFV0csYSxFQUFxQztBQUNoRCxhQUFPLEtBQUtGLE1BQUwsU0FBaUJFLGFBQWpCLENBQVA7QUFDQTs7OzJCQUVhQyxHLEVBQWFDLEcsRUFBc0I7QUFDaEQsYUFBTyxLQUFLSixNQUFMLENBQVlLLE1BQVosQ0FBbUJGLEdBQW5CLEVBQXdCQyxHQUF4QixDQUFQO0FBQ0E7OztrQ0FFb0JELEcsRUFBYUMsRyxFQUFzQjtBQUN2RCxhQUFPLEtBQUtKLE1BQUwsQ0FBWU0sYUFBWixDQUEwQkgsR0FBMUIsRUFBK0JDLEdBQS9CLENBQVA7QUFDQTs7OzRCQUVjRyxFLEVBQXFCO0FBQ25DLGFBQU8sS0FBS1AsTUFBTCxDQUFZUSxPQUFaLENBQW9CRCxFQUFwQixDQUFQO0FBQ0E7Ozt3QkFFVUUsRyxFQUFhO0FBQ3ZCLGFBQU8sS0FBS1QsTUFBTCxDQUFZSSxHQUFaLENBQWdCSyxHQUFoQixDQUFQO0FBQ0E7OzttQ0FFcUJBLEcsRUFBYTtBQUNsQyxhQUFPLEtBQUtULE1BQUwsQ0FBWVUsY0FBWixDQUEyQkQsR0FBM0IsQ0FBUDtBQUNBOzs7d0JBRVVBLEcsRUFBYTtBQUN2QixhQUFPLEtBQUtULE1BQUwsQ0FBWUcsR0FBWixDQUFnQk0sR0FBaEIsQ0FBUDtBQUNBOzs7bUNBRXFCQSxHLEVBQWE7QUFDbEMsYUFBTyxLQUFLVCxNQUFMLENBQVlXLGNBQVosQ0FBMkJGLEdBQTNCLENBQVA7QUFDQTs7O3lCQUVXRyxTLEVBQWdDO0FBQzNDLGFBQU8sS0FBS1osTUFBTCxDQUFZYSxJQUFaLENBQWlCRCxTQUFqQixDQUFQO0FBQ0E7Ozs4QkFFeUI7QUFDekIsYUFBTyxLQUFLWixNQUFMLENBQVljLE9BQVosRUFBUDtBQUNBOzs7K0JBRTBCO0FBQzFCLGFBQU8sS0FBS2QsTUFBTCxDQUFZZSxRQUFaLEVBQVA7QUFDQTs7O3lDQUVpQztBQUNqQyxhQUFPLEtBQUtmLE1BQUwsQ0FBWWdCLGtCQUFaLEVBQVA7QUFDQTs7OzhCQUVzQjtBQUN0QixhQUFPLEtBQUtoQixNQUFMLENBQVlpQixPQUFaLEVBQVA7QUFDQTs7OzBCQUVZbkIsVyxFQUFnQztBQUM1QyxhQUFPLEtBQUtFLE1BQUwsQ0FBWWtCLEtBQVosQ0FBa0JwQixXQUFsQixDQUFQO0FBQ0E7Ozt1QkFFU3FCLGEsRUFBdUI7QUFDaEMsV0FBS2xCLE1BQUwsQ0FBWW1CLElBQVosR0FBbUJELGFBQW5CO0FBQ0EsYUFBTyxJQUFQO0FBQ0E7OztnQ0FFa0I7QUFDbEIsV0FBS2xCLE1BQUwsQ0FBWW9CLFFBQVosR0FBdUJDLHFCQUFTQyxPQUFoQztBQUNBOzs7eUJBRVdDLFksRUFBNkI7QUFDeEMsV0FBS3ZCLE1BQUwsQ0FBWXVCLFlBQVosR0FBMkJBLFlBQTNCO0FBQ0EsYUFBTyxJQUFQO0FBQ0E7OztnQ0FFa0JDLE8sRUFBaUI7QUFDbkMsV0FBS3hCLE1BQUwsQ0FBWXdCLE9BQVosR0FBc0JBLE9BQXRCO0FBQ0EsYUFBTyxJQUFQO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUnVsZSBmcm9tICcuL1J1bGUnO1xuaW1wb3J0IFNldmVyaXR5IGZyb20gJy4vU2V2ZXJpdHknO1xuXG5pbXBvcnQgeyBJVmFsaWRhdGFibGUsIFRNZXRhLCBUUHJlY29uZGl0aW9uLCBUUXVhbGlmaWVyIH0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJ1bGVBcGkge1xuXHRwcm90ZWN0ZWQgX19ydWxlOiBSdWxlO1xuXHRwcm90ZWN0ZWQgX19tZXRhOiBUTWV0YTtcblxuXHRjb25zdHJ1Y3Rvcih2YWxpZGF0YWJsZTogUnVsZSwgbWV0YTogVE1ldGEpIHtcblx0XHR0aGlzLl9fcnVsZSA9IHZhbGlkYXRhYmxlO1xuXHRcdHRoaXMuX19tZXRhID0gbWV0YTtcblx0fVxuXG5cdHB1YmxpYyBlbnVtKGFsbG93ZWRWYWx1ZXM6IEFycmF5PHN0cmluZ3xudW1iZXI+KSB7XG5cdFx0cmV0dXJuIHRoaXMuX19ydWxlLmVudW0oYWxsb3dlZFZhbHVlcyk7XG5cdH1cblxuXHRwdWJsaWMgbGVuZ3RoKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IFJ1bGVBcGkge1xuXHRcdHJldHVybiB0aGlzLl9fcnVsZS5sZW5ndGgobWluLCBtYXgpO1xuXHR9XG5cblx0cHVibGljIGxlbmd0aE9yRW1wdHkobWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogUnVsZUFwaSB7XG5cdFx0cmV0dXJuIHRoaXMuX19ydWxlLmxlbmd0aE9yRW1wdHkobWluLCBtYXgpXG5cdH1cblxuXHRwdWJsaWMgbWF0Y2hlcyhyeDogUmVnRXhwKTogUnVsZUFwaSB7XG5cdFx0cmV0dXJuIHRoaXMuX19ydWxlLm1hdGNoZXMocngpO1xuXHR9XG5cblx0cHVibGljIG1heChudW06IG51bWJlcikge1xuXHRcdHJldHVybiB0aGlzLl9fcnVsZS5tYXgobnVtKTtcblx0fVxuXG5cdHB1YmxpYyBtYXhFeGNsdXNpdmVPZihudW06IG51bWJlcikge1xuXHRcdHJldHVybiB0aGlzLl9fcnVsZS5tYXhFeGNsdXNpdmVPZihudW0pO1xuXHR9XG5cblx0cHVibGljIG1pbihudW06IG51bWJlcikge1xuXHRcdHJldHVybiB0aGlzLl9fcnVsZS5taW4obnVtKTtcblx0fVxuXG5cdHB1YmxpYyBtaW5FeGNsdXNpdmVPZihudW06IG51bWJlcikge1xuXHRcdHJldHVybiB0aGlzLl9fcnVsZS5taW5FeGNsdXNpdmVPZihudW0pO1xuXHR9XG5cblx0cHVibGljIG11c3QocXVhbGlmaWVyOiBUUXVhbGlmaWVyKTogUnVsZUFwaSB7XG5cdFx0cmV0dXJuIHRoaXMuX19ydWxlLm11c3QocXVhbGlmaWVyKTtcblx0fVxuXG5cdHB1YmxpYyBub3ROdWxsKCk6IFJ1bGVBcGkge1xuXHRcdHJldHVybiB0aGlzLl9fcnVsZS5ub3ROdWxsKCk7XG5cdH1cblxuXHRwdWJsaWMgbm90RW1wdHkoKTogUnVsZUFwaSB7XG5cdFx0cmV0dXJuIHRoaXMuX19ydWxlLm5vdEVtcHR5KCk7XG5cdH1cblxuXHRwdWJsaWMgc3RvcE9uRmlyc3RGYWlsdXJlKCk6IHZvaWQge1xuXHRcdHJldHVybiB0aGlzLl9fcnVsZS5zdG9wT25GaXJzdEZhaWx1cmUoKTtcblx0fVxuXG5cdHB1YmxpYyBjYXNjYWRlKCk6IHZvaWQge1xuXHRcdHJldHVybiB0aGlzLl9fcnVsZS5jYXNjYWRlKCk7XG5cdH1cblxuXHRwdWJsaWMgdXNpbmcodmFsaWRhdGFibGU6IElWYWxpZGF0YWJsZSk6IGFueSB7XG5cdFx0cmV0dXJuIHRoaXMuX19ydWxlLnVzaW5nKHZhbGlkYXRhYmxlKTtcblx0fVxuXG5cdHB1YmxpYyBhcyhxdWFsaWZpZXJOYW1lOiBzdHJpbmcpIHtcblx0XHR0aGlzLl9fbWV0YS5uYW1lID0gcXVhbGlmaWVyTmFtZTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHB1YmxpYyBhc1dhcm5pbmcoKSB7XG5cdFx0dGhpcy5fX21ldGEuc2V2ZXJpdHkgPSBTZXZlcml0eS53YXJuaW5nO1xuXHR9XG5cblx0cHVibGljIHdoZW4ocHJlY29uZGl0aW9uOiBUUHJlY29uZGl0aW9uKSB7XG5cdFx0dGhpcy5fX21ldGEucHJlY29uZGl0aW9uID0gcHJlY29uZGl0aW9uO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cHVibGljIHdpdGhNZXNzYWdlKG1lc3NhZ2U6IHN0cmluZykge1xuXHRcdHRoaXMuX19tZXRhLm1lc3NhZ2UgPSBtZXNzYWdlO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG59Il19