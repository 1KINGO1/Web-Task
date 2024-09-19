"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validateUser(user, phoneRegex) {
    var response = {
        valid: true,
        errors: []
    };
    for (var _i = 0, _a = ["full_name", "gender", "note", "state", "city", "country"]; _i < _a.length; _i++) {
        var key = _a[_i];
        var value = user[key];
        if (typeof value !== "string" || value.length === 0) {
            response.valid = false;
            response.errors.push({
                key: key,
                message: "Must be a non-empty string"
            });
            continue;
        }
        if (value[0].toUpperCase() !== value[0]) {
            response.valid = false;
            response.errors.push({
                key: key,
                message: "Must start with an uppercase letter"
            });
            continue;
        }
    }
    for (var _b = 0, _c = ["age"]; _b < _c.length; _b++) {
        var key = _c[_b];
        var value = user[key];
        if (isNaN(value)) {
            response.valid = false;
            response.errors.push({
                key: key,
                message: "Must be a number"
            });
            continue;
        }
    }
    if (phoneRegex) {
        for (var _d = 0, _e = ["phone"]; _d < _e.length; _d++) {
            var key = _e[_d];
            var value = user[key];
            if (typeof value !== "string" || !phoneRegex.test(value)) {
                response.valid = false;
                response.errors.push({
                    key: key,
                    message: "Incorrect phone number"
                });
                continue;
            }
        }
    }
    for (var _f = 0, _g = ["email"]; _f < _g.length; _f++) {
        var key = _g[_f];
        var value = user[key];
        if (typeof value !== "string" || !/[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}/.test(value)) {
            response.valid = false;
            response.errors.push({
                key: key,
                message: "Incorrect email format"
            });
            continue;
        }
    }
    return response;
}
exports.default = validateUser;
