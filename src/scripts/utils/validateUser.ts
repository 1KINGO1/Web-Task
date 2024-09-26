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

    for (const key of ["full_name", "gender", "note", "state", "city", "country"] as (keyof SerializedUser)[]) {
        const value = user[key] as string;

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

    for (const key of ["age"] as (keyof SerializedUser)[]) {
        const value = user[key] as number;

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
        for (const key of ["phone"] as (keyof SerializedUser)[]) {
            const value = user[key] as string;

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

    for (const key of ["email"] as (keyof SerializedUser)[]) {
        const value = user[key] as string;

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

export default validateUser;
