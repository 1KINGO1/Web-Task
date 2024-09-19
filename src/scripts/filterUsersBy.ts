import {SerializedUser} from "./types/SerializedUser";

interface FilterParameter{
    key: keyof SerializedUser;
    value: any;
}

function filterUsersBy(users: SerializedUser[], parameters: FilterParameter[]) {
    return users.filter((user) => {
        return parameters.every((parameter) => {
            if (!user.hasOwnProperty(parameter.key)) {
                throw new Error(`User does not have property ${parameter.key}`);
            }

            return user[parameter.key as keyof SerializedUser] === parameter.value;
        });
    });
}

export default filterUsersBy;
