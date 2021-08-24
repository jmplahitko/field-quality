"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = camelizeField;

var _camelize = _interopRequireDefault(require("./camelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function camelizeField(str) {
  str = str.replace(/\s/g, '');
  var fieldNameArray = str.split('.');
  var camelizedStr = "";
  fieldNameArray.map(function (substr) {
    camelizedStr = "".concat(camelizedStr ? camelizedStr + '.' : '').concat((0, _camelize["default"])(substr));
  });
  return camelizedStr;
}

;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9jYW1lbGl6ZUZpZWxkLnRzIl0sIm5hbWVzIjpbImNhbWVsaXplRmllbGQiLCJzdHIiLCJyZXBsYWNlIiwiZmllbGROYW1lQXJyYXkiLCJzcGxpdCIsImNhbWVsaXplZFN0ciIsIm1hcCIsInN1YnN0ciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBRWUsU0FBU0EsYUFBVCxDQUF1QkMsR0FBdkIsRUFBNEM7QUFDMURBLEVBQUFBLEdBQUcsR0FBR0EsR0FBRyxDQUFDQyxPQUFKLENBQVksS0FBWixFQUFtQixFQUFuQixDQUFOO0FBQ0EsTUFBTUMsY0FBYyxHQUFHRixHQUFHLENBQUNHLEtBQUosQ0FBVSxHQUFWLENBQXZCO0FBQ0EsTUFBSUMsWUFBWSxLQUFoQjtBQUVBRixFQUFBQSxjQUFjLENBQUNHLEdBQWYsQ0FBbUIsVUFBQ0MsTUFBRCxFQUFZO0FBQzlCRixJQUFBQSxZQUFZLGFBQU1BLFlBQVksR0FBR0EsWUFBWSxHQUFHLEdBQWxCLEdBQXdCLEVBQTFDLFNBQStDLDBCQUFTRSxNQUFULENBQS9DLENBQVo7QUFDQSxHQUZEO0FBSUEsU0FBT0YsWUFBUDtBQUNBOztBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNhbWVsaXplIGZyb20gJy4vY2FtZWxpemUnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjYW1lbGl6ZUZpZWxkKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcblx0c3RyID0gc3RyLnJlcGxhY2UoL1xccy9nLCAnJyk7XG5cdGNvbnN0IGZpZWxkTmFtZUFycmF5ID0gc3RyLnNwbGl0KCcuJyk7XG5cdGxldCBjYW1lbGl6ZWRTdHIgPSBgYDtcblxuXHRmaWVsZE5hbWVBcnJheS5tYXAoKHN1YnN0cikgPT4ge1xuXHRcdGNhbWVsaXplZFN0ciA9IGAke2NhbWVsaXplZFN0ciA/IGNhbWVsaXplZFN0ciArICcuJyA6ICcnfSR7Y2FtZWxpemUoc3Vic3RyKX1gO1xuXHR9KVxuXG5cdHJldHVybiBjYW1lbGl6ZWRTdHI7XG59OyJdfQ==