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
      validatable.name = '';
      var meta = {
        name: validatable.name,
        message: '',
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
      var rule = new _Rule2["default"](this.name);
      var meta = {
        name: rule.name,
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
            var propertyName = "".concat(_this2.name, "[").concat(index, "]");
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
              result.propertyName = "".concat(propertyName).concat(ndx > 0 ? ".".concat(result.propertyName) : '');
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
        var result = new _ValidationResult["default"](this.name, collection);
        result.errors['beCollection'] = "".concat(this.name, " must be a collection.");
        results.push(result);
      }

      return results;
    }
  }]);

  return CollectionRule;
}(_Rule2["default"]);

exports["default"] = CollectionRule;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Db2xsZWN0aW9uUnVsZS50cyJdLCJuYW1lcyI6WyJDb2xsZWN0aW9uUnVsZSIsIk1hcCIsInZhbGlkYXRhYmxlIiwibmFtZSIsIm1ldGEiLCJtZXNzYWdlIiwicHJlY29uZGl0aW9uIiwiaXNWYWxpZElmRW1wdHkiLCJzZXZlcml0eSIsIlNldmVyaXR5IiwiX3ZhbGlkYXRvcnMiLCJzZXQiLCJmaWx0ZXIiLCJkZWZpbmUiLCJydWxlIiwiUnVsZSIsIl9zdWJzZXRSdWxlcyIsInZhbHVlIiwiaW5kZXgiLCJjb2xsZWN0aW9uIiwicGFyZW50VmFsdWUiLCJjdXN0b21PcHRpb25zIiwicmVzdWx0cyIsInJlc3VsdExpc3QiLCJ2YWxpZGF0ZSIsIm1lcmdlIiwiaW5kZXhPZiIsInByb3BlcnR5TmFtZSIsIlZhbGlkYXRpb25SZXN1bHRMaXN0IiwiX19ydW5RdWFsaWZpZXJzIiwiaXNWYWxpZCIsIl9zdG9wT25GaXJzdEZhaWx1cmUiLCJfX3J1blZhbGlkYXRvcnMiLCJfX3J1blN1YnNldFJ1bGVzIiwiZm9yRWFjaCIsInJlc3VsdCIsIm5keCIsIlZhbGlkYXRpb25SZXN1bHQiLCJlcnJvcnMiLCJwdXNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBSUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxjOzs7Ozs7Ozs7Ozs7Ozs7O21FQUM0QixJQUFJQyxHQUFKLEU7Ozs7Ozs7MEJBRW5DQyxXLEVBQTJDO0FBQ3ZEQSxNQUFBQSxXQUFXLENBQUNDLElBQVosR0FBbUIsRUFBbkI7QUFFQSxVQUFJQyxJQUFJLEdBQUc7QUFDVkQsUUFBQUEsSUFBSSxFQUFFRCxXQUFXLENBQUNDLElBRFI7QUFFVkUsUUFBQUEsT0FBTyxFQUFFLEVBRkM7QUFHVkMsUUFBQUEsWUFBWSxFQUFFLElBSEo7QUFJVkMsUUFBQUEsY0FBYyxFQUFFLEtBSk47QUFLVkMsUUFBQUEsUUFBUSxFQUFFQztBQUxBLE9BQVg7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Qjs7QUFDeEIsZ0NBQWtCSixVQUFsQixtSUFBOEI7QUFBQTtBQXFCN0I7QUF0QnVCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUF1QnhCLE9BdkJELE1BdUJPO0FBQ04sWUFBTWdCLE1BQU0sR0FBRyxJQUFJRSw0QkFBSixDQUFxQixLQUFLbEMsSUFBMUIsRUFBZ0NnQixVQUFoQyxDQUFmO0FBQ0FnQixRQUFBQSxNQUFNLENBQUNHLE1BQVAsQ0FBYyxjQUFkLGNBQW1DLEtBQUtuQyxJQUF4QztBQUNBbUIsUUFBQUEsT0FBTyxDQUFDaUIsSUFBUixDQUFhSixNQUFiO0FBQ0E7O0FBRUQsYUFBT2IsT0FBUDtBQUNBOzs7O0VBekUwQ1AsaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUnVsZSBmcm9tICcuL1J1bGUnO1xuaW1wb3J0IFNldmVyaXR5IGZyb20gJy4vU2V2ZXJpdHknO1xuaW1wb3J0IFZhbGlkYXRpb25SZXN1bHQgZnJvbSAnLi9WYWxpZGF0aW9uUmVzdWx0JztcbmltcG9ydCBWYWxpZGF0aW9uUmVzdWx0TGlzdCBmcm9tICcuL1ZhbGlkYXRpb25SZXN1bHRMaXN0JztcblxuaW1wb3J0IHsgSVZhbGlkYXRhYmxlLCBUQ29sbGVjdGlvbkZpbHRlciwgVFN1YnNldFJ1bGVDb2xsZWN0aW9uIH0gZnJvbSAnLi90eXBlcyc7XG5cbmltcG9ydCB7IGlzQXJyYXkgfSBmcm9tICcuL3V0aWxzL3F1YWxpdHknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xsZWN0aW9uUnVsZSBleHRlbmRzIFJ1bGUge1xuXHRwcm90ZWN0ZWQgX3N1YnNldFJ1bGVzOiBUU3Vic2V0UnVsZUNvbGxlY3Rpb24gPSBuZXcgTWFwKCk7XG5cblx0cHVibGljIHVzaW5nKHZhbGlkYXRhYmxlOiBJVmFsaWRhdGFibGUpOiBDb2xsZWN0aW9uUnVsZSB7XG5cdFx0dmFsaWRhdGFibGUubmFtZSA9ICcnO1xuXG5cdFx0bGV0IG1ldGEgPSB7XG5cdFx0XHRuYW1lOiB2YWxpZGF0YWJsZS5uYW1lLFxuXHRcdFx0bWVzc2FnZTogJycsXG5cdFx0XHRwcmVjb25kaXRpb246IG51bGwsXG5cdFx0XHRpc1ZhbGlkSWZFbXB0eTogZmFsc2UsXG5cdFx0XHRzZXZlcml0eTogU2V2ZXJpdHkuZGVmYXVsdFxuXHRcdH07XG5cblx0XHR0aGlzLl92YWxpZGF0b3JzLnNldCh2YWxpZGF0YWJsZSwgbWV0YSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRwdWJsaWMgd2hlcmUoZmlsdGVyOiBUQ29sbGVjdGlvbkZpbHRlciwgZGVmaW5lOiAocnVsZTogUnVsZSkgPT4gdm9pZCk6IENvbGxlY3Rpb25SdWxlIHtcblx0XHRsZXQgcnVsZSA9IG5ldyBSdWxlKHRoaXMubmFtZSk7XG5cdFx0bGV0IG1ldGEgPSB7XG5cdFx0XHRuYW1lOiBydWxlLm5hbWUsXG5cdFx0XHRmaWx0ZXJcblx0XHR9O1xuXG5cdFx0ZGVmaW5lKHJ1bGUpO1xuXHRcdHRoaXMuX3N1YnNldFJ1bGVzLnNldChydWxlLCBtZXRhKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cHJvdGVjdGVkIF9fcnVuU3Vic2V0UnVsZXModmFsdWU6IGFueSwgaW5kZXg6IG51bWJlciwgY29sbGVjdGlvbjogW10sIHBhcmVudFZhbHVlOiBhbnksIGN1c3RvbU9wdGlvbnM6IGFueSwgcmVzdWx0czogVmFsaWRhdGlvblJlc3VsdExpc3QpOiBWYWxpZGF0aW9uUmVzdWx0TGlzdCB7XG5cdFx0Zm9yIChsZXQgW3J1bGUsIG1ldGFdIG9mIHRoaXMuX3N1YnNldFJ1bGVzKSB7XG5cdFx0XHRpZiAobWV0YS5maWx0ZXIodmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uLCBwYXJlbnRWYWx1ZSwgY3VzdG9tT3B0aW9ucykpIHtcblx0XHRcdFx0bGV0IHJlc3VsdExpc3QgPSBydWxlLnZhbGlkYXRlKHZhbHVlLCBwYXJlbnRWYWx1ZSwgY3VzdG9tT3B0aW9ucyk7XG5cdFx0XHRcdHJlc3VsdHMubWVyZ2UocmVzdWx0TGlzdCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdHM7XG5cdH1cblxuXHRwcm90ZWN0ZWQgX19nZXRQcm9wZXJ0eVJlc3VsdHMoY29sbGVjdGlvbjogW10sIHBhcmVudFZhbHVlOiBhbnksIGN1c3RvbU9wdGlvbnM6IGFueSwgcmVzdWx0czogVmFsaWRhdGlvblJlc3VsdExpc3QpOiBWYWxpZGF0aW9uUmVzdWx0TGlzdCB7XG5cdFx0aWYgKGlzQXJyYXkoY29sbGVjdGlvbikpIHtcblx0XHRcdGZvciAobGV0IHZhbHVlIG9mIGNvbGxlY3Rpb24pIHtcblx0XHRcdFx0Y29uc3QgaW5kZXggPSBjb2xsZWN0aW9uLmluZGV4T2YodmFsdWUpO1xuXHRcdFx0XHRjb25zdCBwcm9wZXJ0eU5hbWUgPSBgJHt0aGlzLm5hbWV9WyR7aW5kZXh9XWA7XG5cdFx0XHRcdGxldCByZXN1bHRMaXN0ID0gbmV3IFZhbGlkYXRpb25SZXN1bHRMaXN0KFtdLCBwcm9wZXJ0eU5hbWUpO1xuXHRcdFx0XHR0aGlzLl9fcnVuUXVhbGlmaWVycyh2YWx1ZSwgcGFyZW50VmFsdWUsIGN1c3RvbU9wdGlvbnMsIHJlc3VsdExpc3QpO1xuXG5cdFx0XHRcdGlmIChyZXN1bHRMaXN0LmlzVmFsaWQgfHwgIXRoaXMuX3N0b3BPbkZpcnN0RmFpbHVyZSkge1xuXHRcdFx0XHRcdHRoaXMuX19ydW5WYWxpZGF0b3JzKHZhbHVlLCBwYXJlbnRWYWx1ZSwgY3VzdG9tT3B0aW9ucywgcmVzdWx0TGlzdCk7XG5cblx0XHRcdFx0XHRpZiAocmVzdWx0TGlzdC5pc1ZhbGlkIHx8ICF0aGlzLl9zdG9wT25GaXJzdEZhaWx1cmUpIHtcblx0XHRcdFx0XHRcdHRoaXMuX19ydW5TdWJzZXRSdWxlcyh2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24sIHBhcmVudFZhbHVlLCBjdXN0b21PcHRpb25zLCByZXN1bHRMaXN0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXN1bHRMaXN0LmZvckVhY2goKHJlc3VsdCwgbmR4KSA9PiB7XG5cdFx0XHRcdFx0Ly8gYSBsaXR0bGUgbmFzdHksIGJ1dCBhdCB0aGlzIHRpbWUgd2Uga25vdyB0aGUgZmlyc3QgcmVzdWx0IGluIHRoaXMuX3Jlc3VsdHMgZGVzY3JpYmVzIHRoZSBjb2xsZWN0aW9uIGl0c2VsZixcblx0XHRcdFx0XHQvLyBhbmQgbm90IHRoZSB2YWx1ZXMgaXQgY29udGFpbnMuXG5cdFx0XHRcdFx0cmVzdWx0LnByb3BlcnR5TmFtZSA9IGAke3Byb3BlcnR5TmFtZX0ke25keCA+IDAgPyBgLiR7cmVzdWx0LnByb3BlcnR5TmFtZX1gIDogJyd9YDtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0cmVzdWx0cyA9IHJlc3VsdHMubWVyZ2UocmVzdWx0TGlzdCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IHJlc3VsdCA9IG5ldyBWYWxpZGF0aW9uUmVzdWx0KHRoaXMubmFtZSwgY29sbGVjdGlvbik7XG5cdFx0XHRyZXN1bHQuZXJyb3JzWydiZUNvbGxlY3Rpb24nXSA9IGAke3RoaXMubmFtZX0gbXVzdCBiZSBhIGNvbGxlY3Rpb24uYDtcblx0XHRcdHJlc3VsdHMucHVzaChyZXN1bHQpO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHRzO1xuXHR9XG59Il19