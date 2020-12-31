"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _copy = _interopRequireDefault(require("./utils/copy"));

var _quality = require("./utils/quality");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ValidationResultList = /*#__PURE__*/function () {
  function ValidationResultList() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var propertyName = arguments.length > 1 ? arguments[1] : undefined;
    var value = arguments.length > 2 ? arguments[2] : undefined;

    _classCallCheck(this, ValidationResultList);

    _defineProperty(this, "_entries", []);

    _defineProperty(this, "propertyName", void 0);

    _defineProperty(this, "value", void 0);

    this.propertyName = propertyName;
    this.value = value;
    this._entries = this._entries.concat(args);
  }

  _createClass(ValidationResultList, [{
    key: "forEach",
    value: function forEach(cb) {
      this._entries.forEach(cb);
    }
  }, {
    key: "clear",
    value: function clear() {
      this._entries = [];
      this.value = null;
    }
  }, {
    key: "get",
    value: function get(propertyName) {
      return this._entries.find(function (x) {
        return x.propertyName === propertyName;
      });
    }
  }, {
    key: "getWithRelatedResults",
    value: function getWithRelatedResults(propertyName) {
      var found = new ValidationResultList([], propertyName);
      var exactResult = this.get(propertyName);

      if (exactResult) {
        found.value = exactResult.value;
        found.push(exactResult);
      }

      this._entries.forEach(function (x) {
        var matches = new RegExp("^".concat(propertyName, "[.|[]")).test(x.propertyName);

        if (matches) {
          found.push(x);
        }
      });

      return found;
    }
  }, {
    key: "merge",
    value: function merge(resultList) {
      return ValidationResultList.merge(this, resultList);
    }
  }, {
    key: "push",
    value: function push(result) {
      var existingResult = this.get(result.propertyName);

      if (existingResult) {
        existingResult = existingResult.merge(result);
      } else {
        this._entries.push(result);
      }
    }
  }, {
    key: "remove",
    value: function remove(propertyName) {
      var index = this._entries.findIndex(function (entry) {
        return entry.propertyName === propertyName;
      });

      var removed = null;

      if (index > -1) {
        removed = this._entries.splice(index, 1);
        return removed[0];
      }

      return removed;
    }
  }, {
    key: "removeWithRelatedResults",
    value: function removeWithRelatedResults(propertyName) {
      var removed = new ValidationResultList([], propertyName);
      var exactMatch = this.remove(propertyName);

      if (exactMatch) {
        removed.value = exactMatch.value;
        removed.push(exactMatch);
      }

      this._entries = this._entries.filter(function (x) {
        var matches = new RegExp("^".concat(propertyName, "[.|[]")).test(x.propertyName);

        if (matches) {
          removed.push(x);
        }

        return !matches;
      });
      return removed;
    }
  }, {
    key: "toArray",
    value: function toArray() {
      return Array.from(this._entries);
    }
  }, {
    key: "toObject",
    value: function toObject() {
      var obj = {};

      this._entries.forEach(function (x) {
        return obj[x.propertyName] = x;
      });

      return obj;
    }
  }, {
    key: "isValid",
    get: function get() {
      return this._entries.filter(function (x) {
        return x.errorCount > 0;
      }).length === 0;
    }
  }, {
    key: "length",
    get: function get() {
      return this._entries.length;
    }
  }, {
    key: "entries",
    get: function get() {
      return this._entries;
    }
  }, {
    key: "withErrors",
    get: function get() {
      return new ValidationResultList(this._entries.filter(function (x) {
        return x.errorCount > 0;
      }), this.propertyName, this.value);
    }
  }, {
    key: "withWarnings",
    get: function get() {
      return new ValidationResultList(this._entries.filter(function (x) {
        return x.warningCount > 0;
      }), this.propertyName, this.value);
    }
  }], [{
    key: "merge",
    value: function merge(dest, src) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
        useSourceValue: false
      };

      if (dest !== src) {
        src.forEach(function (result) {
          dest.push(result);
        });
      }

      if (!(0, _quality.isEqual)(dest.value, src.value) && options.useSourceValue) {
        dest.value = (0, _copy["default"])(src.value);
      }

      return dest;
    }
  }]);

  return ValidationResultList;
}();

