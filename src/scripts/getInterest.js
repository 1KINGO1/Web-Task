"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var searchBy_1 = require("./searchBy");
function getInterest(users, params) {
    var filteredUsers = (0, searchBy_1.searchManyBy)(users, params);
    return Math.floor((filteredUsers.length / users.length) * 100);
}
exports.default = getInterest;
