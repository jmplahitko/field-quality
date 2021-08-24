"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FormProperty = /*#__PURE__*/function () {
  function FormProperty(name, originalValue) {
    _classCallCheck(this, FormProperty);

    _defineProperty(this, "_isDirty", false);

    this.name = name;
    this._originalValue = this._value = originalValue;
    var self = this;
    Object.defineProperty(this, 'value', {
      get: function get() {
        return self._value;
      },
      set: function set(value) {
        self._isDirty = true;
        self._value = value;
      }
    });
  }

  _createClass(FormProperty, [{
    key: "isDirty",
    get: function get() {
      return this._isDirty;
    }
  }, {
    key: "reset",
    value: function reset() {
      var pristine = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.value = this._originalValue;
      this._isDirty = pristine ? !pristine : this.isDirty;
    }
  }]);

  return FormProperty;
}();

exports["default"] = FormProperty;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mb3Jtcy9Gb3JtUHJvcGVydHkudHMiXSwibmFtZXMiOlsiRm9ybVByb3BlcnR5IiwibmFtZSIsIm9yaWdpbmFsVmFsdWUiLCJfb3JpZ2luYWxWYWx1ZSIsIl92YWx1ZSIsInNlbGYiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsInNldCIsInZhbHVlIiwiX2lzRGlydHkiLCJwcmlzdGluZSIsImlzRGlydHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztJQUVxQkEsWTtBQU9wQix3QkFBWUMsSUFBWixFQUEwQkMsYUFBMUIsRUFBNEM7QUFBQTs7QUFBQSxzQ0FIaEIsS0FHZ0I7O0FBQzNDLFNBQUtELElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtFLGNBQUwsR0FBc0IsS0FBS0MsTUFBTCxHQUFjRixhQUFwQztBQUVBLFFBQU1HLElBQUksR0FBRyxJQUFiO0FBQ0FDLElBQUFBLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQixJQUF0QixFQUE0QixPQUE1QixFQUFxQztBQUNwQ0MsTUFBQUEsR0FEb0MsaUJBQzlCO0FBQ0wsZUFBT0gsSUFBSSxDQUFDRCxNQUFaO0FBQ0EsT0FIbUM7QUFJcENLLE1BQUFBLEdBSm9DLGVBSWhDQyxLQUpnQyxFQUl0QjtBQUNiTCxRQUFBQSxJQUFJLENBQUNNLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQU4sUUFBQUEsSUFBSSxDQUFDRCxNQUFMLEdBQWNNLEtBQWQ7QUFDQTtBQVBtQyxLQUFyQztBQVNBOzs7O1NBRUQsZUFBYztBQUNiLGFBQU8sS0FBS0MsUUFBWjtBQUNBOzs7V0FFRCxpQkFBd0M7QUFBQSxVQUEzQkMsUUFBMkIsdUVBQVAsS0FBTztBQUN2QyxXQUFLRixLQUFMLEdBQWEsS0FBS1AsY0FBbEI7QUFDQSxXQUFLUSxRQUFMLEdBQWdCQyxRQUFRLEdBQUcsQ0FBQ0EsUUFBSixHQUFlLEtBQUtDLE9BQTVDO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcm94aWZ5IH0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm1Qcm9wZXJ0eTxUPiB7XG5cdHJlYWRvbmx5IG5hbWU6IHN0cmluZztcblx0cHVibGljIHZhbHVlITogUHJveGlmeTxUPjtcblx0cHJpdmF0ZSBfdmFsdWU6IFQ7XG5cdHByaXZhdGUgX2lzRGlydHk6IGJvb2xlYW4gPSBmYWxzZTtcblx0cHJpdmF0ZSBfb3JpZ2luYWxWYWx1ZTogVDtcblxuXHRjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIG9yaWdpbmFsVmFsdWU6IFQpIHtcblx0XHR0aGlzLm5hbWUgPSBuYW1lO1xuXHRcdHRoaXMuX29yaWdpbmFsVmFsdWUgPSB0aGlzLl92YWx1ZSA9IG9yaWdpbmFsVmFsdWU7XG5cblx0XHRjb25zdCBzZWxmID0gdGhpcztcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3ZhbHVlJywge1xuXHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRyZXR1cm4gc2VsZi5fdmFsdWU7XG5cdFx0XHR9LFxuXHRcdFx0c2V0KHZhbHVlOiBUKSB7XG5cdFx0XHRcdHNlbGYuX2lzRGlydHkgPSB0cnVlO1xuXHRcdFx0XHRzZWxmLl92YWx1ZSA9IHZhbHVlO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0Z2V0IGlzRGlydHkoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2lzRGlydHk7XG5cdH1cblxuXHRwdWJsaWMgcmVzZXQocHJpc3RpbmU6IGJvb2xlYW4gPSBmYWxzZSkge1xuXHRcdHRoaXMudmFsdWUgPSB0aGlzLl9vcmlnaW5hbFZhbHVlO1xuXHRcdHRoaXMuX2lzRGlydHkgPSBwcmlzdGluZSA/ICFwcmlzdGluZSA6IHRoaXMuaXNEaXJ0eTtcblx0fVxufSJdfQ==