"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Rule2 = _interopRequireDefault(require("./Rule"));

var _Severity = _interopRequireDefault(require("./Severity"));

var _ValidationResult = _interopRequireDefault(require("./ValidationResult"));

var _ValidationResultList = _interopRequireDefault(require("./ValidationResultList"));

var _quality = require("./utils/quality");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CollectionRule = /*#__PURE__*/function (_Rule) {
  _inherits(CollectionRule, _Rule);

  function CollectionRule() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, CollectionRule);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CollectionRule)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "subsetRules", new Map());

    return _this;
  }

  _createClass(CollectionRule, [{
    key: "using",
    value: function using(validatable) {
      validatable.propertyName = '';
      var meta = {
        name: validatable.propertyName,
        message: function message() {
          return '';
        },
        precondition: null,
        isValidIfEmpty: false,
        severity: _Severity["default"]["default"]
      };
      this.validators.set(validatable, meta);
      return this;
    }
  }, {
    key: "where",
    value: function where(filter, define) {
      var rule = new _Rule2["default"]('');
      var meta = {
        name: rule.propertyName,
        filter: filter
      };
      define(rule);
      this.subsetRules.set(rule, meta);
      return this;
    }
  }, {
    key: "runSubsetRules",
    value: function runSubsetRules(value, index, collection, parentValue, customOptions, results) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.subsetRules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2),
              rule = _step$value[0],
              meta = _step$value[1];

          if (meta.filter(value, index, collection, parentValue, customOptions)) {
            var resultList = rule.validate(value, parentValue, customOptions);
            results.merge(resultList);
          }
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

      return results;
    }
  }, {
    key: "getPropertyResults",
    value: function getPropertyResults(collection, parentValue, customOptions, results) {
      var _this2 = this;

      if ((0, _quality.isArray)(collection)) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          var _loop = function _loop() {
            var value = _step2.value;
            var index = collection.indexOf(value);
            var propertyName = "".concat(_this2.propertyName, "[").concat(index, "]");
            var resultList = new _ValidationResultList["default"]([], propertyName);

            _this2.runQualifiers(value, parentValue, customOptions, resultList);

            if (resultList.isValid || !_this2.stopOnFirstFailure) {
              _this2.runValidators(value, parentValue, customOptions, resultList);

              if (resultList.isValid || !_this2.stopOnFirstFailure) {
                _this2.runSubsetRules(value, index, collection, parentValue, customOptions, resultList);
              }
            }

            resultList.forEach(function (result, ndx) {
              // a little nasty, but at this time we know the first result in this.results describes the collection itself,
              // and not the values it contains.
              var _propertyName = "".concat(propertyName).concat(ndx > 0 && result.propertyName ? ".".concat(result.propertyName) : '');

              var cleanedPropertyName = _propertyName.replace(/\]\.\[/g, '][');

              result.propertyName = cleanedPropertyName;
            });
            results = results.merge(resultList);
          };

          for (var _iterator2 = collection[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            _loop();
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      } else {
        var result = new _ValidationResult["default"](this.propertyName, collection);
        result.errors['beCollection'] = "".concat(this.propertyName, " must be a collection.");
        results.push(result);
      }

      return results;
    }
  }]);

  return CollectionRule;
}(_Rule2["default"]);

