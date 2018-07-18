"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const quality_1 = require("./quality");
const { isObject } = quality_1.quality;
function getProperty(obj, prop) {
    if (!isObject(obj)) {
        return;
    }
    if (obj.hasOwnProperty(prop)) {
        return obj[prop];
    }
    else {
        let props = prop.split('.');
        if (props.length > 1) {
            if (obj.hasOwnProperty(props[0])) {
                return getProperty(obj[props[0]], props.slice(1).join('.'));
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
