"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchOneBy = searchOneBy;
exports.searchManyBy = searchManyBy;
function searchOneBy(users, params) {
    var _a;
    return (_a = users.find(function (user) {
        return params.every(function (param) {
            var value = user[param.key];
            if (param.lessThan && param.lessThan <= value)
                return false;
            if (param.greaterThan && param.greaterThan >= value)
                return false;
            if (param.equals && param.equals !== value)
                return false;
            if (param.lessThanEquals && param.lessThanEquals < value)
                return false;
            if (param.greaterThanEquals && param.greaterThanEquals > value)
                return false;
            return true;
        });
    })) !== null && _a !== void 0 ? _a : null;
}
function searchManyBy(users, params) {
    return users.filter(function (user) {
        return params.every(function (param) {
            var value = user[param.key];
            if (param.lessThan && param.lessThan <= value)
                return false;
            if (param.greaterThan && param.greaterThan >= value)
                return false;
            if (param.equals && param.equals !== value)
                return false;
            if (param.lessThanEquals && param.lessThanEquals < value)
                return false;
            if (param.greaterThanEquals && param.greaterThanEquals > value)
                return false;
            return true;
        });
    });
}
