"use strict";
exports.__esModule = true;
var util_1 = require("./util");
var EXPIRE_AT_KEY = '@@EXPIRE_AT';
var remove = localStorage.removeItem.bind(localStorage);
var clear = localStorage.clear.bind(localStorage);
function get(key) {
    var strValue = localStorage.getItem(key);
    if ((0, util_1.isVoid)(strValue))
        return strValue;
    var jsonValue = JSON.parse(strValue);
    if (!(0, util_1.isObj)(jsonValue))
        return jsonValue;
    if ((0, util_1.isVoid)(jsonValue[EXPIRE_AT_KEY]))
        return jsonValue;
    if (Date.now() <= jsonValue[EXPIRE_AT_KEY])
        return jsonValue.value;
    remove(key);
    return null;
}
function set(key, value, lifetime) {
    var _a;
    var seconds = (0, util_1.getLifetime)(lifetime);
    if (seconds !== Infinity) {
        localStorage.setItem(key, JSON.stringify((_a = {
                value: value
            },
            _a[EXPIRE_AT_KEY] = seconds * 1000 + Date.now(),
            _a)));
    }
    else {
        localStorage.setItem(key, JSON.stringify(value));
    }
}
function lsc(key, value, lifetime) {
    if ((0, util_1.isVoid)(lifetime) && value === undefined) {
        return get(key);
    }
    else {
        set(key, value, lifetime);
    }
}
lsc.get = get;
lsc.set = set;
lsc.clear = clear;
lsc.remove = remove;
exports["default"] = lsc;
