"use strict";
exports.__esModule = true;
exports.getLifetime = exports.isVoid = exports.isObj = void 0;
var isObj = function (o) {
    return Object.prototype.toString.call(o) === '[object Object]';
};
exports.isObj = isObj;
var isVoid = function (v) { return v === null || v === undefined; };
exports.isVoid = isVoid;
var getLifetime = function (value) {
    if ((0, exports.isVoid)(value))
        return Infinity;
    if (typeof value === 'number') {
        if (value > 0)
            return Math.round(value);
        return Infinity;
    }
    if (typeof value !== 'string')
        return Infinity;
    if (value.length < 2)
        return Infinity;
    var unit = value.slice(-1);
    if ('dhm'.indexOf(unit) === -1)
        return Infinity;
    var count = parseInt(value.slice(0, -1));
    if (isNaN(count))
        return Infinity;
    return (count *
        {
            m: 60,
            h: 3600,
            d: 86400
        }[unit]);
};
exports.getLifetime = getLifetime;
