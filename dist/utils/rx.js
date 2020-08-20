"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipcode = exports.username = exports.title = exports.ssn = exports.routingnumber = exports.password = exports.numbersonly = exports.nospecialcharacters = exports.name = exports.militarytime = exports.lettersonly = exports.lastname = exports.iso8601constricted = exports.iso8601 = exports.fullname = exports.foreignphone = exports.floatsonly = exports.email = exports.ein = exports.domesticphone = exports.date = exports.currency = exports.city = exports.banknumber = exports.allcharacters = exports.address = void 0;
var address = /^(?:[^|~%<>@$*+={}:;]*)$/;
exports.address = address;
var allcharacters = /^(?:[^|~"]*)$/;
exports.allcharacters = allcharacters;
var banknumber = /^(?:[0-9\-]{4,17})$/;
exports.banknumber = banknumber;
var city = /^[a-zA-Z\.\-' ]*$/;
exports.city = city;
var currency = /^(\d*)(\.{1}\d{0,2})?$/;
exports.currency = currency;
var date = /^(?:(?:(?:0?[13578]|1[02])[- \/.]31|(?:0?[13456789]|1[0-2])[- \/.](?:0?[1-9]|[12][\d]|30))[- \/.]\d{4}|0?2[- \/.](?:(?:0?[1-9]|[12][0-8]|19)[- \/.]\d{4}|29[- \/.](?:\d{2}(?:0[48]|[2468][048]|[13579][26])|(?:[02468][048]|[1359][26])00)))$/;
exports.date = date;
var domesticphone = /^(([+]?1[ -.]?)?[(]?[2-9]\d{2}[)]?[ -.]?[1-9]\d{2}[ -.]?\d{4}([ ]?((x)|(ext[.]?)|(extension))[ .]?\d+)?)?$/;
exports.domesticphone = domesticphone;
var ein = /^\d{2}[-]?\d{7}$/;
exports.ein = ein;
var email = /^[a-zA-Z0-9.!#$%&''*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
exports.email = email;
var floatsonly = /^[0-9]*(|\.[0-9]+)$/;
exports.floatsonly = floatsonly;
var foreignphone = /^[+]?(((\d+)|(([(]{1}\d+[)]{1})))[ -.]?)+$/;
exports.foreignphone = foreignphone;
var fullname = /^[a-zA-Z\-' .,]*$/;
exports.fullname = fullname;
var iso8601 = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?(Z|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/i;
exports.iso8601 = iso8601;
var iso8601constricted = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i;
exports.iso8601constricted = iso8601constricted;
var lastname = /^[a-zA-Z\-' .,]*$/;
exports.lastname = lastname;
var lettersonly = /^[a-zA-Z\s]*$/;
exports.lettersonly = lettersonly;
var militarytime = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
exports.militarytime = militarytime;
var name = /^[a-zA-Z\-' .]*$/;
exports.name = name;
var nospecialcharacters = /^(?:[^|~"%<>#@$()*+={}:;]*)$/;
exports.nospecialcharacters = nospecialcharacters;
var numbersonly = /^[0-9]*$/;
exports.numbersonly = numbersonly;
var password = /^(?:(?!.*[<>])(?:(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])|(?=.*[@#$%^&*_+=\[\]\{\}|\\:',?\/`~"();.-])(?=.*[A-Z])(?=.*[0-9])|(?=.*[@#$%^&*_+=\[\]\{\}|\\:',?\/`~"();.-])(?=.*[a-z])(?=.*[0-9])|(?=.*[@#$%^&*_+=\[\]\{\}|\\:',?\/`~"();.-])(?=.*[a-z])(?=.*[A-Z])|(?=.*[@#$%^&*_+=\[\]\{\}|\\:',?\/`~"();.-])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]))).*$/;
exports.password = password;
var routingnumber = /^(?:((0[0-9])|(1[0-2])|(2[1-9])|(3[0-2])|(6[1-9])|(7[0-2])|(80)){1}\d{7})$/;
exports.routingnumber = routingnumber;
var ssn = /^\b(?!000)(?!666)(?!9)[0-9]{3}[ -]?(?!00)[0-9]{2}[ -]?(?!0000)[0-9]{4}\b$/;
exports.ssn = ssn;
var title = /^[a-zA-Z\/\\&' .,-]*$/;
exports.title = title;
var username = /^[a-zA-Z0-9_@.-]*$/;
exports.username = username;
var zipcode = /^(?:\d{5}([-]{1}\d{4})?)$/;
exports.zipcode = zipcode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9yeC50cyJdLCJuYW1lcyI6WyJhZGRyZXNzIiwiYWxsY2hhcmFjdGVycyIsImJhbmtudW1iZXIiLCJjaXR5IiwiY3VycmVuY3kiLCJkYXRlIiwiZG9tZXN0aWNwaG9uZSIsImVpbiIsImVtYWlsIiwiZmxvYXRzb25seSIsImZvcmVpZ25waG9uZSIsImZ1bGxuYW1lIiwiaXNvODYwMSIsImlzbzg2MDFjb25zdHJpY3RlZCIsImxhc3RuYW1lIiwibGV0dGVyc29ubHkiLCJtaWxpdGFyeXRpbWUiLCJuYW1lIiwibm9zcGVjaWFsY2hhcmFjdGVycyIsIm51bWJlcnNvbmx5IiwicGFzc3dvcmQiLCJyb3V0aW5nbnVtYmVyIiwic3NuIiwidGl0bGUiLCJ1c2VybmFtZSIsInppcGNvZGUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFPLElBQU1BLE9BQU8sR0FBRywwQkFBaEI7O0FBQ0EsSUFBTUMsYUFBYSxHQUFHLGVBQXRCOztBQUNBLElBQU1DLFVBQVUsR0FBRyxxQkFBbkI7O0FBQ0EsSUFBTUMsSUFBSSxHQUFHLG1CQUFiOztBQUNBLElBQU1DLFFBQVEsR0FBRyx3QkFBakI7O0FBQ0EsSUFBTUMsSUFBSSxHQUFHLCtPQUFiOztBQUNBLElBQU1DLGFBQWEsR0FBRSw0R0FBckI7O0FBQ0EsSUFBTUMsR0FBRyxHQUFHLGtCQUFaOztBQUNBLElBQU1DLEtBQUssR0FBRyx3RUFBZDs7QUFDQSxJQUFNQyxVQUFVLEdBQUcscUJBQW5COztBQUNBLElBQU1DLFlBQVksR0FBRyw0Q0FBckI7O0FBQ0EsSUFBTUMsUUFBUSxHQUFHLG1CQUFqQjs7QUFDQSxJQUFNQyxPQUFPLEdBQUcsMlJBQWhCOztBQUNBLElBQU1DLGtCQUFrQixHQUFHLCtEQUEzQjs7QUFDQSxJQUFNQyxRQUFRLEdBQUcsbUJBQWpCOztBQUNBLElBQU1DLFdBQVcsR0FBRyxlQUFwQjs7QUFDQSxJQUFNQyxZQUFZLEdBQUcsa0NBQXJCOztBQUNBLElBQU1DLElBQUksR0FBRyxrQkFBYjs7QUFDQSxJQUFNQyxtQkFBbUIsR0FBRSw4QkFBM0I7O0FBQ0EsSUFBTUMsV0FBVyxHQUFHLFVBQXBCOztBQUNBLElBQU1DLFFBQVEsR0FBRyw0VUFBakI7O0FBQ0EsSUFBTUMsYUFBYSxHQUFHLDRFQUF0Qjs7QUFDQSxJQUFNQyxHQUFHLEdBQUcsMkVBQVo7O0FBQ0EsSUFBTUMsS0FBSyxHQUFHLHVCQUFkOztBQUNBLElBQU1DLFFBQVEsR0FBRyxvQkFBakI7O0FBQ0EsSUFBTUMsT0FBTyxHQUFHLDJCQUFoQiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBhZGRyZXNzID0gL14oPzpbXnx+JTw+QCQqKz17fTo7XSopJC87XG5leHBvcnQgY29uc3QgYWxsY2hhcmFjdGVycyA9IC9eKD86W158flwiXSopJC87XG5leHBvcnQgY29uc3QgYmFua251bWJlciA9IC9eKD86WzAtOVxcLV17NCwxN30pJC87XG5leHBvcnQgY29uc3QgY2l0eSA9IC9eW2EtekEtWlxcLlxcLScgXSokLztcbmV4cG9ydCBjb25zdCBjdXJyZW5jeSA9IC9eKFxcZCopKFxcLnsxfVxcZHswLDJ9KT8kLztcbmV4cG9ydCBjb25zdCBkYXRlID0gL14oPzooPzooPzowP1sxMzU3OF18MVswMl0pWy0gXFwvLl0zMXwoPzowP1sxMzQ1Njc4OV18MVswLTJdKVstIFxcLy5dKD86MD9bMS05XXxbMTJdW1xcZF18MzApKVstIFxcLy5dXFxkezR9fDA/MlstIFxcLy5dKD86KD86MD9bMS05XXxbMTJdWzAtOF18MTkpWy0gXFwvLl1cXGR7NH18MjlbLSBcXC8uXSg/OlxcZHsyfSg/OjBbNDhdfFsyNDY4XVswNDhdfFsxMzU3OV1bMjZdKXwoPzpbMDI0NjhdWzA0OF18WzEzNTldWzI2XSkwMCkpKSQvO1xuZXhwb3J0IGNvbnN0IGRvbWVzdGljcGhvbmUgPS9eKChbK10/MVsgLS5dPyk/WyhdP1syLTldXFxkezJ9WyldP1sgLS5dP1sxLTldXFxkezJ9WyAtLl0/XFxkezR9KFsgXT8oKHgpfChleHRbLl0/KXwoZXh0ZW5zaW9uKSlbIC5dP1xcZCspPyk/JC87XG5leHBvcnQgY29uc3QgZWluID0gL15cXGR7Mn1bLV0/XFxkezd9JC87XG5leHBvcnQgY29uc3QgZW1haWwgPSAvXlthLXpBLVowLTkuISMkJSYnJyorXFwvPT9eX2B7fH1+LV0rQFthLXpBLVowLTktXSsoPzpcXC5bYS16QS1aMC05LV0rKSokLztcbmV4cG9ydCBjb25zdCBmbG9hdHNvbmx5ID0gL15bMC05XSoofFxcLlswLTldKykkLztcbmV4cG9ydCBjb25zdCBmb3JlaWducGhvbmUgPSAvXlsrXT8oKChcXGQrKXwoKFsoXXsxfVxcZCtbKV17MX0pKSlbIC0uXT8pKyQvO1xuZXhwb3J0IGNvbnN0IGZ1bGxuYW1lID0gL15bYS16QS1aXFwtJyAuLF0qJC87XG5leHBvcnQgY29uc3QgaXNvODYwMSA9IC9eKFtcXCstXT9cXGR7NH0oPyFcXGR7Mn1cXGIpKSgoLT8pKCgwWzEtOV18MVswLTJdKShcXDMoWzEyXVxcZHwwWzEtOV18M1swMV0pKT98VyhbMC00XVxcZHw1WzAtMl0pKC0/WzEtN10pP3woMDBbMS05XXwwWzEtOV1cXGR8WzEyXVxcZHsyfXwzKFswLTVdXFxkfDZbMS02XSkpKShbVFxcc10oKChbMDFdXFxkfDJbMC0zXSkoKDo/KVswLTVdXFxkKT98MjRcXDo/MDApKFtcXC4sXVxcZCsoPyE6KSk/KT8oXFwxN1swLTVdXFxkKFtcXC4sXVxcZCspPyk/KFp8KFtcXCstXSkoWzAxXVxcZHwyWzAtM10pOj8oWzAtNV1cXGQpPyk/KT8pPyQvaTtcbmV4cG9ydCBjb25zdCBpc284NjAxY29uc3RyaWN0ZWQgPSAvXlxcZHs0fS1cXGRcXGQtXFxkXFxkVFxcZFxcZDpcXGRcXGQ6XFxkXFxkKFxcLlxcZCspPygoWystXVxcZFxcZDpcXGRcXGQpfFopPyQvaVxuZXhwb3J0IGNvbnN0IGxhc3RuYW1lID0gL15bYS16QS1aXFwtJyAuLF0qJC87XG5leHBvcnQgY29uc3QgbGV0dGVyc29ubHkgPSAvXlthLXpBLVpcXHNdKiQvO1xuZXhwb3J0IGNvbnN0IG1pbGl0YXJ5dGltZSA9IC9eKFswLTFdWzAtOV18MlswLTNdKTpbMC01XVswLTldJC87XG5leHBvcnQgY29uc3QgbmFtZSA9IC9eW2EtekEtWlxcLScgLl0qJC87XG5leHBvcnQgY29uc3Qgbm9zcGVjaWFsY2hhcmFjdGVycyA9L14oPzpbXnx+XCIlPD4jQCQoKSorPXt9OjtdKikkLztcbmV4cG9ydCBjb25zdCBudW1iZXJzb25seSA9IC9eWzAtOV0qJC87XG5leHBvcnQgY29uc3QgcGFzc3dvcmQgPSAvXig/Oig/IS4qWzw+XSkoPzooPz0uKlthLXpdKSg/PS4qW0EtWl0pKD89LipbMC05XSl8KD89LipbQCMkJV4mKl8rPVxcW1xcXVxce1xcfXxcXFxcOicsP1xcL2B+XCIoKTsuLV0pKD89LipbQS1aXSkoPz0uKlswLTldKXwoPz0uKltAIyQlXiYqXys9XFxbXFxdXFx7XFx9fFxcXFw6Jyw/XFwvYH5cIigpOy4tXSkoPz0uKlthLXpdKSg/PS4qWzAtOV0pfCg/PS4qW0AjJCVeJipfKz1cXFtcXF1cXHtcXH18XFxcXDonLD9cXC9gflwiKCk7Li1dKSg/PS4qW2Etel0pKD89LipbQS1aXSl8KD89LipbQCMkJV4mKl8rPVxcW1xcXVxce1xcfXxcXFxcOicsP1xcL2B+XCIoKTsuLV0pKD89LipbYS16XSkoPz0uKltBLVpdKSg/PS4qWzAtOV0pKSkuKiQvO1xuZXhwb3J0IGNvbnN0IHJvdXRpbmdudW1iZXIgPSAvXig/OigoMFswLTldKXwoMVswLTJdKXwoMlsxLTldKXwoM1swLTJdKXwoNlsxLTldKXwoN1swLTJdKXwoODApKXsxfVxcZHs3fSkkLztcbmV4cG9ydCBjb25zdCBzc24gPSAvXlxcYig/ITAwMCkoPyE2NjYpKD8hOSlbMC05XXszfVsgLV0/KD8hMDApWzAtOV17Mn1bIC1dPyg/ITAwMDApWzAtOV17NH1cXGIkLztcbmV4cG9ydCBjb25zdCB0aXRsZSA9IC9eW2EtekEtWlxcL1xcXFwmJyAuLC1dKiQvO1xuZXhwb3J0IGNvbnN0IHVzZXJuYW1lID0gL15bYS16QS1aMC05X0AuLV0qJC87XG5leHBvcnQgY29uc3QgemlwY29kZSA9IC9eKD86XFxkezV9KFstXXsxfVxcZHs0fSk/KSQvOyJdfQ==