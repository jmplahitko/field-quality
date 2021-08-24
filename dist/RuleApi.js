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

var RuleApi = /*#__PURE__*/function () {
  function RuleApi(validatable, meta) {
    _classCallCheck(this, RuleApi);

    this.rule = validatable;
    this.meta = meta;
  }

  _createClass(RuleApi, [{
    key: "enum",
    value: function _enum(allowedValues) {
      return this.rule["enum"](allowedValues);
    }
  }, {
    key: "if",
    value: function _if(precondition, define) {
      return this.rule["if"](precondition, define);
    }
  }, {
    key: "length",
    value: function length(min, max) {
      return this.rule.length(min, max);
    }
  }, {
    key: "lengthOrEmpty",
    value: function lengthOrEmpty(min, max) {
      return this.rule.lengthOrEmpty(min, max);
    }
  }, {
    key: "matches",
    value: function matches(rx) {
      return this.rule.matches(rx);
    }
  }, {
    key: "max",
    value: function max(num) {
      return this.rule.max(num);
    }
  }, {
    key: "maxExclusiveOf",
    value: function maxExclusiveOf(num) {
      return this.rule.maxExclusiveOf(num);
    }
  }, {
    key: "min",
    value: function min(num) {
      return this.rule.min(num);
    }
  }, {
    key: "minExclusiveOf",
    value: function minExclusiveOf(num) {
      return this.rule.minExclusiveOf(num);
    }
  }, {
    key: "must",
    value: function must(predicate) {
      return this.rule.must(predicate);
    }
  }, {
    key: "notNull",
    value: function notNull() {
      return this.rule.notNull();
    }
  }, {
    key: "notEmpty",
    value: function notEmpty() {
      return this.rule.notEmpty();
    }
  }, {
    key: "cascade",
    value: function cascade() {
      return this.rule.cascade();
    }
  }, {
    key: "using",
    value: function using(validatable) {
      return this.rule.using(validatable);
    }
  }, {
    key: "as",
    value: function as(predicateName) {
      this.meta.name = predicateName;
      return this;
    }
  }, {
    key: "asWarning",
    value: function asWarning() {
      this.meta.severity = _Severity["default"].warning;
      return this;
    }
  }, {
    key: "when",
    value: function when(precondition) {
      this.meta.precondition = precondition;
      return this;
    }
  }, {
    key: "withMessage",
    value: function withMessage(message) {
      this.meta.message = message;
      return this;
    }
  }]);

  return RuleApi;
}();

