import _ from 'lodash';
import {SerializedUser} from "../types/SerializedUser";

interface UserValidationResponse {
    valid: boolean;
    errors: UserValidationError[];
}

interface UserValidationError {
    key: string;
    message: string;
}

function validateUser(user: SerializedUser, phoneRegex?: RegExp): UserValidationResponse {

    const response: UserValidationResponse = {
        valid: true,
        errors: []
    }

    const stringFields = ["full_name", "gender", "note", "state", "city", "country"] as (keyof SerializedUser)[];
    const numberFields = ["age"] as (keyof SerializedUser)[];
    const phoneFields = ["phone"] as (keyof SerializedUser)[];
    const emailFields = ["email"] as (keyof SerializedUser)[];

    // Validate string fields
    _.forEach(stringFields, (key) => {
        const value = _.get(user, key, "") as string;

        if (!_.isString(value) || _.isEmpty(value)) {
            response.valid = false;
            response.errors.push({
                key: key,
                message: "Must be a non-empty string"
            });
        } else if (!_.startsWith(value, _.toUpper(_.head(value)))) {
            response.valid = false;
            response.errors.push({
                key: key,
                message: "Must start with an uppercase letter"
            });
        }
    });

    // Validate number fields
    _.forEach(numberFields, (key) => {
        const value = _.get(user, key, NaN) as number;

        if (!_.isNumber(value) || _.isNaN(value)) {
            response.valid = false;
            response.errors.push({
                key: key,
                message: "Must be a number"
            });
        }
    });

    // Validate phone if regex is provided
    if (phoneRegex) {
        _.forEach(phoneFields, (key) => {
            const value = _.get(user, key, "") as string;

            if (!_.isString(value) || !phoneRegex.test(value)) {
                response.valid = false;
                response.errors.push({
                    key: key,
                    message: "Incorrect phone number"
                });
            }
        });
    }

    // Validate email field
    _.forEach(emailFields, (key) => {
        const value = _.get(user, key, "") as string;

        if (!_.isString(value) || !/^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/.test(value)) {
            response.valid = false;
            response.errors.push({
                key: key,
                message: "Incorrect email format"
            });
        }
    });

    return response;
}

export default validateUser;
