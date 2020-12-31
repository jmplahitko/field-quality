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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9WYWxpZGF0b3IudHMiXSwibmFtZXMiOlsiVmFsaWRhdG9yIiwic2VsZWN0b3IiLCJwcm9wZXJ0eU5hbWUiLCJydWxlIiwiUnVsZSIsIl9ydWxlcyIsInB1c2giLCJDb2xsZWN0aW9uUnVsZSIsInBhcmVudFZhbHVlIiwiY3VzdG9tT3B0aW9ucyIsInZhbHVlIiwicnVsZXMiLCJyZXN1bHRMaXN0IiwiVmFsaWRhdGlvblJlc3VsdExpc3QiLCJfcmVzdWx0cyIsInZhbGlkYXRlIiwibWVyZ2UiLCJhcmd1bWVudHMiLCJfdmFsdWUiLCJfcGFyZW50VmFsdWUiLCJfY3VzdG9tT3B0aW9ucyIsInJlc3VsdHMiLCJ2YWxpZGF0ZVByb3BlcnR5IiwiZm9yRWFjaCIsInJlc3VsdCIsIl9wcm9wZXJ0eU5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFHQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLFM7Ozs7OztvQ0FFNEMsRTs7Ozs7NEJBVTlDQyxRLEVBQXVFO0FBQ3hGLFVBQU1DLFlBQVksR0FBRywrQkFBNEJELFFBQTVCLENBQXJCO0FBQ0EsVUFBSUUsSUFBSSxHQUFHLElBQUlDLGdCQUFKLENBQXVDRixZQUF2QyxDQUFYOztBQUVBLFVBQUksQ0FBQyxLQUFLRyxNQUFMLENBQVlILFlBQVosQ0FBTCxFQUFnQztBQUMvQixhQUFLRyxNQUFMLENBQVlILFlBQVosSUFBNEIsQ0FBQ0MsSUFBRCxDQUE1QjtBQUNBLE9BRkQsTUFFTztBQUNOLGFBQUtFLE1BQUwsQ0FBWUgsWUFBWixFQUEwQkksSUFBMUIsQ0FBK0JILElBQS9CO0FBQ0E7O0FBRUQsYUFBT0EsSUFBUDtBQUNBOzs7Z0NBRXFCRixRLEVBQWlGO0FBQ3RHLFVBQU1DLFlBQVksR0FBRywrQkFBNEJELFFBQTVCLENBQXJCO0FBQ0EsVUFBSUUsSUFBSSxHQUFHLElBQUlJLDBCQUFKLENBQWlETCxZQUFqRCxDQUFYOztBQUVBLFVBQUksQ0FBQyxLQUFLRyxNQUFMLENBQVlILFlBQVosQ0FBTCxFQUFnQztBQUMvQixhQUFLRyxNQUFMLENBQVlILFlBQVosSUFBNEIsQ0FBQ0MsSUFBRCxDQUE1QjtBQUNBLE9BRkQsTUFFTztBQUNOLGFBQUtFLE1BQUwsQ0FBWUgsWUFBWixFQUEwQkksSUFBMUIsQ0FBK0JILElBQS9CO0FBQ0E7O0FBRUQsYUFBT0EsSUFBUDtBQUNBOzs7cUNBRXVCRCxZLEVBQXNCTSxXLEVBQTJCQyxhLEVBQXNEO0FBQzlILFVBQU1DLEtBQUssR0FBRyw2QkFBWUYsV0FBWixFQUF5Qk4sWUFBekIsQ0FBZDtBQUNBLFVBQU1TLEtBQUssR0FBRyxLQUFLTixNQUFMLENBQVlILFlBQVosQ0FBZDtBQUNBLFVBQUlVLFVBQVUsR0FBRyxJQUFJQyxnQ0FBSixDQUF5QixFQUF6QixFQUE2QlgsWUFBN0IsRUFBMkNRLEtBQTNDLENBQWpCOztBQUg4SCxpREFLN0dDLEtBTDZHO0FBQUE7O0FBQUE7QUFLOUgsNERBQXdCO0FBQUEsY0FBZlIsSUFBZTs7QUFDdkIsY0FBSVcsUUFBUSxHQUFHWCxJQUFJLENBQUNZLFFBQUwsQ0FBY0wsS0FBZCxFQUFxQkYsV0FBckIsRUFBa0NDLGFBQWxDLENBQWY7O0FBQ0FHLFVBQUFBLFVBQVUsR0FBR0EsVUFBVSxDQUFDSSxLQUFYLENBQWlCRixRQUFqQixDQUFiO0FBQ0E7QUFSNkg7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFVOUgsYUFBT0YsVUFBUDtBQUNBO0FBRUQ7Ozs7Ozs7OzZCQU1nQkYsSyxFQUFZRCxhLEVBQXNEO0FBQUE7O0FBQUEsa0NBQ3BDLHVDQUFvREMsS0FBcEQsRUFBMkRPLFNBQVMsQ0FBQyxDQUFELENBQXBFLEVBQXlFQSxTQUFTLENBQUMsQ0FBRCxDQUFsRixDQURvQztBQUFBO0FBQUEsVUFDNUVDLE1BRDRFO0FBQUEsVUFDcEVDLFlBRG9FO0FBQUEsVUFDdERDLGNBRHNEOztBQUdqRixVQUFJUixVQUFVLEdBQUcsSUFBSUMsZ0NBQUosQ0FBeUIsRUFBekIsRUFBNkIsS0FBS1gsWUFBTCxJQUFxQixFQUFsRCxFQUFzRGdCLE1BQXRELENBQWpCOztBQUVBLFdBQUssSUFBSWhCLFlBQVQsSUFBeUIsS0FBS0csTUFBOUIsRUFBc0M7QUFDckMsWUFBSWdCLE9BQU8sR0FBRyxLQUFLQyxnQkFBTCxDQUFzQnBCLFlBQXRCLEVBQW9DaUIsWUFBcEMsRUFBa0RDLGNBQWxELENBQWQ7QUFDQVIsUUFBQUEsVUFBVSxHQUFHQSxVQUFVLENBQUNJLEtBQVgsQ0FBaUJLLE9BQWpCLENBQWI7QUFDQTs7QUFFRCxVQUFJLEtBQUtuQixZQUFULEVBQXVCO0FBQ3RCVSxRQUFBQSxVQUFVLENBQUNWLFlBQVgsR0FBMEIsS0FBS0EsWUFBL0I7QUFDQVUsUUFBQUEsVUFBVSxDQUFDVyxPQUFYLENBQW1CLFVBQUFDLE1BQU07QUFBQSxpQkFBSUEsTUFBTSxDQUFDdEIsWUFBUCxhQUF5QixLQUFJLENBQUNBLFlBQTlCLGNBQThDc0IsTUFBTSxDQUFDdEIsWUFBckQsQ0FBSjtBQUFBLFNBQXpCO0FBQ0E7O0FBRUQsYUFBT1UsVUFBUDtBQUNBOzs7d0JBckV5QjtBQUN6QixhQUFPLEtBQUthLGFBQVo7QUFDQSxLO3NCQUV1QnZCLFksRUFBa0M7QUFDekQsV0FBS3VCLGFBQUwsR0FBcUJ2QixZQUFyQjtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbGxlY3Rpb25SdWxlIGZyb20gJy4vQ29sbGVjdGlvblJ1bGUnO1xuaW1wb3J0IFJ1bGUgZnJvbSAnLi9SdWxlJztcbmltcG9ydCBWYWxpZGF0aW9uUmVzdWx0TGlzdCBmcm9tICcuL1ZhbGlkYXRpb25SZXN1bHRMaXN0JztcbmltcG9ydCB7IElWYWxpZGF0YWJsZSwgVFJ1bGVDb2xsZWN0aW9uLCBUU2VsZWN0b3IgfSBmcm9tICcuL3R5cGVzJztcblxuaW1wb3J0IGdldFByb3BlcnR5IGZyb20gJy4vdXRpbHMvZ2V0UHJvcGVydHknO1xuaW1wb3J0IG5vcm1hbGl6ZVZhbGlkYXRlQXJncyBmcm9tICcuL3V0aWxzL25vcm1hbGl6ZVZhbGlkYXRlQXJncyc7XG5pbXBvcnQgZ2V0TWVtYmVyUGF0aCBmcm9tICcuL3V0aWxzL2dldE1lbWJlclBhdGgnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWYWxpZGF0b3I8VFBhcmVudFZhbHVlID0gYW55LCBUQ3VzdG9tT3B0aW9ucyA9IGFueT4gaW1wbGVtZW50cyBJVmFsaWRhdGFibGU8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ge1xuXHRwcml2YXRlIF9wcm9wZXJ0eU5hbWUhOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cdHByaXZhdGUgX3J1bGVzOiBUUnVsZUNvbGxlY3Rpb248VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4gPSB7fTtcblxuXHRwdWJsaWMgZ2V0IHByb3BlcnR5TmFtZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5fcHJvcGVydHlOYW1lO1xuXHR9XG5cblx0cHVibGljIHNldCBwcm9wZXJ0eU5hbWUocHJvcGVydHlOYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQpIHtcblx0XHR0aGlzLl9wcm9wZXJ0eU5hbWUgPSBwcm9wZXJ0eU5hbWU7XG5cdH1cblxuXHRwcm90ZWN0ZWQgcnVsZUZvcihzZWxlY3RvcjogVFNlbGVjdG9yPFRQYXJlbnRWYWx1ZT4pOiBSdWxlPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+IHtcblx0XHRjb25zdCBwcm9wZXJ0eU5hbWUgPSBnZXRNZW1iZXJQYXRoPFRQYXJlbnRWYWx1ZT4oc2VsZWN0b3IpO1xuXHRcdGxldCBydWxlID0gbmV3IFJ1bGU8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ocHJvcGVydHlOYW1lKTtcblxuXHRcdGlmICghdGhpcy5fcnVsZXNbcHJvcGVydHlOYW1lXSkge1xuXHRcdFx0dGhpcy5fcnVsZXNbcHJvcGVydHlOYW1lXSA9IFtydWxlXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fcnVsZXNbcHJvcGVydHlOYW1lXS5wdXNoKHJ1bGUpO1xuXHRcdH1cblxuXHRcdHJldHVybiBydWxlO1xuXHR9XG5cblx0cHJvdGVjdGVkIHJ1bGVGb3JFYWNoKHNlbGVjdG9yOiBUU2VsZWN0b3I8VFBhcmVudFZhbHVlPik6IENvbGxlY3Rpb25SdWxlPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+IHtcblx0XHRjb25zdCBwcm9wZXJ0eU5hbWUgPSBnZXRNZW1iZXJQYXRoPFRQYXJlbnRWYWx1ZT4oc2VsZWN0b3IpO1xuXHRcdGxldCBydWxlID0gbmV3IENvbGxlY3Rpb25SdWxlPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+KHByb3BlcnR5TmFtZSk7XG5cblx0XHRpZiAoIXRoaXMuX3J1bGVzW3Byb3BlcnR5TmFtZV0pIHtcblx0XHRcdHRoaXMuX3J1bGVzW3Byb3BlcnR5TmFtZV0gPSBbcnVsZV07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX3J1bGVzW3Byb3BlcnR5TmFtZV0ucHVzaChydWxlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcnVsZTtcblx0fVxuXG5cdHB1YmxpYyB2YWxpZGF0ZVByb3BlcnR5KHByb3BlcnR5TmFtZTogc3RyaW5nLCBwYXJlbnRWYWx1ZTogVFBhcmVudFZhbHVlLCBjdXN0b21PcHRpb25zPzogVEN1c3RvbU9wdGlvbnMpOiBWYWxpZGF0aW9uUmVzdWx0TGlzdCB7XG5cdFx0Y29uc3QgdmFsdWUgPSBnZXRQcm9wZXJ0eShwYXJlbnRWYWx1ZSwgcHJvcGVydHlOYW1lKTtcblx0XHRjb25zdCBydWxlcyA9IHRoaXMuX3J1bGVzW3Byb3BlcnR5TmFtZV07XG5cdFx0bGV0IHJlc3VsdExpc3QgPSBuZXcgVmFsaWRhdGlvblJlc3VsdExpc3QoW10sIHByb3BlcnR5TmFtZSwgdmFsdWUpO1xuXG5cdFx0Zm9yIChsZXQgcnVsZSBvZiBydWxlcykge1xuXHRcdFx0bGV0IF9yZXN1bHRzID0gcnVsZS52YWxpZGF0ZSh2YWx1ZSwgcGFyZW50VmFsdWUsIGN1c3RvbU9wdGlvbnMpO1xuXHRcdFx0cmVzdWx0TGlzdCA9IHJlc3VsdExpc3QubWVyZ2UoX3Jlc3VsdHMpO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHRMaXN0O1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBvdmVybG9hZCBpcyB1c2VkIGludGVybmFsbHkgaW4gb3JkZXIgdG8gYWxsb3cgZm9yIFZhbGlkYXRvciBhbmQgUnVsZSBpbnN0YW5jZXMgdG8gYmUgZ3JvdXBlZCB0b2dldGhlciBpblxuXHQgKiBhIFRWYWxpZGF0b3JDb2xsZWN0aW9uLiBOb3RlIHRoYXQgaWYgdXNlZCBleHRlcm5hbGx5LCBwYXJlbnRWYWx1ZSB3aWxsIGJlIGlnbm9yZWQgYW5kIHRoZSB0aGlyZCBhcmd1bWVudCBzdXBwbGllZFxuXHQgKiB3aWxsIGJlIHVzZWQgYXMgY3VzdG9tT3B0aW9ucy5cblx0ICovXG5cdHB1YmxpYyB2YWxpZGF0ZSh2YWx1ZTogYW55LCBwYXJlbnRWYWx1ZT86IFRQYXJlbnRWYWx1ZSB8IFRDdXN0b21PcHRpb25zLCBjdXN0b21PcHRpb25zPzogVEN1c3RvbU9wdGlvbnMpOiBWYWxpZGF0aW9uUmVzdWx0TGlzdDtcblx0cHVibGljIHZhbGlkYXRlKHZhbHVlOiBhbnksIGN1c3RvbU9wdGlvbnM/OiBUQ3VzdG9tT3B0aW9ucyk6IFZhbGlkYXRpb25SZXN1bHRMaXN0IHtcblx0XHRsZXQgW192YWx1ZSwgX3BhcmVudFZhbHVlLCBfY3VzdG9tT3B0aW9uc10gPSBub3JtYWxpemVWYWxpZGF0ZUFyZ3M8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4odmFsdWUsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcblxuXHRcdGxldCByZXN1bHRMaXN0ID0gbmV3IFZhbGlkYXRpb25SZXN1bHRMaXN0KFtdLCB0aGlzLnByb3BlcnR5TmFtZSB8fCAnJywgX3ZhbHVlKTtcblxuXHRcdGZvciAobGV0IHByb3BlcnR5TmFtZSBpbiB0aGlzLl9ydWxlcykge1xuXHRcdFx0bGV0IHJlc3VsdHMgPSB0aGlzLnZhbGlkYXRlUHJvcGVydHkocHJvcGVydHlOYW1lLCBfcGFyZW50VmFsdWUsIF9jdXN0b21PcHRpb25zKTtcblx0XHRcdHJlc3VsdExpc3QgPSByZXN1bHRMaXN0Lm1lcmdlKHJlc3VsdHMpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLnByb3BlcnR5TmFtZSkge1xuXHRcdFx0cmVzdWx0TGlzdC5wcm9wZXJ0eU5hbWUgPSB0aGlzLnByb3BlcnR5TmFtZTtcblx0XHRcdHJlc3VsdExpc3QuZm9yRWFjaChyZXN1bHQgPT4gcmVzdWx0LnByb3BlcnR5TmFtZSA9IGAke3RoaXMucHJvcGVydHlOYW1lfS4ke3Jlc3VsdC5wcm9wZXJ0eU5hbWV9YCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdExpc3Q7XG5cdH1cbn0iXX0=