exports["default"] = RuleApi;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9SdWxlQXBpLnRzIl0sIm5hbWVzIjpbIlJ1bGVBcGkiLCJ2YWxpZGF0YWJsZSIsIm1ldGEiLCJydWxlIiwiYWxsb3dlZFZhbHVlcyIsInByZWNvbmRpdGlvbiIsImRlZmluZSIsIm1pbiIsIm1heCIsImxlbmd0aCIsImxlbmd0aE9yRW1wdHkiLCJyeCIsIm1hdGNoZXMiLCJudW0iLCJtYXhFeGNsdXNpdmVPZiIsIm1pbkV4Y2x1c2l2ZU9mIiwicHJlZGljYXRlIiwibXVzdCIsIm5vdE51bGwiLCJub3RFbXB0eSIsImNhc2NhZGUiLCJ1c2luZyIsInByZWRpY2F0ZU5hbWUiLCJuYW1lIiwic2V2ZXJpdHkiLCJTZXZlcml0eSIsIndhcm5pbmciLCJtZXNzYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7SUFJcUJBLE87QUFJcEIsbUJBQVlDLFdBQVosRUFBNkRDLElBQTdELEVBQXVIO0FBQUE7O0FBQ3RILFNBQUtDLElBQUwsR0FBWUYsV0FBWjtBQUNBLFNBQUtDLElBQUwsR0FBWUEsSUFBWjtBQUNBOzs7O1dBRUQsZUFBWUUsYUFBWixFQUFpRDtBQUNoRCxhQUFPLEtBQUtELElBQUwsU0FBZUMsYUFBZixDQUFQO0FBQ0E7OztXQUVELGFBQVVDLFlBQVYsRUFBcUVDLE1BQXJFLEVBQXFLO0FBQ3BLLGFBQU8sS0FBS0gsSUFBTCxPQUFhRSxZQUFiLEVBQTJCQyxNQUEzQixDQUFQO0FBQ0E7OztXQUVELGdCQUFjQyxHQUFkLEVBQTJCQyxHQUEzQixFQUErRTtBQUM5RSxhQUFPLEtBQUtMLElBQUwsQ0FBVU0sTUFBVixDQUFpQkYsR0FBakIsRUFBc0JDLEdBQXRCLENBQVA7QUFDQTs7O1dBRUQsdUJBQXFCRCxHQUFyQixFQUFrQ0MsR0FBbEMsRUFBc0Y7QUFDckYsYUFBTyxLQUFLTCxJQUFMLENBQVVPLGFBQVYsQ0FBd0JILEdBQXhCLEVBQTZCQyxHQUE3QixDQUFQO0FBQ0E7OztXQUVELGlCQUFlRyxFQUFmLEVBQWtFO0FBQ2pFLGFBQU8sS0FBS1IsSUFBTCxDQUFVUyxPQUFWLENBQWtCRCxFQUFsQixDQUFQO0FBQ0E7OztXQUVELGFBQVdFLEdBQVgsRUFBK0Q7QUFDOUQsYUFBTyxLQUFLVixJQUFMLENBQVVLLEdBQVYsQ0FBY0ssR0FBZCxDQUFQO0FBQ0E7OztXQUVELHdCQUFzQkEsR0FBdEIsRUFBMEU7QUFDekUsYUFBTyxLQUFLVixJQUFMLENBQVVXLGNBQVYsQ0FBeUJELEdBQXpCLENBQVA7QUFDQTs7O1dBRUQsYUFBV0EsR0FBWCxFQUErRDtBQUM5RCxhQUFPLEtBQUtWLElBQUwsQ0FBVUksR0FBVixDQUFjTSxHQUFkLENBQVA7QUFDQTs7O1dBRUQsd0JBQXNCQSxHQUF0QixFQUEwRTtBQUN6RSxhQUFPLEtBQUtWLElBQUwsQ0FBVVksY0FBVixDQUF5QkYsR0FBekIsQ0FBUDtBQUNBOzs7V0FFRCxjQUFZRyxTQUFaLEVBQXdHO0FBQ3ZHLGFBQU8sS0FBS2IsSUFBTCxDQUFVYyxJQUFWLENBQWVELFNBQWYsQ0FBUDtBQUNBOzs7V0FFRCxtQkFBd0Q7QUFDdkQsYUFBTyxLQUFLYixJQUFMLENBQVVlLE9BQVYsRUFBUDtBQUNBOzs7V0FFRCxvQkFBeUQ7QUFDeEQsYUFBTyxLQUFLZixJQUFMLENBQVVnQixRQUFWLEVBQVA7QUFDQTs7O1dBRUQsbUJBQXVCO0FBQ3RCLGFBQU8sS0FBS2hCLElBQUwsQ0FBVWlCLE9BQVYsRUFBUDtBQUNBOzs7V0FFRCxlQUFhbkIsV0FBYixFQUF3QztBQUN2QyxhQUFPLEtBQUtFLElBQUwsQ0FBVWtCLEtBQVYsQ0FBZ0JwQixXQUFoQixDQUFQO0FBQ0E7OztXQUVELFlBQVVxQixhQUFWLEVBQXdFO0FBQ3ZFLFdBQUtwQixJQUFMLENBQVVxQixJQUFWLEdBQWlCRCxhQUFqQjtBQUNBLGFBQU8sSUFBUDtBQUNBOzs7V0FFRCxxQkFBMEQ7QUFDekQsV0FBS3BCLElBQUwsQ0FBVXNCLFFBQVYsR0FBcUJDLHFCQUFTQyxPQUE5QjtBQUNBLGFBQU8sSUFBUDtBQUNBOzs7V0FFRCxjQUFZckIsWUFBWixFQUE4RztBQUM3RyxXQUFLSCxJQUFMLENBQVVHLFlBQVYsR0FBeUJBLFlBQXpCO0FBQ0EsYUFBTyxJQUFQO0FBQ0E7OztXQUVELHFCQUFtQnNCLE9BQW5CLEVBQWtIO0FBQ2pILFdBQUt6QixJQUFMLENBQVV5QixPQUFWLEdBQW9CQSxPQUFwQjtBQUNBLGFBQU8sSUFBUDtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJ1bGUgZnJvbSAnLi9SdWxlJztcbmltcG9ydCBTZXZlcml0eSBmcm9tICcuL1NldmVyaXR5JztcblxuaW1wb3J0IHsgSVZhbGlkYXRhYmxlLCBUTWVzc2FnZUZhY3RvcnksIFRWYWxpZGF0YWJsZU1ldGFkYXRhLCBUUHJlY29uZGl0aW9uLCBUUHJlZGljYXRlIH0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJ1bGVBcGk8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ge1xuXHRwcm90ZWN0ZWQgcnVsZTogUnVsZTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPjtcblx0cHJvdGVjdGVkIG1ldGE6IFRWYWxpZGF0YWJsZU1ldGFkYXRhPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+O1xuXG5cdGNvbnN0cnVjdG9yKHZhbGlkYXRhYmxlOiBSdWxlPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+LCBtZXRhOiBUVmFsaWRhdGFibGVNZXRhZGF0YTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPikge1xuXHRcdHRoaXMucnVsZSA9IHZhbGlkYXRhYmxlO1xuXHRcdHRoaXMubWV0YSA9IG1ldGE7XG5cdH1cblxuXHRwdWJsaWMgZW51bShhbGxvd2VkVmFsdWVzOiBBcnJheTxzdHJpbmd8bnVtYmVyPikge1xuXHRcdHJldHVybiB0aGlzLnJ1bGUuZW51bShhbGxvd2VkVmFsdWVzKTtcblx0fVxuXG5cdHB1YmxpYyBpZihwcmVjb25kaXRpb246IFRQcmVjb25kaXRpb248VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4sIGRlZmluZTogKHJ1bGU6IFJ1bGU8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4pID0+IHZvaWQpOiBSdWxlPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+IHtcblx0XHRyZXR1cm4gdGhpcy5ydWxlLmlmKHByZWNvbmRpdGlvbiwgZGVmaW5lKTtcblx0fVxuXG5cdHB1YmxpYyBsZW5ndGgobWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogUnVsZUFwaTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiB7XG5cdFx0cmV0dXJuIHRoaXMucnVsZS5sZW5ndGgobWluLCBtYXgpO1xuXHR9XG5cblx0cHVibGljIGxlbmd0aE9yRW1wdHkobWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogUnVsZUFwaTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiB7XG5cdFx0cmV0dXJuIHRoaXMucnVsZS5sZW5ndGhPckVtcHR5KG1pbiwgbWF4KVxuXHR9XG5cblx0cHVibGljIG1hdGNoZXMocng6IFJlZ0V4cCk6IFJ1bGVBcGk8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ge1xuXHRcdHJldHVybiB0aGlzLnJ1bGUubWF0Y2hlcyhyeCk7XG5cdH1cblxuXHRwdWJsaWMgbWF4KG51bTogbnVtYmVyKTogUnVsZUFwaTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiB7XG5cdFx0cmV0dXJuIHRoaXMucnVsZS5tYXgobnVtKTtcblx0fVxuXG5cdHB1YmxpYyBtYXhFeGNsdXNpdmVPZihudW06IG51bWJlcik6IFJ1bGVBcGk8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ge1xuXHRcdHJldHVybiB0aGlzLnJ1bGUubWF4RXhjbHVzaXZlT2YobnVtKTtcblx0fVxuXG5cdHB1YmxpYyBtaW4obnVtOiBudW1iZXIpOiBSdWxlQXBpPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+IHtcblx0XHRyZXR1cm4gdGhpcy5ydWxlLm1pbihudW0pO1xuXHR9XG5cblx0cHVibGljIG1pbkV4Y2x1c2l2ZU9mKG51bTogbnVtYmVyKTogUnVsZUFwaTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiB7XG5cdFx0cmV0dXJuIHRoaXMucnVsZS5taW5FeGNsdXNpdmVPZihudW0pO1xuXHR9XG5cblx0cHVibGljIG11c3QocHJlZGljYXRlOiBUUHJlZGljYXRlPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+KTogUnVsZUFwaTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiB7XG5cdFx0cmV0dXJuIHRoaXMucnVsZS5tdXN0KHByZWRpY2F0ZSk7XG5cdH1cblxuXHRwdWJsaWMgbm90TnVsbCgpOiBSdWxlQXBpPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+IHtcblx0XHRyZXR1cm4gdGhpcy5ydWxlLm5vdE51bGwoKTtcblx0fVxuXG5cdHB1YmxpYyBub3RFbXB0eSgpOiBSdWxlQXBpPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+IHtcblx0XHRyZXR1cm4gdGhpcy5ydWxlLm5vdEVtcHR5KCk7XG5cdH1cblxuXHRwdWJsaWMgY2FzY2FkZSgpOiB2b2lkIHtcblx0XHRyZXR1cm4gdGhpcy5ydWxlLmNhc2NhZGUoKTtcblx0fVxuXG5cdHB1YmxpYyB1c2luZyh2YWxpZGF0YWJsZTogSVZhbGlkYXRhYmxlKSB7XG5cdFx0cmV0dXJuIHRoaXMucnVsZS51c2luZyh2YWxpZGF0YWJsZSk7XG5cdH1cblxuXHRwdWJsaWMgYXMocHJlZGljYXRlTmFtZTogc3RyaW5nKTogUnVsZUFwaTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiB7XG5cdFx0dGhpcy5tZXRhLm5hbWUgPSBwcmVkaWNhdGVOYW1lO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cHVibGljIGFzV2FybmluZygpOiBSdWxlQXBpPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+IHtcblx0XHR0aGlzLm1ldGEuc2V2ZXJpdHkgPSBTZXZlcml0eS53YXJuaW5nO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cHVibGljIHdoZW4ocHJlY29uZGl0aW9uOiBUUHJlY29uZGl0aW9uPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+KTogUnVsZUFwaTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiB7XG5cdFx0dGhpcy5tZXRhLnByZWNvbmRpdGlvbiA9IHByZWNvbmRpdGlvbjtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHB1YmxpYyB3aXRoTWVzc2FnZShtZXNzYWdlOiBUTWVzc2FnZUZhY3Rvcnk8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4pOiBSdWxlQXBpPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+IHtcblx0XHR0aGlzLm1ldGEubWVzc2FnZSA9IG1lc3NhZ2U7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn0iXX0=