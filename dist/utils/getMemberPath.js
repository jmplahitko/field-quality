"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getMemberPath;

/**
 * https://github.com/nartc/mapper/blob/master/src/utils/getMemberPath.ts
 * This implementation is copied from @nartc/automapper
 */
function getMemberPath(fn) {
  var fnString = fn.toString(); // ES6 prop selector:
  // "x => x.prop"

  if (fnString.includes('=>')) {
    return cleanseAssertionOperators(fnString.substring(fnString.indexOf('.') + 1));
  } // ES5 prop selector:
  // "function (x) { return x.prop; }"
  // webpack production build excludes the spaces and optional trailing semicolon:
  //   "function(x){return x.prop}"
  // FYI - during local dev testing i observed carriage returns after the curly brackets as well
  // Note by maintainer: See https://github.com/IRCraziestTaxi/ts-simple-nameof/pull/13#issuecomment-567171802 for
  // explanation of this regex.


  var matchRegex = /function\s*\(\w+\)\s*{[\r\n\s]*return\s+\w+\.((\w+\.)*(\w+))/i;
  var es5Match = fnString.match(matchRegex);

  if (es5Match) {
    return es5Match[1];
  }

  return '';
}

function cleanseAssertionOperators(parsedName) {
  return parsedName.replace(/[?!]/g, '').replace(/(?:\s|;|{|}|\(|\)|)+/gm, '');
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9nZXRNZW1iZXJQYXRoLnRzIl0sIm5hbWVzIjpbImdldE1lbWJlclBhdGgiLCJmbiIsImZuU3RyaW5nIiwidG9TdHJpbmciLCJpbmNsdWRlcyIsImNsZWFuc2VBc3NlcnRpb25PcGVyYXRvcnMiLCJzdWJzdHJpbmciLCJpbmRleE9mIiwibWF0Y2hSZWdleCIsImVzNU1hdGNoIiwibWF0Y2giLCJwYXJzZWROYW1lIiwicmVwbGFjZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ2UsU0FBU0EsYUFBVCxDQUEwQkMsRUFBMUIsRUFBb0Q7QUFDbEUsTUFBTUMsUUFBUSxHQUFHRCxFQUFFLENBQUNFLFFBQUgsRUFBakIsQ0FEa0UsQ0FHbEU7QUFDQTs7QUFDQSxNQUFJRCxRQUFRLENBQUNFLFFBQVQsQ0FBa0IsSUFBbEIsQ0FBSixFQUE2QjtBQUM1QixXQUFPQyx5QkFBeUIsQ0FDL0JILFFBQVEsQ0FBQ0ksU0FBVCxDQUFtQkosUUFBUSxDQUFDSyxPQUFULENBQWlCLEdBQWpCLElBQXdCLENBQTNDLENBRCtCLENBQWhDO0FBR0EsR0FUaUUsQ0FXbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBLE1BQU1DLFVBQVUsR0FBRywrREFBbkI7QUFFQSxNQUFNQyxRQUFRLEdBQUdQLFFBQVEsQ0FBQ1EsS0FBVCxDQUFlRixVQUFmLENBQWpCOztBQUVBLE1BQUlDLFFBQUosRUFBYztBQUNiLFdBQU9BLFFBQVEsQ0FBQyxDQUFELENBQWY7QUFDQTs7QUFFRCxTQUFPLEVBQVA7QUFDQTs7QUFFRCxTQUFTSix5QkFBVCxDQUFtQ00sVUFBbkMsRUFBK0Q7QUFDOUQsU0FBT0EsVUFBVSxDQUFDQyxPQUFYLENBQW1CLE9BQW5CLEVBQTRCLEVBQTVCLEVBQWdDQSxPQUFoQyxDQUF3Qyx3QkFBeEMsRUFBa0UsRUFBbEUsQ0FBUDtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVFNlbGVjdG9yIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG4vKipcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9uYXJ0Yy9tYXBwZXIvYmxvYi9tYXN0ZXIvc3JjL3V0aWxzL2dldE1lbWJlclBhdGgudHNcbiAqIFRoaXMgaW1wbGVtZW50YXRpb24gaXMgY29waWVkIGZyb20gQG5hcnRjL2F1dG9tYXBwZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0TWVtYmVyUGF0aDxUPihmbjogVFNlbGVjdG9yPFQ+KTogc3RyaW5nIHtcblx0Y29uc3QgZm5TdHJpbmcgPSBmbi50b1N0cmluZygpO1xuXG5cdC8vIEVTNiBwcm9wIHNlbGVjdG9yOlxuXHQvLyBcInggPT4geC5wcm9wXCJcblx0aWYgKGZuU3RyaW5nLmluY2x1ZGVzKCc9PicpKSB7XG5cdFx0cmV0dXJuIGNsZWFuc2VBc3NlcnRpb25PcGVyYXRvcnMoXG5cdFx0XHRmblN0cmluZy5zdWJzdHJpbmcoZm5TdHJpbmcuaW5kZXhPZignLicpICsgMSlcblx0XHQpO1xuXHR9XG5cblx0Ly8gRVM1IHByb3Agc2VsZWN0b3I6XG5cdC8vIFwiZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHgucHJvcDsgfVwiXG5cdC8vIHdlYnBhY2sgcHJvZHVjdGlvbiBidWlsZCBleGNsdWRlcyB0aGUgc3BhY2VzIGFuZCBvcHRpb25hbCB0cmFpbGluZyBzZW1pY29sb246XG5cdC8vICAgXCJmdW5jdGlvbih4KXtyZXR1cm4geC5wcm9wfVwiXG5cdC8vIEZZSSAtIGR1cmluZyBsb2NhbCBkZXYgdGVzdGluZyBpIG9ic2VydmVkIGNhcnJpYWdlIHJldHVybnMgYWZ0ZXIgdGhlIGN1cmx5IGJyYWNrZXRzIGFzIHdlbGxcblx0Ly8gTm90ZSBieSBtYWludGFpbmVyOiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL0lSQ3Jhemllc3RUYXhpL3RzLXNpbXBsZS1uYW1lb2YvcHVsbC8xMyNpc3N1ZWNvbW1lbnQtNTY3MTcxODAyIGZvclxuXHQvLyBleHBsYW5hdGlvbiBvZiB0aGlzIHJlZ2V4LlxuXHRjb25zdCBtYXRjaFJlZ2V4ID0gL2Z1bmN0aW9uXFxzKlxcKFxcdytcXClcXHMqe1tcXHJcXG5cXHNdKnJldHVyblxccytcXHcrXFwuKChcXHcrXFwuKSooXFx3KykpL2k7XG5cblx0Y29uc3QgZXM1TWF0Y2ggPSBmblN0cmluZy5tYXRjaChtYXRjaFJlZ2V4KTtcblxuXHRpZiAoZXM1TWF0Y2gpIHtcblx0XHRyZXR1cm4gZXM1TWF0Y2hbMV0hO1xuXHR9XG5cblx0cmV0dXJuICcnO1xufVxuXG5mdW5jdGlvbiBjbGVhbnNlQXNzZXJ0aW9uT3BlcmF0b3JzKHBhcnNlZE5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG5cdHJldHVybiBwYXJzZWROYW1lLnJlcGxhY2UoL1s/IV0vZywgJycpLnJlcGxhY2UoLyg/Olxcc3w7fHt8fXxcXCh8XFwpfCkrL2dtLCAnJyk7XG59Il19