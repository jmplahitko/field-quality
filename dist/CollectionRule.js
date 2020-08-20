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

    _defineProperty(_assertThisInitialized(_this), "_subsetRules", new Map());

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

      this._validators.set(validatable, meta);

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

      this._subsetRules.set(rule, meta);

      return this;
    }
  }, {
    key: "__runSubsetRules",
    value: function __runSubsetRules(value, index, collection, parentValue, customOptions, results) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._subsetRules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
    key: "__getPropertyResults",
    value: function __getPropertyResults(collection, parentValue, customOptions, results) {
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

            _this2.__runQualifiers(value, parentValue, customOptions, resultList);

            if (resultList.isValid || !_this2._stopOnFirstFailure) {
              _this2.__runValidators(value, parentValue, customOptions, resultList);

              if (resultList.isValid || !_this2._stopOnFirstFailure) {
                _this2.__runSubsetRules(value, index, collection, parentValue, customOptions, resultList);
              }
            }

            resultList.forEach(function (result, ndx) {
              // a little nasty, but at this time we know the first result in this._results describes the collection itself,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Db2xsZWN0aW9uUnVsZS50cyJdLCJuYW1lcyI6WyJDb2xsZWN0aW9uUnVsZSIsIk1hcCIsInZhbGlkYXRhYmxlIiwicHJvcGVydHlOYW1lIiwibWV0YSIsIm5hbWUiLCJtZXNzYWdlIiwicHJlY29uZGl0aW9uIiwiaXNWYWxpZElmRW1wdHkiLCJzZXZlcml0eSIsIlNldmVyaXR5IiwiX3ZhbGlkYXRvcnMiLCJzZXQiLCJmaWx0ZXIiLCJkZWZpbmUiLCJydWxlIiwiUnVsZSIsIl9zdWJzZXRSdWxlcyIsInZhbHVlIiwiaW5kZXgiLCJjb2xsZWN0aW9uIiwicGFyZW50VmFsdWUiLCJjdXN0b21PcHRpb25zIiwicmVzdWx0cyIsInJlc3VsdExpc3QiLCJ2YWxpZGF0ZSIsIm1lcmdlIiwiaW5kZXhPZiIsIlZhbGlkYXRpb25SZXN1bHRMaXN0IiwiX19ydW5RdWFsaWZpZXJzIiwiaXNWYWxpZCIsIl9zdG9wT25GaXJzdEZhaWx1cmUiLCJfX3J1blZhbGlkYXRvcnMiLCJfX3J1blN1YnNldFJ1bGVzIiwiZm9yRWFjaCIsInJlc3VsdCIsIm5keCIsIl9wcm9wZXJ0eU5hbWUiLCJjbGVhbmVkUHJvcGVydHlOYW1lIiwicmVwbGFjZSIsIlZhbGlkYXRpb25SZXN1bHQiLCJlcnJvcnMiLCJwdXNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBSUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxjOzs7Ozs7Ozs7Ozs7Ozs7O21FQUMwRCxJQUFJQyxHQUFKLEU7Ozs7Ozs7MEJBRWpFQyxXLEVBQXVHO0FBQ25IQSxNQUFBQSxXQUFXLENBQUNDLFlBQVosR0FBMkIsRUFBM0I7QUFFQSxVQUFJQyxJQUFJLEdBQUc7QUFDVkMsUUFBQUEsSUFBSSxFQUFFSCxXQUFXLENBQUNDLFlBRFI7QUFFVkcsUUFBQUEsT0FBTyxFQUFFO0FBQUEsaUJBQU0sRUFBTjtBQUFBLFNBRkM7QUFHVkMsUUFBQUEsWUFBWSxF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SUFBK0QsRUFBcEYsQ0FBbkI7O0FBQ0Esa0JBQU1tQyxtQkFBbUIsR0FBR0QsYUFBYSxDQUFDRSxPQUFkLENBQXNCLFNBQXRCLEVBQWlDLElBQWpDLENBQTVCOztBQUNBSixjQUFBQSxNQUFNLENBQUNoQyxZQUFQLEdBQXNCbUMsbUJBQXRCO0FBQ0EsYUFORDtBQVFBZixZQUFBQSxPQUFPLEdBQUdBLE9BQU8sQ0FBQ0csS0FBUixDQUFjRixVQUFkLENBQVY7QUF2QnVCOztBQUN4QixnQ0FBa0JKLFVBQWxCLG1JQUE4QjtBQUFBO0FBdUI3QjtBQXhCdUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQXlCeEIsT0F6QkQsTUF5Qk87QUFDTixZQUFNZSxNQUFNLEdBQUcsSUFBSUssNEJBQUosQ0FBcUIsS0FBS3JDLFlBQTFCLEVBQXdDaUIsVUFBeEMsQ0FBZjtBQUNBZSxRQUFBQSxNQUFNLENBQUNNLE1BQVAsQ0FBYyxjQUFkLGNBQW1DLEtBQUt0QyxZQUF4QztBQUNBb0IsUUFBQUEsT0FBTyxDQUFDbUIsSUFBUixDQUFhUCxNQUFiO0FBQ0E7O0FBRUQsYUFBT1osT0FBUDtBQUNBOzs7O0VBM0VvRlAsaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUnVsZSBmcm9tICcuL1J1bGUnO1xuaW1wb3J0IFNldmVyaXR5IGZyb20gJy4vU2V2ZXJpdHknO1xuaW1wb3J0IFZhbGlkYXRpb25SZXN1bHQgZnJvbSAnLi9WYWxpZGF0aW9uUmVzdWx0JztcbmltcG9ydCBWYWxpZGF0aW9uUmVzdWx0TGlzdCBmcm9tICcuL1ZhbGlkYXRpb25SZXN1bHRMaXN0JztcblxuaW1wb3J0IHsgSVZhbGlkYXRhYmxlLCBUQ29sbGVjdGlvbkZpbHRlciwgVFN1YnNldFJ1bGVDb2xsZWN0aW9uIH0gZnJvbSAnLi90eXBlcyc7XG5cbmltcG9ydCB7IGlzQXJyYXkgfSBmcm9tICcuL3V0aWxzL3F1YWxpdHknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xsZWN0aW9uUnVsZTxUUGFyZW50VmFsdWUgPSBhbnksIFRDdXN0b21PcHRpb25zID0gYW55PiBleHRlbmRzIFJ1bGU8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ge1xuXHRwcm90ZWN0ZWQgX3N1YnNldFJ1bGVzOiBUU3Vic2V0UnVsZUNvbGxlY3Rpb248VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4gPSBuZXcgTWFwKCk7XG5cblx0cHVibGljIHVzaW5nKHZhbGlkYXRhYmxlOiBJVmFsaWRhdGFibGU8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4pOiBDb2xsZWN0aW9uUnVsZTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiB7XG5cdFx0dmFsaWRhdGFibGUucHJvcGVydHlOYW1lID0gJyc7XG5cblx0XHRsZXQgbWV0YSA9IHtcblx0XHRcdG5hbWU6IHZhbGlkYXRhYmxlLnByb3BlcnR5TmFtZSxcblx0XHRcdG1lc3NhZ2U6ICgpID0+ICcnLFxuXHRcdFx0cHJlY29uZGl0aW9uOiBudWxsLFxuXHRcdFx0aXNWYWxpZElmRW1wdHk6IGZhbHNlLFxuXHRcdFx0c2V2ZXJpdHk6IFNldmVyaXR5LmRlZmF1bHRcblx0XHR9O1xuXG5cdFx0dGhpcy5fdmFsaWRhdG9ycy5zZXQodmFsaWRhdGFibGUsIG1ldGEpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cHVibGljIHdoZXJlKGZpbHRlcjogVENvbGxlY3Rpb25GaWx0ZXI8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4sIGRlZmluZTogKHJ1bGU6IFJ1bGU8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4pID0+IHZvaWQpOiBDb2xsZWN0aW9uUnVsZTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiB7XG5cdFx0bGV0IHJ1bGUgPSBuZXcgUnVsZTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPignJyk7XG5cdFx0bGV0IG1ldGEgPSB7XG5cdFx0XHRuYW1lOiBydWxlLnByb3BlcnR5TmFtZSxcblx0XHRcdGZpbHRlclxuXHRcdH07XG5cblx0XHRkZWZpbmUocnVsZSk7XG5cdFx0dGhpcy5fc3Vic2V0UnVsZXMuc2V0KHJ1bGUsIG1ldGEpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRwcm90ZWN0ZWQgX19ydW5TdWJzZXRSdWxlcyh2YWx1ZTogYW55LCBpbmRleDogbnVtYmVyLCBjb2xsZWN0aW9uOiBbXSwgcGFyZW50VmFsdWU6IGFueSwgY3VzdG9tT3B0aW9uczogYW55LCByZXN1bHRzOiBWYWxpZGF0aW9uUmVzdWx0TGlzdCk6IFZhbGlkYXRpb25SZXN1bHRMaXN0IHtcblx0XHRmb3IgKGxldCBbcnVsZSwgbWV0YV0gb2YgdGhpcy5fc3Vic2V0UnVsZXMpIHtcblx0XHRcdGlmIChtZXRhLmZpbHRlcih2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24sIHBhcmVudFZhbHVlLCBjdXN0b21PcHRpb25zKSkge1xuXHRcdFx0XHRsZXQgcmVzdWx0TGlzdCA9IHJ1bGUudmFsaWRhdGUodmFsdWUsIHBhcmVudFZhbHVlLCBjdXN0b21PcHRpb25zKTtcblx0XHRcdFx0cmVzdWx0cy5tZXJnZShyZXN1bHRMaXN0KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0cztcblx0fVxuXG5cdHByb3RlY3RlZCBfX2dldFByb3BlcnR5UmVzdWx0cyhjb2xsZWN0aW9uOiBbXSwgcGFyZW50VmFsdWU6IGFueSwgY3VzdG9tT3B0aW9uczogYW55LCByZXN1bHRzOiBWYWxpZGF0aW9uUmVzdWx0TGlzdCk6IFZhbGlkYXRpb25SZXN1bHRMaXN0IHtcblx0XHRpZiAoaXNBcnJheShjb2xsZWN0aW9uKSkge1xuXHRcdFx0Zm9yIChsZXQgdmFsdWUgb2YgY29sbGVjdGlvbikge1xuXHRcdFx0XHRjb25zdCBpbmRleCA9IGNvbGxlY3Rpb24uaW5kZXhPZih2YWx1ZSk7XG5cdFx0XHRcdGNvbnN0IHByb3BlcnR5TmFtZSA9IGAke3RoaXMucHJvcGVydHlOYW1lfVske2luZGV4fV1gO1xuXHRcdFx0XHRsZXQgcmVzdWx0TGlzdCA9IG5ldyBWYWxpZGF0aW9uUmVzdWx0TGlzdChbXSwgcHJvcGVydHlOYW1lKTtcblx0XHRcdFx0dGhpcy5fX3J1blF1YWxpZmllcnModmFsdWUsIHBhcmVudFZhbHVlLCBjdXN0b21PcHRpb25zLCByZXN1bHRMaXN0KTtcblxuXHRcdFx0XHRpZiAocmVzdWx0TGlzdC5pc1ZhbGlkIHx8ICF0aGlzLl9zdG9wT25GaXJzdEZhaWx1cmUpIHtcblx0XHRcdFx0XHR0aGlzLl9fcnVuVmFsaWRhdG9ycyh2YWx1ZSwgcGFyZW50VmFsdWUsIGN1c3RvbU9wdGlvbnMsIHJlc3VsdExpc3QpO1xuXG5cdFx0XHRcdFx0aWYgKHJlc3VsdExpc3QuaXNWYWxpZCB8fCAhdGhpcy5fc3RvcE9uRmlyc3RGYWlsdXJlKSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9fcnVuU3Vic2V0UnVsZXModmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uLCBwYXJlbnRWYWx1ZSwgY3VzdG9tT3B0aW9ucywgcmVzdWx0TGlzdCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmVzdWx0TGlzdC5mb3JFYWNoKChyZXN1bHQsIG5keCkgPT4ge1xuXHRcdFx0XHRcdC8vIGEgbGl0dGxlIG5hc3R5LCBidXQgYXQgdGhpcyB0aW1lIHdlIGtub3cgdGhlIGZpcnN0IHJlc3VsdCBpbiB0aGlzLl9yZXN1bHRzIGRlc2NyaWJlcyB0aGUgY29sbGVjdGlvbiBpdHNlbGYsXG5cdFx0XHRcdFx0Ly8gYW5kIG5vdCB0aGUgdmFsdWVzIGl0IGNvbnRhaW5zLlxuXHRcdFx0XHRcdGNvbnN0IF9wcm9wZXJ0eU5hbWUgPSBgJHtwcm9wZXJ0eU5hbWV9JHsobmR4ID4gMCAmJiByZXN1bHQucHJvcGVydHlOYW1lKSA/IGAuJHtyZXN1bHQucHJvcGVydHlOYW1lfWAgOiAnJ31gO1xuXHRcdFx0XHRcdGNvbnN0IGNsZWFuZWRQcm9wZXJ0eU5hbWUgPSBfcHJvcGVydHlOYW1lLnJlcGxhY2UoL1xcXVxcLlxcWy9nLCAnXVsnKTtcblx0XHRcdFx0XHRyZXN1bHQucHJvcGVydHlOYW1lID0gY2xlYW5lZFByb3BlcnR5TmFtZTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0cmVzdWx0cyA9IHJlc3VsdHMubWVyZ2UocmVzdWx0TGlzdCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IHJlc3VsdCA9IG5ldyBWYWxpZGF0aW9uUmVzdWx0KHRoaXMucHJvcGVydHlOYW1lLCBjb2xsZWN0aW9uKTtcblx0XHRcdHJlc3VsdC5lcnJvcnNbJ2JlQ29sbGVjdGlvbiddID0gYCR7dGhpcy5wcm9wZXJ0eU5hbWV9IG11c3QgYmUgYSBjb2xsZWN0aW9uLmA7XG5cdFx0XHRyZXN1bHRzLnB1c2gocmVzdWx0KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0cztcblx0fVxufSJdfQ==