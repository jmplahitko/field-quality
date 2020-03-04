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