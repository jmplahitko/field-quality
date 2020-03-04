"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ValidationResultList = /*#__PURE__*/function () {
  function ValidationResultList() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var properytName = arguments.length > 1 ? arguments[1] : undefined;
    var value = arguments.length > 2 ? arguments[2] : undefined;

    _classCallCheck(this, ValidationResultList);

    _defineProperty(this, "_entries", []);

    _defineProperty(this, "propertyName", void 0);

    _defineProperty(this, "value", void 0);

    this.propertyName = properytName;
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

      if (index !== null) {
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
      if (dest !== src) {
        src.forEach(function (result) {
          dest.push(result);
        });
        return dest;
      } else {
        return dest;
      }
    }
  }]);

  return ValidationResultList;
}();

exports["default"] = ValidationResultList;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9WYWxpZGF0aW9uUmVzdWx0TGlzdC50cyJdLCJuYW1lcyI6WyJWYWxpZGF0aW9uUmVzdWx0TGlzdCIsImFyZ3MiLCJwcm9wZXJ5dE5hbWUiLCJ2YWx1ZSIsInByb3BlcnR5TmFtZSIsIl9lbnRyaWVzIiwiY29uY2F0IiwiY2IiLCJmb3JFYWNoIiwiZmluZCIsIngiLCJmb3VuZCIsImV4YWN0UmVzdWx0IiwiZ2V0IiwicHVzaCIsIm1hdGNoZXMiLCJSZWdFeHAiLCJ0ZXN0IiwicmVzdWx0TGlzdCIsIm1lcmdlIiwicmVzdWx0IiwiZXhpc3RpbmdSZXN1bHQiLCJpbmRleCIsImZpbmRJbmRleCIsImVudHJ5IiwicmVtb3ZlZCIsInNwbGljZSIsImV4YWN0TWF0Y2giLCJyZW1vdmUiLCJmaWx0ZXIiLCJBcnJheSIsImZyb20iLCJvYmoiLCJlcnJvckNvdW50IiwibGVuZ3RoIiwid2FybmluZ0NvdW50IiwiZGVzdCIsInNyYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxvQjtBQUtwQixrQ0FBK0U7QUFBQSxRQUFuRUMsSUFBbUUsdUVBQXhDLEVBQXdDO0FBQUEsUUFBcENDLFlBQW9DO0FBQUEsUUFBYkMsS0FBYTs7QUFBQTs7QUFBQSxzQ0FKdEMsRUFJc0M7O0FBQUE7O0FBQUE7O0FBQzlFLFNBQUtDLFlBQUwsR0FBb0JGLFlBQXBCO0FBQ0EsU0FBS0MsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0UsUUFBTCxHQUFnQixLQUFLQSxRQUFMLENBQWNDLE1BQWQsQ0FBcUJMLElBQXJCLENBQWhCO0FBQ0E7Ozs7NEJBVWNNLEUsRUFBaUY7QUFDL0YsV0FBS0YsUUFBTCxDQUFjRyxPQUFkLENBQXNCRCxFQUF0QjtBQUNBOzs7NEJBYWM7QUFDZCxXQUFLRixRQUFMLEdBQWdCLEVBQWhCO0FBQ0EsV0FBS0YsS0FBTCxHQUFhLElBQWI7QUFDQTs7O3dCQUVVQyxZLEVBQStDO0FBQ3pELGFBQU8sS0FBS0MsUUFBTCxDQUFjSSxJQUFkLENB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WTtBQUN2QmdCLFVBQUFBLElBQUksQ0FBQ3RCLElBQUwsQ0FBVU0sTUFBVjtBQUNBLFNBRkQ7QUFJQSxlQUFPZ0IsSUFBUDtBQUNBLE9BTkQsTUFNTztBQUNOLGVBQU9BLElBQVA7QUFDQTtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZhbGlkYXRpb25SZXN1bHQgZnJvbSAnLi9WYWxpZGF0aW9uUmVzdWx0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmFsaWRhdGlvblJlc3VsdExpc3Qge1xuXHRwcm90ZWN0ZWQgX2VudHJpZXM6IFZhbGlkYXRpb25SZXN1bHRbXSA9IFtdO1xuXHRwdWJsaWMgcHJvcGVydHlOYW1lOiBzdHJpbmd8dW5kZWZpbmVkO1xuXHRwdWJsaWMgdmFsdWU6IGFueTtcblxuXHRjb25zdHJ1Y3RvcihhcmdzOiBWYWxpZGF0aW9uUmVzdWx0W10gPSBbXSwgcHJvcGVyeXROYW1lPzogc3RyaW5nLCB2YWx1ZT86IGFueSkge1xuXHRcdHRoaXMucHJvcGVydHlOYW1lID0gcHJvcGVyeXROYW1lO1xuXHRcdHRoaXMudmFsdWUgPSB2YWx1ZTtcblx0XHR0aGlzLl9lbnRyaWVzID0gdGhpcy5fZW50cmllcy5jb25jYXQoYXJncyk7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IGlzVmFsaWQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2VudHJpZXMuZmlsdGVyKHggPT4geC5lcnJvckNvdW50ID4gMCkubGVuZ3RoID09PSAwO1xuXHR9XG5cblx0cHVibGljIGdldCBsZW5ndGgoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2VudHJpZXMubGVuZ3RoO1xuXHR9XG5cblx0cHVibGljIGZvckVhY2goY2I6ICh2YWx1ZTogVmFsaWRhdGlvblJlc3VsdCwgaW5kZXg6IG51bWJlciwgYXJyYXk6IFZhbGlkYXRpb25SZXN1bHRbXSkgPT4gdm9pZCkge1xuXHRcdHRoaXMuX2VudHJpZXMuZm9yRWFjaChjYik7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IGVudHJpZXMoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2VudHJpZXM7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IHdpdGhFcnJvcnMoKTogVmFsaWRhdGlvblJlc3VsdExpc3Qge1xuXHRcdHJldHVybiBuZXcgVmFsaWRhdGlvblJlc3VsdExpc3QodGhpcy5fZW50cmllcy5maWx0ZXIoeCA9PiB4LmVycm9yQ291bnQgPiAwKSwgdGhpcy5wcm9wZXJ0eU5hbWUsIHRoaXMudmFsdWUpO1xuXHR9XG5cblx0cHVibGljIGdldCB3aXRoV2FybmluZ3MoKTogVmFsaWRhdGlvblJlc3VsdExpc3Qge1xuXHRcdHJldHVybiBuZXcgVmFsaWRhdGlvblJlc3VsdExpc3QodGhpcy5fZW50cmllcy5maWx0ZXIoeCA9PiB4Lndhcm5pbmdDb3VudCA+IDApLCB0aGlzLnByb3BlcnR5TmFtZSwgdGhpcy52YWx1ZSk7XG5cdH1cblx0cHVibGljIGNsZWFyKCkge1xuXHRcdHRoaXMuX2VudHJpZXMgPSBbXTtcblx0XHR0aGlzLnZhbHVlID0gbnVsbDtcblx0fVxuXG5cdHB1YmxpYyBnZXQocHJvcGVydHlOYW1lOiBzdHJpbmcpOiBWYWxpZGF0aW9uUmVzdWx0IHwgdm9pZCB7XG5cdFx0cmV0dXJuIHRoaXMuX2VudHJpZXMuZmluZCh4ID0+IHgucHJvcGVydHlOYW1lID09PSBwcm9wZXJ0eU5hbWUpO1xuXHR9XG5cblx0cHVibGljIGdldFdpdGhSZWxhdGVkUmVzdWx0cyhwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IFZhbGlkYXRpb25SZXN1bHRMaXN0IHtcblx0XHRjb25zdCBmb3VuZCA9IG5ldyBWYWxpZGF0aW9uUmVzdWx0TGlzdChbXSwgcHJvcGVydHlOYW1lKTtcblx0XHRjb25zdCBleGFjdFJlc3VsdCA9IHRoaXMuZ2V0KHByb3BlcnR5TmFtZSk7XG5cblx0XHRpZiAoZXhhY3RSZXN1bHQpIHtcblx0XHRcdGZvdW5kLnZhbHVlID0gZXhhY3RSZXN1bHQudmFsdWU7XG5cdFx0XHRmb3VuZC5wdXNoKGV4YWN0UmVzdWx0KTtcblx0XHR9XG5cblx0XHR0aGlzLl9lbnRyaWVzLmZvckVhY2goeCA9PiB7XG5cdFx0XHRjb25zdCBtYXRjaGVzID0gbmV3IFJlZ0V4cChgXiR7cHJvcGVydHlOYW1lfVtcXC58XFxbXWApLnRlc3QoeC5wcm9wZXJ0eU5hbWUpO1xuXHRcdFx0aWYgKG1hdGNoZXMpIHtcblx0XHRcdFx0Zm91bmQucHVzaCh4KTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHJldHVybiBmb3VuZDtcblx0fVxuXG5cdHB1YmxpYyBtZXJnZShyZXN1bHRMaXN0OiBWYWxpZGF0aW9uUmVzdWx0TGlzdCkge1xuXHRcdHJldHVybiBWYWxpZGF0aW9uUmVzdWx0TGlzdC5tZXJnZSh0aGlzLCByZXN1bHRMaXN0KTtcblx0fVxuXG5cdHB1YmxpYyBwdXNoKHJlc3VsdDogVmFsaWRhdGlvblJlc3VsdCkge1xuXHRcdGxldCBleGlzdGluZ1Jlc3VsdCA9IHRoaXMuZ2V0KHJlc3VsdC5wcm9wZXJ0eU5hbWUpO1xuXHRcdGlmIChleGlzdGluZ1Jlc3VsdCkge1xuXHRcdFx0ZXhpc3RpbmdSZXN1bHQgPSBleGlzdGluZ1Jlc3VsdC5tZXJnZShyZXN1bHQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9lbnRyaWVzLnB1c2gocmVzdWx0KTtcblx0XHR9XG5cdH1cblxuXHRwdWJsaWMgcmVtb3ZlKHByb3BlcnR5TmFtZTogc3RyaW5nKTogVmFsaWRhdGlvblJlc3VsdCB8IG51bGwge1xuXHRcdGNvbnN0IGluZGV4ID0gdGhpcy5fZW50cmllcy5maW5kSW5kZXgoKGVudHJ5KSA9PiBlbnRyeS5wcm9wZXJ0eU5hbWUgPT09IHByb3BlcnR5TmFtZSk7XG5cdFx0bGV0IHJlbW92ZWQgPSBudWxsO1xuXG5cdFx0aWYgKGluZGV4ICE9PSBudWxsKSB7XG5cdFx0XHRyZW1vdmVkID0gdGhpcy5fZW50cmllcy5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdFx0cmV0dXJuIHJlbW92ZWRbMF07XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlbW92ZWQ7XG5cdH1cblxuXHRwdWJsaWMgcmVtb3ZlV2l0aFJlbGF0ZWRSZXN1bHRzKHByb3BlcnR5TmFtZTogc3RyaW5nKTogVmFsaWRhdGlvblJlc3VsdExpc3Qge1xuXHRcdGNvbnN0IHJlbW92ZWQgPSBuZXcgVmFsaWRhdGlvblJlc3VsdExpc3QoW10sIHByb3BlcnR5TmFtZSk7XG5cdFx0Y29uc3QgZXhhY3RNYXRjaCA9IHRoaXMucmVtb3ZlKHByb3BlcnR5TmFtZSk7XG5cdFx0aWYgKGV4YWN0TWF0Y2gpIHtcblx0XHRcdHJlbW92ZWQudmFsdWUgPSBleGFjdE1hdGNoLnZhbHVlO1xuXHRcdFx0cmVtb3ZlZC5wdXNoKGV4YWN0TWF0Y2gpO1xuXHRcdH1cblxuXHRcdHRoaXMuX2VudHJpZXMgPSB0aGlzLl9lbnRyaWVzLmZpbHRlcih4ID0+IHtcblx0XHRcdGNvbnN0IG1hdGNoZXMgPSBuZXcgUmVnRXhwKGBeJHtwcm9wZXJ0eU5hbWV9W1xcLnxcXFtdYCkudGVzdCh4LnByb3BlcnR5TmFtZSk7XG5cdFx0XHRpZiAobWF0Y2hlcykge1xuXHRcdFx0XHRyZW1vdmVkLnB1c2goeCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gIW1hdGNoZXM7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gcmVtb3ZlZDtcblx0fVxuXG5cdHB1YmxpYyB0b0FycmF5KCk6IFZhbGlkYXRpb25SZXN1bHRbXSB7XG5cdFx0cmV0dXJuIEFycmF5LmZyb20odGhpcy5fZW50cmllcyk7XG5cdH1cblxuXHRwdWJsaWMgdG9PYmplY3QoKTogeyBbcHJvcGVydHlOYW1lOiBzdHJpbmddOiBWYWxpZGF0aW9uUmVzdWx0IH0ge1xuXHRcdGNvbnN0IG9iajogeyBbcHJvcGVydHlOYW1lOiBzdHJpbmddOiBWYWxpZGF0aW9uUmVzdWx0IH0gPSB7fTtcblx0XHR0aGlzLl9lbnRyaWVzLmZvckVhY2goeCA9PiAob2JqW3gucHJvcGVydHlOYW1lXSA9IHgpKTtcblx0XHRyZXR1cm4gb2JqO1xuXHR9XG5cblx0c3RhdGljIG1lcmdlKGRlc3Q6IFZhbGlkYXRpb25SZXN1bHRMaXN0LCBzcmM6IFZhbGlkYXRpb25SZXN1bHRMaXN0KTogVmFsaWRhdGlvblJlc3VsdExpc3Qge1xuXHRcdGlmIChkZXN0ICE9PSBzcmMpIHtcblx0XHRcdHNyYy5mb3JFYWNoKChyZXN1bHQpID0+IHtcblx0XHRcdFx0ZGVzdC5wdXNoKHJlc3VsdCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0cmV0dXJuIGRlc3Q7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBkZXN0O1xuXHRcdH1cblx0fVxufSJdfQ==