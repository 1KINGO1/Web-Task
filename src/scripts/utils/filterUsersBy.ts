import _ from "lodash";
import {SerializedUser} from "../types/SerializedUser";

interface FilterParameter{
    key: keyof SerializedUser;
    value: any;
}

function filterUsersBy(users: SerializedUser[], parameters: FilterParameter[]) {
    return users.filter((user) => {
        return parameters.every((parameter) => {
            if (!_.has(user, parameter.key)) {
                throw new Error(`User does not have property ${parameter.key}`);
            }

            return _.isEqual(_.get(user, parameter.key), parameter.value);
        });
    });
}

export default filterUsersBy;
