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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Db2xsZWN0aW9uUnVsZS50cyJdLCJuYW1lcyI6WyJDb2xsZWN0aW9uUnVsZSIsIk1hcCIsInZhbGlkYXRhYmxlIiwicHJvcGVydHlOYW1lIiwibWV0YSIsIm5hbWUiLCJtZXNzYWdlIiwicHJlY29uZGl0aW9uIiwiaXNWYWxpZElmRW1wdHkiLCJzZXZlcml0eSIsIlNldmVyaXR5IiwidmFsaWRhdG9ycyIsInNldCIsImZpbHRlciIsImRlZmluZSIsInJ1bGUiLCJSdWxlIiwic3Vic2V0UnVsZXMiLCJ2YWx1ZSIsImluZGV4IiwiY29sbGVjdGlvbiIsInBhcmVudFZhbHVlIiwiY3VzdG9tT3B0aW9ucyIsInJlc3VsdHMiLCJyZXN1bHRMaXN0IiwidmFsaWRhdGUiLCJtZXJnZSIsImluZGV4T2YiLCJWYWxpZGF0aW9uUmVzdWx0TGlzdCIsInJ1blByZWRpY2F0ZXMiLCJpc1ZhbGlkIiwic3RvcE9uRmlyc3RGYWlsdXJlIiwicnVuVmFsaWRhdG9ycyIsInJ1blN1YnNldFJ1bGVzIiwiZm9yRWFjaCIsInJlc3VsdCIsIm5keCIsIl9wcm9wZXJ0eU5hbWUiLCJjbGVhbmVkUHJvcGVydHlOYW1lIiwicmVwbGFjZSIsIlZhbGlkYXRpb25SZXN1bHQiLCJlcnJvcnMiLCJwdXNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBSUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVxQkEsYzs7Ozs7Ozs7Ozs7Ozs7OztrRUFDeUQsSUFBSUMsR0FBSixFOzs7Ozs7OzBCQUVoRUMsVyxFQUF1RztBQUNuSEEsTUFBQUEsV0FBVyxDQUFDQyxZQUFaLEdBQTJCLEVBQTNCO0FBRUEsVUFBSUMsSUFBSSxHQUFHO0FBQ1ZDLFFBQUFBLElBQUksRUFBRUgsV0FBVyxDQUFDQyxZQURSO0FBRVZHLFFBQUFBLE9BQU8sRUFBRTtBQUFBLGlCQUFNLEVBQU47QUFBQSxTQUZDO0FBR1ZDLFFBQUFBLFlBQVks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QWEsQ0FBQ0UsT0FBZCxDQUFzQixTQUF0QixFQUFpQyxJQUFqQyxDQUE1Qjs7QUFDQUosY0FBQUEsTUFBTSxDQUFDaEMsWUFBUCxHQUFzQm1DLG1CQUF0QjtBQUNBLGFBTkQ7QUFRQWYsWUFBQUEsT0FBTyxHQUFHQSxPQUFPLENBQUNHLEtBQVIsQ0FBY0YsVUFBZCxDQUFWO0FBdkJ1Qjs7QUFDeEIsaUVBQThCO0FBQUE7QUF1QjdCO0FBeEJ1QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBeUJ4QixPQXpCRCxNQXlCTztBQUNOLFlBQU1XLE1BQU0sR0FBRyxJQUFJSyw0QkFBSixDQUFxQixLQUFLckMsWUFBMUIsRUFBd0NpQixVQUF4QyxDQUFmO0FBQ0FlLFFBQUFBLE1BQU0sQ0FBQ00sTUFBUCxDQUFjLGNBQWQsY0FBbUMsS0FBS3RDLFlBQXhDO0FBQ0FvQixRQUFBQSxPQUFPLENBQUNtQixJQUFSLENBQWFQLE1BQWI7QUFDQTs7QUFFRCxhQUFPWixPQUFQO0FBQ0E7Ozs7RUEzRW9GUCxpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSdWxlIGZyb20gJy4vUnVsZSc7XG5pbXBvcnQgU2V2ZXJpdHkgZnJvbSAnLi9TZXZlcml0eSc7XG5pbXBvcnQgVmFsaWRhdGlvblJlc3VsdCBmcm9tICcuL1ZhbGlkYXRpb25SZXN1bHQnO1xuaW1wb3J0IFZhbGlkYXRpb25SZXN1bHRMaXN0IGZyb20gJy4vVmFsaWRhdGlvblJlc3VsdExpc3QnO1xuXG5pbXBvcnQgeyBJVmFsaWRhdGFibGUsIFRDb2xsZWN0aW9uRmlsdGVyLCBUU3Vic2V0UnVsZUNvbGxlY3Rpb24gfSBmcm9tICcuL3R5cGVzJztcblxuaW1wb3J0IHsgaXNBcnJheSB9IGZyb20gJy4vdXRpbHMvcXVhbGl0eSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbGxlY3Rpb25SdWxlPFRQYXJlbnRWYWx1ZSA9IGFueSwgVEN1c3RvbU9wdGlvbnMgPSBhbnk+IGV4dGVuZHMgUnVsZTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiB7XG5cdHByb3RlY3RlZCBzdWJzZXRSdWxlczogVFN1YnNldFJ1bGVDb2xsZWN0aW9uPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+ID0gbmV3IE1hcCgpO1xuXG5cdHB1YmxpYyB1c2luZyh2YWxpZGF0YWJsZTogSVZhbGlkYXRhYmxlPFRQYXJlbnRWYWx1ZSwgVEN1c3RvbU9wdGlvbnM+KTogQ29sbGVjdGlvblJ1bGU8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4ge1xuXHRcdHZhbGlkYXRhYmxlLnByb3BlcnR5TmFtZSA9ICcnO1xuXG5cdFx0bGV0IG1ldGEgPSB7XG5cdFx0XHRuYW1lOiB2YWxpZGF0YWJsZS5wcm9wZXJ0eU5hbWUsXG5cdFx0XHRtZXNzYWdlOiAoKSA9PiAnJyxcblx0XHRcdHByZWNvbmRpdGlvbjogbnVsbCxcblx0XHRcdGlzVmFsaWRJZkVtcHR5OiBmYWxzZSxcblx0XHRcdHNldmVyaXR5OiBTZXZlcml0eS5kZWZhdWx0XG5cdFx0fTtcblxuXHRcdHRoaXMudmFsaWRhdG9ycy5zZXQodmFsaWRhdGFibGUsIG1ldGEpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cHVibGljIHdoZXJlKGZpbHRlcjogVENvbGxlY3Rpb25GaWx0ZXI8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4sIGRlZmluZTogKHJ1bGU6IFJ1bGU8VFBhcmVudFZhbHVlLCBUQ3VzdG9tT3B0aW9ucz4pID0+IHZvaWQpOiBDb2xsZWN0aW9uUnVsZTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPiB7XG5cdFx0bGV0IHJ1bGUgPSBuZXcgUnVsZTxUUGFyZW50VmFsdWUsIFRDdXN0b21PcHRpb25zPignJyk7XG5cdFx0bGV0IG1ldGEgPSB7XG5cdFx0XHRuYW1lOiBydWxlLnByb3BlcnR5TmFtZSxcblx0XHRcdGZpbHRlclxuXHRcdH07XG5cblx0XHRkZWZpbmUocnVsZSk7XG5cdFx0dGhpcy5zdWJzZXRSdWxlcy5zZXQocnVsZSwgbWV0YSk7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHByb3RlY3RlZCBydW5TdWJzZXRSdWxlcyh2YWx1ZTogYW55LCBpbmRleDogbnVtYmVyLCBjb2xsZWN0aW9uOiBbXSwgcGFyZW50VmFsdWU6IGFueSwgY3VzdG9tT3B0aW9uczogYW55LCByZXN1bHRzOiBWYWxpZGF0aW9uUmVzdWx0TGlzdCk6IFZhbGlkYXRpb25SZXN1bHRMaXN0IHtcblx0XHRmb3IgKGxldCBbcnVsZSwgbWV0YV0gb2YgdGhpcy5zdWJzZXRSdWxlcykge1xuXHRcdFx0aWYgKG1ldGEuZmlsdGVyKHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbiwgcGFyZW50VmFsdWUsIGN1c3RvbU9wdGlvbnMpKSB7XG5cdFx0XHRcdGxldCByZXN1bHRMaXN0ID0gcnVsZS52YWxpZGF0ZSh2YWx1ZSwgcGFyZW50VmFsdWUsIGN1c3RvbU9wdGlvbnMpO1xuXHRcdFx0XHRyZXN1bHRzLm1lcmdlKHJlc3VsdExpc3QpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHRzO1xuXHR9XG5cblx0cHJvdGVjdGVkIGdldFByb3BlcnR5UmVzdWx0cyhjb2xsZWN0aW9uOiBbXSwgcGFyZW50VmFsdWU6IGFueSwgY3VzdG9tT3B0aW9uczogYW55LCByZXN1bHRzOiBWYWxpZGF0aW9uUmVzdWx0TGlzdCk6IFZhbGlkYXRpb25SZXN1bHRMaXN0IHtcblx0XHRpZiAoaXNBcnJheShjb2xsZWN0aW9uKSkge1xuXHRcdFx0Zm9yIChsZXQgdmFsdWUgb2YgY29sbGVjdGlvbikge1xuXHRcdFx0XHRjb25zdCBpbmRleCA9IGNvbGxlY3Rpb24uaW5kZXhPZih2YWx1ZSk7XG5cdFx0XHRcdGNvbnN0IHByb3BlcnR5TmFtZSA9IGAke3RoaXMucHJvcGVydHlOYW1lfVske2luZGV4fV1gO1xuXHRcdFx0XHRsZXQgcmVzdWx0TGlzdCA9IG5ldyBWYWxpZGF0aW9uUmVzdWx0TGlzdChbXSwgcHJvcGVydHlOYW1lKTtcblx0XHRcdFx0dGhpcy5ydW5QcmVkaWNhdGVzKHZhbHVlLCBwYXJlbnRWYWx1ZSwgY3VzdG9tT3B0aW9ucywgcmVzdWx0TGlzdCk7XG5cblx0XHRcdFx0aWYgKHJlc3VsdExpc3QuaXNWYWxpZCB8fCAhdGhpcy5zdG9wT25GaXJzdEZhaWx1cmUpIHtcblx0XHRcdFx0XHR0aGlzLnJ1blZhbGlkYXRvcnModmFsdWUsIHBhcmVudFZhbHVlLCBjdXN0b21PcHRpb25zLCByZXN1bHRMaXN0KTtcblxuXHRcdFx0XHRcdGlmIChyZXN1bHRMaXN0LmlzVmFsaWQgfHwgIXRoaXMuc3RvcE9uRmlyc3RGYWlsdXJlKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnJ1blN1YnNldFJ1bGVzKHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbiwgcGFyZW50VmFsdWUsIGN1c3RvbU9wdGlvbnMsIHJlc3VsdExpc3QpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJlc3VsdExpc3QuZm9yRWFjaCgocmVzdWx0LCBuZHgpID0+IHtcblx0XHRcdFx0XHQvLyBhIGxpdHRsZSBuYXN0eSwgYnV0IGF0IHRoaXMgdGltZSB3ZSBrbm93IHRoZSBmaXJzdCByZXN1bHQgaW4gdGhpcy5yZXN1bHRzIGRlc2NyaWJlcyB0aGUgY29sbGVjdGlvbiBpdHNlbGYsXG5cdFx0XHRcdFx0Ly8gYW5kIG5vdCB0aGUgdmFsdWVzIGl0IGNvbnRhaW5zLlxuXHRcdFx0XHRcdGNvbnN0IF9wcm9wZXJ0eU5hbWUgPSBgJHtwcm9wZXJ0eU5hbWV9JHsobmR4ID4gMCAmJiByZXN1bHQucHJvcGVydHlOYW1lKSA/IGAuJHtyZXN1bHQucHJvcGVydHlOYW1lfWAgOiAnJ31gO1xuXHRcdFx0XHRcdGNvbnN0IGNsZWFuZWRQcm9wZXJ0eU5hbWUgPSBfcHJvcGVydHlOYW1lLnJlcGxhY2UoL1xcXVxcLlxcWy9nLCAnXVsnKTtcblx0XHRcdFx0XHRyZXN1bHQucHJvcGVydHlOYW1lID0gY2xlYW5lZFByb3BlcnR5TmFtZTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0cmVzdWx0cyA9IHJlc3VsdHMubWVyZ2UocmVzdWx0TGlzdCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IHJlc3VsdCA9IG5ldyBWYWxpZGF0aW9uUmVzdWx0KHRoaXMucHJvcGVydHlOYW1lLCBjb2xsZWN0aW9uKTtcblx0XHRcdHJlc3VsdC5lcnJvcnNbJ2JlQ29sbGVjdGlvbiddID0gYCR7dGhpcy5wcm9wZXJ0eU5hbWV9IG11c3QgYmUgYSBjb2xsZWN0aW9uLmA7XG5cdFx0XHRyZXN1bHRzLnB1c2gocmVzdWx0KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0cztcblx0fVxufSJdfQ==