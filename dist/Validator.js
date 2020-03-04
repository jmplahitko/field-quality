"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _CollectionRule = _interopRequireDefault(require("./CollectionRule"));

var _Rule = _interopRequireDefault(require("./Rule"));

var _ValidationResultList = _interopRequireDefault(require("./ValidationResultList"));

var _copy = _interopRequireDefault(require("./utils/copy"));

var _getProperty = _interopRequireDefault(require("./utils/getProperty"));

var _quality = require("./utils/quality");

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

    _defineProperty(this, "_name", void 0);

    _defineProperty(this, "_results", new _ValidationResultList["default"]());

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
      var prevResult = this._results.get(propertyName);

      var value = (0, _getProperty["default"])(parentValue, propertyName);
      var resultList;

      if (outResultList) {
        resultList = outResultList;
        resultList.removeWithRelatedResults(propertyName);
      } else {
        resultList = new _ValidationResultList["default"]([], propertyName, value);
      }

      if (prevResult && (0, _quality.isEqual)(prevResult.value, value)) {
        resultList.merge(this._results.getWithRelatedResults(propertyName));
      } else {
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
      }

      return resultList;
    }
  }, {
    key: "validate",
    value: function validate(value, parentValue, customOptions) {
      var _this = this;

      var _normalizeValidateArg = (0, _normalizeValidateArgs["default"])(value, parentValue, customOptions),
          _normalizeValidateArg2 = _slicedToArray(_normalizeValidateArg, 3),
          _value = _normalizeValidateArg2[0],
          _parentValue = _normalizeValidateArg2[1],
          _customOptions = _normalizeValidateArg2[2];

      _parentValue = (0, _copy["default"])(_value);
      var resultList = new _ValidationResultList["default"]([], this.name || '', _value);

      for (var propertyName in this._rules) {
        var results = this.validateProperty(propertyName, _parentValue, _customOptions);
        resultList = resultList.merge(results);
      }

      if (this.name) {
        resultList.propertyName = this.name;
        resultList.forEach(function (result) {
          return result.propertyName = "".concat(_this.name, ".").concat(result.propertyName);
        });
      }

      this._results.clear();

      this._results.value = _value;

      this._results.merge(resultList);

      return resultList;
    }
  }, {
    key: "name",
    get: function get() {
      return this._name;
    },
    set: function set(name) {
      this._name = name;
      this._results.propertyName = name;
    }
  }]);

  return Validator;
}();

