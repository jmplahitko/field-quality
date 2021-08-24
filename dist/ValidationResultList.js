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

    this.propertyName = propertyName;
    this.value = value;
    this._entries = this._entries.concat(args);
  }

  _createClass(ValidationResultList, [{
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
    key: "forEach",
    value: function forEach(cb) {
      this._entries.forEach(cb);
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

      var removed = index > -1 ? this._entries.splice(index, 1)[0] : null;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9WYWxpZGF0aW9uUmVzdWx0TGlzdC50cyJdLCJuYW1lcyI6WyJWYWxpZGF0aW9uUmVzdWx0TGlzdCIsImFyZ3MiLCJwcm9wZXJ0eU5hbWUiLCJ2YWx1ZSIsIl9lbnRyaWVzIiwiY29uY2F0IiwiZmlsdGVyIiwieCIsImVycm9yQ291bnQiLCJsZW5ndGgiLCJjYiIsImZvckVhY2giLCJ3YXJuaW5nQ291bnQiLCJmaW5kIiwiZm91bmQiLCJleGFjdFJlc3VsdCIsImdldCIsInB1c2giLCJtYXRjaGVzIiwiUmVnRXhwIiwidGVzdCIsInJlc3VsdExpc3QiLCJtZXJnZSIsInJlc3VsdCIsImV4aXN0aW5nUmVzdWx0IiwiaW5kZXgiLCJmaW5kSW5kZXgiLCJlbnRyeSIsInJlbW92ZWQiLCJzcGxpY2UiLCJleGFjdE1hdGNoIiwicmVtb3ZlIiwiQXJyYXkiLCJmcm9tIiwib2JqIiwiZGVzdCIsInNyYyIsIm9wdGlvbnMiLCJ1c2VTb3VyY2VWYWx1ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFHcUJBLG9CO0FBS3BCLGtDQUErRTtBQUFBLFFBQW5FQyxJQUFtRSx1RUFBeEMsRUFBd0M7QUFBQSxRQUFwQ0MsWUFBb0M7QUFBQSxRQUFiQyxLQUFhOztBQUFBOztBQUFBLHNDQUp0QyxFQUlzQzs7QUFDOUUsU0FBS0QsWUFBTCxHQUFvQkEsWUFBcEI7QUFDQSxTQUFLQyxLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCLEtBQUtBLFFBQUwsQ0FBY0MsTUFBZCxDQUFxQkosSUFBckIsQ0FBaEI7QUFDQTs7OztTQUVELGVBQXFCO0FBQ3BCLGFBQU8sS0FBS0csUUFBTCxDQUFjRSxNQUFkLENBQXFCLFVBQUFDLENBQUM7QUFBQSxlQUFJQSxDQUFDLENBQUNDLFVBQUYsR0FBZSxDQUFuQjtBQUFBLE9BQXRCLEVBQTRDQyxNQUE1QyxLQUF1RCxDQUE5RDtBQUNBOzs7U0FFRCxlQUFvQjtBQUNuQixhQUFPLEtBQUtMLFFBQUwsQ0FBY0ssTUFBckI7QUFDQTs7O1dBRUQsaUJBQWVDLEVBQWYsRUFBZ0c7QUFDL0YsV0FBS04sUUFBTCxDQUFjTyxPQUFkLENBQXNCRCxFQUF0QjtBQUNBOzs7U0FFRCxlQUFxQjtBQUNwQixhQUFPLEtBQUtOLFFBQVo7QUFDQTs7O1NBRUQsZUFBOEM7QUFDN0MsYUFBTyxJQUFJSixvQkFBSixDQUF5QixLQUFLSSxRQUFMLENBQWNFLE1BQWQsQ0FBcUIsVUFBQUMsQ0FBQztBQUFBLGVBQUlBLENBQUMsQ0FBQ0MsVUFBRixHQUFlLENBQW5CO0FBQUEsT0FBdEIsQ0FBekIsRUFBc0UsS0FBS04sWUFBM0UsRUFBeUYsS0FBS0MsS0FBOUYsQ0FBUDtBQUNBOzs7U0FFRCxlQUFnRDtBQUMvQyxhQUFPLElBQUlILG9CQUFKLENBQXlCLEtBQUtJLFFBQUwsQ0FBY0UsTUFBZCxDQUFxQixVQUFBQyxDQUFDO0FBQUEsZUFBSUEsQ0FBQyxDQUFDSyxZQUFGLEdBQWlCLENBQXJCO0FBQUEsT0FBdEIsQ0FBekIsRUFBd0UsS0FBS1YsWUFBN0UsRUFBMkYsS0FBS0MsS0FBaEcsQ0FBUDtBQUNBOzs7V0FFRCxpQkFBZTtBQUNkLFdBQUtDLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxXQUFLRCxLQUFMLEdBQWEsSUFBYjtBQUNBOzs7V0FFRCxhQUFXRCxZQUFYLEVBQTBEO0FBQ3pELGFBQU8sS0FBS0UsUUFBTCxDQUFjUyxJQUFkLENBQW1CLFVBQUFOLENBQUM7QUFBQSxlQUFJQSxDQUFDLENBQUNMLFlBQUYsS0FBbUJBLFlBQXZCO0FBQUEsT0FBcEIsQ0FBUDtBQUNBOzs7V0FFRCwrQkFBNkJBLFlBQTdCLEVBQXlFO0FBQ3hFLFVBQU1ZLEtBQUssR0FBRyxJQUFJZCxvQkFBSixDQUF5QixFQUF6QixFQUE2QkUsWUFBN0IsQ0FBZDtBQUNBLFVBQU1hLFdBQVcsR0FBRyxLQUFLQyxHQUFMLENBQVNkLFlBQVQsQ0FBcEI7O0FBRUEsVUFBSWEsV0FBSixFQUFpQjtBQUNoQkQsUUFBQUEsS0FBSyxDQUFDWCxLQUFOLEdBQWNZLFdBQVcsQ0FBQ1osS0FBMUI7QUFDQVcsUUFBQUEsS0FBSyxDQUFDRyxJQUFOLENBQVdGLFdBQVg7QUFDQTs7QUFFRCxXQUFLWCxRQUFMLENBQWNPLE9BQWQsQ0FBc0IsVUFBQUosQ0FBQyxFQUFJO0FBQzFCLFlBQU1XLE9BQU8sR0FBRyxJQUFJQyxNQUFKLFlBQWVqQixZQUFmLFlBQXNDa0IsSUFBdEMsQ0FBMkNiLENBQUMsQ0FBQ0wsWUFBN0MsQ0FBaEI7O0FBQ0EsWUFBSWdCLE9BQUosRUFBYTtBQUNaSixVQUFBQSxLQUFLLENBQUNHLElBQU4sQ0FBV1YsQ0FBWDtBQUNBO0FBQ0QsT0FMRDs7QUFPQSxhQUFPTyxLQUFQO0FBQ0E7OztXQUVELGVBQWFPLFVBQWIsRUFBK0M7QUFDOUMsYUFBT3JCLG9CQUFvQixDQUFDc0IsS0FBckIsQ0FBMkIsSUFBM0IsRUFBaUNELFVBQWpDLENBQVA7QUFDQTs7O1dBRUQsY0FBWUUsTUFBWixFQUFzQztBQUNyQyxVQUFJQyxjQUFjLEdBQUcsS0FBS1IsR0FBTCxDQUFTTyxNQUFNLENBQUNyQixZQUFoQixDQUFyQjs7QUFDQSxVQUFJc0IsY0FBSixFQUFvQjtBQUNuQkEsUUFBQUEsY0FBYyxHQUFHQSxjQUFjLENBQUNGLEtBQWYsQ0FBcUJDLE1BQXJCLENBQWpCO0FBQ0EsT0FGRCxNQUVPO0FBQ04sYUFBS25CLFFBQUwsQ0FBY2EsSUFBZCxDQUFtQk0sTUFBbkI7QUFDQTtBQUNEOzs7V0FFRCxnQkFBY3JCLFlBQWQsRUFBNkQ7QUFDNUQsVUFBTXVCLEtBQUssR0FBRyxLQUFLckIsUUFBTCxDQUFjc0IsU0FBZCxDQUF3QixVQUFDQyxLQUFEO0FBQUEsZUFBV0EsS0FBSyxDQUFDekIsWUFBTixLQUF1QkEsWUFBbEM7QUFBQSxPQUF4QixDQUFkOztBQUNBLFVBQUkwQixPQUFPLEdBQUdILEtBQUssR0FBRyxDQUFDLENBQVQsR0FDWCxLQUFLckIsUUFBTCxDQUFjeUIsTUFBZCxDQUFxQkosS0FBckIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsQ0FEVyxHQUVYLElBRkg7QUFJQSxhQUFPRyxPQUFQO0FBQ0E7OztXQUVELGtDQUFnQzFCLFlBQWhDLEVBQTRFO0FBQzNFLFVBQU0wQixPQUFPLEdBQUcsSUFBSTVCLG9CQUFKLENBQXlCLEVBQXpCLEVBQTZCRSxZQUE3QixDQUFoQjtBQUNBLFVBQU00QixVQUFVLEdBQUcsS0FBS0MsTUFBTCxDQUFZN0IsWUFBWixDQUFuQjs7QUFDQSxVQUFJNEIsVUFBSixFQUFnQjtBQUNmRixRQUFBQSxPQUFPLENBQUN6QixLQUFSLEdBQWdCMkIsVUFBVSxDQUFDM0IsS0FBM0I7QUFDQXlCLFFBQUFBLE9BQU8sQ0FBQ1gsSUFBUixDQUFhYSxVQUFiO0FBQ0E7O0FBRUQsV0FBSzFCLFFBQUwsR0FBZ0IsS0FBS0EsUUFBTCxDQUFjRSxNQUFkLENBQXFCLFVBQUFDLENBQUMsRUFBSTtBQUN6QyxZQUFNVyxPQUFPLEdBQUcsSUFBSUMsTUFBSixZQUFlakIsWUFBZixZQUFzQ2tCLElBQXRDLENBQTJDYixDQUFDLENBQUNMLFlBQTdDLENBQWhCOztBQUNBLFlBQUlnQixPQUFKLEVBQWE7QUFDWlUsVUFBQUEsT0FBTyxDQUFDWCxJQUFSLENBQWFWLENBQWI7QUFDQTs7QUFDRCxlQUFPLENBQUNXLE9BQVI7QUFDQSxPQU5lLENBQWhCO0FBUUEsYUFBT1UsT0FBUDtBQUNBOzs7V0FFRCxtQkFBcUM7QUFDcEMsYUFBT0ksS0FBSyxDQUFDQyxJQUFOLENBQVcsS0FBSzdCLFFBQWhCLENBQVA7QUFDQTs7O1dBRUQsb0JBQWdFO0FBQy9ELFVBQU04QixHQUFpRCxHQUFHLEVBQTFEOztBQUNBLFdBQUs5QixRQUFMLENBQWNPLE9BQWQsQ0FBc0IsVUFBQUosQ0FBQztBQUFBLGVBQUsyQixHQUFHLENBQUMzQixDQUFDLENBQUNMLFlBQUgsQ0FBSCxHQUFzQkssQ0FBM0I7QUFBQSxPQUF2Qjs7QUFDQSxhQUFPMkIsR0FBUDtBQUNBOzs7V0FFRCxlQUFhQyxJQUFiLEVBQXlDQyxHQUF6QyxFQUE4SjtBQUFBLFVBQTFGQyxPQUEwRix1RUFBakQ7QUFBRUMsUUFBQUEsY0FBYyxFQUFFO0FBQWxCLE9BQWlEOztBQUM3SixVQUFJSCxJQUFJLEtBQUtDLEdBQWIsRUFBa0I7QUFDakJBLFFBQUFBLEdBQUcsQ0FBQ3pCLE9BQUosQ0FBWSxVQUFDWSxNQUFELEVBQVk7QUFDdkJZLFVBQUFBLElBQUksQ0FBQ2xCLElBQUwsQ0FBVU0sTUFBVjtBQUNBLFNBRkQ7QUFHQTs7QUFFRCxVQUFJLENBQUMsc0JBQVFZLElBQUksQ0FBQ2hDLEtBQWIsRUFBb0JpQyxHQUFHLENBQUNqQyxLQUF4QixDQUFELElBQW1Da0MsT0FBTyxDQUFDQyxjQUEvQyxFQUErRDtBQUM5REgsUUFBQUEsSUFBSSxDQUFDaEMsS0FBTCxHQUFhLHNCQUFLaUMsR0FBRyxDQUFDakMsS0FBVCxDQUFiO0FBQ0E7O0FBRUQsYUFBT2dDLElBQVA7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRWYWxpZGF0aW9uUmVzdWx0TWVyZ2VPcHRpb25zIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgY29weSBmcm9tICcuL3V0aWxzL2NvcHknO1xuaW1wb3J0IHsgaXNFcXVhbCB9IGZyb20gJy4vdXRpbHMvcXVhbGl0eSc7XG5pbXBvcnQgVmFsaWRhdGlvblJlc3VsdCBmcm9tICcuL1ZhbGlkYXRpb25SZXN1bHQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWYWxpZGF0aW9uUmVzdWx0TGlzdCB7XG5cdHByb3RlY3RlZCBfZW50cmllczogVmFsaWRhdGlvblJlc3VsdFtdID0gW107XG5cdHB1YmxpYyBwcm9wZXJ0eU5hbWU6IHN0cmluZ3x1bmRlZmluZWQ7XG5cdHB1YmxpYyB2YWx1ZTogYW55O1xuXG5cdGNvbnN0cnVjdG9yKGFyZ3M6IFZhbGlkYXRpb25SZXN1bHRbXSA9IFtdLCBwcm9wZXJ0eU5hbWU/OiBzdHJpbmcsIHZhbHVlPzogYW55KSB7XG5cdFx0dGhpcy5wcm9wZXJ0eU5hbWUgPSBwcm9wZXJ0eU5hbWU7XG5cdFx0dGhpcy52YWx1ZSA9IHZhbHVlO1xuXHRcdHRoaXMuX2VudHJpZXMgPSB0aGlzLl9lbnRyaWVzLmNvbmNhdChhcmdzKTtcblx0fVxuXG5cdHB1YmxpYyBnZXQgaXNWYWxpZCgpIHtcblx0XHRyZXR1cm4gdGhpcy5fZW50cmllcy5maWx0ZXIoeCA9PiB4LmVycm9yQ291bnQgPiAwKS5sZW5ndGggPT09IDA7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IGxlbmd0aCgpIHtcblx0XHRyZXR1cm4gdGhpcy5fZW50cmllcy5sZW5ndGg7XG5cdH1cblxuXHRwdWJsaWMgZm9yRWFjaChjYjogKHZhbHVlOiBWYWxpZGF0aW9uUmVzdWx0LCBpbmRleDogbnVtYmVyLCBhcnJheTogVmFsaWRhdGlvblJlc3VsdFtdKSA9PiB2b2lkKSB7XG5cdFx0dGhpcy5fZW50cmllcy5mb3JFYWNoKGNiKTtcblx0fVxuXG5cdHB1YmxpYyBnZXQgZW50cmllcygpIHtcblx0XHRyZXR1cm4gdGhpcy5fZW50cmllcztcblx0fVxuXG5cdHB1YmxpYyBnZXQgd2l0aEVycm9ycygpOiBWYWxpZGF0aW9uUmVzdWx0TGlzdCB7XG5cdFx0cmV0dXJuIG5ldyBWYWxpZGF0aW9uUmVzdWx0TGlzdCh0aGlzLl9lbnRyaWVzLmZpbHRlcih4ID0+IHguZXJyb3JDb3VudCA+IDApLCB0aGlzLnByb3BlcnR5TmFtZSwgdGhpcy52YWx1ZSk7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IHdpdGhXYXJuaW5ncygpOiBWYWxpZGF0aW9uUmVzdWx0TGlzdCB7XG5cdFx0cmV0dXJuIG5ldyBWYWxpZGF0aW9uUmVzdWx0TGlzdCh0aGlzLl9lbnRyaWVzLmZpbHRlcih4ID0+IHgud2FybmluZ0NvdW50ID4gMCksIHRoaXMucHJvcGVydHlOYW1lLCB0aGlzLnZhbHVlKTtcblx0fVxuXG5cdHB1YmxpYyBjbGVhcigpIHtcblx0XHR0aGlzLl9lbnRyaWVzID0gW107XG5cdFx0dGhpcy52YWx1ZSA9IG51bGw7XG5cdH1cblxuXHRwdWJsaWMgZ2V0KHByb3BlcnR5TmFtZTogc3RyaW5nKTogVmFsaWRhdGlvblJlc3VsdCB8IHZvaWQge1xuXHRcdHJldHVybiB0aGlzLl9lbnRyaWVzLmZpbmQoeCA9PiB4LnByb3BlcnR5TmFtZSA9PT0gcHJvcGVydHlOYW1lKTtcblx0fVxuXG5cdHB1YmxpYyBnZXRXaXRoUmVsYXRlZFJlc3VsdHMocHJvcGVydHlOYW1lOiBzdHJpbmcpOiBWYWxpZGF0aW9uUmVzdWx0TGlzdCB7XG5cdFx0Y29uc3QgZm91bmQgPSBuZXcgVmFsaWRhdGlvblJlc3VsdExpc3QoW10sIHByb3BlcnR5TmFtZSk7XG5cdFx0Y29uc3QgZXhhY3RSZXN1bHQgPSB0aGlzLmdldChwcm9wZXJ0eU5hbWUpO1xuXG5cdFx0aWYgKGV4YWN0UmVzdWx0KSB7XG5cdFx0XHRmb3VuZC52YWx1ZSA9IGV4YWN0UmVzdWx0LnZhbHVlO1xuXHRcdFx0Zm91bmQucHVzaChleGFjdFJlc3VsdCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5fZW50cmllcy5mb3JFYWNoKHggPT4ge1xuXHRcdFx0Y29uc3QgbWF0Y2hlcyA9IG5ldyBSZWdFeHAoYF4ke3Byb3BlcnR5TmFtZX1bXFwufFxcW11gKS50ZXN0KHgucHJvcGVydHlOYW1lKTtcblx0XHRcdGlmIChtYXRjaGVzKSB7XG5cdFx0XHRcdGZvdW5kLnB1c2goeCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gZm91bmQ7XG5cdH1cblxuXHRwdWJsaWMgbWVyZ2UocmVzdWx0TGlzdDogVmFsaWRhdGlvblJlc3VsdExpc3QpIHtcblx0XHRyZXR1cm4gVmFsaWRhdGlvblJlc3VsdExpc3QubWVyZ2UodGhpcywgcmVzdWx0TGlzdCk7XG5cdH1cblxuXHRwdWJsaWMgcHVzaChyZXN1bHQ6IFZhbGlkYXRpb25SZXN1bHQpIHtcblx0XHRsZXQgZXhpc3RpbmdSZXN1bHQgPSB0aGlzLmdldChyZXN1bHQucHJvcGVydHlOYW1lKTtcblx0XHRpZiAoZXhpc3RpbmdSZXN1bHQpIHtcblx0XHRcdGV4aXN0aW5nUmVzdWx0ID0gZXhpc3RpbmdSZXN1bHQubWVyZ2UocmVzdWx0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fZW50cmllcy5wdXNoKHJlc3VsdCk7XG5cdFx0fVxuXHR9XG5cblx0cHVibGljIHJlbW92ZShwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IFZhbGlkYXRpb25SZXN1bHQgfCBudWxsIHtcblx0XHRjb25zdCBpbmRleCA9IHRoaXMuX2VudHJpZXMuZmluZEluZGV4KChlbnRyeSkgPT4gZW50cnkucHJvcGVydHlOYW1lID09PSBwcm9wZXJ0eU5hbWUpO1xuXHRcdGxldCByZW1vdmVkID0gaW5kZXggPiAtMVxuXHRcdFx0PyB0aGlzLl9lbnRyaWVzLnNwbGljZShpbmRleCwgMSlbMF1cblx0XHRcdDogbnVsbDtcblxuXHRcdHJldHVybiByZW1vdmVkO1xuXHR9XG5cblx0cHVibGljIHJlbW92ZVdpdGhSZWxhdGVkUmVzdWx0cyhwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IFZhbGlkYXRpb25SZXN1bHRMaXN0IHtcblx0XHRjb25zdCByZW1vdmVkID0gbmV3IFZhbGlkYXRpb25SZXN1bHRMaXN0KFtdLCBwcm9wZXJ0eU5hbWUpO1xuXHRcdGNvbnN0IGV4YWN0TWF0Y2ggPSB0aGlzLnJlbW92ZShwcm9wZXJ0eU5hbWUpO1xuXHRcdGlmIChleGFjdE1hdGNoKSB7XG5cdFx0XHRyZW1vdmVkLnZhbHVlID0gZXhhY3RNYXRjaC52YWx1ZTtcblx0XHRcdHJlbW92ZWQucHVzaChleGFjdE1hdGNoKTtcblx0XHR9XG5cblx0XHR0aGlzLl9lbnRyaWVzID0gdGhpcy5fZW50cmllcy5maWx0ZXIoeCA9PiB7XG5cdFx0XHRjb25zdCBtYXRjaGVzID0gbmV3IFJlZ0V4cChgXiR7cHJvcGVydHlOYW1lfVtcXC58XFxbXWApLnRlc3QoeC5wcm9wZXJ0eU5hbWUpO1xuXHRcdFx0aWYgKG1hdGNoZXMpIHtcblx0XHRcdFx0cmVtb3ZlZC5wdXNoKHgpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuICFtYXRjaGVzO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHJlbW92ZWQ7XG5cdH1cblxuXHRwdWJsaWMgdG9BcnJheSgpOiBWYWxpZGF0aW9uUmVzdWx0W10ge1xuXHRcdHJldHVybiBBcnJheS5mcm9tKHRoaXMuX2VudHJpZXMpO1xuXHR9XG5cblx0cHVibGljIHRvT2JqZWN0KCk6IHsgW3Byb3BlcnR5TmFtZTogc3RyaW5nXTogVmFsaWRhdGlvblJlc3VsdCB9IHtcblx0XHRjb25zdCBvYmo6IHsgW3Byb3BlcnR5TmFtZTogc3RyaW5nXTogVmFsaWRhdGlvblJlc3VsdCB9ID0ge307XG5cdFx0dGhpcy5fZW50cmllcy5mb3JFYWNoKHggPT4gKG9ialt4LnByb3BlcnR5TmFtZV0gPSB4KSk7XG5cdFx0cmV0dXJuIG9iajtcblx0fVxuXG5cdHN0YXRpYyBtZXJnZShkZXN0OiBWYWxpZGF0aW9uUmVzdWx0TGlzdCwgc3JjOiBWYWxpZGF0aW9uUmVzdWx0TGlzdCwgb3B0aW9uczogVFZhbGlkYXRpb25SZXN1bHRNZXJnZU9wdGlvbnMgPSB7IHVzZVNvdXJjZVZhbHVlOiBmYWxzZSB9KTogVmFsaWRhdGlvblJlc3VsdExpc3Qge1xuXHRcdGlmIChkZXN0ICE9PSBzcmMpIHtcblx0XHRcdHNyYy5mb3JFYWNoKChyZXN1bHQpID0+IHtcblx0XHRcdFx0ZGVzdC5wdXNoKHJlc3VsdCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRpZiAoIWlzRXF1YWwoZGVzdC52YWx1ZSwgc3JjLnZhbHVlKSAmJiBvcHRpb25zLnVzZVNvdXJjZVZhbHVlKSB7XG5cdFx0XHRkZXN0LnZhbHVlID0gY29weShzcmMudmFsdWUpO1xuXHRcdH1cblxuXHRcdHJldHVybiBkZXN0O1xuXHR9XG59Il19