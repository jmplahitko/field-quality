"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const address = /^(?:[^|~%<>@$*+={}:;]*)$/;
const allcharacters = /^(?:[^|~"]*)$/;
const banknumber = /^(?:[0-9\-]{4,17})$/;
const city = /^[a-zA-Z\.\-' ]*$/;
const currency = /^(\d*)(\.{1}\d{0,2})?$/;
const date = /^(?:(?:(?:0?[13578]|1[02])[- \/.]31|(?:0?[13456789]|1[0-2])[- \/.](?:0?[1-9]|[12][\d]|30))[- \/.]\d{4}|0?2[- \/.](?:(?:0?[1-9]|[12][0-8]|19)[- \/.]\d{4}|29[- \/.](?:\d{2}(?:0[48]|[2468][048]|[13579][26])|(?:[02468][048]|[1359][26])00)))$/;
const domesticphone = /^(([+]?1[ -.]?)?[(]?[2-9]\d{2}[)]?[ -.]?[1-9]\d{2}[ -.]?\d{4}([ ]?((x)|(ext[.]?)|(extension))[ .]?\d+)?)?$/;
const ein = /^\d{2}[-]?\d{7}$/;
const email = /^(?:(?:[a-zA-Z0-9_]{1}[[a-zA-Z0-9_'*{}+\.-]*@(?:(?:\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(?:\:\d{1,5})?\])|(?:[\w-]+\.)+(?:[a-zA-Z]{2,}))))?$/;
const floatsonly = /^[0-9]*(|\.[0-9]+)$/;
const foreignphone = /^[+]?(((\d+)|(([(]{1}\d+[)]{1})))[ -.]?)+$/;
const fullname = /^[a-zA-Z\-'. ]*$/;
const lastname = /^[a-zA-Z\-' .,]*$/;
const lettersonly = /^[a-zA-Z\s]*$/;
const militarytime = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
const name = /^[a-zA-Z\-' ]*$/;
const nonnegative = /^[-9][1-9]?/;
const nospecialcharacters = /^(?:[^|~"%<>#@$()*+={}:;]*)$/;
const numbersonly = /^[0-9]*$/;
const password = /^(?:((?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[|`~!@#$%^&*()_+={}\[\]:;"'<>,.?\/\-])[A-Za-z\d|`~!@#$%^&*()_+={}\[\]:;"'<>,.?\/\-]{8,})|((?=.*[a-z])(?=.*\d)(?=.*[|`~!@#$%^&*()_+={}\[\]:;"'<>,.?\/\-])[a-z\d|`~!@#$%^&*()_+={}\[\]:;"'<>,.?\/\-]{8,})|((?=.*[a-z])(?=.*[A-Z])(?=.*[|`~!@#$%^&*()_+={}\[\]:;"'<>,.?\/\-])[A-Za-z|`~!@#$%^&*()_+={}\[\]:;"'<>,.?\/\-]{8,})|((?=.*[A-Z])(?=.*\d)(?=.*[|`~!@#$%^&*()_+={}\[\]:;"'<>,.?\/\-])[A-Z\d|`~!@#$%^&*()_+={}\[\]:;"'<>,.?\/\-]{8,})|((?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}))$/;
const routingnumber = /^(?:((0[0-9])|(1[0-2])|(2[1-9])|(3[0-2])|(6[1-9])|(7[0-2])|(80)){1}\d{7})$/;
const ssn = /^\b(?!000)(?!666)(?!9)[0-9]{3}[ -]?(?!00)[0-9]{2}[ -]?(?!0000)[0-9]{4}\b$/;
const title = /^[a-zA-Z\/\\&' .,-]*$/;
const username = /^[a-zA-Z0-9_@.-]*$/;
const zipcode = /^(?:\d{5}([-]{1}\d{4})?)$/;
exports.rx = {
    address,
    allcharacters,
    banknumber,
    city,
    currency,
    date,
    domesticphone,
    ein,
    email,
    floatsonly,
    foreignphone,
    fullname,
    lastname,
    lettersonly,
    militarytime,
    name,
    nonnegative,
    nospecialcharacters,
    numbersonly,
    password,
    routingnumber,
    ssn,
    title,
    username,
    zipcode
};
