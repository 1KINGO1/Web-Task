"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeUserArray = serializeUserArray;
exports.connect = connect;
var Course_1 = require("./types/Course");
function serializeUserArray(users) {
    return users.map(function (user) { return serializeUser(user); });
}
function connect(usersArray1, usersArray2) {
    var resultArr = usersArray1;
    var _loop_1 = function (user) {
        var existingUser = resultArr.find(function (u) {
            return (u.id === user.id) || (u.full_name === user.full_name &&
                u.email === user.email &&
                u.phone === user.phone);
        });
        if (existingUser)
            return "continue";
        resultArr.push(user);
    };
    for (var _i = 0, usersArray2_1 = usersArray2; _i < usersArray2_1.length; _i++) {
        var user = usersArray2_1[_i];
        _loop_1(user);
    }
    return resultArr;
}
function generateID() {
    return Math.floor(Math.random() * 100000) + "";
}
function getRandomCourse() {
    var courses = Object.values(Course_1.Course);
    var randomIndex = Math.floor(Math.random() * courses.length);
    return courses[randomIndex];
}
function getRandomColor() {
    var colors = ["red", "blue", "green", "yellow", "purple", "orange"];
    var randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}
function serializeUser(user) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19;
    return {
        id: typeof (user === null || user === void 0 ? void 0 : user.id) === "string" ? user.id : generateID(),
        favorite: (_a = user.favorite) !== null && _a !== void 0 ? _a : false,
        course: (_b = user === null || user === void 0 ? void 0 : user.course) !== null && _b !== void 0 ? _b : getRandomCourse(),
        bg_color: (_c = user === null || user === void 0 ? void 0 : user.bg_color) !== null && _c !== void 0 ? _c : getRandomColor(),
        note: (_d = user === null || user === void 0 ? void 0 : user.note) !== null && _d !== void 0 ? _d : "Empty note",
        gender: (_e = user === null || user === void 0 ? void 0 : user.gender) !== null && _e !== void 0 ? _e : null,
        title: (_h = (_f = user === null || user === void 0 ? void 0 : user.title) !== null && _f !== void 0 ? _f : (_g = user === null || user === void 0 ? void 0 : user.name) === null || _g === void 0 ? void 0 : _g.title) !== null && _h !== void 0 ? _h : null,
        full_name: (_j = user === null || user === void 0 ? void 0 : user.full_name) !== null && _j !== void 0 ? _j : (((_k = user === null || user === void 0 ? void 0 : user.name) === null || _k === void 0 ? void 0 : _k.first) ? "".concat((_l = user === null || user === void 0 ? void 0 : user.name) === null || _l === void 0 ? void 0 : _l.first, " ").concat((_m = user === null || user === void 0 ? void 0 : user.name) === null || _m === void 0 ? void 0 : _m.last) : null),
        city: (_q = (_o = user === null || user === void 0 ? void 0 : user.city) !== null && _o !== void 0 ? _o : (_p = user === null || user === void 0 ? void 0 : user.location) === null || _p === void 0 ? void 0 : _p.city) !== null && _q !== void 0 ? _q : null,
        state: (_t = (_r = user === null || user === void 0 ? void 0 : user.state) !== null && _r !== void 0 ? _r : (_s = user === null || user === void 0 ? void 0 : user.location) === null || _s === void 0 ? void 0 : _s.state) !== null && _t !== void 0 ? _t : null,
        country: (_w = (_u = user === null || user === void 0 ? void 0 : user.country) !== null && _u !== void 0 ? _u : (_v = user === null || user === void 0 ? void 0 : user.location) === null || _v === void 0 ? void 0 : _v.country) !== null && _w !== void 0 ? _w : null,
        postcode: +((_z = (_x = user === null || user === void 0 ? void 0 : user.postcode) !== null && _x !== void 0 ? _x : (_y = user === null || user === void 0 ? void 0 : user.location) === null || _y === void 0 ? void 0 : _y.postcode) !== null && _z !== void 0 ? _z : 0) || null,
        coordinates: (_2 = (_0 = user === null || user === void 0 ? void 0 : user.coordinates) !== null && _0 !== void 0 ? _0 : (_1 = user === null || user === void 0 ? void 0 : user.location) === null || _1 === void 0 ? void 0 : _1.coordinates) !== null && _2 !== void 0 ? _2 : null,
        timezone: (_5 = (_3 = user === null || user === void 0 ? void 0 : user.timezone) !== null && _3 !== void 0 ? _3 : (_4 = user === null || user === void 0 ? void 0 : user.location) === null || _4 === void 0 ? void 0 : _4.timezone) !== null && _5 !== void 0 ? _5 : null,
        email: (_6 = user === null || user === void 0 ? void 0 : user.email) !== null && _6 !== void 0 ? _6 : null,
        b_date: (_9 = (_7 = user === null || user === void 0 ? void 0 : user.b_date) !== null && _7 !== void 0 ? _7 : (_8 = user === null || user === void 0 ? void 0 : user.dob) === null || _8 === void 0 ? void 0 : _8.date) !== null && _9 !== void 0 ? _9 : null,
        age: (_12 = (_10 = user === null || user === void 0 ? void 0 : user.age) !== null && _10 !== void 0 ? _10 : (_11 = user === null || user === void 0 ? void 0 : user.dob) === null || _11 === void 0 ? void 0 : _11.age) !== null && _12 !== void 0 ? _12 : null,
        phone: (_13 = user === null || user === void 0 ? void 0 : user.phone) !== null && _13 !== void 0 ? _13 : null,
        picture_large: (_16 = (_14 = user === null || user === void 0 ? void 0 : user.picture_large) !== null && _14 !== void 0 ? _14 : (_15 = user === null || user === void 0 ? void 0 : user.picture) === null || _15 === void 0 ? void 0 : _15.large) !== null && _16 !== void 0 ? _16 : null,
        picture_thumbnail: (_19 = (_17 = user === null || user === void 0 ? void 0 : user.picture_thumbnail) !== null && _17 !== void 0 ? _17 : (_18 = user === null || user === void 0 ? void 0 : user.picture) === null || _18 === void 0 ? void 0 : _18.medium) !== null && _19 !== void 0 ? _19 : null,
    };
}
