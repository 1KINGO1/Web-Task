"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sortUsersBy(users, parameter) {
    return users.sort(function (a, b) {
        if (a[parameter.key] === undefined || b[parameter.key] === undefined) {
            throw new Error("Key ".concat(parameter.key, " does not exist in the SerializedUser."));
        }
        var value1 = a[parameter.key];
        var value2 = b[parameter.key];
        if (parameter.order === 'asc') {
            return value1 > value2 ? 1 : -1;
        }
        else {
            return value1 < value2 ? 1 : -1;
        }
    });
}
exports.default = sortUsersBy;