exports["default"] = ValidationResultList;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9WYWxpZGF0aW9uUmVzdWx0TGlzdC50cyJdLCJuYW1lcyI6WyJWYWxpZGF0aW9uUmVzdWx0TGlzdCIsImFyZ3MiLCJwcm9wZXJ0eU5hbWUiLCJ2YWx1ZSIsIl9lbnRyaWVzIiwiY29uY2F0IiwiY2IiLCJmb3JFYWNoIiwiZmluZCIsIngiLCJmb3VuZCIsImV4YWN0UmVzdWx0IiwiZ2V0IiwicHVzaCIsIm1hdGNoZXMiLCJSZWdFeHAiLCJ0ZXN0IiwicmVzdWx0TGlzdCIsIm1lcmdlIiwicmVzdWx0IiwiZXhpc3RpbmdSZXN1bHQiLCJpbmRleCIsImZpbmRJbmRleCIsImVudHJ5IiwicmVtb3ZlZCIsInNwbGljZSIsImV4YWN0TWF0Y2giLCJyZW1vdmUiLCJmaWx0ZXIiLCJBcnJheSIsImZyb20iLCJvYmoiLCJlcnJvckNvdW50IiwibGVuZ3RoIiwid2FybmluZ0NvdW50IiwiZGVzdCIsInNyYyIsIm9wdGlvbnMiLCJ1c2VTb3VyY2VWYWx1ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFHcUJBLG9CO0FBS3BCLGtDQUErRTtBQUFBLFFBQW5FQyxJQUFtRSx1RUFBeEMsRUFBd0M7QUFBQSxRQUFwQ0MsWUFBb0M7QUFBQSxRQUFiQyxLQUFhOztBQUFBOztBQUFBLHNDQUp0QyxFQUlzQzs7QUFBQTs7QUFBQTs7QUFDOUUsU0FBS0QsWUFBTCxHQUFvQkEsWUFBcEI7QUFDQSxTQUFLQyxLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCLEtBQUtBLFFBQUwsQ0FBY0MsTUFBZCxDQUFxQkosSUFBckIsQ0FBaEI7QUFDQTs7Ozs0QkFVY0ssRSxFQUFpRjtBQUMvRixXQUFLRixRQUFMLENBQWNHLE9BQWQsQ0FBc0JELEVBQXRCO0FBQ0E7Ozs0QkFjYztBQUNkLFdBQUtGLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxXQUFLRCxLQUFMLEdBQWEsSUFBYjtBQUNBOzs7d0JBRVVELFksRUFBK0M7QUFDekQsYUFB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T0FBaUQ7O0FBQzdKLFVBQUlILElBQUksS0FBS0MsR0FBYixFQUFrQjtBQUNqQkEsUUFBQUEsR0FBRyxDQUFDN0IsT0FBSixDQUFZLFVBQUNZLE1BQUQsRUFBWTtBQUN2QmdCLFVBQUFBLElBQUksQ0FBQ3RCLElBQUwsQ0FBVU0sTUFBVjtBQUNBLFNBRkQ7QUFHQTs7QUFFRCxVQUFJLENBQUMsc0JBQVFnQixJQUFJLENBQUNoQyxLQUFiLEVBQW9CaUMsR0FBRyxDQUFDakMsS0FBeEIsQ0FBRCxJQUFtQ2tDLE9BQU8sQ0FBQ0MsY0FBL0MsRUFBK0Q7QUFDOURILFFBQUFBLElBQUksQ0FBQ2hDLEtBQUwsR0FBYSxzQkFBS2lDLEdBQUcsQ0FBQ2pDLEtBQVQsQ0FBYjtBQUNBOztBQUVELGFBQU9nQyxJQUFQO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUVmFsaWRhdGlvblJlc3VsdE1lcmdlT3B0aW9ucyB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IGNvcHkgZnJvbSAnLi91dGlscy9jb3B5JztcbmltcG9ydCB7IGlzRXF1YWwgfSBmcm9tICcuL3V0aWxzL3F1YWxpdHknO1xuaW1wb3J0IFZhbGlkYXRpb25SZXN1bHQgZnJvbSAnLi9WYWxpZGF0aW9uUmVzdWx0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmFsaWRhdGlvblJlc3VsdExpc3Qge1xuXHRwcm90ZWN0ZWQgX2VudHJpZXM6IFZhbGlkYXRpb25SZXN1bHRbXSA9IFtdO1xuXHRwdWJsaWMgcHJvcGVydHlOYW1lOiBzdHJpbmd8dW5kZWZpbmVkO1xuXHRwdWJsaWMgdmFsdWU6IGFueTtcblxuXHRjb25zdHJ1Y3RvcihhcmdzOiBWYWxpZGF0aW9uUmVzdWx0W10gPSBbXSwgcHJvcGVydHlOYW1lPzogc3RyaW5nLCB2YWx1ZT86IGFueSkge1xuXHRcdHRoaXMucHJvcGVydHlOYW1lID0gcHJvcGVydHlOYW1lO1xuXHRcdHRoaXMudmFsdWUgPSB2YWx1ZTtcblx0XHR0aGlzLl9lbnRyaWVzID0gdGhpcy5fZW50cmllcy5jb25jYXQoYXJncyk7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IGlzVmFsaWQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2VudHJpZXMuZmlsdGVyKHggPT4geC5lcnJvckNvdW50ID4gMCkubGVuZ3RoID09PSAwO1xuXHR9XG5cblx0cHVibGljIGdldCBsZW5ndGgoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2VudHJpZXMubGVuZ3RoO1xuXHR9XG5cblx0cHVibGljIGZvckVhY2goY2I6ICh2YWx1ZTogVmFsaWRhdGlvblJlc3VsdCwgaW5kZXg6IG51bWJlciwgYXJyYXk6IFZhbGlkYXRpb25SZXN1bHRbXSkgPT4gdm9pZCkge1xuXHRcdHRoaXMuX2VudHJpZXMuZm9yRWFjaChjYik7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IGVudHJpZXMoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2VudHJpZXM7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IHdpdGhFcnJvcnMoKTogVmFsaWRhdGlvblJlc3VsdExpc3Qge1xuXHRcdHJldHVybiBuZXcgVmFsaWRhdGlvblJlc3VsdExpc3QodGhpcy5fZW50cmllcy5maWx0ZXIoeCA9PiB4LmVycm9yQ291bnQgPiAwKSwgdGhpcy5wcm9wZXJ0eU5hbWUsIHRoaXMudmFsdWUpO1xuXHR9XG5cblx0cHVibGljIGdldCB3aXRoV2FybmluZ3MoKTogVmFsaWRhdGlvblJlc3VsdExpc3Qge1xuXHRcdHJldHVybiBuZXcgVmFsaWRhdGlvblJlc3VsdExpc3QodGhpcy5fZW50cmllcy5maWx0ZXIoeCA9PiB4Lndhcm5pbmdDb3VudCA+IDApLCB0aGlzLnByb3BlcnR5TmFtZSwgdGhpcy52YWx1ZSk7XG5cdH1cblxuXHRwdWJsaWMgY2xlYXIoKSB7XG5cdFx0dGhpcy5fZW50cmllcyA9IFtdO1xuXHRcdHRoaXMudmFsdWUgPSBudWxsO1xuXHR9XG5cblx0cHVibGljIGdldChwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IFZhbGlkYXRpb25SZXN1bHQgfCB2b2lkIHtcblx0XHRyZXR1cm4gdGhpcy5fZW50cmllcy5maW5kKHggPT4geC5wcm9wZXJ0eU5hbWUgPT09IHByb3BlcnR5TmFtZSk7XG5cdH1cblxuXHRwdWJsaWMgZ2V0V2l0aFJlbGF0ZWRSZXN1bHRzKHByb3BlcnR5TmFtZTogc3RyaW5nKTogVmFsaWRhdGlvblJlc3VsdExpc3Qge1xuXHRcdGNvbnN0IGZvdW5kID0gbmV3IFZhbGlkYXRpb25SZXN1bHRMaXN0KFtdLCBwcm9wZXJ0eU5hbWUpO1xuXHRcdGNvbnN0IGV4YWN0UmVzdWx0ID0gdGhpcy5nZXQocHJvcGVydHlOYW1lKTtcblxuXHRcdGlmIChleGFjdFJlc3VsdCkge1xuXHRcdFx0Zm91bmQudmFsdWUgPSBleGFjdFJlc3VsdC52YWx1ZTtcblx0XHRcdGZvdW5kLnB1c2goZXhhY3RSZXN1bHQpO1xuXHRcdH1cblxuXHRcdHRoaXMuX2VudHJpZXMuZm9yRWFjaCh4ID0+IHtcblx0XHRcdGNvbnN0IG1hdGNoZXMgPSBuZXcgUmVnRXhwKGBeJHtwcm9wZXJ0eU5hbWV9W1xcLnxcXFtdYCkudGVzdCh4LnByb3BlcnR5TmFtZSk7XG5cdFx0XHRpZiAobWF0Y2hlcykge1xuXHRcdFx0XHRmb3VuZC5wdXNoKHgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIGZvdW5kO1xuXHR9XG5cblx0cHVibGljIG1lcmdlKHJlc3VsdExpc3Q6IFZhbGlkYXRpb25SZXN1bHRMaXN0KSB7XG5cdFx0cmV0dXJuIFZhbGlkYXRpb25SZXN1bHRMaXN0Lm1lcmdlKHRoaXMsIHJlc3VsdExpc3QpO1xuXHR9XG5cblx0cHVibGljIHB1c2gocmVzdWx0OiBWYWxpZGF0aW9uUmVzdWx0KSB7XG5cdFx0bGV0IGV4aXN0aW5nUmVzdWx0ID0gdGhpcy5nZXQocmVzdWx0LnByb3BlcnR5TmFtZSk7XG5cdFx0aWYgKGV4aXN0aW5nUmVzdWx0KSB7XG5cdFx0XHRleGlzdGluZ1Jlc3VsdCA9IGV4aXN0aW5nUmVzdWx0Lm1lcmdlKHJlc3VsdCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX2VudHJpZXMucHVzaChyZXN1bHQpO1xuXHRcdH1cblx0fVxuXG5cdHB1YmxpYyByZW1vdmUocHJvcGVydHlOYW1lOiBzdHJpbmcpOiBWYWxpZGF0aW9uUmVzdWx0IHwgbnVsbCB7XG5cdFx0Y29uc3QgaW5kZXggPSB0aGlzLl9lbnRyaWVzLmZpbmRJbmRleCgoZW50cnkpID0+IGVudHJ5LnByb3BlcnR5TmFtZSA9PT0gcHJvcGVydHlOYW1lKTtcblx0XHRsZXQgcmVtb3ZlZCA9IG51bGw7XG5cblx0XHRpZiAoaW5kZXggPiAtMSkge1xuXHRcdFx0cmVtb3ZlZCA9IHRoaXMuX2VudHJpZXMuc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdHJldHVybiByZW1vdmVkWzBdO1xuXHRcdH1cblxuXHRcdHJldHVybiByZW1vdmVkO1xuXHR9XG5cblx0cHVibGljIHJlbW92ZVdpdGhSZWxhdGVkUmVzdWx0cyhwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IFZhbGlkYXRpb25SZXN1bHRMaXN0IHtcblx0XHRjb25zdCByZW1vdmVkID0gbmV3IFZhbGlkYXRpb25SZXN1bHRMaXN0KFtdLCBwcm9wZXJ0eU5hbWUpO1xuXHRcdGNvbnN0IGV4YWN0TWF0Y2ggPSB0aGlzLnJlbW92ZShwcm9wZXJ0eU5hbWUpO1xuXHRcdGlmIChleGFjdE1hdGNoKSB7XG5cdFx0XHRyZW1vdmVkLnZhbHVlID0gZXhhY3RNYXRjaC52YWx1ZTtcblx0XHRcdHJlbW92ZWQucHVzaChleGFjdE1hdGNoKTtcblx0XHR9XG5cblx0XHR0aGlzLl9lbnRyaWVzID0gdGhpcy5fZW50cmllcy5maWx0ZXIoeCA9PiB7XG5cdFx0XHRjb25zdCBtYXRjaGVzID0gbmV3IFJlZ0V4cChgXiR7cHJvcGVydHlOYW1lfVtcXC58XFxbXWApLnRlc3QoeC5wcm9wZXJ0eU5hbWUpO1xuXHRcdFx0aWYgKG1hdGNoZXMpIHtcblx0XHRcdFx0cmVtb3ZlZC5wdXNoKHgpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuICFtYXRjaGVzO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHJlbW92ZWQ7XG5cdH1cblxuXHRwdWJsaWMgdG9BcnJheSgpOiBWYWxpZGF0aW9uUmVzdWx0W10ge1xuXHRcdHJldHVybiBBcnJheS5mcm9tKHRoaXMuX2VudHJpZXMpO1xuXHR9XG5cblx0cHVibGljIHRvT2JqZWN0KCk6IHsgW3Byb3BlcnR5TmFtZTogc3RyaW5nXTogVmFsaWRhdGlvblJlc3VsdCB9IHtcblx0XHRjb25zdCBvYmo6IHsgW3Byb3BlcnR5TmFtZTogc3RyaW5nXTogVmFsaWRhdGlvblJlc3VsdCB9ID0ge307XG5cdFx0dGhpcy5fZW50cmllcy5mb3JFYWNoKHggPT4gKG9ialt4LnByb3BlcnR5TmFtZV0gPSB4KSk7XG5cdFx0cmV0dXJuIG9iajtcblx0fVxuXG5cdHN0YXRpYyBtZXJnZShkZXN0OiBWYWxpZGF0aW9uUmVzdWx0TGlzdCwgc3JjOiBWYWxpZGF0aW9uUmVzdWx0TGlzdCwgb3B0aW9uczogVFZhbGlkYXRpb25SZXN1bHRNZXJnZU9wdGlvbnMgPSB7IHVzZVNvdXJjZVZhbHVlOiBmYWxzZSB9KTogVmFsaWRhdGlvblJlc3VsdExpc3Qge1xuXHRcdGlmIChkZXN0ICE9PSBzcmMpIHtcblx0XHRcdHNyYy5mb3JFYWNoKChyZXN1bHQpID0+IHtcblx0XHRcdFx0ZGVzdC5wdXNoKHJlc3VsdCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRpZiAoIWlzRXF1YWwoZGVzdC52YWx1ZSwgc3JjLnZhbHVlKSAmJiBvcHRpb25zLnVzZVNvdXJjZVZhbHVlKSB7XG5cdFx0XHRkZXN0LnZhbHVlID0gY29weShzcmMudmFsdWUpO1xuXHRcdH1cblxuXHRcdHJldHVybiBkZXN0O1xuXHR9XG59Il19