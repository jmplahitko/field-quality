"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _CollectionRule = _interopRequireDefault(require("./CollectionRule"));

var _Rule = _interopRequireDefault(require("./Rule"));

var _ValidationResultList = _interopRequireDefault(require("./ValidationResultList"));

var _getProperty = _interopRequireDefault(require("./utils/getProperty"));

var _normalizeValidateArgs = _interopRequireDefault(require("./utils/normalizeValidateArgs"));

var _getMemberPath = _interopRequireDefault(require("./utils/getMemberPath"));

var _quality = require("./utils/quality");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Validator = /*#__PURE__*/function () {
  function Validator() {
    _classCallCheck(this, Validator);

    _defineProperty(this, "_rules", {});
  }

  _createClass(Validator, [{
    key: "propertyName",
    get: function get() {
      return this._propertyName;
    },
    set: function set(propertyName) {
      this._propertyName = propertyName;
    }
  }, {
    key: "ruleFor",
    value: function ruleFor(selector) {
      var propertyName = (0, _getMemberPath["default"])(selector);
      var rule = new _Rule["default"](propertyName);

      if (!this._rules[propertyName]) {
        this._rules[propertyName] = [rule];
      } else {
        this._rules[propertyName].push(rule);
      }

      return rule;
    }
  }, {
    key: "ruleForEach",
    value: function ruleForEach(selector) {
      var propertyName = (0, _getMemberPath["default"])(selector);
      var rule = new _CollectionRule["default"](propertyName);

      if (!this._rules[propertyName]) {
        this._rules[propertyName] = [rule];
      } else {
        this._rules[propertyName].push(rule);
      }

      return rule;
    }
  }, {
    key: "hasRuleFor",
    value: function hasRuleFor(propertyName) {
      var _this$_rules$property;

      var rules = (_this$_rules$property = this._rules[propertyName]) === null || _this$_rules$property === void 0 ? void 0 : _this$_rules$property.find(function (x) {
        return !x.isEmpty;
      });
      return !(0, _quality.isEmpty)(rules);
    }
  }, {
    key: "validateProperty",
    value: function validateProperty(propertyName, parentValue, customOptions) {
      var value = (0, _getProperty["default"])(parentValue, propertyName);
      var rules = this._rules[propertyName];
      var resultList = new _ValidationResultList["default"]([], propertyName, value);

      var _iterator = _createForOfIteratorHelper(rules),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var rule = _step.value;

          var _results = rule.validate(value, parentValue, customOptions);

          resultList = resultList.merge(_results);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return resultList;
    }
    /**
     * The overload is used internally in order to allow for Validator and Rule instances to be grouped together in
     * a TValidatorCollection. Note that if used externally, parentValue will be ignored and the third argument supplied
     * will be used as customOptions.
     */

  }, {
    key: "validate",
    value: function validate(value, customOptions) {
      var _this = this;

      var _normalizeValidateArg = (0, _normalizeValidateArgs["default"])(value, arguments[1], arguments[2]),
          _normalizeValidateArg2 = _slicedToArray(_normalizeValidateArg, 3),
          _value = _normalizeValidateArg2[0],
          _parentValue = _normalizeValidateArg2[1],
          _customOptions = _normalizeValidateArg2[2];

      var resultList = new _ValidationResultList["default"]([], this.propertyName || '', _value);

      for (var propertyName in this._rules) {
        var results = this.validateProperty(propertyName, _parentValue, _customOptions);
        resultList = resultList.merge(results);
      }

      if (this.propertyName) {
        resultList.propertyName = this.propertyName;
        resultList.forEach(function (result) {
          return result.propertyName = "".concat(_this.propertyName, ".").concat(result.propertyName);
        });
      }

      return resultList;
    }
  }]);

  return Validator;
}();

