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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
    value: function ruleFor(propertyName) {
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
    value: function ruleForEach(propertyName) {
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
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = rules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var rule = _step.value;

          var _results = rule.validate(value, parentValue, customOptions);

          resultList = resultList.merge(_results);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9WYWxpZGF0b3IudHMiXSwibmFtZXMiOlsiVmFsaWRhdG9yIiwicHJvcGVydHlOYW1lIiwicnVsZSIsIlJ1bGUiLCJfcnVsZXMiLCJwdXNoIiwiQ29sbGVjdGlvblJ1bGUiLCJwYXJlbnRWYWx1ZSIsImN1c3RvbU9wdGlvbnMiLCJvdXRSZXN1bHRMaXN0IiwidmFsdWUiLCJyZXN1bHRMaXN0IiwicmVtb3ZlV2l0aFJlbGF0ZWRSZXN1bHRzIiwiVmFsaWRhdGlvblJlc3VsdExpc3QiLCJydWxlcyIsIl9yZXN1bHRzIiwidmFsaWRhdGUiLCJtZXJnZSIsImFyZ3VtZW50cyIsIl92YWx1ZSIsIl9wYXJlbnRWYWx1ZSIsIl9jdXN0b21PcHRpb25zIiwicmVzdWx0cyIsInZhbGlkYXRlUHJvcGVydHkiLCJmb3JFYWNoIiwicmVzdWx0IiwiX3Byb3BlcnR5TmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUdBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVxQkEsUzs7Ozs7O29DQUU0QyxFOzs7Ozs0QkFVOUNDLFksRUFBMEQ7QUFDM0UsVUFBSUMsSUFBSSxHQUFHLElBQUlDLGdCQUFKLENBQXVDRixZQUF2QyxDQUFYOztBQUVBLFVBQUksQ0FBQyxLQUFLRyxNQUFMLENBQVlILFlBQVosQ0FBTCxFQUFnQztBQUMvQixhQUFLRyxNQUFMLENBQVlILFlBQVosSUFBNEIsQ0FBQ0MsSUFBRCxDQUE1QjtBQUNBLE9BRkQsTUFFTztBQUNOLGFBQUtFLE1BQUwsQ0FBWUgsWUFBWixFQUEwQkksSUFBMUIsQ0FBK0JILElBQS9CO0FBQ0E7O0FBRUQsYUFBT0EsSUFBUDtBQUNBOzs7Z0NBRXFCRCxZLEVBQW9FO0FBQ3pGLFVBQUlDLElBQUksR0FBRyxJQUFJSSwwQkFBSixDQUFpREwsWUFBakQsQ0FBWDs7QUFFQSxVQUFJLENBQUMsS0FBS0csTUFBTCxDQUFZSCxZQUFaLENBQUwsRUFBZ0M7QUFDL0IsYUFBS0csTUFBTCxDQUFZSCxZQUFaLElBQTRCLENBQUNDLElBQUQsQ0FBNUI7QUFDQSxPQUZELE1BRU87QUFDTixhQUFLRSxNQUFMLENBQVlILFlBQVosRUFBMEJJLElBQTFCLENBQStCSCxJQUEvQjtBQUNBOztBQUVELGFBQU9BLElBQVA7QUFDQTs7O3FDQUV1QkQsWSxFQUFzQk0sVyxFQUEyQkMsYSxFQUFnQ0MsYSxFQUE0RDtBQUNwSyxVQUFNQyxLQUFLLEdBQUcsNkJBQVlILFdBQVosRUFBeUJOLFlBQXpCLENBQWQ7QUFDQSxVQUFJVSxVQUFKOztBQUVBLFVBQUlGLGFBQUosRUFBbUI7QUFDbEJFLFFBQUFBLFVBQVUsR0FBR0YsYUFBYjtBQUNBRSxRQUFBQSxVQUFVLENBQUNDLHdCQUFYLENBQW9DWCxZQUFwQztBQUNBLE9BSEQsTUFHTztBQUNOVSxRQUFBQSxVQUFVLEdBQUcsSUFBSUUsZ0NBQUosQ0FBeUIsRUFBekIsRUFBNkJaLFlBQTdCLEVBQTJDUyxLQUEzQyxDQUFiO0FBQ0E7O0FBRUQsVUFBTUksS0FBSyxHQUFHLEtBQUtWLE1BQUwsQ0FBWUgsWUFBWixDQUFkO0FBWG9LO0FBQUE7QUFBQTs7QUFBQTtBQWFwSyw2QkFBaUJhLEtBQWpCLDhIQUF3QjtBQUFBLGNBQWZaLElBQWU7O0FBQ3ZCLGNBQUlhLFFBQVEsR0FBR2IsSUFBSSxDQUFDYyxRQUFMLENBQWNOLEtBQWQsRUFBcUJILFdBQXJCLEVBQWtDQyxhQUFsQyxDQUFmOztBQUNBRyxVQUFBQSxVQUFVLEdBQUdBLFVBQVUsQ0FBQ00sS0FBWCxDQUFpQkYsUUFBakIsQ0FBYjtBQUNBO0FBaEJtSztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQWtCcEssYUFBT0osVUFBUDtBQUNBO0FBRUQ7Ozs7Ozs7OzZCQU1nQkQsSyxFQUFZRixhLEVBQXNEO0FBQUE7O0FBQUEsa0NBQ3BDLHVDQUFvREUsS0FBcEQsRUFBMkRRLFNBQVMsQ0FBQyxDQUFELENBQXBFLEVBQXlFQSxTQUFTLENBQUMsQ0FBRCxDQUFsRixDQURvQztBQUFBO0FBQUEsVUFDNUVDLE1BRDRFO0FBQUEsVUFDcEVDLFlBRG9FO0FBQUEsVUFDdERDLGNBRHNEOztBQUdqRixVQUFJVixVQUFVLEdBQUcsSUFBSUUsZ0NBQUosQ0FBeUIsRUFBekIsRUFBNkIsS0FBS1osWUFBTCxJQUFxQixFQUFsRCxFQUFzRGtCLE1BQXRELENBQWpCOztBQUVBLFdBQUssSUFBSWxCLFlBQVQsSUFBeUIsS0FBS0csTUFBOUIsRUFBc0M7QUFDckMsWUFBSWtCLE9BQU8sR0FBRyxLQUFLQyxnQkFBTCxDQUFzQnRCLFlBQXRCLEVBQW9DbUIsWUFBcEMsRUFBa0RDLGNBQWxELENBQWQ7QUFDQVYsUUFBQUEsVUFBVSxHQUFHQSxVQUFVLENBQUNNLEtBQVgsQ0FBaUJLLE9BQWpCLENBQWI7QUFDQTs7QUFFRCxVQUFJLEtBQUtyQixZQUFULEVBQXVCO0FBQ3RCVSxRQUFBQSxVQUFVLENBQUNWLFlBQVgsR0FBMEIsS0FBS0EsWUFBL0I7QUFDQVUsUUFBQUEsVUFBVSxDQUFDYSxPQUFYLENBQW1CLFVBQUFDLE1BQU07QUFBQSxpQkFBSUEsTUFBTSxDQUFDeEIsWUFBUCxhQUF5QixLQUFJLENBQUNBLFlBQTlCLGNBQThDd0IsTUFBTSxDQUFDeEIsWUFBckQsQ0FBSjtBQUFBLFNBQXpCO0FBQ0E7O0FBRUQsYUFBT1UsVUFBUDtBQUNBOzs7d0JBM0V5QjtBQUN6QixhQUFPLEtBQUtlLGFBQVo7QUFDQSxLO3NCQUV1QnpCLFksRUFBa0M7QUFDekQsV0FBS3lCLGFBQUwsR0FBcUJ6QixZQUFyQjtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbGxlY3Rpb25SdWxlIGZyb20gJy4vQ29sbGVjdGlvblJ1bGUnO1xuaW1wb3J0IFJ1bGUgZnJvbSAnLi9SdWxlJztcbmltcG9ydCBWYWxpZGF0aW9uUmVzdWx0TGlzdCBmcm9tICcuL1ZhbGlkYXRpb25SZXN1bHRMaXN0JztcbmltcG9ydCB7IElWYWxpZGF0YWJsZSwgVFJ1bGVDb2xsZWN0aW9uIH0gZnJvbSAnLi90eXBlcyc7XG5cbmltcG9ydCBnZXRQcm9wZXJ0eSBmcm9tICcuL3V0aWxzL2dldFByb3BlcnR5JztcbmltcG9ydCB7IGlzRXF1YWwgfSBmcm9tICcuL3V0aWxzL3F1YWxpdHknO1xuaW1wb3J0IG5vcm1hbGl6ZVZhbGlkYXRlQXJncyBmcm9tICcuL3V0aWxzL25vcm1hbGl6ZVZhbGlkYXRlQXJncyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZhbGlkYXRvcjxUUGFyZW50VmFsdWUgPSBhbnksIFRDdXN0b21PcHRpb25zID0gYW55PiBpbXBsZW1lbnRzIElWYWxpZGF0YWJsZTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiB7XG5cdHByaXZhdGUgX3Byb3BlcnR5TmFtZSE6IHN0cmluZyB8IHVuZGVmaW5lZDtcblx0cHJpdmF0ZSBfcnVsZXM6IFRSdWxlQ29sbGVjdGlvbjxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiA9IHt9O1xuXG5cdHB1YmxpYyBnZXQgcHJvcGVydHlOYW1lKCkge1xuXHRcdHJldHVybiB0aGlzLl9wcm9wZXJ0eU5hbWU7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHByb3BlcnR5TmFtZShwcm9wZXJ0eU5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZCkge1xuXHRcdHRoaXMuX3Byb3BlcnR5TmFtZSA9IHByb3BlcnR5TmFtZTtcblx0fVxuXG5cdHByb3RlY3RlZCBydWxlRm9yKHByb3BlcnR5TmFtZTogc3RyaW5nKTogUnVsZTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiB7XG5cdFx0bGV0IHJ1bGUgPSBuZXcgUnVsZTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPihwcm9wZXJ0eU5hbWUpO1xuXG5cdFx0aWYgKCF0aGlzLl9ydWxlc1twcm9wZXJ0eU5hbWVdKSB7XG5cdFx0XHR0aGlzLl9ydWxlc1twcm9wZXJ0eU5hbWVdID0gW3J1bGVdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9ydWxlc1twcm9wZXJ0eU5hbWVdLnB1c2gocnVsZSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJ1bGU7XG5cdH1cblxuXHRwcm90ZWN0ZWQgcnVsZUZvckVhY2gocHJvcGVydHlOYW1lOiBzdHJpbmcpOiBDb2xsZWN0aW9uUnVsZTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiB7XG5cdFx0bGV0IHJ1bGUgPSBuZXcgQ29sbGVjdGlvblJ1bGU8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ocHJvcGVydHlOYW1lKTtcblxuXHRcdGlmICghdGhpcy5fcnVsZXNbcHJvcGVydHlOYW1lXSkge1xuXHRcdFx0dGhpcy5fcnVsZXNbcHJvcGVydHlOYW1lXSA9IFtydWxlXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fcnVsZXNbcHJvcGVydHlOYW1lXS5wdXNoKHJ1bGUpO1xuXHRcdH1cblxuXHRcdHJldHVybiBydWxlO1xuXHR9XG5cblx0cHVibGljIHZhbGlkYXRlUHJvcGVydHkocHJvcGVydHlOYW1lOiBzdHJpbmcsIHBhcmVudFZhbHVlOiBUUGFyZW50VmFsdWUsIGN1c3RvbU9wdGlvbnM/OiBUQ3VzdG9tT3B0aW9ucywgb3V0UmVzdWx0TGlzdD86IFZhbGlkYXRpb25SZXN1bHRMaXN0KTogVmFsaWRhdGlvblJlc3VsdExpc3Qge1xuXHRcdGNvbnN0IHZhbHVlID0gZ2V0UHJvcGVydHkocGFyZW50VmFsdWUsIHByb3BlcnR5TmFtZSk7XG5cdFx0bGV0IHJlc3VsdExpc3Q7XG5cblx0XHRpZiAob3V0UmVzdWx0TGlzdCkge1xuXHRcdFx0cmVzdWx0TGlzdCA9IG91dFJlc3VsdExpc3Q7XG5cdFx0XHRyZXN1bHRMaXN0LnJlbW92ZVdpdGhSZWxhdGVkUmVzdWx0cyhwcm9wZXJ0eU5hbWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXN1bHRMaXN0ID0gbmV3IFZhbGlkYXRpb25SZXN1bHRMaXN0KFtdLCBwcm9wZXJ0eU5hbWUsIHZhbHVlKTtcblx0XHR9XG5cblx0XHRjb25zdCBydWxlcyA9IHRoaXMuX3J1bGVzW3Byb3BlcnR5TmFtZV07XG5cblx0XHRmb3IgKGxldCBydWxlIG9mIHJ1bGVzKSB7XG5cdFx0XHRsZXQgX3Jlc3VsdHMgPSBydWxlLnZhbGlkYXRlKHZhbHVlLCBwYXJlbnRWYWx1ZSwgY3VzdG9tT3B0aW9ucyk7XG5cdFx0XHRyZXN1bHRMaXN0ID0gcmVzdWx0TGlzdC5tZXJnZShfcmVzdWx0cyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdExpc3Q7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIG92ZXJsb2FkIGlzIHVzZWQgaW50ZXJuYWxseSBpbiBvcmRlciB0byBhbGxvdyBmb3IgVmFsaWRhdG9yIGFuZCBSdWxlIGluc3RhbmNlcyB0byBiZSBncm91cGVkIHRvZ2V0aGVyIGluXG5cdCAqIGEgVFZhbGlkYXRvckNvbGxlY3Rpb24uIE5vdGUgdGhhdCBpZiB1c2VkIGV4dGVybmFsbHksIHBhcmVudFZhbHVlIHdpbGwgYmUgaWdub3JlZCBhbmQgdGhlIHRoaXJkIGFyZ3VtZW50IHN1cHBsaWVkXG5cdCAqIHdpbGwgYmUgdXNlZCBhcyBjdXN0b21PcHRpb25zLlxuXHQgKi9cblx0cHVibGljIHZhbGlkYXRlKHZhbHVlOiBhbnksIHBhcmVudFZhbHVlPzogVFBhcmVudFZhbHVlIHwgVEN1c3RvbU9wdGlvbnMsIGN1c3RvbU9wdGlvbnM/OiBUQ3VzdG9tT3B0aW9ucyk6IFZhbGlkYXRpb25SZXN1bHRMaXN0O1xuXHRwdWJsaWMgdmFsaWRhdGUodmFsdWU6IGFueSwgY3VzdG9tT3B0aW9ucz86IFRDdXN0b21PcHRpb25zKTogVmFsaWRhdGlvblJlc3VsdExpc3Qge1xuXHRcdGxldCBbX3ZhbHVlLCBfcGFyZW50VmFsdWUsIF9jdXN0b21PcHRpb25zXSA9IG5vcm1hbGl6ZVZhbGlkYXRlQXJnczxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPih2YWx1ZSwgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuXG5cdFx0bGV0IHJlc3VsdExpc3QgPSBuZXcgVmFsaWRhdGlvblJlc3VsdExpc3QoW10sIHRoaXMucHJvcGVydHlOYW1lIHx8ICcnLCBfdmFsdWUpO1xuXG5cdFx0Zm9yIChsZXQgcHJvcGVydHlOYW1lIGluIHRoaXMuX3J1bGVzKSB7XG5cdFx0XHRsZXQgcmVzdWx0cyA9IHRoaXMudmFsaWRhdGVQcm9wZXJ0eShwcm9wZXJ0eU5hbWUsIF9wYXJlbnRWYWx1ZSwgX2N1c3RvbU9wdGlvbnMpO1xuXHRcdFx0cmVzdWx0TGlzdCA9IHJlc3VsdExpc3QubWVyZ2UocmVzdWx0cyk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMucHJvcGVydHlOYW1lKSB7XG5cdFx0XHRyZXN1bHRMaXN0LnByb3BlcnR5TmFtZSA9IHRoaXMucHJvcGVydHlOYW1lO1xuXHRcdFx0cmVzdWx0TGlzdC5mb3JFYWNoKHJlc3VsdCA9PiByZXN1bHQucHJvcGVydHlOYW1lID0gYCR7dGhpcy5wcm9wZXJ0eU5hbWV9LiR7cmVzdWx0LnByb3BlcnR5TmFtZX1gKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0TGlzdDtcblx0fVxufSJdfQ==