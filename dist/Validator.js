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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9WYWxpZGF0b3IudHMiXSwibmFtZXMiOlsiVmFsaWRhdG9yIiwic2VsZWN0b3IiLCJwcm9wZXJ0eU5hbWUiLCJydWxlIiwiUnVsZSIsIl9ydWxlcyIsInB1c2giLCJDb2xsZWN0aW9uUnVsZSIsInJ1bGVzIiwiZmluZCIsIngiLCJpc0VtcHR5IiwicGFyZW50VmFsdWUiLCJjdXN0b21PcHRpb25zIiwidmFsdWUiLCJyZXN1bHRMaXN0IiwiVmFsaWRhdGlvblJlc3VsdExpc3QiLCJfcmVzdWx0cyIsInZhbGlkYXRlIiwibWVyZ2UiLCJhcmd1bWVudHMiLCJfdmFsdWUiLCJfcGFyZW50VmFsdWUiLCJfY3VzdG9tT3B0aW9ucyIsInJlc3VsdHMiLCJ2YWxpZGF0ZVByb3BlcnR5IiwiZm9yRWFjaCIsInJlc3VsdCIsIl9wcm9wZXJ0eU5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFHQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLFM7Ozs7OztvQ0FFNEMsRTs7Ozs7NEJBVTlDQyxRLEVBQXVFO0FBQ3hGLFVBQU1DLFlBQVksR0FBRywrQkFBNEJELFFBQTVCLENBQXJCO0FBQ0EsVUFBSUUsSUFBSSxHQUFHLElBQUlDLGdCQUFKLENBQXVDRixZQUF2QyxDQUFYOztBQUVBLFVBQUksQ0FBQyxLQUFLRyxNQUFMLENBQVlILFlBQVosQ0FBTCxFQUFnQztBQUMvQixhQUFLRyxNQUFMLENBQVlILFlBQVosSUFBNEIsQ0FBQ0MsSUFBRCxDQUE1QjtBQUNBLE9BRkQsTUFFTztBQUNOLGFBQUtFLE1BQUwsQ0FBWUgsWUFBWixFQUEwQkksSUFBMUIsQ0FBK0JILElBQS9CO0FBQ0E7O0FBRUQsYUFBT0EsSUFBUDtBQUNBOzs7Z0NBRXFCRixRLEVBQWlGO0FBQ3RHLFVBQU1DLFlBQVksR0FBRywrQkFBNEJELFFBQTVCLENBQXJCO0FBQ0EsVUFBSUUsSUFBSSxHQUFHLElBQUlJLDBCQUFKLENBQWlETCxZQUFqRCxDQUFYOztBQUVBLFVBQUksQ0FBQyxLQUFLRyxNQUFMLENBQVlILFlBQVosQ0FBTCxFQUFnQztBQUMvQixhQUFLRyxNQUFMLENBQVlILFlBQVosSUFBNEIsQ0FBQ0MsSUFBRCxDQUE1QjtBQUNBLE9BRkQsTUFFTztBQUNOLGFBQUtFLE1BQUwsQ0FBWUgsWUFBWixFQUEwQkksSUFBMUIsQ0FBK0JILElBQS9CO0FBQ0E7O0FBRUQsYUFBT0EsSUFBUDtBQUNBOzs7K0JBRWlCRCxZLEVBQStCO0FBQUE7O0FBQ2hELFVBQU1NLEtBQUssNEJBQUcsS0FBS0gsTUFBTCxDQUFZSCxZQUFaLENBQUgsMERBQUcsc0JBQTJCTyxJQUEzQixDQUFnQyxVQUFBQyxDQUFDO0FBQUEsZUFBSSxDQUFDQSxDQUFDLENBQUNDLE9BQVA7QUFBQSxPQUFqQyxDQUFkO0FBRUEsYUFBTyxDQUFDLHNCQUFRSCxLQUFSLENBQVI7QUFDQTs7O3FDQUV1Qk4sWSxFQUFzQlUsVyxFQUEyQkMsYSxFQUFzRDtBQUM5SCxVQUFNQyxLQUFLLEdBQUcsNkJBQVlGLFdBQVosRUFBeUJWLFlBQXpCLENBQWQ7QUFDQSxVQUFNTSxLQUFLLEdBQUcsS0FBS0gsTUFBTCxDQUFZSCxZQUFaLENBQWQ7QUFDQSxVQUFJYSxVQUFVLEdBQUcsSUFBSUMsZ0NBQUosQ0FBeUIsRUFBekIsRUFBNkJkLFlBQTdCLEVBQTJDWSxLQUEzQyxDQUFqQjs7QUFIOEgsaURBSzdHTixLQUw2RztBQUFBOztBQUFBO0FBSzlILDREQUF3QjtBQUFBLGNBQWZMLElBQWU7O0FBQ3ZCLGNBQUljLFFBQVEsR0FBR2QsSUFBSSxDQUFDZSxRQUFMLENBQWNKLEtBQWQsRUFBcUJGLFdBQXJCLEVBQWtDQyxhQUFsQyxDQUFmOztBQUNBRSxVQUFBQSxVQUFVLEdBQUdBLFVBQVUsQ0FBQ0ksS0FBWCxDQUFpQkYsUUFBakIsQ0FBYjtBQUNBO0FBUjZIO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBVTlILGFBQU9GLFVBQVA7QUFDQTtBQUVEOzs7Ozs7Ozs2QkFNZ0JELEssRUFBWUQsYSxFQUFzRDtBQUFBOztBQUFBLGtDQUNwQyx1Q0FBb0RDLEtBQXBELEVBQTJETSxTQUFTLENBQUMsQ0FBRCxDQUFwRSxFQUF5RUEsU0FBUyxDQUFDLENBQUQsQ0FBbEYsQ0FEb0M7QUFBQTtBQUFBLFVBQzVFQyxNQUQ0RTtBQUFBLFVBQ3BFQyxZQURvRTtBQUFBLFVBQ3REQyxjQURzRDs7QUFHakYsVUFBSVIsVUFBVSxHQUFHLElBQUlDLGdDQUFKLENBQXlCLEVBQXpCLEVBQTZCLEtBQUtkLFlBQUwsSUFBcUIsRUFBbEQsRUFBc0RtQixNQUF0RCxDQUFqQjs7QUFFQSxXQUFLLElBQUluQixZQUFULElBQXlCLEtBQUtHLE1BQTlCLEVBQXNDO0FBQ3JDLFlBQUltQixPQUFPLEdBQUcsS0FBS0MsZ0JBQUwsQ0FBc0J2QixZQUF0QixFQUFvQ29CLFlBQXBDLEVBQWtEQyxjQUFsRCxDQUFkO0FBQ0FSLFFBQUFBLFVBQVUsR0FBR0EsVUFBVSxDQUFDSSxLQUFYLENBQWlCSyxPQUFqQixDQUFiO0FBQ0E7O0FBRUQsVUFBSSxLQUFLdEIsWUFBVCxFQUF1QjtBQUN0QmEsUUFBQUEsVUFBVSxDQUFDYixZQUFYLEdBQTBCLEtBQUtBLFlBQS9CO0FBQ0FhLFFBQUFBLFVBQVUsQ0FBQ1csT0FBWCxDQUFtQixVQUFBQyxNQUFNO0FBQUEsaUJBQUlBLE1BQU0sQ0FBQ3pCLFlBQVAsYUFBeUIsS0FBSSxDQUFDQSxZQUE5QixjQUE4Q3lCLE1BQU0sQ0FBQ3pCLFlBQXJELENBQUo7QUFBQSxTQUF6QjtBQUNBOztBQUVELGFBQU9hLFVBQVA7QUFDQTs7O3dCQTNFeUI7QUFDekIsYUFBTyxLQUFLYSxhQUFaO0FBQ0EsSztzQkFFdUIxQixZLEVBQWtDO0FBQ3pELFdBQUswQixhQUFMLEdBQXFCMUIsWUFBckI7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb2xsZWN0aW9uUnVsZSBmcm9tICcuL0NvbGxlY3Rpb25SdWxlJztcbmltcG9ydCBSdWxlIGZyb20gJy4vUnVsZSc7XG5pbXBvcnQgVmFsaWRhdGlvblJlc3VsdExpc3QgZnJvbSAnLi9WYWxpZGF0aW9uUmVzdWx0TGlzdCc7XG5pbXBvcnQgeyBJVmFsaWRhdGFibGUsIFRSdWxlQ29sbGVjdGlvbiwgVFNlbGVjdG9yIH0gZnJvbSAnLi90eXBlcyc7XG5cbmltcG9ydCBnZXRQcm9wZXJ0eSBmcm9tICcuL3V0aWxzL2dldFByb3BlcnR5JztcbmltcG9ydCBub3JtYWxpemVWYWxpZGF0ZUFyZ3MgZnJvbSAnLi91dGlscy9ub3JtYWxpemVWYWxpZGF0ZUFyZ3MnO1xuaW1wb3J0IGdldE1lbWJlclBhdGggZnJvbSAnLi91dGlscy9nZXRNZW1iZXJQYXRoJztcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tICcuL3V0aWxzL3F1YWxpdHknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWYWxpZGF0b3I8VFBhcmVudFZhbHVlID0gYW55LCBUQ3VzdG9tT3B0aW9ucyA9IGFueT4gaW1wbGVtZW50cyBJVmFsaWRhdGFibGU8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ge1xuXHRwcml2YXRlIF9wcm9wZXJ0eU5hbWUhOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cdHByaXZhdGUgX3J1bGVzOiBUUnVsZUNvbGxlY3Rpb248VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4gPSB7fTtcblxuXHRwdWJsaWMgZ2V0IHByb3BlcnR5TmFtZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5fcHJvcGVydHlOYW1lO1xuXHR9XG5cblx0cHVibGljIHNldCBwcm9wZXJ0eU5hbWUocHJvcGVydHlOYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQpIHtcblx0XHR0aGlzLl9wcm9wZXJ0eU5hbWUgPSBwcm9wZXJ0eU5hbWU7XG5cdH1cblxuXHRwcm90ZWN0ZWQgcnVsZUZvcihzZWxlY3RvcjogVFNlbGVjdG9yPFRQYXJlbnRWYWx1ZT4pOiBSdWxlPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+IHtcblx0XHRjb25zdCBwcm9wZXJ0eU5hbWUgPSBnZXRNZW1iZXJQYXRoPFRQYXJlbnRWYWx1ZT4oc2VsZWN0b3IpO1xuXHRcdGxldCBydWxlID0gbmV3IFJ1bGU8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ocHJvcGVydHlOYW1lKTtcblxuXHRcdGlmICghdGhpcy5fcnVsZXNbcHJvcGVydHlOYW1lXSkge1xuXHRcdFx0dGhpcy5fcnVsZXNbcHJvcGVydHlOYW1lXSA9IFtydWxlXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fcnVsZXNbcHJvcGVydHlOYW1lXS5wdXNoKHJ1bGUpO1xuXHRcdH1cblxuXHRcdHJldHVybiBydWxlO1xuXHR9XG5cblx0cHJvdGVjdGVkIHJ1bGVGb3JFYWNoKHNlbGVjdG9yOiBUU2VsZWN0b3I8VFBhcmVudFZhbHVlPik6IENvbGxlY3Rpb25SdWxlPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+IHtcblx0XHRjb25zdCBwcm9wZXJ0eU5hbWUgPSBnZXRNZW1iZXJQYXRoPFRQYXJlbnRWYWx1ZT4oc2VsZWN0b3IpO1xuXHRcdGxldCBydWxlID0gbmV3IENvbGxlY3Rpb25SdWxlPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+KHByb3BlcnR5TmFtZSk7XG5cblx0XHRpZiAoIXRoaXMuX3J1bGVzW3Byb3BlcnR5TmFtZV0pIHtcblx0XHRcdHRoaXMuX3J1bGVzW3Byb3BlcnR5TmFtZV0gPSBbcnVsZV07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX3J1bGVzW3Byb3BlcnR5TmFtZV0ucHVzaChydWxlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcnVsZTtcblx0fVxuXG5cdHB1YmxpYyBoYXNSdWxlRm9yKHByb3BlcnR5TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG5cdFx0Y29uc3QgcnVsZXMgPSB0aGlzLl9ydWxlc1twcm9wZXJ0eU5hbWVdPy5maW5kKHggPT4gIXguaXNFbXB0eSk7XG5cblx0XHRyZXR1cm4gIWlzRW1wdHkocnVsZXMpO1xuXHR9XG5cblx0cHVibGljIHZhbGlkYXRlUHJvcGVydHkocHJvcGVydHlOYW1lOiBzdHJpbmcsIHBhcmVudFZhbHVlOiBUUGFyZW50VmFsdWUsIGN1c3RvbU9wdGlvbnM/OiBUQ3VzdG9tT3B0aW9ucyk6IFZhbGlkYXRpb25SZXN1bHRMaXN0IHtcblx0XHRjb25zdCB2YWx1ZSA9IGdldFByb3BlcnR5KHBhcmVudFZhbHVlLCBwcm9wZXJ0eU5hbWUpO1xuXHRcdGNvbnN0IHJ1bGVzID0gdGhpcy5fcnVsZXNbcHJvcGVydHlOYW1lXTtcblx0XHRsZXQgcmVzdWx0TGlzdCA9IG5ldyBWYWxpZGF0aW9uUmVzdWx0TGlzdChbXSwgcHJvcGVydHlOYW1lLCB2YWx1ZSk7XG5cblx0XHRmb3IgKGxldCBydWxlIG9mIHJ1bGVzKSB7XG5cdFx0XHRsZXQgX3Jlc3VsdHMgPSBydWxlLnZhbGlkYXRlKHZhbHVlLCBwYXJlbnRWYWx1ZSwgY3VzdG9tT3B0aW9ucyk7XG5cdFx0XHRyZXN1bHRMaXN0ID0gcmVzdWx0TGlzdC5tZXJnZShfcmVzdWx0cyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdExpc3Q7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIG92ZXJsb2FkIGlzIHVzZWQgaW50ZXJuYWxseSBpbiBvcmRlciB0byBhbGxvdyBmb3IgVmFsaWRhdG9yIGFuZCBSdWxlIGluc3RhbmNlcyB0byBiZSBncm91cGVkIHRvZ2V0aGVyIGluXG5cdCAqIGEgVFZhbGlkYXRvckNvbGxlY3Rpb24uIE5vdGUgdGhhdCBpZiB1c2VkIGV4dGVybmFsbHksIHBhcmVudFZhbHVlIHdpbGwgYmUgaWdub3JlZCBhbmQgdGhlIHRoaXJkIGFyZ3VtZW50IHN1cHBsaWVkXG5cdCAqIHdpbGwgYmUgdXNlZCBhcyBjdXN0b21PcHRpb25zLlxuXHQgKi9cblx0cHVibGljIHZhbGlkYXRlKHZhbHVlOiBhbnksIHBhcmVudFZhbHVlPzogVFBhcmVudFZhbHVlIHwgVEN1c3RvbU9wdGlvbnMsIGN1c3RvbU9wdGlvbnM/OiBUQ3VzdG9tT3B0aW9ucyk6IFZhbGlkYXRpb25SZXN1bHRMaXN0O1xuXHRwdWJsaWMgdmFsaWRhdGUodmFsdWU6IGFueSwgY3VzdG9tT3B0aW9ucz86IFRDdXN0b21PcHRpb25zKTogVmFsaWRhdGlvblJlc3VsdExpc3Qge1xuXHRcdGxldCBbX3ZhbHVlLCBfcGFyZW50VmFsdWUsIF9jdXN0b21PcHRpb25zXSA9IG5vcm1hbGl6ZVZhbGlkYXRlQXJnczxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPih2YWx1ZSwgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuXG5cdFx0bGV0IHJlc3VsdExpc3QgPSBuZXcgVmFsaWRhdGlvblJlc3VsdExpc3QoW10sIHRoaXMucHJvcGVydHlOYW1lIHx8ICcnLCBfdmFsdWUpO1xuXG5cdFx0Zm9yIChsZXQgcHJvcGVydHlOYW1lIGluIHRoaXMuX3J1bGVzKSB7XG5cdFx0XHRsZXQgcmVzdWx0cyA9IHRoaXMudmFsaWRhdGVQcm9wZXJ0eShwcm9wZXJ0eU5hbWUsIF9wYXJlbnRWYWx1ZSwgX2N1c3RvbU9wdGlvbnMpO1xuXHRcdFx0cmVzdWx0TGlzdCA9IHJlc3VsdExpc3QubWVyZ2UocmVzdWx0cyk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMucHJvcGVydHlOYW1lKSB7XG5cdFx0XHRyZXN1bHRMaXN0LnByb3BlcnR5TmFtZSA9IHRoaXMucHJvcGVydHlOYW1lO1xuXHRcdFx0cmVzdWx0TGlzdC5mb3JFYWNoKHJlc3VsdCA9PiByZXN1bHQucHJvcGVydHlOYW1lID0gYCR7dGhpcy5wcm9wZXJ0eU5hbWV9LiR7cmVzdWx0LnByb3BlcnR5TmFtZX1gKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0TGlzdDtcblx0fVxufSJdfQ==