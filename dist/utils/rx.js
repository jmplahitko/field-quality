"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rx = void 0;
var address = /^(?:[^|~%<>@$*+={}:;]*)$/;
var allcharacters = /^(?:[^|~"]*)$/;
var banknumber = /^(?:[0-9\-]{4,17})$/;
var city = /^[a-zA-Z\.\-' ]*$/;
var currency = /^(\d*)(\.{1}\d{0,2})?$/;
var date = /^(?:(?:(?:0?[13578]|1[02])[- \/.]31|(?:0?[13456789]|1[0-2])[- \/.](?:0?[1-9]|[12][\d]|30))[- \/.]\d{4}|0?2[- \/.](?:(?:0?[1-9]|[12][0-8]|19)[- \/.]\d{4}|29[- \/.](?:\d{2}(?:0[48]|[2468][048]|[13579][26])|(?:[02468][048]|[1359][26])00)))$/;
var domesticphone = /^(([+]?1[ -.]?)?[(]?[2-9]\d{2}[)]?[ -.]?[1-9]\d{2}[ -.]?\d{4}([ ]?((x)|(ext[.]?)|(extension))[ .]?\d+)?)?$/;
var ein = /^\d{2}[-]?\d{7}$/;
var email = /^(?:(?:[a-zA-Z0-9_]{1}[[a-zA-Z0-9_'*{}+\.-]*@(?:(?:\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(?:\:\d{1,5})?\])|(?:[\w-]+\.)+(?:[a-zA-Z]{2,}))))?$/;
var floatsonly = /^[0-9]*(|\.[0-9]+)$/;
var foreignphone = /^[+]?(((\d+)|(([(]{1}\d+[)]{1})))[ -.]?)+$/;
var fullname = /^[a-zA-Z\-'. ]*$/;
var lastname = /^[a-zA-Z\-' .,]*$/;
var lettersonly = /^[a-zA-Z\s]*$/;
var militarytime = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
var name = /^[a-zA-Z\-' ]*$/;
var nonnegative = /^[-9][1-9]?/;
var nospecialcharacters = /^(?:[^|~"%<>#@$()*+={}:;]*)$/;
var numbersonly = /^[0-9]*$/;
var password = /^(?:((?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[|`~!@#$%^&*()_+={}\[\]:;"'<>,.?\/\-])[A-Za-z\d|`~!@#$%^&*()_+={}\[\]:;"'<>,.?\/\-]{8,})|((?=.*[a-z])(?=.*\d)(?=.*[|`~!@#$%^&*()_+={}\[\]:;"'<>,.?\/\-])[a-z\d|`~!@#$%^&*()_+={}\[\]:;"'<>,.?\/\-]{8,})|((?=.*[a-z])(?=.*[A-Z])(?=.*[|`~!@#$%^&*()_+={}\[\]:;"'<>,.?\/\-])[A-Za-z|`~!@#$%^&*()_+={}\[\]:;"'<>,.?\/\-]{8,})|((?=.*[A-Z])(?=.*\d)(?=.*[|`~!@#$%^&*()_+={}\[\]:;"'<>,.?\/\-])[A-Z\d|`~!@#$%^&*()_+={}\[\]:;"'<>,.?\/\-]{8,})|((?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}))$/;
var routingnumber = /^(?:((0[0-9])|(1[0-2])|(2[1-9])|(3[0-2])|(6[1-9])|(7[0-2])|(80)){1}\d{7})$/;
var ssn = /^\b(?!000)(?!666)(?!9)[0-9]{3}[ -]?(?!00)[0-9]{2}[ -]?(?!0000)[0-9]{4}\b$/;
var title = /^[a-zA-Z\/\\&' .,-]*$/;
var username = /^[a-zA-Z0-9_@.-]*$/;
var zipcode = /^(?:\d{5}([-]{1}\d{4})?)$/;
var rx = {
  address: address,
  allcharacters: allcharacters,
  banknumber: banknumber,
  city: city,
  currency: currency,
  date: date,
  domesticphone: domesticphone,
  ein: ein,
  email: email,
  floatsonly: floatsonly,
  foreignphone: foreignphone,
  fullname: fullname,
  lastname: lastname,
  lettersonly: lettersonly,
  militarytime: militarytime,
  name: name,
  nonnegative: nonnegative,
  nospecialcharacters: nospecialcharacters,
  numbersonly: numbersonly,
  password: password,
  routingnumber: routingnumber,
  ssn: ssn,
  title: title,
  username: username,
  zipcode: zipcode
};
exports.rx = rx;