exports["default"] = Validator;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9WYWxpZGF0b3IudHMiXSwibmFtZXMiOlsiVmFsaWRhdG9yIiwiX3Byb3BlcnR5TmFtZSIsInByb3BlcnR5TmFtZSIsInNlbGVjdG9yIiwicnVsZSIsIlJ1bGUiLCJfcnVsZXMiLCJwdXNoIiwiQ29sbGVjdGlvblJ1bGUiLCJydWxlcyIsImZpbmQiLCJ4IiwiaXNFbXB0eSIsInBhcmVudFZhbHVlIiwiY3VzdG9tT3B0aW9ucyIsInZhbHVlIiwicmVzdWx0TGlzdCIsIlZhbGlkYXRpb25SZXN1bHRMaXN0IiwiX3Jlc3VsdHMiLCJ2YWxpZGF0ZSIsIm1lcmdlIiwiYXJndW1lbnRzIiwiX3ZhbHVlIiwiX3BhcmVudFZhbHVlIiwiX2N1c3RvbU9wdGlvbnMiLCJyZXN1bHRzIiwidmFsaWRhdGVQcm9wZXJ0eSIsImZvckVhY2giLCJyZXN1bHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFHQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLFM7Ozs7b0NBRTRDLEU7Ozs7O1NBRWhFLGVBQTBCO0FBQ3pCLGFBQU8sS0FBS0MsYUFBWjtBQUNBLEs7U0FFRCxhQUF3QkMsWUFBeEIsRUFBMEQ7QUFDekQsV0FBS0QsYUFBTCxHQUFxQkMsWUFBckI7QUFDQTs7O1dBRUQsaUJBQWtCQyxRQUFsQixFQUF5RjtBQUN4RixVQUFNRCxZQUFZLEdBQUcsK0JBQTRCQyxRQUE1QixDQUFyQjtBQUNBLFVBQUlDLElBQUksR0FBRyxJQUFJQyxnQkFBSixDQUF1Q0gsWUFBdkMsQ0FBWDs7QUFFQSxVQUFJLENBQUMsS0FBS0ksTUFBTCxDQUFZSixZQUFaLENBQUwsRUFBZ0M7QUFDL0IsYUFBS0ksTUFBTCxDQUFZSixZQUFaLElBQTRCLENBQUNFLElBQUQsQ0FBNUI7QUFDQSxPQUZELE1BRU87QUFDTixhQUFLRSxNQUFMLENBQVlKLFlBQVosRUFBMEJLLElBQTFCLENBQStCSCxJQUEvQjtBQUNBOztBQUVE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b25SdWxlIGZyb20gJy4vQ29sbGVjdGlvblJ1bGUnO1xuaW1wb3J0IFJ1bGUgZnJvbSAnLi9SdWxlJztcbmltcG9ydCBWYWxpZGF0aW9uUmVzdWx0TGlzdCBmcm9tICcuL1ZhbGlkYXRpb25SZXN1bHRMaXN0JztcbmltcG9ydCB7IElWYWxpZGF0YWJsZSwgVFJ1bGVDb2xsZWN0aW9uLCBUU2VsZWN0b3IgfSBmcm9tICcuL3R5cGVzJztcblxuaW1wb3J0IGdldFByb3BlcnR5IGZyb20gJy4vdXRpbHMvZ2V0UHJvcGVydHknO1xuaW1wb3J0IG5vcm1hbGl6ZVZhbGlkYXRlQXJncyBmcm9tICcuL3V0aWxzL25vcm1hbGl6ZVZhbGlkYXRlQXJncyc7XG5pbXBvcnQgZ2V0TWVtYmVyUGF0aCBmcm9tICcuL3V0aWxzL2dldE1lbWJlclBhdGgnO1xuaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gJy4vdXRpbHMvcXVhbGl0eSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZhbGlkYXRvcjxUUGFyZW50VmFsdWUgPSBhbnksIFRDdXN0b21PcHRpb25zID0gYW55PiBpbXBsZW1lbnRzIElWYWxpZGF0YWJsZTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiB7XG5cdHByaXZhdGUgX3Byb3BlcnR5TmFtZSE6IHN0cmluZyB8IHVuZGVmaW5lZDtcblx0cHJpdmF0ZSBfcnVsZXM6IFRSdWxlQ29sbGVjdGlvbjxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiA9IHt9O1xuXG5cdHB1YmxpYyBnZXQgcHJvcGVydHlOYW1lKCkge1xuXHRcdHJldHVybiB0aGlzLl9wcm9wZXJ0eU5hbWU7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHByb3BlcnR5TmFtZShwcm9wZXJ0eU5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZCkge1xuXHRcdHRoaXMuX3Byb3BlcnR5TmFtZSA9IHByb3BlcnR5TmFtZTtcblx0fVxuXG5cdHByb3RlY3RlZCBydWxlRm9yKHNlbGVjdG9yOiBUU2VsZWN0b3I8VFBhcmVudFZhbHVlPik6IFJ1bGU8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ge1xuXHRcdGNvbnN0IHByb3BlcnR5TmFtZSA9IGdldE1lbWJlclBhdGg8VFBhcmVudFZhbHVlPihzZWxlY3Rvcik7XG5cdFx0bGV0IHJ1bGUgPSBuZXcgUnVsZTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPihwcm9wZXJ0eU5hbWUpO1xuXG5cdFx0aWYgKCF0aGlzLl9ydWxlc1twcm9wZXJ0eU5hbWVdKSB7XG5cdFx0XHR0aGlzLl9ydWxlc1twcm9wZXJ0eU5hbWVdID0gW3J1bGVdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9ydWxlc1twcm9wZXJ0eU5hbWVdLnB1c2gocnVsZSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJ1bGU7XG5cdH1cblxuXHRwcm90ZWN0ZWQgcnVsZUZvckVhY2goc2VsZWN0b3I6IFRTZWxlY3RvcjxUUGFyZW50VmFsdWU+KTogQ29sbGVjdGlvblJ1bGU8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ge1xuXHRcdGNvbnN0IHByb3BlcnR5TmFtZSA9IGdldE1lbWJlclBhdGg8VFBhcmVudFZhbHVlPihzZWxlY3Rvcik7XG5cdFx0bGV0IHJ1bGUgPSBuZXcgQ29sbGVjdGlvblJ1bGU8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ocHJvcGVydHlOYW1lKTtcblxuXHRcdGlmICghdGhpcy5fcnVsZXNbcHJvcGVydHlOYW1lXSkge1xuXHRcdFx0dGhpcy5fcnVsZXNbcHJvcGVydHlOYW1lXSA9IFtydWxlXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fcnVsZXNbcHJvcGVydHlOYW1lXS5wdXNoKHJ1bGUpO1xuXHRcdH1cblxuXHRcdHJldHVybiBydWxlO1xuXHR9XG5cblx0cHVibGljIGhhc1J1bGVGb3IocHJvcGVydHlOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcblx0XHRjb25zdCBydWxlcyA9IHRoaXMuX3J1bGVzW3Byb3BlcnR5TmFtZV0/LmZpbmQoeCA9PiAheC5pc0VtcHR5KTtcblxuXHRcdHJldHVybiAhaXNFbXB0eShydWxlcyk7XG5cdH1cblxuXHRwdWJsaWMgdmFsaWRhdGVQcm9wZXJ0eShwcm9wZXJ0eU5hbWU6IHN0cmluZywgcGFyZW50VmFsdWU6IFRQYXJlbnRWYWx1ZSwgY3VzdG9tT3B0aW9ucz86IFRDdXN0b21PcHRpb25zKTogVmFsaWRhdGlvblJlc3VsdExpc3Qge1xuXHRcdGNvbnN0IHZhbHVlID0gZ2V0UHJvcGVydHkocGFyZW50VmFsdWUsIHByb3BlcnR5TmFtZSk7XG5cdFx0Y29uc3QgcnVsZXMgPSB0aGlzLl9ydWxlc1twcm9wZXJ0eU5hbWVdO1xuXHRcdGxldCByZXN1bHRMaXN0ID0gbmV3IFZhbGlkYXRpb25SZXN1bHRMaXN0KFtdLCBwcm9wZXJ0eU5hbWUsIHZhbHVlKTtcblxuXHRcdGZvciAobGV0IHJ1bGUgb2YgcnVsZXMpIHtcblx0XHRcdGxldCBfcmVzdWx0cyA9IHJ1bGUudmFsaWRhdGUodmFsdWUsIHBhcmVudFZhbHVlLCBjdXN0b21PcHRpb25zKTtcblx0XHRcdHJlc3VsdExpc3QgPSByZXN1bHRMaXN0Lm1lcmdlKF9yZXN1bHRzKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0TGlzdDtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgb3ZlcmxvYWQgaXMgdXNlZCBpbnRlcm5hbGx5IGluIG9yZGVyIHRvIGFsbG93IGZvciBWYWxpZGF0b3IgYW5kIFJ1bGUgaW5zdGFuY2VzIHRvIGJlIGdyb3VwZWQgdG9nZXRoZXIgaW5cblx0ICogYSBUVmFsaWRhdG9yQ29sbGVjdGlvbi4gTm90ZSB0aGF0IGlmIHVzZWQgZXh0ZXJuYWxseSwgcGFyZW50VmFsdWUgd2lsbCBiZSBpZ25vcmVkIGFuZCB0aGUgdGhpcmQgYXJndW1lbnQgc3VwcGxpZWRcblx0ICogd2lsbCBiZSB1c2VkIGFzIGN1c3RvbU9wdGlvbnMuXG5cdCAqL1xuXHRwdWJsaWMgdmFsaWRhdGUodmFsdWU6IGFueSwgcGFyZW50VmFsdWU/OiBUUGFyZW50VmFsdWUgfCBUQ3VzdG9tT3B0aW9ucywgY3VzdG9tT3B0aW9ucz86IFRDdXN0b21PcHRpb25zKTogVmFsaWRhdGlvblJlc3VsdExpc3Q7XG5cdHB1YmxpYyB2YWxpZGF0ZSh2YWx1ZTogYW55LCBjdXN0b21PcHRpb25zPzogVEN1c3RvbU9wdGlvbnMpOiBWYWxpZGF0aW9uUmVzdWx0TGlzdCB7XG5cdFx0bGV0IFtfdmFsdWUsIF9wYXJlbnRWYWx1ZSwgX2N1c3RvbU9wdGlvbnNdID0gbm9ybWFsaXplVmFsaWRhdGVBcmdzPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+KHZhbHVlLCBhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSk7XG5cblx0XHRsZXQgcmVzdWx0TGlzdCA9IG5ldyBWYWxpZGF0aW9uUmVzdWx0TGlzdChbXSwgdGhpcy5wcm9wZXJ0eU5hbWUgfHwgJycsIF92YWx1ZSk7XG5cblx0XHRmb3IgKGxldCBwcm9wZXJ0eU5hbWUgaW4gdGhpcy5fcnVsZXMpIHtcblx0XHRcdGxldCByZXN1bHRzID0gdGhpcy52YWxpZGF0ZVByb3BlcnR5KHByb3BlcnR5TmFtZSwgX3BhcmVudFZhbHVlLCBfY3VzdG9tT3B0aW9ucyk7XG5cdFx0XHRyZXN1bHRMaXN0ID0gcmVzdWx0TGlzdC5tZXJnZShyZXN1bHRzKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5wcm9wZXJ0eU5hbWUpIHtcblx0XHRcdHJlc3VsdExpc3QucHJvcGVydHlOYW1lID0gdGhpcy5wcm9wZXJ0eU5hbWU7XG5cdFx0XHRyZXN1bHRMaXN0LmZvckVhY2gocmVzdWx0ID0+IHJlc3VsdC5wcm9wZXJ0eU5hbWUgPSBgJHt0aGlzLnByb3BlcnR5TmFtZX0uJHtyZXN1bHQucHJvcGVydHlOYW1lfWApO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHRMaXN0O1xuXHR9XG59Il19