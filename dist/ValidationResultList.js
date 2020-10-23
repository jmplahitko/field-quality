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
      if (dest !== src) {
        src.forEach(function (result) {
          dest.push(result);
        });
      }

      return dest;
    }
  }]);

  return ValidationResultList;
}();

exports["default"] = ValidationResultList;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9WYWxpZGF0aW9uUmVzdWx0TGlzdC50cyJdLCJuYW1lcyI6WyJWYWxpZGF0aW9uUmVzdWx0TGlzdCIsImFyZ3MiLCJwcm9wZXJ0eU5hbWUiLCJ2YWx1ZSIsIl9lbnRyaWVzIiwiY29uY2F0IiwiY2IiLCJmb3JFYWNoIiwiZmluZCIsIngiLCJmb3VuZCIsImV4YWN0UmVzdWx0IiwiZ2V0IiwicHVzaCIsIm1hdGNoZXMiLCJSZWdFeHAiLCJ0ZXN0IiwicmVzdWx0TGlzdCIsIm1lcmdlIiwicmVzdWx0IiwiZXhpc3RpbmdSZXN1bHQiLCJpbmRleCIsImZpbmRJbmRleCIsImVudHJ5IiwicmVtb3ZlZCIsInNwbGljZSIsImV4YWN0TWF0Y2giLCJyZW1vdmUiLCJmaWx0ZXIiLCJBcnJheSIsImZyb20iLCJvYmoiLCJlcnJvckNvdW50IiwibGVuZ3RoIiwid2FybmluZ0NvdW50IiwiZGVzdCIsInNyYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxvQjtBQUtwQixrQ0FBK0U7QUFBQSxRQUFuRUMsSUFBbUUsdUVBQXhDLEVBQXdDO0FBQUEsUUFBcENDLFlBQW9DO0FBQUEsUUFBYkMsS0FBYTs7QUFBQTs7QUFBQSxzQ0FKdEMsRUFJc0M7O0FBQUE7O0FBQUE7O0FBQzlFLFNBQUtELFlBQUwsR0FBb0JBLFlBQXBCO0FBQ0EsU0FBS0MsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQixLQUFLQSxRQUFMLENBQWNDLE1BQWQsQ0FBcUJKLElBQXJCLENBQWhCO0FBQ0E7Ozs7NEJBVWNLLEUsRUFBaUY7QUFDL0YsV0FBS0YsUUFBTCxDQUFjRyxPQUFkLENBQXNCRCxFQUF0QjtBQUNBOzs7NEJBY2M7QUFDZCxXQUFLRixRQUFMLEdBQWdCLEVBQWhCO0FBQ0EsV0FBS0QsS0FBTCxHQUFhLElBQWI7QUFDQTs7O3dCQUVVRCxZLEVBQStDO0FBQ3pELGFBQU8sS0FBS0UsUUFBTCxDQUFjSSxJQUFkLENBQW1CLFVBQUFDLENBQUM7QUFBQSxlQUFJQSxDQUFDLENBQUNQLFlBQUYsS0FBbUJBLFlBQXZCO0FBQUEsT0FBcEIsQ0FBUDtBQUNBOzs7MENBRTRCQSxZLEVBQTRDO0FBQ3hFLFVBQU1RLEtBQUssR0FBRyxJQUFJVixvQkFBSixDQUF5QixFQUF6QixFQUE2QkUsWUFBN0IsQ0FBZDtBQUNBLFVBQU1TLFdBQVcsR0FBRyxLQUFLQyxHQUFMLENBQVNWLFlBQVQsQ0FBcEI7O0FBRUEsVUFBSVMsV0FBSixFQUFpQjtBQUNoQkQsUUFBQUEsS0FBSyxDQUFDUCxLQUFOLEdBQWNRLFdBQVcsQ0FBQ1IsS0FBMUI7QUFDQU8sUUFBQUEsS0FBSyxDQUFDRyxJQUFOLENBQVdGLFdBQVg7QUFDQTs7QUFFRCxXQUFLUCxRQUFMLENBQWNHLE9BQWQsQ0FBc0IsVUFBQUUsQ0FBQyxFQUFJO0FBQzFCLFlBQU1LLE9BQU8sR0FBRyxJQUFJQyxNQUFKLFlBQWViLFlBQWYsWUFBc0NjLElBQXRDLENBQTJDUCxDQUFDLENBQUNQLFlBQTdDLENBQWhCOztBQUNBLFlBQUlZLE9BQUosRUFBYTtBQUNaSixVQUFBQSxLQUFLLENBQUNHLElBQU4sQ0FBV0osQ0FBWDtBQUNBO0FBQ0QsT0FMRDs7QUFPQSxhQUFPQyxLQUFQO0FBQ0E7OzswQkFFWU8sVSxFQUFrQztBQUM5QyxhQUFPakIsb0JBQW9CLENBQUNrQixLQUFyQixDQUEyQixJQUEzQixFQUFpQ0QsVUFBakMsQ0FBUDtBQUNBOzs7eUJBRVdFLE0sRUFBMEI7QUFDckMsVUFBSUMsY0FBYyxHQUFHLEtBQUtSLEdBQUwsQ0FBU08sTUFBTSxDQUFDakIsWUFBaEIsQ0FBckI7O0FBQ0EsVUFBSWtCLGNBQUosRUFBb0I7QUFDbkJBLFFBQUFBLGNBQWMsR0FBR0EsY0FBYyxDQUFDRixLQUFmLENBQXFCQyxNQUFyQixDQUFqQjtBQUNBLE9BRkQsTUFFTztBQUNOLGFBQUtmLFFBQUwsQ0FBY1MsSUFBZCxDQUFtQk0sTUFBbkI7QUFDQTtBQUNEOzs7MkJBRWFqQixZLEVBQStDO0FBQzVELFVBQU1tQixLQUFLLEdBQUcsS0FBS2pCLFFBQUwsQ0FBY2tCLFNBQWQsQ0FBd0IsVUFBQ0MsS0FBRDtBQUFBLGVBQVdBLEtBQUssQ0FBQ3JCLFlBQU4sS0FBdUJBLFlBQWxDO0FBQUEsT0FBeEIsQ0FBZDs7QUFDQSxVQUFJc0IsT0FBTyxHQUFHLElBQWQ7O0FBRUEsVUFBSUgsS0FBSyxHQUFHLENBQUMsQ0FBYixFQUFnQjtBQUNmRyxRQUFBQSxPQUFPLEdBQUcsS0FBS3BCLFFBQUwsQ0FBY3FCLE1BQWQsQ0FBcUJKLEtBQXJCLEVBQTRCLENBQTVCLENBQVY7QUFDQSxlQUFPRyxPQUFPLENBQUMsQ0FBRCxDQUFkO0FBQ0E7O0FBRUQsYUFBT0EsT0FBUDtBQUNBOzs7NkNBRStCdEIsWSxFQUE0QztBQUMzRSxVQUFNc0IsT0FBTyxHQUFHLElBQUl4QixvQkFBSixDQUF5QixFQUF6QixFQUE2QkUsWUFBN0IsQ0FBaEI7QUFDQSxVQUFNd0IsVUFBVSxHQUFHLEtBQUtDLE1BQUwsQ0FBWXpCLFlBQVosQ0FBbkI7O0FBQ0EsVUFBSXdCLFVBQUosRUFBZ0I7QUFDZkYsUUFBQUEsT0FBTyxDQUFDckIsS0FBUixHQUFnQnVCLFVBQVUsQ0FBQ3ZCLEtBQTNCO0FBQ0FxQixRQUFBQSxPQUFPLENBQUNYLElBQVIsQ0FBYWEsVUFBYjtBQUNBOztBQUVELFdBQUt0QixRQUFMLEdBQWdCLEtBQUtBLFFBQUwsQ0FBY3dCLE1BQWQsQ0FBcUIsVUFBQW5CLENBQUMsRUFBSTtBQUN6QyxZQUFNSyxPQUFPLEdBQUcsSUFBSUMsTUFBSixZQUFlYixZQUFmLFlBQXNDYyxJQUF0QyxDQUEyQ1AsQ0FBQyxDQUFDUCxZQUE3QyxDQUFoQjs7QUFDQSxZQUFJWSxPQUFKLEVBQWE7QUFDWlUsVUFBQUEsT0FBTyxDQUFDWCxJQUFSLENBQWFKLENBQWI7QUFDQTs7QUFDRCxlQUFPLENBQUNLLE9BQVI7QUFDQSxPQU5lLENBQWhCO0FBUUEsYUFBT1UsT0FBUDtBQUNBOzs7OEJBRW9DO0FBQ3BDLGFBQU9LLEtBQUssQ0FBQ0MsSUFBTixDQUFXLEtBQUsxQixRQUFoQixDQUFQO0FBQ0E7OzsrQkFFK0Q7QUFDL0QsVUFBTTJCLEdBQWlELEdBQUcsRUFBMUQ7O0FBQ0EsV0FBSzNCLFFBQUwsQ0FBY0csT0FBZCxDQUFzQixVQUFBRSxDQUFDO0FBQUEsZUFBS3NCLEdBQUcsQ0FBQ3RCLENBQUMsQ0FBQ1AsWUFBSCxDQUFILEdBQXNCTyxDQUEzQjtBQUFBLE9BQXZCOztBQUNBLGFBQU9zQixHQUFQO0FBQ0E7Ozt3QkF4R29CO0FBQ3BCLGFBQU8sS0FBSzNCLFFBQUwsQ0FBY3dCLE1BQWQsQ0FBcUIsVUFBQW5CLENBQUM7QUFBQSxlQUFJQSxDQUFDLENBQUN1QixVQUFGLEdBQWUsQ0FBbkI7QUFBQSxPQUF0QixFQUE0Q0MsTUFBNUMsS0FBdUQsQ0FBOUQ7QUFDQTs7O3dCQUVtQjtBQUNuQixhQUFPLEtBQUs3QixRQUFMLENBQWM2QixNQUFyQjtBQUNBOzs7d0JBTW9CO0FBQ3BCLGFBQU8sS0FBSzdCLFFBQVo7QUFDQTs7O3dCQUU2QztBQUM3QyxhQUFPLElBQUlKLG9CQUFKLENBQXlCLEtBQUtJLFFBQUwsQ0FBY3dCLE1BQWQsQ0FBcUIsVUFBQW5CLENBQUM7QUFBQSxlQUFJQSxDQUFDLENBQUN1QixVQUFGLEdBQWUsQ0FBbkI7QUFBQSxPQUF0QixDQUF6QixFQUFzRSxLQUFLOUIsWUFBM0UsRUFBeUYsS0FBS0MsS0FBOUYsQ0FBUDtBQUNBOzs7d0JBRStDO0FBQy9DLGFBQU8sSUFBSUgsb0JBQUosQ0FBeUIsS0FBS0ksUUFBTCxDQUFjd0IsTUFBZCxDQUFxQixVQUFBbkIsQ0FBQztBQUFBLGVBQUlBLENBQUMsQ0FBQ3lCLFlBQUYsR0FBaUIsQ0FBckI7QUFBQSxPQUF0QixDQUF6QixFQUF3RSxLQUFLaEMsWUFBN0UsRUFBMkYsS0FBS0MsS0FBaEcsQ0FBUDtBQUNBOzs7MEJBb0ZZZ0MsSSxFQUE0QkMsRyxFQUFpRDtBQUN6RixVQUFJRCxJQUFJLEtBQUtDLEdBQWIsRUFBa0I7QUFDakJBLFFBQUFBLEdBQUcsQ0FBQzdCLE9BQUosQ0FBWSxVQUFDWSxNQUFELEVBQVk7QUFDdkJnQixVQUFBQSxJQUFJLENBQUN0QixJQUFMLENBQVVNLE1BQVY7QUFDQSxTQUZEO0FBR0E7O0FBRUQsYUFBT2dCLElBQVA7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWYWxpZGF0aW9uUmVzdWx0IGZyb20gJy4vVmFsaWRhdGlvblJlc3VsdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZhbGlkYXRpb25SZXN1bHRMaXN0IHtcblx0cHJvdGVjdGVkIF9lbnRyaWVzOiBWYWxpZGF0aW9uUmVzdWx0W10gPSBbXTtcblx0cHVibGljIHByb3BlcnR5TmFtZTogc3RyaW5nfHVuZGVmaW5lZDtcblx0cHVibGljIHZhbHVlOiBhbnk7XG5cblx0Y29uc3RydWN0b3IoYXJnczogVmFsaWRhdGlvblJlc3VsdFtdID0gW10sIHByb3BlcnR5TmFtZT86IHN0cmluZywgdmFsdWU/OiBhbnkpIHtcblx0XHR0aGlzLnByb3BlcnR5TmFtZSA9IHByb3BlcnR5TmFtZTtcblx0XHR0aGlzLnZhbHVlID0gdmFsdWU7XG5cdFx0dGhpcy5fZW50cmllcyA9IHRoaXMuX2VudHJpZXMuY29uY2F0KGFyZ3MpO1xuXHR9XG5cblx0cHVibGljIGdldCBpc1ZhbGlkKCkge1xuXHRcdHJldHVybiB0aGlzLl9lbnRyaWVzLmZpbHRlcih4ID0+IHguZXJyb3JDb3VudCA+IDApLmxlbmd0aCA9PT0gMDtcblx0fVxuXG5cdHB1YmxpYyBnZXQgbGVuZ3RoKCkge1xuXHRcdHJldHVybiB0aGlzLl9lbnRyaWVzLmxlbmd0aDtcblx0fVxuXG5cdHB1YmxpYyBmb3JFYWNoKGNiOiAodmFsdWU6IFZhbGlkYXRpb25SZXN1bHQsIGluZGV4OiBudW1iZXIsIGFycmF5OiBWYWxpZGF0aW9uUmVzdWx0W10pID0+IHZvaWQpIHtcblx0XHR0aGlzLl9lbnRyaWVzLmZvckVhY2goY2IpO1xuXHR9XG5cblx0cHVibGljIGdldCBlbnRyaWVzKCkge1xuXHRcdHJldHVybiB0aGlzLl9lbnRyaWVzO1xuXHR9XG5cblx0cHVibGljIGdldCB3aXRoRXJyb3JzKCk6IFZhbGlkYXRpb25SZXN1bHRMaXN0IHtcblx0XHRyZXR1cm4gbmV3IFZhbGlkYXRpb25SZXN1bHRMaXN0KHRoaXMuX2VudHJpZXMuZmlsdGVyKHggPT4geC5lcnJvckNvdW50ID4gMCksIHRoaXMucHJvcGVydHlOYW1lLCB0aGlzLnZhbHVlKTtcblx0fVxuXG5cdHB1YmxpYyBnZXQgd2l0aFdhcm5pbmdzKCk6IFZhbGlkYXRpb25SZXN1bHRMaXN0IHtcblx0XHRyZXR1cm4gbmV3IFZhbGlkYXRpb25SZXN1bHRMaXN0KHRoaXMuX2VudHJpZXMuZmlsdGVyKHggPT4geC53YXJuaW5nQ291bnQgPiAwKSwgdGhpcy5wcm9wZXJ0eU5hbWUsIHRoaXMudmFsdWUpO1xuXHR9XG5cblx0cHVibGljIGNsZWFyKCkge1xuXHRcdHRoaXMuX2VudHJpZXMgPSBbXTtcblx0XHR0aGlzLnZhbHVlID0gbnVsbDtcblx0fVxuXG5cdHB1YmxpYyBnZXQocHJvcGVydHlOYW1lOiBzdHJpbmcpOiBWYWxpZGF0aW9uUmVzdWx0IHwgdm9pZCB7XG5cdFx0cmV0dXJuIHRoaXMuX2VudHJpZXMuZmluZCh4ID0+IHgucHJvcGVydHlOYW1lID09PSBwcm9wZXJ0eU5hbWUpO1xuXHR9XG5cblx0cHVibGljIGdldFdpdGhSZWxhdGVkUmVzdWx0cyhwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IFZhbGlkYXRpb25SZXN1bHRMaXN0IHtcblx0XHRjb25zdCBmb3VuZCA9IG5ldyBWYWxpZGF0aW9uUmVzdWx0TGlzdChbXSwgcHJvcGVydHlOYW1lKTtcblx0XHRjb25zdCBleGFjdFJlc3VsdCA9IHRoaXMuZ2V0KHByb3BlcnR5TmFtZSk7XG5cblx0XHRpZiAoZXhhY3RSZXN1bHQpIHtcblx0XHRcdGZvdW5kLnZhbHVlID0gZXhhY3RSZXN1bHQudmFsdWU7XG5cdFx0XHRmb3VuZC5wdXNoKGV4YWN0UmVzdWx0KTtcblx0XHR9XG5cblx0XHR0aGlzLl9lbnRyaWVzLmZvckVhY2goeCA9PiB7XG5cdFx0XHRjb25zdCBtYXRjaGVzID0gbmV3IFJlZ0V4cChgXiR7cHJvcGVydHlOYW1lfVtcXC58XFxbXWApLnRlc3QoeC5wcm9wZXJ0eU5hbWUpO1xuXHRcdFx0aWYgKG1hdGNoZXMpIHtcblx0XHRcdFx0Zm91bmQucHVzaCh4KTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHJldHVybiBmb3VuZDtcblx0fVxuXG5cdHB1YmxpYyBtZXJnZShyZXN1bHRMaXN0OiBWYWxpZGF0aW9uUmVzdWx0TGlzdCkge1xuXHRcdHJldHVybiBWYWxpZGF0aW9uUmVzdWx0TGlzdC5tZXJnZSh0aGlzLCByZXN1bHRMaXN0KTtcblx0fVxuXG5cdHB1YmxpYyBwdXNoKHJlc3VsdDogVmFsaWRhdGlvblJlc3VsdCkge1xuXHRcdGxldCBleGlzdGluZ1Jlc3VsdCA9IHRoaXMuZ2V0KHJlc3VsdC5wcm9wZXJ0eU5hbWUpO1xuXHRcdGlmIChleGlzdGluZ1Jlc3VsdCkge1xuXHRcdFx0ZXhpc3RpbmdSZXN1bHQgPSBleGlzdGluZ1Jlc3VsdC5tZXJnZShyZXN1bHQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9lbnRyaWVzLnB1c2gocmVzdWx0KTtcblx0XHR9XG5cdH1cblxuXHRwdWJsaWMgcmVtb3ZlKHByb3BlcnR5TmFtZTogc3RyaW5nKTogVmFsaWRhdGlvblJlc3VsdCB8IG51bGwge1xuXHRcdGNvbnN0IGluZGV4ID0gdGhpcy5fZW50cmllcy5maW5kSW5kZXgoKGVudHJ5KSA9PiBlbnRyeS5wcm9wZXJ0eU5hbWUgPT09IHByb3BlcnR5TmFtZSk7XG5cdFx0bGV0IHJlbW92ZWQgPSBudWxsO1xuXG5cdFx0aWYgKGluZGV4ID4gLTEpIHtcblx0XHRcdHJlbW92ZWQgPSB0aGlzLl9lbnRyaWVzLnNwbGljZShpbmRleCwgMSk7XG5cdFx0XHRyZXR1cm4gcmVtb3ZlZFswXTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVtb3ZlZDtcblx0fVxuXG5cdHB1YmxpYyByZW1vdmVXaXRoUmVsYXRlZFJlc3VsdHMocHJvcGVydHlOYW1lOiBzdHJpbmcpOiBWYWxpZGF0aW9uUmVzdWx0TGlzdCB7XG5cdFx0Y29uc3QgcmVtb3ZlZCA9IG5ldyBWYWxpZGF0aW9uUmVzdWx0TGlzdChbXSwgcHJvcGVydHlOYW1lKTtcblx0XHRjb25zdCBleGFjdE1hdGNoID0gdGhpcy5yZW1vdmUocHJvcGVydHlOYW1lKTtcblx0XHRpZiAoZXhhY3RNYXRjaCkge1xuXHRcdFx0cmVtb3ZlZC52YWx1ZSA9IGV4YWN0TWF0Y2gudmFsdWU7XG5cdFx0XHRyZW1vdmVkLnB1c2goZXhhY3RNYXRjaCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5fZW50cmllcyA9IHRoaXMuX2VudHJpZXMuZmlsdGVyKHggPT4ge1xuXHRcdFx0Y29uc3QgbWF0Y2hlcyA9IG5ldyBSZWdFeHAoYF4ke3Byb3BlcnR5TmFtZX1bXFwufFxcW11gKS50ZXN0KHgucHJvcGVydHlOYW1lKTtcblx0XHRcdGlmIChtYXRjaGVzKSB7XG5cdFx0XHRcdHJlbW92ZWQucHVzaCh4KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiAhbWF0Y2hlcztcblx0XHR9KTtcblxuXHRcdHJldHVybiByZW1vdmVkO1xuXHR9XG5cblx0cHVibGljIHRvQXJyYXkoKTogVmFsaWRhdGlvblJlc3VsdFtdIHtcblx0XHRyZXR1cm4gQXJyYXkuZnJvbSh0aGlzLl9lbnRyaWVzKTtcblx0fVxuXG5cdHB1YmxpYyB0b09iamVjdCgpOiB7IFtwcm9wZXJ0eU5hbWU6IHN0cmluZ106IFZhbGlkYXRpb25SZXN1bHQgfSB7XG5cdFx0Y29uc3Qgb2JqOiB7IFtwcm9wZXJ0eU5hbWU6IHN0cmluZ106IFZhbGlkYXRpb25SZXN1bHQgfSA9IHt9O1xuXHRcdHRoaXMuX2VudHJpZXMuZm9yRWFjaCh4ID0+IChvYmpbeC5wcm9wZXJ0eU5hbWVdID0geCkpO1xuXHRcdHJldHVybiBvYmo7XG5cdH1cblxuXHRzdGF0aWMgbWVyZ2UoZGVzdDogVmFsaWRhdGlvblJlc3VsdExpc3QsIHNyYzogVmFsaWRhdGlvblJlc3VsdExpc3QpOiBWYWxpZGF0aW9uUmVzdWx0TGlzdCB7XG5cdFx0aWYgKGRlc3QgIT09IHNyYykge1xuXHRcdFx0c3JjLmZvckVhY2goKHJlc3VsdCkgPT4ge1xuXHRcdFx0XHRkZXN0LnB1c2gocmVzdWx0KTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHJldHVybiBkZXN0O1xuXHR9XG59Il19