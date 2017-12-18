"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getProperty(prop, obj) {
    if (obj.hasOwnProperty(prop)) {
        return obj[prop];
    }
    else {
        let props = prop.split('.');
        if (props.length > 1) {
            if (obj.hasOwnProperty(props[0])) {
                return getProperty(props.slice(1).join('.'), obj[props[0]]);
            }
            else {
                return undefined;
            }
        }
        else {
            return undefined;
        }
    }
}
exports.default = getProperty;
