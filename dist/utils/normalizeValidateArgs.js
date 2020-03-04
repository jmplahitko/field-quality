"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = normalizeValidateArgs;

var _copy = _interopRequireDefault(require("../utils/copy"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function normalizeValidateArgs(value, parentValue, customOptions) {
  value = (0, _copy["default"])(value);

  if (arguments.length === 3) {
    parentValue = (0, _copy["default"])(arguments[1]);
    customOptions = (0, _copy["default"])(arguments[2]);
  } else if (arguments.length === 2) {
    parentValue = undefined;
    customOptions = (0, _copy["default"])(arguments[1]);
  }

  return [value, parentValue, customOptions];
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9ub3JtYWxpemVWYWxpZGF0ZUFyZ3MudHMiXSwibmFtZXMiOlsibm9ybWFsaXplVmFsaWRhdGVBcmdzIiwidmFsdWUiLCJwYXJlbnRWYWx1ZSIsImN1c3RvbU9wdGlvbnMiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUVlLFNBQVNBLHFCQUFULENBQStCQyxLQUEvQixFQUEyQ0MsV0FBM0MsRUFBOERDLGFBQTlELEVBQTBGO0FBQ3hHRixFQUFBQSxLQUFLLEdBQUcsc0JBQUtBLEtBQUwsQ0FBUjs7QUFFQSxNQUFJRyxTQUFTLENBQUNDLE1BQVYsS0FBcUIsQ0FBekIsRUFBNEI7QUFDM0JILElBQUFBLFdBQVcsR0FBRyxzQkFBS0UsU0FBUyxDQUFDLENBQUQsQ0FBZCxDQUFkO0FBQ0FELElBQUFBLGFBQWEsR0FBRyxzQkFBS0MsU0FBUyxDQUFDLENBQUQsQ0FBZCxDQUFoQjtBQUNBLEdBSEQsTUFHTyxJQUFJQSxTQUFTLENBQUNDLE1BQVYsS0FBcUIsQ0FBekIsRUFBNEI7QUFDbENILElBQUFBLFdBQVcsR0FBR0ksU0FBZDtBQUNBSCxJQUFBQSxhQUFhLEdBQUcsc0JBQUtDLFNBQVMsQ0FBQyxDQUFELENBQWQsQ0FBaEI7QUFDQTs7QUFFRCxTQUFPLENBQUNILEtBQUQsRUFBUUMsV0FBUixFQUFxQkMsYUFBckIsQ0FBUDtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvcHkgZnJvbSAnLi4vdXRpbHMvY29weSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5vcm1hbGl6ZVZhbGlkYXRlQXJncyh2YWx1ZTogYW55LCBwYXJlbnRWYWx1ZT86IGFueSwgY3VzdG9tT3B0aW9ucz86IGFueSk6IGFueVtdIHtcblx0dmFsdWUgPSBjb3B5KHZhbHVlKTtcblxuXHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMykge1xuXHRcdHBhcmVudFZhbHVlID0gY29weShhcmd1bWVudHNbMV0pO1xuXHRcdGN1c3RvbU9wdGlvbnMgPSBjb3B5KGFyZ3VtZW50c1syXSk7XG5cdH0gZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuXHRcdHBhcmVudFZhbHVlID0gdW5kZWZpbmVkO1xuXHRcdGN1c3RvbU9wdGlvbnMgPSBjb3B5KGFyZ3VtZW50c1sxXSk7XG5cdH1cblxuXHRyZXR1cm4gW3ZhbHVlLCBwYXJlbnRWYWx1ZSwgY3VzdG9tT3B0aW9uc107XG59Il19