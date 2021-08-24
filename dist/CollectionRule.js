"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CollectionRule = /*#__PURE__*/function (_Rule) {
  _inherits(CollectionRule, _Rule);

  var _super = _createSuper(CollectionRule);

  function CollectionRule() {
    var _this;

    _classCallCheck(this, CollectionRule);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

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
      var _iterator = _createForOfIteratorHelper(this.subsetRules),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 2),
              rule = _step$value[0],
              meta = _step$value[1];

          if (meta.filter(value, index, collection, parentValue, customOptions)) {
            var resultList = rule.validate(value, parentValue, customOptions);
            results.merge(resultList);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return results;
    }
  }, {
    key: "getPropertyResults",
    value: function getPropertyResults(collection, parentValue, customOptions, results) {
      var _this2 = this;

      if ((0, _quality.isArray)(collection)) {
        var _iterator2 = _createForOfIteratorHelper(collection),
            _step2;

        try {
          var _loop = function _loop() {
            var value = _step2.value;
            var index = collection.indexOf(value);
            var propertyName = "".concat(_this2.propertyName, "[").concat(index, "]");
            var resultList = new _ValidationResultList["default"]([], propertyName);

            _this2.runPredicates(value, parentValue, customOptions, resultList);

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

          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            _loop();
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Db2xsZWN0aW9uUnVsZS50cyJdLCJuYW1lcyI6WyJDb2xsZWN0aW9uUnVsZSIsIk1hcCIsInZhbGlkYXRhYmxlIiwicHJvcGVydHlOYW1lIiwibWV0YSIsIm5hbWUiLCJtZXNzYWdlIiwicHJlY29uZGl0aW9uIiwiaXNWYWxpZElmRW1wdHkiLCJzZXZlcml0eSIsIlNldmVyaXR5IiwidmFsaWRhdG9ycyIsInNldCIsImZpbHRlciIsImRlZmluZSIsInJ1bGUiLCJSdWxlIiwic3Vic2V0UnVsZXMiLCJ2YWx1ZSIsImluZGV4IiwiY29sbGVjdGlvbiIsInBhcmVudFZhbHVlIiwiY3VzdG9tT3B0aW9ucyIsInJlc3VsdHMiLCJyZXN1bHRMaXN0IiwidmFsaWRhdGUiLCJtZXJnZSIsImluZGV4T2YiLCJWYWxpZGF0aW9uUmVzdWx0TGlzdCIsInJ1blByZWRpY2F0ZXMiLCJpc1ZhbGlkIiwic3RvcE9uRmlyc3RGYWlsdXJlIiwicnVuVmFsaWRhdG9ycyIsInJ1blN1YnNldFJ1bGVzIiwiZm9yRWFjaCIsInJlc3VsdCIsIm5keCIsIl9wcm9wZXJ0eU5hbWUiLCJjbGVhbmVkUHJvcGVydHlOYW1lIiwicmVwbGFjZSIsIlZhbGlkYXRpb25SZXN1bHQiLCJlcnJvcnMiLCJwdXNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFJQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVxQkEsYzs7Ozs7Ozs7Ozs7Ozs7OztrRUFDeUQsSUFBSUMsR0FBSixFOzs7Ozs7O1dBRTdFLGVBQWFDLFdBQWIsRUFBb0g7QUFDbkhBLE1BQUFBLFdBQVcsQ0FBQ0MsWUFBWixHQUEyQixFQUEzQjtBQUVBLFVBQUlDLElBQUksR0FBRztBQUNWQyxRQUFBQSxJQUFJLEVBQUVILFdBQVcsQ0FBQ0MsWUFEUjtBQUVWRyxRQUFBQSxPQUFPLEVBQUU7QUFBQSxpQkFBTSxFQUFOO0FBQUEsU0FGQztBQUdWQyxRQUFB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dUNnQyxNQUFNLENBQUNoQyxZQUE5QyxJQUErRCxFQUFwRixDQUFuQjs7QUFDQSxrQkFBTW1DLG1CQUFtQixHQUFHRCxhQUFhLENBQUNFLE9BQWQsQ0FBc0IsU0FBdEIsRUFBaUMsSUFBakMsQ0FBNUI7O0FBQ0FKLGNBQUFBLE1BQU0sQ0FBQ2hDLFlBQVAsR0FBc0JtQyxtQkFBdEI7QUFDQSxhQU5EO0FBUUFmLFlBQUFBLE9BQU8sR0FBR0EsT0FBTyxDQUFDRyxLQUFSLENBQWNGLFVBQWQsQ0FBVjtBQXZCdUI7O0FBQ3hCLGlFQUE4QjtBQUFBO0FBdUI3QjtBQXhCdUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQXlCeEIsT0F6QkQsTUF5Qk87QUFDTixZQUFNVyxNQUFNLEdBQUcsSUFBSUssNEJBQUosQ0FBcUIsS0FBS3JDLFlBQTFCLEVBQXdDaUIsVUFBeEMsQ0FBZjtBQUNBZSxRQUFBQSxNQUFNLENBQUNNLE1BQVAsQ0FBYyxjQUFkLGNBQW1DLEtBQUt0QyxZQUF4QztBQUNBb0IsUUFBQUEsT0FBTyxDQUFDbUIsSUFBUixDQUFhUCxNQUFiO0FBQ0E7O0FBRUQsYUFBT1osT0FBUDtBQUNBOzs7O0VBM0VvRlAsaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUnVsZSBmcm9tICcuL1J1bGUnO1xuaW1wb3J0IFNldmVyaXR5IGZyb20gJy4vU2V2ZXJpdHknO1xuaW1wb3J0IFZhbGlkYXRpb25SZXN1bHQgZnJvbSAnLi9WYWxpZGF0aW9uUmVzdWx0JztcbmltcG9ydCBWYWxpZGF0aW9uUmVzdWx0TGlzdCBmcm9tICcuL1ZhbGlkYXRpb25SZXN1bHRMaXN0JztcblxuaW1wb3J0IHsgSVZhbGlkYXRhYmxlLCBUQ29sbGVjdGlvbkZpbHRlciwgVFN1YnNldFJ1bGVDb2xsZWN0aW9uIH0gZnJvbSAnLi90eXBlcyc7XG5cbmltcG9ydCB7IGlzQXJyYXkgfSBmcm9tICcuL3V0aWxzL3F1YWxpdHknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xsZWN0aW9uUnVsZTxUUGFyZW50VmFsdWUgPSBhbnksIFRDdXN0b21PcHRpb25zID0gYW55PiBleHRlbmRzIFJ1bGU8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ge1xuXHRwcm90ZWN0ZWQgc3Vic2V0UnVsZXM6IFRTdWJzZXRSdWxlQ29sbGVjdGlvbjxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiA9IG5ldyBNYXAoKTtcblxuXHRwdWJsaWMgdXNpbmcodmFsaWRhdGFibGU6IElWYWxpZGF0YWJsZTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPik6IENvbGxlY3Rpb25SdWxlPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+IHtcblx0XHR2YWxpZGF0YWJsZS5wcm9wZXJ0eU5hbWUgPSAnJztcblxuXHRcdGxldCBtZXRhID0ge1xuXHRcdFx0bmFtZTogdmFsaWRhdGFibGUucHJvcGVydHlOYW1lLFxuXHRcdFx0bWVzc2FnZTogKCkgPT4gJycsXG5cdFx0XHRwcmVjb25kaXRpb246IG51bGwsXG5cdFx0XHRpc1ZhbGlkSWZFbXB0eTogZmFsc2UsXG5cdFx0XHRzZXZlcml0eTogU2V2ZXJpdHkuZGVmYXVsdFxuXHRcdH07XG5cblx0XHR0aGlzLnZhbGlkYXRvcnMuc2V0KHZhbGlkYXRhYmxlLCBtZXRhKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHB1YmxpYyB3aGVyZShmaWx0ZXI6IFRDb2xsZWN0aW9uRmlsdGVyPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+LCBkZWZpbmU6IChydWxlOiBSdWxlPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+KSA9PiB2b2lkKTogQ29sbGVjdGlvblJ1bGU8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ge1xuXHRcdGxldCBydWxlID0gbmV3IFJ1bGU8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4oJycpO1xuXHRcdGxldCBtZXRhID0ge1xuXHRcdFx0bmFtZTogcnVsZS5wcm9wZXJ0eU5hbWUsXG5cdFx0XHRmaWx0ZXJcblx0XHR9O1xuXG5cdFx0ZGVmaW5lKHJ1bGUpO1xuXHRcdHRoaXMuc3Vic2V0UnVsZXMuc2V0KHJ1bGUsIG1ldGEpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRwcm90ZWN0ZWQgcnVuU3Vic2V0UnVsZXModmFsdWU6IGFueSwgaW5kZXg6IG51bWJlciwgY29sbGVjdGlvbjogW10sIHBhcmVudFZhbHVlOiBhbnksIGN1c3RvbU9wdGlvbnM6IGFueSwgcmVzdWx0czogVmFsaWRhdGlvblJlc3VsdExpc3QpOiBWYWxpZGF0aW9uUmVzdWx0TGlzdCB7XG5cdFx0Zm9yIChsZXQgW3J1bGUsIG1ldGFdIG9mIHRoaXMuc3Vic2V0UnVsZXMpIHtcblx0XHRcdGlmIChtZXRhLmZpbHRlcih2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24sIHBhcmVudFZhbHVlLCBjdXN0b21PcHRpb25zKSkge1xuXHRcdFx0XHRsZXQgcmVzdWx0TGlzdCA9IHJ1bGUudmFsaWRhdGUodmFsdWUsIHBhcmVudFZhbHVlLCBjdXN0b21PcHRpb25zKTtcblx0XHRcdFx0cmVzdWx0cy5tZXJnZShyZXN1bHRMaXN0KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0cztcblx0fVxuXG5cdHByb3RlY3RlZCBnZXRQcm9wZXJ0eVJlc3VsdHMoY29sbGVjdGlvbjogW10sIHBhcmVudFZhbHVlOiBhbnksIGN1c3RvbU9wdGlvbnM6IGFueSwgcmVzdWx0czogVmFsaWRhdGlvblJlc3VsdExpc3QpOiBWYWxpZGF0aW9uUmVzdWx0TGlzdCB7XG5cdFx0aWYgKGlzQXJyYXkoY29sbGVjdGlvbikpIHtcblx0XHRcdGZvciAobGV0IHZhbHVlIG9mIGNvbGxlY3Rpb24pIHtcblx0XHRcdFx0Y29uc3QgaW5kZXggPSBjb2xsZWN0aW9uLmluZGV4T2YodmFsdWUpO1xuXHRcdFx0XHRjb25zdCBwcm9wZXJ0eU5hbWUgPSBgJHt0aGlzLnByb3BlcnR5TmFtZX1bJHtpbmRleH1dYDtcblx0XHRcdFx0bGV0IHJlc3VsdExpc3QgPSBuZXcgVmFsaWRhdGlvblJlc3VsdExpc3QoW10sIHByb3BlcnR5TmFtZSk7XG5cdFx0XHRcdHRoaXMucnVuUHJlZGljYXRlcyh2YWx1ZSwgcGFyZW50VmFsdWUsIGN1c3RvbU9wdGlvbnMsIHJlc3VsdExpc3QpO1xuXG5cdFx0XHRcdGlmIChyZXN1bHRMaXN0LmlzVmFsaWQgfHwgIXRoaXMuc3RvcE9uRmlyc3RGYWlsdXJlKSB7XG5cdFx0XHRcdFx0dGhpcy5ydW5WYWxpZGF0b3JzKHZhbHVlLCBwYXJlbnRWYWx1ZSwgY3VzdG9tT3B0aW9ucywgcmVzdWx0TGlzdCk7XG5cblx0XHRcdFx0XHRpZiAocmVzdWx0TGlzdC5pc1ZhbGlkIHx8ICF0aGlzLnN0b3BPbkZpcnN0RmFpbHVyZSkge1xuXHRcdFx0XHRcdFx0dGhpcy5ydW5TdWJzZXRSdWxlcyh2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24sIHBhcmVudFZhbHVlLCBjdXN0b21PcHRpb25zLCByZXN1bHRMaXN0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXN1bHRMaXN0LmZvckVhY2goKHJlc3VsdCwgbmR4KSA9PiB7XG5cdFx0XHRcdFx0Ly8gYSBsaXR0bGUgbmFzdHksIGJ1dCBhdCB0aGlzIHRpbWUgd2Uga25vdyB0aGUgZmlyc3QgcmVzdWx0IGluIHRoaXMucmVzdWx0cyBkZXNjcmliZXMgdGhlIGNvbGxlY3Rpb24gaXRzZWxmLFxuXHRcdFx0XHRcdC8vIGFuZCBub3QgdGhlIHZhbHVlcyBpdCBjb250YWlucy5cblx0XHRcdFx0XHRjb25zdCBfcHJvcGVydHlOYW1lID0gYCR7cHJvcGVydHlOYW1lfSR7KG5keCA+IDAgJiYgcmVzdWx0LnByb3BlcnR5TmFtZSkgPyBgLiR7cmVzdWx0LnByb3BlcnR5TmFtZX1gIDogJyd9YDtcblx0XHRcdFx0XHRjb25zdCBjbGVhbmVkUHJvcGVydHlOYW1lID0gX3Byb3BlcnR5TmFtZS5yZXBsYWNlKC9cXF1cXC5cXFsvZywgJ11bJyk7XG5cdFx0XHRcdFx0cmVzdWx0LnByb3BlcnR5TmFtZSA9IGNsZWFuZWRQcm9wZXJ0eU5hbWU7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHJlc3VsdHMgPSByZXN1bHRzLm1lcmdlKHJlc3VsdExpc3QpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCByZXN1bHQgPSBuZXcgVmFsaWRhdGlvblJlc3VsdCh0aGlzLnByb3BlcnR5TmFtZSwgY29sbGVjdGlvbik7XG5cdFx0XHRyZXN1bHQuZXJyb3JzWydiZUNvbGxlY3Rpb24nXSA9IGAke3RoaXMucHJvcGVydHlOYW1lfSBtdXN0IGJlIGEgY29sbGVjdGlvbi5gO1xuXHRcdFx0cmVzdWx0cy5wdXNoKHJlc3VsdCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdHM7XG5cdH1cbn0iXX0=