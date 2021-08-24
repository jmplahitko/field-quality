"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _events = require("events");

var _Validator = _interopRequireDefault(require("../Validator"));

var _ValidationResultList = _interopRequireDefault(require("../ValidationResultList"));

var _quality = require("../utils/quality");

var _FormProperty = _interopRequireDefault(require("./FormProperty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Form = /*#__PURE__*/function () {
  function Form(data, validator, customValidationOptions, options) {
    var _this = this;

    _classCallCheck(this, Form);

    _defineProperty(this, "_properties", {});

    _defineProperty(this, "_propertyDebounces", {});

    _defineProperty(this, "_forms", {});

    _defineProperty(this, "_emitter", new _events.EventEmitter());

    _defineProperty(this, "_name", '');

    _defineProperty(this, "data", {});

    _defineProperty(this, "debounce", 275);

    this.validator = validator || new _Validator["default"]();
    this.validationResults = new _ValidationResultList["default"]([], '', data);
    this.customValidationOptions = customValidationOptions;
    this.name = (options === null || options === void 0 ? void 0 : options.name) || this.name;
    this.debounce = (options === null || options === void 0 ? void 0 : options.debounce) || this.debounce;
    Object.keys(data).forEach(function (key) {
      var self = _this;

      if (data[key] instanceof Form) {
        var form = data[key];
        form.name = key;
        form.onValidated(function (results) {
          self._mergeValidationResults(results);
        });
        self._forms[key] = form;
        Object.defineProperty(self.data, key, {
          enumerable: true,
          configurable: false,
          get: function get() {
            return self._forms[key].data;
          }
        });
      } else {
        _this._properties[key] = new _FormProperty["default"](key, data[key]);
        Object.defineProperty(self.data, key, {
          enumerable: true,
          configurable: false,
          get: function get() {
            return self._properties[key].value;
          },
          set: function set(value) {
            self._properties[key].value = value;

            if (!self._propertyDebounces[key]) {
              self._propertyDebounces[key] = setTimeout(function () {
                if (self.validator.hasRuleFor(key)) {
                  var results = self.validator.validateProperty(key, self.data, self.customValidationOptions);

                  self._mergeValidationResults(results);
                }

                delete self._propertyDebounces[key];
              }, self.debounce);
            }
          }
        });
      }
    });
  }

  _createClass(Form, [{
    key: "name",
    get: function get() {
      return this._name;
    },
    set: function set(name) {
      this._name = name;
      this.validator.propertyName = name;
      this.validationResults.propertyName = name;
    }
  }, {
    key: "errors",
    get: function get() {
      return this.validationResults.withErrors.toObject();
    }
  }, {
    key: "isValid",
    get: function get() {
      return this.validationResults.isValid !== false;
    }
  }, {
    key: "isDirty",
    get: function get() {
      return !!Object.values(_objectSpread(_objectSpread({}, this._properties), this._forms)).find(function (property) {
        return property.isDirty;
      });
    }
  }, {
    key: "warnings",
    get: function get() {
      return this.validationResults.withWarnings.toObject();
    }
  }, {
    key: "onValidated",
    value: function onValidated(listener) {
      var _this2 = this;

      this._emitter.on('validated', listener);

      return function () {
        _this2._emitter.off('validated', listener);
      };
    }
  }, {
    key: "reset",
    value: function reset() {
      var _this3 = this;

      var pristine = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      Object.keys(this._properties).forEach(function (key) {
        _this3._properties[key].reset(pristine);
      });
      this.validate();
    }
  }, {
    key: "setValidationResults",
    value: function setValidationResults(validationResults) {
      if (!(0, _quality.isEmpty)(validationResults)) {
        var results = new _ValidationResultList["default"](validationResults, this.name, this.data);

        this._mergeValidationResults(results);
      }

      return this.validationResults;
    }
  }, {
    key: "validate",
    value: function validate() {
      var _this4 = this;

      var results = this.validator.validate(this.data, this.customValidationOptions);

      this._mergeValidationResults(results);

      Object.keys(this._forms).forEach(function (formName) {
        _this4._forms[formName].validate();
      });
      return this.validationResults;
    }
  }, {
    key: "_mergeValidationResults",
    value: function _mergeValidationResults(validationResults) {
      var _this5 = this;

      validationResults.forEach(function (result) {
        _this5.validationResults.remove(result.propertyName);

        _this5.validationResults.push(result);
      });
      this.validationResults.value = this.data;

      this._emitter.emit('validated', this.validationResults);
    }
  }]);

  return Form;
}();

exports["default"] = Form;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mb3Jtcy9Gb3JtLnRzIl0sIm5hbWVzIjpbIkZvcm0iLCJkYXRhIiwidmFsaWRhdG9yIiwiY3VzdG9tVmFsaWRhdGlvbk9wdGlvbnMiLCJvcHRpb25zIiwiRXZlbnRFbWl0dGVyIiwiVmFsaWRhdG9yIiwidmFsaWRhdGlvblJlc3VsdHMiLCJWYWxpZGF0aW9uUmVzdWx0TGlzdCIsIm5hbWUiLCJkZWJvdW5jZSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5Iiwic2VsZiIsImZvcm0iLCJvblZhbGlkYXRlZCIsInJlc3VsdHMiLCJfbWVyZ2VWYWxpZGF0aW9uUmVzdWx0cyIsIl9mb3JtcyIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsImdldCIsIl9wcm9wZXJ0aWVzIiwiRm9ybVByb3BlcnR5IiwidmFsdWUiLCJzZXQiLCJfcHJvcGVydHlEZWJvdW5jZXMiLCJzZXRUaW1lb3V0IiwiaGFzUnVsZUZvciIsInZhbGlkYXRlUHJvcGVydHkiLCJfbmFtZSIsInByb3BlcnR5TmFtZSIsIndpdGhFcnJvcnMiLCJ0b09iamVjdCIsImlzVmFsaWQiLCJ2YWx1ZXMiLCJmaW5kIiwicHJvcGVydHkiLCJpc0RpcnR5Iiwid2l0aFdhcm5pbmdzIiwibGlzdGVuZXIiLCJfZW1pdHRlciIsIm9uIiwib2ZmIiwicHJpc3RpbmUiLCJyZXNldCIsInZhbGlkYXRlIiwiZm9ybU5hbWUiLCJyZXN1bHQiLCJyZW1vdmUiLCJwdXNoIiwiZW1pdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0lBR3FCQSxJO0FBYXBCLGdCQUFZQyxJQUFaLEVBQXNDQyxTQUF0QyxFQUFnRUMsdUJBQWhFLEVBQStGQyxPQUEvRixFQUFzSDtBQUFBOztBQUFBOztBQUFBLHlDQVovQyxFQVkrQzs7QUFBQSxnREFYN0IsRUFXNkI7O0FBQUEsb0NBVnBELEVBVW9EOztBQUFB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QUFDbkMsUUFBQSxNQUFJLENBQUM1QyxpQkFBTCxDQUF1QjZDLE1BQXZCLENBQThCRCxNQUFNLENBQUNqQixZQUFyQzs7QUFDQSxRQUFBLE1BQUksQ0FBQzNCLGlCQUFMLENBQXVCOEMsSUFBdkIsQ0FBNEJGLE1BQTVCO0FBQ0EsT0FIRDtBQUtBLFdBQUs1QyxpQkFBTCxDQUF1Qm9CLEtBQXZCLEdBQStCLEtBQUsxQixJQUFwQzs7QUFDQSxXQUFLMkMsUUFBTCxDQUFjVSxJQUFkLENBQW1CLFdBQW5CLEVBQWdDLEtBQUsvQyxpQkFBckM7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ2V2ZW50cyc7XG5pbXBvcnQgVmFsaWRhdG9yIGZyb20gJy4uL1ZhbGlkYXRvcic7XG5pbXBvcnQgVmFsaWRhdGlvblJlc3VsdExpc3QgZnJvbSAnLi4vVmFsaWRhdGlvblJlc3VsdExpc3QnO1xuaW1wb3J0IFZhbGlkYXRpb25SZXN1bHQgZnJvbSAnLi4vVmFsaWRhdGlvblJlc3VsdCc7XG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSAnLi4vdXRpbHMvcXVhbGl0eSc7XG5pbXBvcnQgRm9ybVByb3BlcnR5IGZyb20gJy4vRm9ybVByb3BlcnR5JztcbmltcG9ydCB7IEZvcm1PcHRpb25zLCBJbml0aWFsRm9ybURhdGEgfSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9ybTxUPiB7XG5cdHByaXZhdGUgX3Byb3BlcnRpZXM6IFBhcnRpYWw8eyBbSyBpbiBrZXlvZiBUXTogRm9ybVByb3BlcnR5PFRbS10+IH0+ID0ge307XG5cdHByaXZhdGUgX3Byb3BlcnR5RGVib3VuY2VzOiBQYXJ0aWFsPHsgW0sgaW4ga2V5b2YgVF06IFJldHVyblR5cGU8dHlwZW9mIHNldFRpbWVvdXQ+IH0+ID0ge307XG5cdHByaXZhdGUgX2Zvcm1zOiBQYXJ0aWFsPHsgW0sgaW4ga2V5b2YgVF06IEZvcm1Qcm9wZXJ0eTxUW0tdPiB9PiA9IHt9O1xuXHRwcml2YXRlIF9lbWl0dGVyOiBFdmVudEVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cdHByaXZhdGUgX25hbWU6IHN0cmluZyA9ICcnO1xuXG5cdHB1YmxpYyBjdXN0b21WYWxpZGF0aW9uT3B0aW9ucz86IGFueTtcblx0cHVibGljIGRhdGE6IFQgPSA8VD57fTtcblx0cHVibGljIGRlYm91bmNlOiBudW1iZXIgPSAyNzU7XG5cdHB1YmxpYyB2YWxpZGF0aW9uUmVzdWx0cyE6IFZhbGlkYXRpb25SZXN1bHRMaXN0O1xuXHRwdWJsaWMgdmFsaWRhdG9yOiBWYWxpZGF0b3I8VD47XG5cblx0Y29uc3RydWN0b3IoZGF0YTogSW5pdGlhbEZvcm1EYXRhPFQ+LCB2YWxpZGF0b3I/OiBWYWxpZGF0b3I8VD4sIGN1c3RvbVZhbGlkYXRpb25PcHRpb25zPzogYW55LCBvcHRpb25zPzogRm9ybU9wdGlvbnMpIHtcblx0XHR0aGlzLnZhbGlkYXRvciA9IHZhbGlkYXRvciB8fCBuZXcgVmFsaWRhdG9yPFQ+KCk7XG5cdFx0dGhpcy52YWxpZGF0aW9uUmVzdWx0cyA9IG5ldyBWYWxpZGF0aW9uUmVzdWx0TGlzdChbXSwgJycsIGRhdGEpO1xuXHRcdHRoaXMuY3VzdG9tVmFsaWRhdGlvbk9wdGlvbnMgPSBjdXN0b21WYWxpZGF0aW9uT3B0aW9ucztcblxuXHRcdHRoaXMubmFtZSA9IG9wdGlvbnM/Lm5hbWUgfHwgdGhpcy5uYW1lO1xuXHRcdHRoaXMuZGVib3VuY2UgPSBvcHRpb25zPy5kZWJvdW5jZSB8fCB0aGlzLmRlYm91bmNlO1xuXG5cdFx0T2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaCgoa2V5KSA9PiB7XG5cdFx0XHRjb25zdCBzZWxmID0gdGhpcztcblxuXHRcdFx0aWYgKGRhdGFba2V5XSBpbnN0YW5jZW9mIEZvcm0pIHtcblx0XHRcdFx0Y29uc3QgZm9ybSA9IDxGb3JtPGFueT4+ZGF0YVtrZXkgYXMga2V5b2YgVF07XG5cdFx0XHRcdGZvcm0ubmFtZSA9IGtleTtcblxuXHRcdFx0XHRmb3JtLm9uVmFsaWRhdGVkKChyZXN1bHRzKSA9PiB7XG5cdFx0XHRcdFx0c2VsZi5fbWVyZ2VWYWxpZGF0aW9uUmVzdWx0cyhyZXN1bHRzKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0c2VsZi5fZm9ybXNba2V5XSA9IGZvcm07XG5cblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHNlbGYuZGF0YSwga2V5LCB7XG5cdFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuXHRcdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRcdHJldHVybiBzZWxmLl9mb3Jtc1trZXldLmRhdGE7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLl9wcm9wZXJ0aWVzW2tleV0gPSBuZXcgRm9ybVByb3BlcnR5PGFueT4oa2V5LCBkYXRhW2tleV0pO1xuXG5cdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzZWxmLmRhdGEsIGtleSwge1xuXHRcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcblx0XHRcdFx0XHRnZXQoKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gc2VsZi5fcHJvcGVydGllc1trZXldLnZhbHVlO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0c2V0KHZhbHVlOiBhbnkpIHtcblx0XHRcdFx0XHRcdHNlbGYuX3Byb3BlcnRpZXNba2V5XS52YWx1ZSA9IHZhbHVlO1xuXHRcdFx0XHRcdFx0aWYgKCFzZWxmLl9wcm9wZXJ0eURlYm91bmNlc1trZXldKSB7XG5cdFx0XHRcdFx0XHRcdHNlbGYuX3Byb3BlcnR5RGVib3VuY2VzW2tleV0gPSBzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoc2VsZi52YWxpZGF0b3IuaGFzUnVsZUZvcihrZXkpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCByZXN1bHRzID0gc2VsZi52YWxpZGF0b3IudmFsaWRhdGVQcm9wZXJ0eShrZXksIHNlbGYuZGF0YSwgc2VsZi5jdXN0b21WYWxpZGF0aW9uT3B0aW9ucyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRzZWxmLl9tZXJnZVZhbGlkYXRpb25SZXN1bHRzKHJlc3VsdHMpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRkZWxldGUgc2VsZi5fcHJvcGVydHlEZWJvdW5jZXNba2V5XTtcblx0XHRcdFx0XHRcdFx0fSwgc2VsZi5kZWJvdW5jZSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGdldCBuYW1lKCkge1xuXHRcdHJldHVybiB0aGlzLl9uYW1lO1xuXHR9XG5cblx0c2V0IG5hbWUobmFtZTogc3RyaW5nKSB7XG5cdFx0dGhpcy5fbmFtZSA9IG5hbWU7XG5cdFx0dGhpcy52YWxpZGF0b3IucHJvcGVydHlOYW1lID0gbmFtZTtcblx0XHR0aGlzLnZhbGlkYXRpb25SZXN1bHRzLnByb3BlcnR5TmFtZSA9IG5hbWU7XG5cdH1cblxuXHRnZXQgZXJyb3JzKCk6IHsgW3Byb3BlcnR5TmFtZTogc3RyaW5nXTogVmFsaWRhdGlvblJlc3VsdCB9IHtcblx0XHRyZXR1cm4gdGhpcy52YWxpZGF0aW9uUmVzdWx0cy53aXRoRXJyb3JzLnRvT2JqZWN0KCk7XG5cdH1cblxuXHRnZXQgaXNWYWxpZCgpOiBib29sZWFuIHtcblx0XHRyZXR1cm4gdGhpcy52YWxpZGF0aW9uUmVzdWx0cy5pc1ZhbGlkICE9PSBmYWxzZTtcblx0fVxuXG5cdGdldCBpc0RpcnR5KCk6IGJvb2xlYW4ge1xuXHRcdHJldHVybiAhIU9iamVjdC52YWx1ZXM8Rm9ybTxhbnk+IHwgRm9ybVByb3BlcnR5PGFueT4+KHsgLi4udGhpcy5fcHJvcGVydGllcywgLi4udGhpcy5fZm9ybXMgfSkuZmluZChwcm9wZXJ0eSA9PiBwcm9wZXJ0eS5pc0RpcnR5KTtcblx0fVxuXG5cdGdldCB3YXJuaW5ncygpOiB7IFtwcm9wZXJ0eU5hbWU6IHN0cmluZ106IFZhbGlkYXRpb25SZXN1bHQgfSB7XG5cdFx0cmV0dXJuIHRoaXMudmFsaWRhdGlvblJlc3VsdHMud2l0aFdhcm5pbmdzLnRvT2JqZWN0KCk7XG5cdH1cblxuXHRwdWJsaWMgb25WYWxpZGF0ZWQobGlzdGVuZXI6ICh2YWxpZGF0aW9uUmVzdWx0czogVmFsaWRhdGlvblJlc3VsdExpc3QpID0+IHZvaWQpOiAoKSA9PiB2b2lkIHtcblx0XHR0aGlzLl9lbWl0dGVyLm9uKCd2YWxpZGF0ZWQnLCBsaXN0ZW5lcik7XG5cdFx0cmV0dXJuICgpID0+IHtcblx0XHRcdHRoaXMuX2VtaXR0ZXIub2ZmKCd2YWxpZGF0ZWQnLCBsaXN0ZW5lcik7XG5cdFx0fVxuXHR9XG5cblx0cHVibGljIHJlc2V0KHByaXN0aW5lOiBib29sZWFuID0gZmFsc2UpIHtcblx0XHRPYmplY3Qua2V5cyh0aGlzLl9wcm9wZXJ0aWVzKS5mb3JFYWNoKGtleSA9PiB7XG5cdFx0XHR0aGlzLl9wcm9wZXJ0aWVzW2tleV0ucmVzZXQocHJpc3RpbmUpO1xuXHRcdH0pO1xuXG5cdFx0dGhpcy52YWxpZGF0ZSgpO1xuXHR9XG5cblx0cHVibGljIHNldFZhbGlkYXRpb25SZXN1bHRzKHZhbGlkYXRpb25SZXN1bHRzOiBWYWxpZGF0aW9uUmVzdWx0W10pOiBWYWxpZGF0aW9uUmVzdWx0TGlzdCB7XG5cdFx0aWYgKCFpc0VtcHR5KHZhbGlkYXRpb25SZXN1bHRzKSkge1xuXHRcdFx0bGV0IHJlc3VsdHMgPSBuZXcgVmFsaWRhdGlvblJlc3VsdExpc3QodmFsaWRhdGlvblJlc3VsdHMsIHRoaXMubmFtZSwgdGhpcy5kYXRhKTtcblx0XHRcdHRoaXMuX21lcmdlVmFsaWRhdGlvblJlc3VsdHMocmVzdWx0cyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMudmFsaWRhdGlvblJlc3VsdHM7XG5cdH1cblxuXHRwdWJsaWMgdmFsaWRhdGUoKSB7XG5cdFx0Y29uc3QgcmVzdWx0cyA9IHRoaXMudmFsaWRhdG9yLnZhbGlkYXRlKHRoaXMuZGF0YSwgdGhpcy5jdXN0b21WYWxpZGF0aW9uT3B0aW9ucyk7XG5cdFx0dGhpcy5fbWVyZ2VWYWxpZGF0aW9uUmVzdWx0cyhyZXN1bHRzKTtcblxuXHRcdE9iamVjdC5rZXlzKHRoaXMuX2Zvcm1zKS5mb3JFYWNoKGZvcm1OYW1lID0+IHtcblx0XHRcdHRoaXMuX2Zvcm1zW2Zvcm1OYW1lXS52YWxpZGF0ZSgpO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHRoaXMudmFsaWRhdGlvblJlc3VsdHM7XG5cdH1cblxuXHRwcml2YXRlIF9tZXJnZVZhbGlkYXRpb25SZXN1bHRzKHZhbGlkYXRpb25SZXN1bHRzOiBWYWxpZGF0aW9uUmVzdWx0TGlzdCkge1xuXHRcdHZhbGlkYXRpb25SZXN1bHRzLmZvckVhY2gocmVzdWx0ID0+IHtcblx0XHRcdHRoaXMudmFsaWRhdGlvblJlc3VsdHMucmVtb3ZlKHJlc3VsdC5wcm9wZXJ0eU5hbWUpO1xuXHRcdFx0dGhpcy52YWxpZGF0aW9uUmVzdWx0cy5wdXNoKHJlc3VsdCk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLnZhbGlkYXRpb25SZXN1bHRzLnZhbHVlID0gdGhpcy5kYXRhO1xuXHRcdHRoaXMuX2VtaXR0ZXIuZW1pdCgndmFsaWRhdGVkJywgdGhpcy52YWxpZGF0aW9uUmVzdWx0cyk7XG5cdH1cbn0iXX0=