exports["default"] = Validator;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9WYWxpZGF0b3IudHMiXSwibmFtZXMiOlsiVmFsaWRhdG9yIiwiVmFsaWRhdGlvblJlc3VsdExpc3QiLCJwcm9wZXJ0eU5hbWUiLCJydWxlIiwiUnVsZSIsIl9ydWxlcyIsInB1c2giLCJDb2xsZWN0aW9uUnVsZSIsInBhcmVudFZhbHVlIiwiY3VzdG9tT3B0aW9ucyIsIm91dFJlc3VsdExpc3QiLCJwcmV2UmVzdWx0IiwiX3Jlc3VsdHMiLCJnZXQiLCJ2YWx1ZSIsInJlc3VsdExpc3QiLCJyZW1vdmVXaXRoUmVsYXRlZFJlc3VsdHMiLCJtZXJnZSIsImdldFdpdGhSZWxhdGVkUmVzdWx0cyIsInJ1bGVzIiwidmFsaWRhdGUiLCJfdmFsdWUiLCJfcGFyZW50VmFsdWUiLCJfY3VzdG9tT3B0aW9ucyIsIm5hbWUiLCJyZXN1bHRzIiwidmFsaWRhdGVQcm9wZXJ0eSIsImZvckVhY2giLCJyZXN1bHQiLCJjbGVhciIsIl9uYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBR0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxTO0FBS3BCLHVCQUFjO0FBQUE7O0FBQUE7O0FBQUEsc0NBSDJCLElBQUlDLGdDQUFKLEVBRzNCOztBQUFBLG9DQUZvQixFQUVwQjtBQUViOzs7OzRCQVdpQkMsWSxFQUE0QjtBQUM3QyxVQUFJQyxJQUFJLEdBQUcsSUFBSUMsZ0JBQUosQ0FBU0YsWUFBVCxDQUFYOztBQUVBLFVBQUksQ0FBQyxLQUFLRyxNQUFMLENBQVlILFlBQVosQ0FBTCxFQUFnQztBQUMvQixhQUFLRyxNQUFMLENBQVlILFlBQVosSUFBNEIsQ0FBQ0MsSUFBRCxDQUE1QjtBQUNBLE9BRkQsTUFFTztBQUNOLGFBQUtFLE1BQUwsQ0FBWUgsWUFBWixFQUEwQkksSUFBMUIsQ0FBK0JILElBQS9CO0FBQ0E7O0FBRUQsYUFBT0EsSUFBUDtBQUNBOzs7Z0NBRXFCRCxZLEVBQXNDO0FBQzNELFVBQUlD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QTdDLENBQUo7QUFBQSxTQUF6QjtBQUNBOztBQUVELFdBQUtVLFFBQUwsQ0FBY2lCLEtBQWQ7O0FBQ0EsV0FBS2pCLFFBQUwsQ0FBY0UsS0FBZCxHQUFzQk8sTUFBdEI7O0FBQ0EsV0FBS1QsUUFBTCxDQUFjSyxLQUFkLENBQW9CRixVQUFwQjs7QUFFQSxhQUFPQSxVQUFQO0FBQ0E7Ozt3QkFqRmlCO0FBQ2pCLGFBQU8sS0FBS2UsS0FBWjtBQUNBLEs7c0JBRWVOLEksRUFBMEI7QUFDekMsV0FBS00sS0FBTCxHQUFhTixJQUFiO0FBQ0EsV0FBS1osUUFBTCxDQUFjVixZQUFkLEdBQTZCc0IsSUFBN0I7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb2xsZWN0aW9uUnVsZSBmcm9tICcuL0NvbGxlY3Rpb25SdWxlJztcbmltcG9ydCBSdWxlIGZyb20gJy4vUnVsZSc7XG5pbXBvcnQgVmFsaWRhdGlvblJlc3VsdExpc3QgZnJvbSAnLi9WYWxpZGF0aW9uUmVzdWx0TGlzdCc7XG5pbXBvcnQgeyBJVmFsaWRhdGFibGUsIFRSdWxlQ29sbGVjdGlvbiB9IGZyb20gJy4vdHlwZXMnO1xuXG5pbXBvcnQgY29weSBmcm9tICcuL3V0aWxzL2NvcHknO1xuaW1wb3J0IGdldFByb3BlcnR5IGZyb20gJy4vdXRpbHMvZ2V0UHJvcGVydHknO1xuaW1wb3J0IHsgaXNFcXVhbCB9IGZyb20gJy4vdXRpbHMvcXVhbGl0eSc7XG5pbXBvcnQgbm9ybWFsaXplVmFsaWRhdGVBcmdzIGZyb20gJy4vdXRpbHMvbm9ybWFsaXplVmFsaWRhdGVBcmdzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmFsaWRhdG9yIGltcGxlbWVudHMgSVZhbGlkYXRhYmxlIHtcblx0cHJpdmF0ZSBfbmFtZSE6IHN0cmluZyB8IHVuZGVmaW5lZDtcblx0cHJpdmF0ZSBfcmVzdWx0czogVmFsaWRhdGlvblJlc3VsdExpc3QgPSBuZXcgVmFsaWRhdGlvblJlc3VsdExpc3QoKTtcblx0cHJpdmF0ZSBfcnVsZXM6IFRSdWxlQ29sbGVjdGlvbiA9IHt9O1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXG5cdH1cblxuXHRwdWJsaWMgZ2V0IG5hbWUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX25hbWU7XG5cdH1cblxuXHRwdWJsaWMgc2V0IG5hbWUobmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XG5cdFx0dGhpcy5fbmFtZSA9IG5hbWU7XG5cdFx0dGhpcy5fcmVzdWx0cy5wcm9wZXJ0eU5hbWUgPSBuYW1lO1xuXHR9XG5cblx0cHJvdGVjdGVkIHJ1bGVGb3IocHJvcGVydHlOYW1lOiBzdHJpbmcpOiBSdWxlIHtcblx0XHRsZXQgcnVsZSA9IG5ldyBSdWxlKHByb3BlcnR5TmFtZSk7XG5cblx0XHRpZiAoIXRoaXMuX3J1bGVzW3Byb3BlcnR5TmFtZV0pIHtcblx0XHRcdHRoaXMuX3J1bGVzW3Byb3BlcnR5TmFtZV0gPSBbcnVsZV07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX3J1bGVzW3Byb3BlcnR5TmFtZV0ucHVzaChydWxlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcnVsZTtcblx0fVxuXG5cdHByb3RlY3RlZCBydWxlRm9yRWFjaChwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IENvbGxlY3Rpb25SdWxlIHtcblx0XHRsZXQgcnVsZSA9IG5ldyBDb2xsZWN0aW9uUnVsZShwcm9wZXJ0eU5hbWUpO1xuXG5cdFx0aWYgKCF0aGlzLl9ydWxlc1twcm9wZXJ0eU5hbWVdKSB7XG5cdFx0XHR0aGlzLl9ydWxlc1twcm9wZXJ0eU5hbWVdID0gW3J1bGVdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9ydWxlc1twcm9wZXJ0eU5hbWVdLnB1c2gocnVsZSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJ1bGU7XG5cdH1cblxuXHRwdWJsaWMgdmFsaWRhdGVQcm9wZXJ0eShwcm9wZXJ0eU5hbWU6IHN0cmluZywgcGFyZW50VmFsdWU6IGFueSwgY3VzdG9tT3B0aW9ucz86IGFueSwgb3V0UmVzdWx0TGlzdD86IFZhbGlkYXRpb25SZXN1bHRMaXN0KTogVmFsaWRhdGlvblJlc3VsdExpc3Qge1xuXHRcdGNvbnN0IHByZXZSZXN1bHQgPSB0aGlzLl9yZXN1bHRzLmdldChwcm9wZXJ0eU5hbWUpO1xuXHRcdGNvbnN0IHZhbHVlID0gZ2V0UHJvcGVydHkocGFyZW50VmFsdWUsIHByb3BlcnR5TmFtZSk7XG5cdFx0bGV0IHJlc3VsdExpc3Q7XG5cblx0XHRpZiAob3V0UmVzdWx0TGlzdCkge1xuXHRcdFx0cmVzdWx0TGlzdCA9IG91dFJlc3VsdExpc3Q7XG5cdFx0XHRyZXN1bHRMaXN0LnJlbW92ZVdpdGhSZWxhdGVkUmVzdWx0cyhwcm9wZXJ0eU5hbWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXN1bHRMaXN0ID0gbmV3IFZhbGlkYXRpb25SZXN1bHRMaXN0KFtdLCBwcm9wZXJ0eU5hbWUsIHZhbHVlKTtcblx0XHR9XG5cblx0XHRpZiAocHJldlJlc3VsdCAmJiBpc0VxdWFsKHByZXZSZXN1bHQudmFsdWUsIHZhbHVlKSkge1xuXHRcdFx0cmVzdWx0TGlzdC5tZXJnZSh0aGlzLl9yZXN1bHRzLmdldFdpdGhSZWxhdGVkUmVzdWx0cyhwcm9wZXJ0eU5hbWUpKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgcnVsZXMgPSB0aGlzLl9ydWxlc1twcm9wZXJ0eU5hbWVdO1xuXG5cdFx0XHRmb3IgKGxldCBydWxlIG9mIHJ1bGVzKSB7XG5cdFx0XHRcdGxldCBfcmVzdWx0cyA9IHJ1bGUudmFsaWRhdGUodmFsdWUsIHBhcmVudFZhbHVlLCBjdXN0b21PcHRpb25zKTtcblx0XHRcdFx0cmVzdWx0TGlzdCA9IHJlc3VsdExpc3QubWVyZ2UoX3Jlc3VsdHMpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHRMaXN0O1xuXHR9XG5cblx0cHVibGljIHZhbGlkYXRlKHZhbHVlOiBhbnksIGN1c3RvbU9wdGlvbnM/OiBhbnkpOiBWYWxpZGF0aW9uUmVzdWx0TGlzdDtcblx0cHVibGljIHZhbGlkYXRlKHZhbHVlOiBhbnksIHBhcmVudFZhbHVlPzogYW55LCBjdXN0b21PcHRpb25zPzogYW55KTogVmFsaWRhdGlvblJlc3VsdExpc3Qge1xuXHRcdGxldCBbX3ZhbHVlLCBfcGFyZW50VmFsdWUsIF9jdXN0b21PcHRpb25zXSA9IG5vcm1hbGl6ZVZhbGlkYXRlQXJncyh2YWx1ZSwgcGFyZW50VmFsdWUsIGN1c3RvbU9wdGlvbnMpO1xuXHRcdF9wYXJlbnRWYWx1ZSA9IGNvcHkoX3ZhbHVlKTtcblxuXHRcdGxldCByZXN1bHRMaXN0ID0gbmV3IFZhbGlkYXRpb25SZXN1bHRMaXN0KFtdLCB0aGlzLm5hbWUgfHwgJycsIF92YWx1ZSk7XG5cblx0XHRmb3IgKGxldCBwcm9wZXJ0eU5hbWUgaW4gdGhpcy5fcnVsZXMpIHtcblx0XHRcdGxldCByZXN1bHRzID0gdGhpcy52YWxpZGF0ZVByb3BlcnR5KHByb3BlcnR5TmFtZSwgX3BhcmVudFZhbHVlLCBfY3VzdG9tT3B0aW9ucyk7XG5cdFx0XHRyZXN1bHRMaXN0ID0gcmVzdWx0TGlzdC5tZXJnZShyZXN1bHRzKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5uYW1lKSB7XG5cdFx0XHRyZXN1bHRMaXN0LnByb3BlcnR5TmFtZSA9IHRoaXMubmFtZTtcblx0XHRcdHJlc3VsdExpc3QuZm9yRWFjaChyZXN1bHQgPT4gcmVzdWx0LnByb3BlcnR5TmFtZSA9IGAke3RoaXMubmFtZX0uJHtyZXN1bHQucHJvcGVydHlOYW1lfWApO1xuXHRcdH1cblxuXHRcdHRoaXMuX3Jlc3VsdHMuY2xlYXIoKTtcblx0XHR0aGlzLl9yZXN1bHRzLnZhbHVlID0gX3ZhbHVlO1xuXHRcdHRoaXMuX3Jlc3VsdHMubWVyZ2UocmVzdWx0TGlzdCk7XG5cblx0XHRyZXR1cm4gcmVzdWx0TGlzdDtcblx0fVxufSJdfQ==