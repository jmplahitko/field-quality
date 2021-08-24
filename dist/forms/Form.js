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
                var results = self.validator.validateProperty(key, self.data, self.customValidationOptions);

                self._mergeValidationResults(results);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mb3Jtcy9Gb3JtLnRzIl0sIm5hbWVzIjpbIkZvcm0iLCJkYXRhIiwidmFsaWRhdG9yIiwiY3VzdG9tVmFsaWRhdGlvbk9wdGlvbnMiLCJvcHRpb25zIiwiRXZlbnRFbWl0dGVyIiwiVmFsaWRhdG9yIiwidmFsaWRhdGlvblJlc3VsdHMiLCJWYWxpZGF0aW9uUmVzdWx0TGlzdCIsIm5hbWUiLCJkZWJvdW5jZSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5Iiwic2VsZiIsImZvcm0iLCJvblZhbGlkYXRlZCIsInJlc3VsdHMiLCJfbWVyZ2VWYWxpZGF0aW9uUmVzdWx0cyIsIl9mb3JtcyIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsImdldCIsIl9wcm9wZXJ0aWVzIiwiRm9ybVByb3BlcnR5IiwidmFsdWUiLCJzZXQiLCJfcHJvcGVydHlEZWJvdW5jZXMiLCJzZXRUaW1lb3V0IiwidmFsaWRhdGVQcm9wZXJ0eSIsIl9uYW1lIiwicHJvcGVydHlOYW1lIiwid2l0aEVycm9ycyIsInRvT2JqZWN0IiwiaXNWYWxpZCIsInZhbHVlcyIsImZpbmQiLCJwcm9wZXJ0eSIsImlzRGlydHkiLCJ3aXRoV2FybmluZ3MiLCJsaXN0ZW5lciIsIl9lbWl0dGVyIiwib24iLCJvZmYiLCJwcmlzdGluZSIsInJlc2V0IiwidmFsaWRhdGUiLCJmb3JtTmFtZSIsInJlc3VsdCIsInJlbW92ZSIsInB1c2giLCJlbWl0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7SUFHcUJBLEk7QUFhcEIsZ0JBQVlDLElBQVosRUFBc0NDLFNBQXRDLEVBQWdFQyx1QkFBaEUsRUFBK0ZDLE9BQS9GLEVBQXNIO0FBQUE7O0FBQUE7O0FBQUEseUNBWi9DLEVBWStDOztBQUFBLGdEQVg3QixFQVc2Qjs7QUFBQSxvQ0FWcEQsRUFVb0Q7O0FBQUEsc0NBVHJGLElBQUlD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QUFDMUIsaUJBQUwsQ0FBdUI2QyxJQUF2QixDQUE0QkYsTUFBNUI7QUFDQSxPQUhEO0FBS0EsV0FBSzNDLGlCQUFMLENBQXVCb0IsS0FBdkIsR0FBK0IsS0FBSzFCLElBQXBDOztBQUNBLFdBQUswQyxRQUFMLENBQWNVLElBQWQsQ0FBbUIsV0FBbkIsRUFBZ0MsS0FBSzlDLGlCQUFyQztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnZXZlbnRzJztcbmltcG9ydCBWYWxpZGF0b3IgZnJvbSAnLi4vVmFsaWRhdG9yJztcbmltcG9ydCBWYWxpZGF0aW9uUmVzdWx0TGlzdCBmcm9tICcuLi9WYWxpZGF0aW9uUmVzdWx0TGlzdCc7XG5pbXBvcnQgVmFsaWRhdGlvblJlc3VsdCBmcm9tICcuLi9WYWxpZGF0aW9uUmVzdWx0JztcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tICcuLi91dGlscy9xdWFsaXR5JztcbmltcG9ydCBGb3JtUHJvcGVydHkgZnJvbSAnLi9Gb3JtUHJvcGVydHknO1xuaW1wb3J0IHsgRm9ybU9wdGlvbnMsIEluaXRpYWxGb3JtRGF0YSB9IGZyb20gJy4vdHlwZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtPFQ+IHtcblx0cHJpdmF0ZSBfcHJvcGVydGllczogUGFydGlhbDx7IFtLIGluIGtleW9mIFRdOiBGb3JtUHJvcGVydHk8VFtLXT4gfT4gPSB7fTtcblx0cHJpdmF0ZSBfcHJvcGVydHlEZWJvdW5jZXM6IFBhcnRpYWw8eyBbSyBpbiBrZXlvZiBUXTogUmV0dXJuVHlwZTx0eXBlb2Ygc2V0VGltZW91dD4gfT4gPSB7fTtcblx0cHJpdmF0ZSBfZm9ybXM6IFBhcnRpYWw8eyBbSyBpbiBrZXlvZiBUXTogRm9ybVByb3BlcnR5PFRbS10+IH0+ID0ge307XG5cdHByaXZhdGUgX2VtaXR0ZXI6IEV2ZW50RW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblx0cHJpdmF0ZSBfbmFtZTogc3RyaW5nID0gJyc7XG5cblx0cHVibGljIGN1c3RvbVZhbGlkYXRpb25PcHRpb25zPzogYW55O1xuXHRwdWJsaWMgZGF0YTogVCA9IDxUPnt9O1xuXHRwdWJsaWMgZGVib3VuY2U6IG51bWJlciA9IDI3NTtcblx0cHVibGljIHZhbGlkYXRpb25SZXN1bHRzITogVmFsaWRhdGlvblJlc3VsdExpc3Q7XG5cdHB1YmxpYyB2YWxpZGF0b3I6IFZhbGlkYXRvcjxUPjtcblxuXHRjb25zdHJ1Y3RvcihkYXRhOiBJbml0aWFsRm9ybURhdGE8VD4sIHZhbGlkYXRvcj86IFZhbGlkYXRvcjxUPiwgY3VzdG9tVmFsaWRhdGlvbk9wdGlvbnM/OiBhbnksIG9wdGlvbnM/OiBGb3JtT3B0aW9ucykge1xuXHRcdHRoaXMudmFsaWRhdG9yID0gdmFsaWRhdG9yIHx8IG5ldyBWYWxpZGF0b3I8VD4oKTtcblx0XHR0aGlzLnZhbGlkYXRpb25SZXN1bHRzID0gbmV3IFZhbGlkYXRpb25SZXN1bHRMaXN0KFtdLCAnJywgZGF0YSk7XG5cdFx0dGhpcy5jdXN0b21WYWxpZGF0aW9uT3B0aW9ucyA9IGN1c3RvbVZhbGlkYXRpb25PcHRpb25zO1xuXG5cdFx0dGhpcy5uYW1lID0gb3B0aW9ucz8ubmFtZSB8fCB0aGlzLm5hbWU7XG5cdFx0dGhpcy5kZWJvdW5jZSA9IG9wdGlvbnM/LmRlYm91bmNlIHx8IHRoaXMuZGVib3VuY2U7XG5cblx0XHRPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKChrZXkpID0+IHtcblx0XHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xuXG5cdFx0XHRpZiAoZGF0YVtrZXldIGluc3RhbmNlb2YgRm9ybSkge1xuXHRcdFx0XHRjb25zdCBmb3JtID0gPEZvcm08YW55Pj5kYXRhW2tleSBhcyBrZXlvZiBUXTtcblx0XHRcdFx0Zm9ybS5uYW1lID0ga2V5O1xuXG5cdFx0XHRcdGZvcm0ub25WYWxpZGF0ZWQoKHJlc3VsdHMpID0+IHtcblx0XHRcdFx0XHRzZWxmLl9tZXJnZVZhbGlkYXRpb25SZXN1bHRzKHJlc3VsdHMpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRzZWxmLl9mb3Jtc1trZXldID0gZm9ybTtcblxuXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoc2VsZi5kYXRhLCBrZXksIHtcblx0XHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG5cdFx0XHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHNlbGYuX2Zvcm1zW2tleV0uZGF0YTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuX3Byb3BlcnRpZXNba2V5XSA9IG5ldyBGb3JtUHJvcGVydHk8YW55PihrZXksIGRhdGFba2V5XSk7XG5cblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHNlbGYuZGF0YSwga2V5LCB7XG5cdFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuXHRcdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRcdHJldHVybiBzZWxmLl9wcm9wZXJ0aWVzW2tleV0udmFsdWU7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRzZXQodmFsdWU6IGFueSkge1xuXHRcdFx0XHRcdFx0c2VsZi5fcHJvcGVydGllc1trZXldLnZhbHVlID0gdmFsdWU7XG5cdFx0XHRcdFx0XHRpZiAoIXNlbGYuX3Byb3BlcnR5RGVib3VuY2VzW2tleV0pIHtcblx0XHRcdFx0XHRcdFx0c2VsZi5fcHJvcGVydHlEZWJvdW5jZXNba2V5XSA9IHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IHJlc3VsdHMgPSBzZWxmLnZhbGlkYXRvci52YWxpZGF0ZVByb3BlcnR5KGtleSwgc2VsZi5kYXRhLCBzZWxmLmN1c3RvbVZhbGlkYXRpb25PcHRpb25zKTtcblx0XHRcdFx0XHRcdFx0XHRzZWxmLl9tZXJnZVZhbGlkYXRpb25SZXN1bHRzKHJlc3VsdHMpO1xuXHRcdFx0XHRcdFx0XHRcdGRlbGV0ZSBzZWxmLl9wcm9wZXJ0eURlYm91bmNlc1trZXldO1xuXHRcdFx0XHRcdFx0XHR9LCBzZWxmLmRlYm91bmNlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0Z2V0IG5hbWUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX25hbWU7XG5cdH1cblxuXHRzZXQgbmFtZShuYW1lOiBzdHJpbmcpIHtcblx0XHR0aGlzLl9uYW1lID0gbmFtZTtcblx0XHR0aGlzLnZhbGlkYXRvci5wcm9wZXJ0eU5hbWUgPSBuYW1lO1xuXHRcdHRoaXMudmFsaWRhdGlvblJlc3VsdHMucHJvcGVydHlOYW1lID0gbmFtZTtcblx0fVxuXG5cdGdldCBlcnJvcnMoKTogeyBbcHJvcGVydHlOYW1lOiBzdHJpbmddOiBWYWxpZGF0aW9uUmVzdWx0IH0ge1xuXHRcdHJldHVybiB0aGlzLnZhbGlkYXRpb25SZXN1bHRzLndpdGhFcnJvcnMudG9PYmplY3QoKTtcblx0fVxuXG5cdGdldCBpc1ZhbGlkKCk6IGJvb2xlYW4ge1xuXHRcdHJldHVybiB0aGlzLnZhbGlkYXRpb25SZXN1bHRzLmlzVmFsaWQgIT09IGZhbHNlO1xuXHR9XG5cblx0Z2V0IGlzRGlydHkoKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuICEhT2JqZWN0LnZhbHVlczxGb3JtPGFueT4gfCBGb3JtUHJvcGVydHk8YW55Pj4oeyAuLi50aGlzLl9wcm9wZXJ0aWVzLCAuLi50aGlzLl9mb3JtcyB9KS5maW5kKHByb3BlcnR5ID0+IHByb3BlcnR5LmlzRGlydHkpO1xuXHR9XG5cblx0Z2V0IHdhcm5pbmdzKCk6IHsgW3Byb3BlcnR5TmFtZTogc3RyaW5nXTogVmFsaWRhdGlvblJlc3VsdCB9IHtcblx0XHRyZXR1cm4gdGhpcy52YWxpZGF0aW9uUmVzdWx0cy53aXRoV2FybmluZ3MudG9PYmplY3QoKTtcblx0fVxuXG5cdHB1YmxpYyBvblZhbGlkYXRlZChsaXN0ZW5lcjogKHZhbGlkYXRpb25SZXN1bHRzOiBWYWxpZGF0aW9uUmVzdWx0TGlzdCkgPT4gdm9pZCk6ICgpID0+IHZvaWQge1xuXHRcdHRoaXMuX2VtaXR0ZXIub24oJ3ZhbGlkYXRlZCcsIGxpc3RlbmVyKTtcblx0XHRyZXR1cm4gKCkgPT4ge1xuXHRcdFx0dGhpcy5fZW1pdHRlci5vZmYoJ3ZhbGlkYXRlZCcsIGxpc3RlbmVyKTtcblx0XHR9XG5cdH1cblxuXHRwdWJsaWMgcmVzZXQocHJpc3RpbmU6IGJvb2xlYW4gPSBmYWxzZSkge1xuXHRcdE9iamVjdC5rZXlzKHRoaXMuX3Byb3BlcnRpZXMpLmZvckVhY2goa2V5ID0+IHtcblx0XHRcdHRoaXMuX3Byb3BlcnRpZXNba2V5XS5yZXNldChwcmlzdGluZSk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLnZhbGlkYXRlKCk7XG5cdH1cblxuXHRwdWJsaWMgc2V0VmFsaWRhdGlvblJlc3VsdHModmFsaWRhdGlvblJlc3VsdHM6IFZhbGlkYXRpb25SZXN1bHRbXSk6IFZhbGlkYXRpb25SZXN1bHRMaXN0IHtcblx0XHRpZiAoIWlzRW1wdHkodmFsaWRhdGlvblJlc3VsdHMpKSB7XG5cdFx0XHRsZXQgcmVzdWx0cyA9IG5ldyBWYWxpZGF0aW9uUmVzdWx0TGlzdCh2YWxpZGF0aW9uUmVzdWx0cywgdGhpcy5uYW1lLCB0aGlzLmRhdGEpO1xuXHRcdFx0dGhpcy5fbWVyZ2VWYWxpZGF0aW9uUmVzdWx0cyhyZXN1bHRzKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy52YWxpZGF0aW9uUmVzdWx0cztcblx0fVxuXG5cdHB1YmxpYyB2YWxpZGF0ZSgpIHtcblx0XHRjb25zdCByZXN1bHRzID0gdGhpcy52YWxpZGF0b3IudmFsaWRhdGUodGhpcy5kYXRhLCB0aGlzLmN1c3RvbVZhbGlkYXRpb25PcHRpb25zKTtcblx0XHR0aGlzLl9tZXJnZVZhbGlkYXRpb25SZXN1bHRzKHJlc3VsdHMpO1xuXG5cdFx0T2JqZWN0LmtleXModGhpcy5fZm9ybXMpLmZvckVhY2goZm9ybU5hbWUgPT4ge1xuXHRcdFx0dGhpcy5fZm9ybXNbZm9ybU5hbWVdLnZhbGlkYXRlKCk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gdGhpcy52YWxpZGF0aW9uUmVzdWx0cztcblx0fVxuXG5cdHByaXZhdGUgX21lcmdlVmFsaWRhdGlvblJlc3VsdHModmFsaWRhdGlvblJlc3VsdHM6IFZhbGlkYXRpb25SZXN1bHRMaXN0KSB7XG5cdFx0dmFsaWRhdGlvblJlc3VsdHMuZm9yRWFjaChyZXN1bHQgPT4ge1xuXHRcdFx0dGhpcy52YWxpZGF0aW9uUmVzdWx0cy5yZW1vdmUocmVzdWx0LnByb3BlcnR5TmFtZSk7XG5cdFx0XHR0aGlzLnZhbGlkYXRpb25SZXN1bHRzLnB1c2gocmVzdWx0KTtcblx0XHR9KTtcblxuXHRcdHRoaXMudmFsaWRhdGlvblJlc3VsdHMudmFsdWUgPSB0aGlzLmRhdGE7XG5cdFx0dGhpcy5fZW1pdHRlci5lbWl0KCd2YWxpZGF0ZWQnLCB0aGlzLnZhbGlkYXRpb25SZXN1bHRzKTtcblx0fVxufSJdfQ==