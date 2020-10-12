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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Validator = /*#__PURE__*/function () {
  function Validator() {
    _classCallCheck(this, Validator);

    _defineProperty(this, "_propertyName", void 0);

    _defineProperty(this, "_rules", {});
  }

  _createClass(Validator, [{
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
    key: "validateProperty",
    value: function validateProperty(propertyName, parentValue, customOptions, outResultList) {
      var value = (0, _getProperty["default"])(parentValue, propertyName);
      var resultList;

      if (outResultList) {
        resultList = outResultList;
        resultList.removeWithRelatedResults(propertyName);
      } else {
        resultList = new _ValidationResultList["default"]([], propertyName, value);
      }

      var rules = this._rules[propertyName];

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
  }, {
    key: "propertyName",
    get: function get() {
      return this._propertyName;
    },
    set: function set(propertyName) {
      this._propertyName = propertyName;
    }
  }]);

  return Validator;
}();

exports["default"] = Validator;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9WYWxpZGF0b3IudHMiXSwibmFtZXMiOlsiVmFsaWRhdG9yIiwic2VsZWN0b3IiLCJwcm9wZXJ0eU5hbWUiLCJydWxlIiwiUnVsZSIsIl9ydWxlcyIsInB1c2giLCJDb2xsZWN0aW9uUnVsZSIsInBhcmVudFZhbHVlIiwiY3VzdG9tT3B0aW9ucyIsIm91dFJlc3VsdExpc3QiLCJ2YWx1ZSIsInJlc3VsdExpc3QiLCJyZW1vdmVXaXRoUmVsYXRlZFJlc3VsdHMiLCJWYWxpZGF0aW9uUmVzdWx0TGlzdCIsInJ1bGVzIiwiX3Jlc3VsdHMiLCJ2YWxpZGF0ZSIsIm1lcmdlIiwiYXJndW1lbnRzIiwiX3ZhbHVlIiwiX3BhcmVudFZhbHVlIiwiX2N1c3RvbU9wdGlvbnMiLCJyZXN1bHRzIiwidmFsaWRhdGVQcm9wZXJ0eSIsImZvckVhY2giLCJyZXN1bHQiLCJfcHJvcGVydHlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBR0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxTOzs7Ozs7b0NBRTRDLEU7Ozs7OzRCQVU5Q0MsUSxFQUF1RTtBQUN4RixVQUFNQyxZQUFZLEdBQUcsK0JBQTRCRCxRQUE1QixDQUFyQjtBQUNBLFVBQUlFLElBQUksR0FBRyxJQUFJQyxnQkFBSixDQUF1Q0YsWUFBdkMsQ0FBWDs7QUFFQSxVQUFJLENBQUMsS0FBS0csTUFBTCxDQUFZSCxZQUFaLENBQUwsRUFBZ0M7QUFDL0IsYUFBS0csTUFBTCxDQUFZSCxZQUFaLElBQTRCLENBQUNDLElBQUQsQ0FBNUI7QUFDQSxPQUZELE1BRU87QUFDTixhQUFLRSxNQUFMLENBQVlILFlBQVosRUFBMEJJLElBQTFCLENBQStCSCxJQUEvQjtBQUNBOztBQUVELGFBQU9BLElBQVA7QUFDQTs7O2dDQUVxQkYsUSxFQUFpRjtBQUN0RyxVQUFNQyxZQUFZLEdBQUcsK0JBQTRCRCxRQUE1QixDQUFyQjtBQUNBLFVBQUlFLElBQUksR0FBRyxJQUFJSSwwQkFBSixDQUFpREwsWUFBakQsQ0FBWDs7QUFFQSxVQUFJLENBQUMsS0FBS0csTUFBTCxDQUFZSCxZQUFaLENBQUwsRUFBZ0M7QUFDL0IsYUFBS0csTUFBTCxDQUFZSCxZQUFaLElBQTRCLENBQUNDLElBQUQsQ0FBNUI7QUFDQSxPQUZELE1BRU87QUFDTixhQUFLRSxNQUFMLENBQVlILFlBQVosRUFBMEJJLElBQTFCLENBQStCSCxJQUEvQjtBQUNBOztBQUVELGFBQU9BLElBQVA7QUFDQTs7O3FDQUV1QkQsWSxFQUFzQk0sVyxFQUEyQkMsYSxFQUFnQ0MsYSxFQUE0RDtBQUNwSyxVQUFNQyxLQUFLLEdBQUcsNkJBQVlILFdBQVosRUFBeUJOLFlBQXpCLENBQWQ7QUFDQSxVQUFJVSxVQUFKOztBQUVBLFVBQUlGLGFBQUosRUFBbUI7QUFDbEJFLFFBQUFBLFVBQVUsR0FBR0YsYUFBYjtBQUNBRSxRQUFBQSxVQUFVLENBQUNDLHdCQUFYLENBQW9DWCxZQUFwQztBQUNBLE9BSEQsTUFHTztBQUNOVSxRQUFBQSxVQUFVLEdBQUcsSUFBSUUsZ0NBQUosQ0FBeUIsRUFBekIsRUFBNkJaLFlBQTdCLEVBQTJDUyxLQUEzQyxDQUFiO0FBQ0E7O0FBRUQsVUFBTUksS0FBSyxHQUFHLEtBQUtWLE1BQUwsQ0FBWUgsWUFBWixDQUFkOztBQVhvSyxpREFhbkphLEtBYm1KO0FBQUE7O0FBQUE7QUFhcEssNERBQXdCO0FBQUEsY0FBZlosSUFBZTs7QUFDdkIsY0FBSWEsUUFBUSxHQUFHYixJQUFJLENBQUNjLFFBQUwsQ0FBY04sS0FBZCxFQUFxQkgsV0FBckIsRUFBa0NDLGFBQWxDLENBQWY7O0FBQ0FHLFVBQUFBLFVBQVUsR0FBR0EsVUFBVSxDQUFDTSxLQUFYLENBQWlCRixRQUFqQixDQUFiO0FBQ0E7QUFoQm1LO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBa0JwSyxhQUFPSixVQUFQO0FBQ0E7QUFFRDs7Ozs7Ozs7NkJBTWdCRCxLLEVBQVlGLGEsRUFBc0Q7QUFBQTs7QUFBQSxrQ0FDcEMsdUNBQW9ERSxLQUFwRCxFQUEyRFEsU0FBUyxDQUFDLENBQUQsQ0FBcEUsRUFBeUVBLFNBQVMsQ0FBQyxDQUFELENBQWxGLENBRG9DO0FBQUE7QUFBQSxVQUM1RUMsTUFENEU7QUFBQSxVQUNwRUMsWUFEb0U7QUFBQSxVQUN0REMsY0FEc0Q7O0FBR2pGLFVBQUlWLFVBQVUsR0FBRyxJQUFJRSxnQ0FBSixDQUF5QixFQUF6QixFQUE2QixLQUFLWixZQUFMLElBQXFCLEVBQWxELEVBQXNEa0IsTUFBdEQsQ0FBakI7O0FBRUEsV0FBSyxJQUFJbEIsWUFBVCxJQUF5QixLQUFLRyxNQUE5QixFQUFzQztBQUNyQyxZQUFJa0IsT0FBTyxHQUFHLEtBQUtDLGdCQUFMLENBQXNCdEIsWUFBdEIsRUFBb0NtQixZQUFwQyxFQUFrREMsY0FBbEQsQ0FBZDtBQUNBVixRQUFBQSxVQUFVLEdBQUdBLFVBQVUsQ0FBQ00sS0FBWCxDQUFpQkssT0FBakIsQ0FBYjtBQUNBOztBQUVELFVBQUksS0FBS3JCLFlBQVQsRUFBdUI7QUFDdEJVLFFBQUFBLFVBQVUsQ0FBQ1YsWUFBWCxHQUEwQixLQUFLQSxZQUEvQjtBQUNBVSxRQUFBQSxVQUFVLENBQUNhLE9BQVgsQ0FBbUIsVUFBQUMsTUFBTTtBQUFBLGlCQUFJQSxNQUFNLENBQUN4QixZQUFQLGFBQXlCLEtBQUksQ0FBQ0EsWUFBOUIsY0FBOEN3QixNQUFNLENBQUN4QixZQUFyRCxDQUFKO0FBQUEsU0FBekI7QUFDQTs7QUFFRCxhQUFPVSxVQUFQO0FBQ0E7Ozt3QkE3RXlCO0FBQ3pCLGFBQU8sS0FBS2UsYUFBWjtBQUNBLEs7c0JBRXVCekIsWSxFQUFrQztBQUN6RCxXQUFLeUIsYUFBTCxHQUFxQnpCLFlBQXJCO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29sbGVjdGlvblJ1bGUgZnJvbSAnLi9Db2xsZWN0aW9uUnVsZSc7XG5pbXBvcnQgUnVsZSBmcm9tICcuL1J1bGUnO1xuaW1wb3J0IFZhbGlkYXRpb25SZXN1bHRMaXN0IGZyb20gJy4vVmFsaWRhdGlvblJlc3VsdExpc3QnO1xuaW1wb3J0IHsgSVZhbGlkYXRhYmxlLCBUUnVsZUNvbGxlY3Rpb24sIFRTZWxlY3RvciB9IGZyb20gJy4vdHlwZXMnO1xuXG5pbXBvcnQgZ2V0UHJvcGVydHkgZnJvbSAnLi91dGlscy9nZXRQcm9wZXJ0eSc7XG5pbXBvcnQgbm9ybWFsaXplVmFsaWRhdGVBcmdzIGZyb20gJy4vdXRpbHMvbm9ybWFsaXplVmFsaWRhdGVBcmdzJztcbmltcG9ydCBnZXRNZW1iZXJQYXRoIGZyb20gJy4vdXRpbHMvZ2V0TWVtYmVyUGF0aCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZhbGlkYXRvcjxUUGFyZW50VmFsdWUgPSBhbnksIFRDdXN0b21PcHRpb25zID0gYW55PiBpbXBsZW1lbnRzIElWYWxpZGF0YWJsZTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiB7XG5cdHByaXZhdGUgX3Byb3BlcnR5TmFtZSE6IHN0cmluZyB8IHVuZGVmaW5lZDtcblx0cHJpdmF0ZSBfcnVsZXM6IFRSdWxlQ29sbGVjdGlvbjxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiA9IHt9O1xuXG5cdHB1YmxpYyBnZXQgcHJvcGVydHlOYW1lKCkge1xuXHRcdHJldHVybiB0aGlzLl9wcm9wZXJ0eU5hbWU7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHByb3BlcnR5TmFtZShwcm9wZXJ0eU5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZCkge1xuXHRcdHRoaXMuX3Byb3BlcnR5TmFtZSA9IHByb3BlcnR5TmFtZTtcblx0fVxuXG5cdHByb3RlY3RlZCBydWxlRm9yKHNlbGVjdG9yOiBUU2VsZWN0b3I8VFBhcmVudFZhbHVlPik6IFJ1bGU8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ge1xuXHRcdGNvbnN0IHByb3BlcnR5TmFtZSA9IGdldE1lbWJlclBhdGg8VFBhcmVudFZhbHVlPihzZWxlY3Rvcik7XG5cdFx0bGV0IHJ1bGUgPSBuZXcgUnVsZTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPihwcm9wZXJ0eU5hbWUpO1xuXG5cdFx0aWYgKCF0aGlzLl9ydWxlc1twcm9wZXJ0eU5hbWVdKSB7XG5cdFx0XHR0aGlzLl9ydWxlc1twcm9wZXJ0eU5hbWVdID0gW3J1bGVdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9ydWxlc1twcm9wZXJ0eU5hbWVdLnB1c2gocnVsZSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJ1bGU7XG5cdH1cblxuXHRwcm90ZWN0ZWQgcnVsZUZvckVhY2goc2VsZWN0b3I6IFRTZWxlY3RvcjxUUGFyZW50VmFsdWU+KTogQ29sbGVjdGlvblJ1bGU8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ge1xuXHRcdGNvbnN0IHByb3BlcnR5TmFtZSA9IGdldE1lbWJlclBhdGg8VFBhcmVudFZhbHVlPihzZWxlY3Rvcik7XG5cdFx0bGV0IHJ1bGUgPSBuZXcgQ29sbGVjdGlvblJ1bGU8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ocHJvcGVydHlOYW1lKTtcblxuXHRcdGlmICghdGhpcy5fcnVsZXNbcHJvcGVydHlOYW1lXSkge1xuXHRcdFx0dGhpcy5fcnVsZXNbcHJvcGVydHlOYW1lXSA9IFtydWxlXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fcnVsZXNbcHJvcGVydHlOYW1lXS5wdXNoKHJ1bGUpO1xuXHRcdH1cblxuXHRcdHJldHVybiBydWxlO1xuXHR9XG5cblx0cHVibGljIHZhbGlkYXRlUHJvcGVydHkocHJvcGVydHlOYW1lOiBzdHJpbmcsIHBhcmVudFZhbHVlOiBUUGFyZW50VmFsdWUsIGN1c3RvbU9wdGlvbnM/OiBUQ3VzdG9tT3B0aW9ucywgb3V0UmVzdWx0TGlzdD86IFZhbGlkYXRpb25SZXN1bHRMaXN0KTogVmFsaWRhdGlvblJlc3VsdExpc3Qge1xuXHRcdGNvbnN0IHZhbHVlID0gZ2V0UHJvcGVydHkocGFyZW50VmFsdWUsIHByb3BlcnR5TmFtZSk7XG5cdFx0bGV0IHJlc3VsdExpc3Q7XG5cblx0XHRpZiAob3V0UmVzdWx0TGlzdCkge1xuXHRcdFx0cmVzdWx0TGlzdCA9IG91dFJlc3VsdExpc3Q7XG5cdFx0XHRyZXN1bHRMaXN0LnJlbW92ZVdpdGhSZWxhdGVkUmVzdWx0cyhwcm9wZXJ0eU5hbWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXN1bHRMaXN0ID0gbmV3IFZhbGlkYXRpb25SZXN1bHRMaXN0KFtdLCBwcm9wZXJ0eU5hbWUsIHZhbHVlKTtcblx0XHR9XG5cblx0XHRjb25zdCBydWxlcyA9IHRoaXMuX3J1bGVzW3Byb3BlcnR5TmFtZV07XG5cblx0XHRmb3IgKGxldCBydWxlIG9mIHJ1bGVzKSB7XG5cdFx0XHRsZXQgX3Jlc3VsdHMgPSBydWxlLnZhbGlkYXRlKHZhbHVlLCBwYXJlbnRWYWx1ZSwgY3VzdG9tT3B0aW9ucyk7XG5cdFx0XHRyZXN1bHRMaXN0ID0gcmVzdWx0TGlzdC5tZXJnZShfcmVzdWx0cyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdExpc3Q7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIG92ZXJsb2FkIGlzIHVzZWQgaW50ZXJuYWxseSBpbiBvcmRlciB0byBhbGxvdyBmb3IgVmFsaWRhdG9yIGFuZCBSdWxlIGluc3RhbmNlcyB0byBiZSBncm91cGVkIHRvZ2V0aGVyIGluXG5cdCAqIGEgVFZhbGlkYXRvckNvbGxlY3Rpb24uIE5vdGUgdGhhdCBpZiB1c2VkIGV4dGVybmFsbHksIHBhcmVudFZhbHVlIHdpbGwgYmUgaWdub3JlZCBhbmQgdGhlIHRoaXJkIGFyZ3VtZW50IHN1cHBsaWVkXG5cdCAqIHdpbGwgYmUgdXNlZCBhcyBjdXN0b21PcHRpb25zLlxuXHQgKi9cblx0cHVibGljIHZhbGlkYXRlKHZhbHVlOiBhbnksIHBhcmVudFZhbHVlPzogVFBhcmVudFZhbHVlIHwgVEN1c3RvbU9wdGlvbnMsIGN1c3RvbU9wdGlvbnM/OiBUQ3VzdG9tT3B0aW9ucyk6IFZhbGlkYXRpb25SZXN1bHRMaXN0O1xuXHRwdWJsaWMgdmFsaWRhdGUodmFsdWU6IGFueSwgY3VzdG9tT3B0aW9ucz86IFRDdXN0b21PcHRpb25zKTogVmFsaWRhdGlvblJlc3VsdExpc3Qge1xuXHRcdGxldCBbX3ZhbHVlLCBfcGFyZW50VmFsdWUsIF9jdXN0b21PcHRpb25zXSA9IG5vcm1hbGl6ZVZhbGlkYXRlQXJnczxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPih2YWx1ZSwgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuXG5cdFx0bGV0IHJlc3VsdExpc3QgPSBuZXcgVmFsaWRhdGlvblJlc3VsdExpc3QoW10sIHRoaXMucHJvcGVydHlOYW1lIHx8ICcnLCBfdmFsdWUpO1xuXG5cdFx0Zm9yIChsZXQgcHJvcGVydHlOYW1lIGluIHRoaXMuX3J1bGVzKSB7XG5cdFx0XHRsZXQgcmVzdWx0cyA9IHRoaXMudmFsaWRhdGVQcm9wZXJ0eShwcm9wZXJ0eU5hbWUsIF9wYXJlbnRWYWx1ZSwgX2N1c3RvbU9wdGlvbnMpO1xuXHRcdFx0cmVzdWx0TGlzdCA9IHJlc3VsdExpc3QubWVyZ2UocmVzdWx0cyk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMucHJvcGVydHlOYW1lKSB7XG5cdFx0XHRyZXN1bHRMaXN0LnByb3BlcnR5TmFtZSA9IHRoaXMucHJvcGVydHlOYW1lO1xuXHRcdFx0cmVzdWx0TGlzdC5mb3JFYWNoKHJlc3VsdCA9PiByZXN1bHQucHJvcGVydHlOYW1lID0gYCR7dGhpcy5wcm9wZXJ0eU5hbWV9LiR7cmVzdWx0LnByb3BlcnR5TmFtZX1gKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0TGlzdDtcblx0fVxufSJdfQ==