exports["default"] = CollectionRule;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Db2xsZWN0aW9uUnVsZS50cyJdLCJuYW1lcyI6WyJDb2xsZWN0aW9uUnVsZSIsIk1hcCIsInZhbGlkYXRhYmxlIiwicHJvcGVydHlOYW1lIiwibWV0YSIsIm5hbWUiLCJtZXNzYWdlIiwicHJlY29uZGl0aW9uIiwiaXNWYWxpZElmRW1wdHkiLCJzZXZlcml0eSIsIlNldmVyaXR5IiwidmFsaWRhdG9ycyIsInNldCIsImZpbHRlciIsImRlZmluZSIsInJ1bGUiLCJSdWxlIiwic3Vic2V0UnVsZXMiLCJ2YWx1ZSIsImluZGV4IiwiY29sbGVjdGlvbiIsInBhcmVudFZhbHVlIiwiY3VzdG9tT3B0aW9ucyIsInJlc3VsdHMiLCJyZXN1bHRMaXN0IiwidmFsaWRhdGUiLCJtZXJnZSIsImluZGV4T2YiLCJWYWxpZGF0aW9uUmVzdWx0TGlzdCIsInJ1blF1YWxpZmllcnMiLCJpc1ZhbGlkIiwic3RvcE9uRmlyc3RGYWlsdXJlIiwicnVuVmFsaWRhdG9ycyIsInJ1blN1YnNldFJ1bGVzIiwiZm9yRWFjaCIsInJlc3VsdCIsIm5keCIsIl9wcm9wZXJ0eU5hbWUiLCJjbGVhbmVkUHJvcGVydHlOYW1lIiwicmVwbGFjZSIsIlZhbGlkYXRpb25SZXN1bHQiLCJlcnJvcnMiLCJwdXNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBSUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxjOzs7Ozs7Ozs7Ozs7Ozs7O2tFQUN5RCxJQUFJQyxHQUFKLEU7Ozs7Ozs7MEJBRWhFQyxXLEVBQXVHO0FBQ25IQSxNQUFBQSxXQUFXLENBQUNDLFlBQVosR0FBMkIsRUFBM0I7QUFFQSxVQUFJQyxJQUFJLEdBQUc7QUFDVkMsUUFBQUEsSUFBSSxFQUFFSCxXQUFXLENBQUNDLFlBRFI7QUFFVkcsUUFBQUEsT0FBTyxFQUFFO0FBQUEsaUJBQU0sRUFBTjtBQUFBLFNBRkM7QUFHVkMsUUFBQUEsWUFBWSxFQUFFLElBSEo7QUFJVkMsUUFBQUEsY0FBYyxFQUFFLEtBSk47QUFLVkMsUUFBQUEsUUFBUSxFQUFFQztBQUxBLE9BQVg7QUFRQSxXQUFLQyxVQUFMLENBQWdCQyxHQUFoQixDQUFvQlYsV0FBcEIsRUFBaUNFLElBQWpDO0FBQ0EsYUFBTyxJQUFQO0FBQ0E7OzswQkFFWVMsTSxFQUF5REMsTSxFQUEwRztBQUMvSyxVQUFJQyxJQUFJLEdBQUcsSUFBSUMsaUJBQUosQ0FBdUMsRUFBdkMsQ0FBWDtBQUNBLFVBQUlaLElBQUksR0FBRztBQUNWQyxRQUFBQSxJQUFJLEVBQUVVLElBQUksQ0FBQ1osWUFERDtBQUVWVSxRQUFBQSxNQUFNLEVBQU5BO0FBRlUsT0FBWDtBQUtBQyxNQUFBQSxNQUFNLENBQUNDLElBQUQsQ0FBTjtBQUNBLFdBQUtFLFdBQUwsQ0FBaUJMLEdBQWpCLENBQXFCRyxJQUFyQixFQUEyQlgsSUFBM0I7QUFFQSxhQUFPLElBQVA7QUFDQTs7O21DQUV3QmMsSyxFQUFZQyxLLEVBQWVDLFUsRUFBZ0JDLFcsRUFBa0JDLGEsRUFBb0JDLE8sRUFBcUQ7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFDOUosNkJBQXlCLEtBQUtOLFdBQTlCLDhIQUEyQztBQUFBO0FBQUEsY0FBakNGLElBQWlDO0FBQUEsY0FBM0JYLElBQTJCOztBQUMxQyxjQUFJQSxJQUFJLENBQUNTLE1BQUwsQ0FBWUssS0FBWixFQUFtQkMsS0FBbkIsRUFBMEJDLFVBQTFCLEVBQXNDQyxXQUF0QyxFQUFtREMsYUFBbkQsQ0FBSixFQUF1RTtBQUN0RSxnQkFBSUUsVUFBVSxHQUFHVCxJQUFJLENBQUNVLFFBQUwsQ0FBY1AsS0FBZCxFQUFxQkcsV0FBckIsRUFBa0NDLGFBQWxDLENBQWpCO0FBQ0FDLFlBQUFBLE9BQU8sQ0FBQ0csS0FBUixDQUFjRixVQUFkO0FBQ0E7QUFDRDtBQU42SjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQVE5SixhQUFPRCxPQUFQO0FBQ0E7Ozt1Q0FFNEJILFUsRUFBZ0JDLFcsRUFBa0JDLGEsRUFBb0JDLE8sRUFBcUQ7QUFBQTs7QUFDdkksVUFBSSxzQkFBUUgsVUFBUixDQUFKLEVBQXlCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxnQkFDZkYsS0FEZTtBQUV2QixnQkFBTUMsS0FBSyxHQUFHQyxVQUFVLENBQUNPLE9BQVgsQ0FBbUJULEtBQW5CLENBQWQ7QUFDQSxnQkFBTWYsWUFBWSxhQUFNLE1BQUksQ0FBQ0EsWUFBWCxjQUEyQmdCLEtBQTNCLE1BQWxCO0FBQ0EsZ0JBQUlLLFVBQVUsR0FBRyxJQUFJSSxnQ0FBSixDQUF5QixFQUF6QixFQUE2QnpCLFlBQTdCLENBQWpCOztBQUNBLFlBQUEsTUFBSSxDQUFDMEIsYUFBTCxDQUFtQlgsS0FBbkIsRUFBMEJHLFdBQTFCLEVBQXVDQyxhQUF2QyxFQUFzREUsVUFBdEQ7O0FBRUEsZ0JBQUlBLFVBQVUsQ0FBQ00sT0FBWCxJQUFzQixDQUFDLE1BQUksQ0FBQ0Msa0JBQWhDLEVBQW9EO0FBQ25ELGNBQUEsTUFBSSxDQUFDQyxhQUFMLENBQW1CZCxLQUFuQixFQUEwQkcsV0FBMUIsRUFBdUNDLGFBQXZDLEVBQXNERSxVQUF0RDs7QUFFQSxrQkFBSUEsVUFBVSxDQUFDTSxPQUFYLElBQXNCLENBQUMsTUFBSSxDQUFDQyxrQkFBaEMsRUFBb0Q7QUFDbkQsZ0JBQUEsTUFBSSxDQUFDRSxjQUFMLENBQW9CZixLQUFwQixFQUEyQkMsS0FBM0IsRUFBa0NDLFVBQWxDLEVBQThDQyxXQUE5QyxFQUEyREMsYUFBM0QsRUFBMEVFLFVBQTFFO0FBQ0E7QUFDRDs7QUFFREEsWUFBQUEsVUFBVSxDQUFDVSxPQUFYLENBQW1CLFVBQUNDLE1BQUQsRUFBU0MsR0FBVCxFQUFpQjtBQUNuQztBQUNBO0FBQ0Esa0JBQU1DLGFBQWEsYUFBTWxDLFlBQU4sU0FBc0JpQyxHQUFHLEdBQUcsQ0FBTixJQUFXRCxNQUFNLENBQUNoQyxZQUFuQixjQUF1Q2dDLE1BQU0sQ0FBQ2hDLFlBQTlDLElBQStELEVBQXBGLENBQW5COztBQUNBLGtCQUFNbUMsbUJBQW1CLEdBQUdELGFBQWEsQ0FBQ0UsT0FBZCxDQUFzQixTQUF0QixFQUFpQyxJQUFqQyxDQUE1Qjs7QUFDQUosY0FBQUEsTUFBTSxDQUFDaEMsWUFBUCxHQUFzQm1DLG1CQUF0QjtBQUNBLGFBTkQ7QUFRQWYsWUFBQUEsT0FBTyxHQUFHQSxPQUFPLENBQUNHLEtBQVIsQ0FBY0YsVUFBZCxDQUFWO0FBdkJ1Qjs7QUFDeEIsZ0NBQWtCSixVQUFsQixtSUFBOEI7QUFBQTtBQXVCN0I7QUF4QnVCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUF5QnhCLE9BekJELE1BeUJPO0FBQ04sWUFBTWUsTUFBTSxHQUFHLElBQUlLLDRCQUFKLENBQXFCLEtBQUtyQyxZQUExQixFQUF3Q2lCLFVBQXhDLENBQWY7QUFDQWUsUUFBQUEsTUFBTSxDQUFDTSxNQUFQLENBQWMsY0FBZCxjQUFtQyxLQUFLdEMsWUFBeEM7QUFDQW9CLFFBQUFBLE9BQU8sQ0FBQ21CLElBQVIsQ0FBYVAsTUFBYjtBQUNBOztBQUVELGFBQU9aLE9BQVA7QUFDQTs7OztFQTNFb0ZQLGlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJ1bGUgZnJvbSAnLi9SdWxlJztcbmltcG9ydCBTZXZlcml0eSBmcm9tICcuL1NldmVyaXR5JztcbmltcG9ydCBWYWxpZGF0aW9uUmVzdWx0IGZyb20gJy4vVmFsaWRhdGlvblJlc3VsdCc7XG5pbXBvcnQgVmFsaWRhdGlvblJlc3VsdExpc3QgZnJvbSAnLi9WYWxpZGF0aW9uUmVzdWx0TGlzdCc7XG5cbmltcG9ydCB7IElWYWxpZGF0YWJsZSwgVENvbGxlY3Rpb25GaWx0ZXIsIFRTdWJzZXRSdWxlQ29sbGVjdGlvbiB9IGZyb20gJy4vdHlwZXMnO1xuXG5pbXBvcnQgeyBpc0FycmF5IH0gZnJvbSAnLi91dGlscy9xdWFsaXR5JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sbGVjdGlvblJ1bGU8VFBhcmVudFZhbHVlID0gYW55LCBUQ3VzdG9tT3B0aW9ucyA9IGFueT4gZXh0ZW5kcyBSdWxlPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+IHtcblx0cHJvdGVjdGVkIHN1YnNldFJ1bGVzOiBUU3Vic2V0UnVsZUNvbGxlY3Rpb248VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4gPSBuZXcgTWFwKCk7XG5cblx0cHVibGljIHVzaW5nKHZhbGlkYXRhYmxlOiBJVmFsaWRhdGFibGU8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4pOiBDb2xsZWN0aW9uUnVsZTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiB7XG5cdFx0dmFsaWRhdGFibGUucHJvcGVydHlOYW1lID0gJyc7XG5cblx0XHRsZXQgbWV0YSA9IHtcblx0XHRcdG5hbWU6IHZhbGlkYXRhYmxlLnByb3BlcnR5TmFtZSxcblx0XHRcdG1lc3NhZ2U6ICgpID0+ICcnLFxuXHRcdFx0cHJlY29uZGl0aW9uOiBudWxsLFxuXHRcdFx0aXNWYWxpZElmRW1wdHk6IGZhbHNlLFxuXHRcdFx0c2V2ZXJpdHk6IFNldmVyaXR5LmRlZmF1bHRcblx0XHR9O1xuXG5cdFx0dGhpcy52YWxpZGF0b3JzLnNldCh2YWxpZGF0YWJsZSwgbWV0YSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRwdWJsaWMgd2hlcmUoZmlsdGVyOiBUQ29sbGVjdGlvbkZpbHRlcjxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiwgZGVmaW5lOiAocnVsZTogUnVsZTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPikgPT4gdm9pZCk6IENvbGxlY3Rpb25SdWxlPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+IHtcblx0XHRsZXQgcnVsZSA9IG5ldyBSdWxlPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+KCcnKTtcblx0XHRsZXQgbWV0YSA9IHtcblx0XHRcdG5hbWU6IHJ1bGUucHJvcGVydHlOYW1lLFxuXHRcdFx0ZmlsdGVyXG5cdFx0fTtcblxuXHRcdGRlZmluZShydWxlKTtcblx0XHR0aGlzLnN1YnNldFJ1bGVzLnNldChydWxlLCBtZXRhKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cHJvdGVjdGVkIHJ1blN1YnNldFJ1bGVzKHZhbHVlOiBhbnksIGluZGV4OiBudW1iZXIsIGNvbGxlY3Rpb246IFtdLCBwYXJlbnRWYWx1ZTogYW55LCBjdXN0b21PcHRpb25zOiBhbnksIHJlc3VsdHM6IFZhbGlkYXRpb25SZXN1bHRMaXN0KTogVmFsaWRhdGlvblJlc3VsdExpc3Qge1xuXHRcdGZvciAobGV0IFtydWxlLCBtZXRhXSBvZiB0aGlzLnN1YnNldFJ1bGVzKSB7XG5cdFx0XHRpZiAobWV0YS5maWx0ZXIodmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uLCBwYXJlbnRWYWx1ZSwgY3VzdG9tT3B0aW9ucykpIHtcblx0XHRcdFx0bGV0IHJlc3VsdExpc3QgPSBydWxlLnZhbGlkYXRlKHZhbHVlLCBwYXJlbnRWYWx1ZSwgY3VzdG9tT3B0aW9ucyk7XG5cdFx0XHRcdHJlc3VsdHMubWVyZ2UocmVzdWx0TGlzdCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdHM7XG5cdH1cblxuXHRwcm90ZWN0ZWQgZ2V0UHJvcGVydHlSZXN1bHRzKGNvbGxlY3Rpb246IFtdLCBwYXJlbnRWYWx1ZTogYW55LCBjdXN0b21PcHRpb25zOiBhbnksIHJlc3VsdHM6IFZhbGlkYXRpb25SZXN1bHRMaXN0KTogVmFsaWRhdGlvblJlc3VsdExpc3Qge1xuXHRcdGlmIChpc0FycmF5KGNvbGxlY3Rpb24pKSB7XG5cdFx0XHRmb3IgKGxldCB2YWx1ZSBvZiBjb2xsZWN0aW9uKSB7XG5cdFx0XHRcdGNvbnN0IGluZGV4ID0gY29sbGVjdGlvbi5pbmRleE9mKHZhbHVlKTtcblx0XHRcdFx0Y29uc3QgcHJvcGVydHlOYW1lID0gYCR7dGhpcy5wcm9wZXJ0eU5hbWV9WyR7aW5kZXh9XWA7XG5cdFx0XHRcdGxldCByZXN1bHRMaXN0ID0gbmV3IFZhbGlkYXRpb25SZXN1bHRMaXN0KFtdLCBwcm9wZXJ0eU5hbWUpO1xuXHRcdFx0XHR0aGlzLnJ1blF1YWxpZmllcnModmFsdWUsIHBhcmVudFZhbHVlLCBjdXN0b21PcHRpb25zLCByZXN1bHRMaXN0KTtcblxuXHRcdFx0XHRpZiAocmVzdWx0TGlzdC5pc1ZhbGlkIHx8ICF0aGlzLnN0b3BPbkZpcnN0RmFpbHVyZSkge1xuXHRcdFx0XHRcdHRoaXMucnVuVmFsaWRhdG9ycyh2YWx1ZSwgcGFyZW50VmFsdWUsIGN1c3RvbU9wdGlvbnMsIHJlc3VsdExpc3QpO1xuXG5cdFx0XHRcdFx0aWYgKHJlc3VsdExpc3QuaXNWYWxpZCB8fCAhdGhpcy5zdG9wT25GaXJzdEZhaWx1cmUpIHtcblx0XHRcdFx0XHRcdHRoaXMucnVuU3Vic2V0UnVsZXModmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uLCBwYXJlbnRWYWx1ZSwgY3VzdG9tT3B0aW9ucywgcmVzdWx0TGlzdCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmVzdWx0TGlzdC5mb3JFYWNoKChyZXN1bHQsIG5keCkgPT4ge1xuXHRcdFx0XHRcdC8vIGEgbGl0dGxlIG5hc3R5LCBidXQgYXQgdGhpcyB0aW1lIHdlIGtub3cgdGhlIGZpcnN0IHJlc3VsdCBpbiB0aGlzLnJlc3VsdHMgZGVzY3JpYmVzIHRoZSBjb2xsZWN0aW9uIGl0c2VsZixcblx0XHRcdFx0XHQvLyBhbmQgbm90IHRoZSB2YWx1ZXMgaXQgY29udGFpbnMuXG5cdFx0XHRcdFx0Y29uc3QgX3Byb3BlcnR5TmFtZSA9IGAke3Byb3BlcnR5TmFtZX0keyhuZHggPiAwICYmIHJlc3VsdC5wcm9wZXJ0eU5hbWUpID8gYC4ke3Jlc3VsdC5wcm9wZXJ0eU5hbWV9YCA6ICcnfWA7XG5cdFx0XHRcdFx0Y29uc3QgY2xlYW5lZFByb3BlcnR5TmFtZSA9IF9wcm9wZXJ0eU5hbWUucmVwbGFjZSgvXFxdXFwuXFxbL2csICddWycpO1xuXHRcdFx0XHRcdHJlc3VsdC5wcm9wZXJ0eU5hbWUgPSBjbGVhbmVkUHJvcGVydHlOYW1lO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRyZXN1bHRzID0gcmVzdWx0cy5tZXJnZShyZXN1bHRMaXN0KTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgcmVzdWx0ID0gbmV3IFZhbGlkYXRpb25SZXN1bHQodGhpcy5wcm9wZXJ0eU5hbWUsIGNvbGxlY3Rpb24pO1xuXHRcdFx0cmVzdWx0LmVycm9yc1snYmVDb2xsZWN0aW9uJ10gPSBgJHt0aGlzLnByb3BlcnR5TmFtZX0gbXVzdCBiZSBhIGNvbGxlY3Rpb24uYDtcblx0XHRcdHJlc3VsdHMucHVzaChyZXN1bHQpO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHRzO1xuXHR9XG59Il19