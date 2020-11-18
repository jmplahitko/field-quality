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

    _defineProperty(this, "rule", void 0);

    _defineProperty(this, "meta", void 0);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9SdWxlQXBpLnRzIl0sIm5hbWVzIjpbIlJ1bGVBcGkiLCJ2YWxpZGF0YWJsZSIsIm1ldGEiLCJydWxlIiwiYWxsb3dlZFZhbHVlcyIsInByZWNvbmRpdGlvbiIsImRlZmluZSIsIm1pbiIsIm1heCIsImxlbmd0aCIsImxlbmd0aE9yRW1wdHkiLCJyeCIsIm1hdGNoZXMiLCJudW0iLCJtYXhFeGNsdXNpdmVPZiIsIm1pbkV4Y2x1c2l2ZU9mIiwicHJlZGljYXRlIiwibXVzdCIsIm5vdE51bGwiLCJub3RFbXB0eSIsImNhc2NhZGUiLCJ1c2luZyIsInByZWRpY2F0ZU5hbWUiLCJuYW1lIiwic2V2ZXJpdHkiLCJTZXZlcml0eSIsIndhcm5pbmciLCJtZXNzYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUlxQkEsTztBQUlwQixtQkFBWUMsV0FBWixFQUE2REMsSUFBN0QsRUFBdUg7QUFBQTs7QUFBQTs7QUFBQTs7QUFDdEgsU0FBS0MsSUFBTCxHQUFZRixXQUFaO0FBQ0EsU0FBS0MsSUFBTCxHQUFZQSxJQUFaO0FBQ0E7Ozs7MEJBRVdFLGEsRUFBcUM7QUFDaEQsYUFBTyxLQUFLRCxJQUFMLFNBQWVDLGFBQWYsQ0FBUDtBQUNBOzs7d0JBRVNDLFksRUFBMkRDLE0sRUFBZ0c7QUFDcEssYUFBTyxLQUFLSCxJQUFMLE9BQWFFLFlBQWIsRUFBMkJDLE1BQTNCLENBQVA7QUFDQTs7OzJCQUVhQyxHLEVBQWFDLEcsRUFBb0Q7QUFDOUUsYUFBTyxLQUFLTCxJQUFMLENBQVVNLE1BQVYsQ0FBaUJGLEdBQWpCLEVBQXNCQyxHQUF0QixDQUFQO0FBQ0E7OztrQ0FFb0JELEcsRUFBYUMsRyxFQUFvRDtBQUNyRixhQUFPLEtBQUtMLElBQUwsQ0FBVU8sYUFBVixDQUF3QkgsR0FBeEIsRUFBNkJDLEdBQTdCLENBQVA7QUFDQTs7OzRCQUVjRyxFLEVBQW1EO0FBQ2pFLGFBQU8sS0FBS1IsSUFBTCxDQUFVUyxPQUFWLENBQWtCRCxFQUFsQixDQUFQO0FBQ0E7Ozt3QkFFVUUsRyxFQUFvRDtBQUM5RCxhQUFPLEtBQUtWLElBQUwsQ0FBVUssR0FBVixDQUFjSyxHQUFkLENBQVA7QUFDQTs7O21DQUVxQkEsRyxFQUFvRDtBQUN6RSxhQUFPLEtBQUtWLElBQUwsQ0FBVVcsY0FBVixDQUF5QkQsR0FBekIsQ0FBUDtBQUNBOzs7d0JBRVVBLEcsRUFBb0Q7QUFDOUQsYUFBTyxLQUFLVixJQUFMLENBQVVJLEdBQVYsQ0FBY00sR0FBZCxDQUFQO0FBQ0E7OzttQ0FFcUJBLEcsRUFBb0Q7QUFDekUsYUFBTyxLQUFLVixJQUFMLENBQVVZLGNBQVYsQ0FBeUJGLEdBQXpCLENBQVA7QUFDQTs7O3lCQUVXRyxTLEVBQTRGO0FBQ3ZHLGFBQU8sS0FBS2IsSUFBTCxDQUFVYyxJQUFWLENBQWVELFNBQWYsQ0FBUDtBQUNBOzs7OEJBRXVEO0FBQ3ZELGFBQU8sS0FBS2IsSUFBTCxDQUFVZSxPQUFWLEVBQVA7QUFDQTs7OytCQUV3RDtBQUN4RCxhQUFPLEtBQUtmLElBQUwsQ0FBVWdCLFFBQVYsRUFBUDtBQUNBOzs7OEJBRXNCO0FBQ3RCLGFBQU8sS0FBS2hCLElBQUwsQ0FBVWlCLE9BQVYsRUFBUDtBQUNBOzs7MEJBRVluQixXLEVBQTJCO0FBQ3ZDLGFBQU8sS0FBS0UsSUFBTCxDQUFVa0IsS0FBVixDQUFnQnBCLFdBQWhCLENBQVA7QUFDQTs7O3VCQUVTcUIsYSxFQUE4RDtBQUN2RSxXQUFLcEIsSUFBTCxDQUFVcUIsSUFBVixHQUFpQkQsYUFBakI7QUFDQSxhQUFPLElBQVA7QUFDQTs7O2dDQUV5RDtBQUN6RCxXQUFLcEIsSUFBTCxDQUFVc0IsUUFBVixHQUFxQkMscUJBQVNDLE9BQTlCO0FBQ0EsYUFBTyxJQUFQO0FBQ0E7Ozt5QkFFV3JCLFksRUFBa0c7QUFDN0csV0FBS0gsSUFBTCxDQUFVRyxZQUFWLEdBQXlCQSxZQUF6QjtBQUNBLGFBQU8sSUFBUDtBQUNBOzs7Z0NBRWtCc0IsTyxFQUErRjtBQUNqSCxXQUFLekIsSUFBTCxDQUFVeUIsT0FBVixHQUFvQkEsT0FBcEI7QUFDQSxhQUFPLElBQVA7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSdWxlIGZyb20gJy4vUnVsZSc7XG5pbXBvcnQgU2V2ZXJpdHkgZnJvbSAnLi9TZXZlcml0eSc7XG5cbmltcG9ydCB7IElWYWxpZGF0YWJsZSwgVE1lc3NhZ2VGYWN0b3J5LCBUVmFsaWRhdGFibGVNZXRhZGF0YSwgVFByZWNvbmRpdGlvbiwgVFByZWRpY2F0ZSB9IGZyb20gJy4vdHlwZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSdWxlQXBpPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+IHtcblx0cHJvdGVjdGVkIHJ1bGU6IFJ1bGU8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz47XG5cdHByb3RlY3RlZCBtZXRhOiBUVmFsaWRhdGFibGVNZXRhZGF0YTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPjtcblxuXHRjb25zdHJ1Y3Rvcih2YWxpZGF0YWJsZTogUnVsZTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiwgbWV0YTogVFZhbGlkYXRhYmxlTWV0YWRhdGE8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4pIHtcblx0XHR0aGlzLnJ1bGUgPSB2YWxpZGF0YWJsZTtcblx0XHR0aGlzLm1ldGEgPSBtZXRhO1xuXHR9XG5cblx0cHVibGljIGVudW0oYWxsb3dlZFZhbHVlczogQXJyYXk8c3RyaW5nfG51bWJlcj4pIHtcblx0XHRyZXR1cm4gdGhpcy5ydWxlLmVudW0oYWxsb3dlZFZhbHVlcyk7XG5cdH1cblxuXHRwdWJsaWMgaWYocHJlY29uZGl0aW9uOiBUUHJlY29uZGl0aW9uPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+LCBkZWZpbmU6IChydWxlOiBSdWxlPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+KSA9PiB2b2lkKTogUnVsZTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiB7XG5cdFx0cmV0dXJuIHRoaXMucnVsZS5pZihwcmVjb25kaXRpb24sIGRlZmluZSk7XG5cdH1cblxuXHRwdWJsaWMgbGVuZ3RoKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IFJ1bGVBcGk8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ge1xuXHRcdHJldHVybiB0aGlzLnJ1bGUubGVuZ3RoKG1pbiwgbWF4KTtcblx0fVxuXG5cdHB1YmxpYyBsZW5ndGhPckVtcHR5KG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IFJ1bGVBcGk8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ge1xuXHRcdHJldHVybiB0aGlzLnJ1bGUubGVuZ3RoT3JFbXB0eShtaW4sIG1heClcblx0fVxuXG5cdHB1YmxpYyBtYXRjaGVzKHJ4OiBSZWdFeHApOiBSdWxlQXBpPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+IHtcblx0XHRyZXR1cm4gdGhpcy5ydWxlLm1hdGNoZXMocngpO1xuXHR9XG5cblx0cHVibGljIG1heChudW06IG51bWJlcik6IFJ1bGVBcGk8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ge1xuXHRcdHJldHVybiB0aGlzLnJ1bGUubWF4KG51bSk7XG5cdH1cblxuXHRwdWJsaWMgbWF4RXhjbHVzaXZlT2YobnVtOiBudW1iZXIpOiBSdWxlQXBpPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+IHtcblx0XHRyZXR1cm4gdGhpcy5ydWxlLm1heEV4Y2x1c2l2ZU9mKG51bSk7XG5cdH1cblxuXHRwdWJsaWMgbWluKG51bTogbnVtYmVyKTogUnVsZUFwaTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiB7XG5cdFx0cmV0dXJuIHRoaXMucnVsZS5taW4obnVtKTtcblx0fVxuXG5cdHB1YmxpYyBtaW5FeGNsdXNpdmVPZihudW06IG51bWJlcik6IFJ1bGVBcGk8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ge1xuXHRcdHJldHVybiB0aGlzLnJ1bGUubWluRXhjbHVzaXZlT2YobnVtKTtcblx0fVxuXG5cdHB1YmxpYyBtdXN0KHByZWRpY2F0ZTogVFByZWRpY2F0ZTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPik6IFJ1bGVBcGk8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ge1xuXHRcdHJldHVybiB0aGlzLnJ1bGUubXVzdChwcmVkaWNhdGUpO1xuXHR9XG5cblx0cHVibGljIG5vdE51bGwoKTogUnVsZUFwaTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiB7XG5cdFx0cmV0dXJuIHRoaXMucnVsZS5ub3ROdWxsKCk7XG5cdH1cblxuXHRwdWJsaWMgbm90RW1wdHkoKTogUnVsZUFwaTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiB7XG5cdFx0cmV0dXJuIHRoaXMucnVsZS5ub3RFbXB0eSgpO1xuXHR9XG5cblx0cHVibGljIGNhc2NhZGUoKTogdm9pZCB7XG5cdFx0cmV0dXJuIHRoaXMucnVsZS5jYXNjYWRlKCk7XG5cdH1cblxuXHRwdWJsaWMgdXNpbmcodmFsaWRhdGFibGU6IElWYWxpZGF0YWJsZSkge1xuXHRcdHJldHVybiB0aGlzLnJ1bGUudXNpbmcodmFsaWRhdGFibGUpO1xuXHR9XG5cblx0cHVibGljIGFzKHByZWRpY2F0ZU5hbWU6IHN0cmluZyk6IFJ1bGVBcGk8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ge1xuXHRcdHRoaXMubWV0YS5uYW1lID0gcHJlZGljYXRlTmFtZTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHB1YmxpYyBhc1dhcm5pbmcoKTogUnVsZUFwaTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiB7XG5cdFx0dGhpcy5tZXRhLnNldmVyaXR5ID0gU2V2ZXJpdHkud2FybmluZztcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHB1YmxpYyB3aGVuKHByZWNvbmRpdGlvbjogVFByZWNvbmRpdGlvbjxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPik6IFJ1bGVBcGk8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ge1xuXHRcdHRoaXMubWV0YS5wcmVjb25kaXRpb24gPSBwcmVjb25kaXRpb247XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRwdWJsaWMgd2l0aE1lc3NhZ2UobWVzc2FnZTogVE1lc3NhZ2VGYWN0b3J5PFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+KTogUnVsZUFwaTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiB7XG5cdFx0dGhpcy5tZXRhLm1lc3NhZ2UgPSBtZXNzYWdlO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG59Il19