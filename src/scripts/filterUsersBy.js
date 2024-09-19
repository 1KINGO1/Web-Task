"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function filterUsersBy(users, parameters) {
    return users.filter(function (user) {
        return parameters.every(function (parameter) {
            if (!user.hasOwnProperty(parameter.key)) {
                throw new Error("User does not have property ".concat(parameter.key));
            }
            return user[parameter.key] === parameter.value;
        });
    });
}
exports.default = filterUsersBy;
