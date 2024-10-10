import _ from 'lodash';
import {SerializedUser} from "../types/SerializedUser";

interface SortParameter {
    key: keyof SerializedUser;
    order: 'asc' | 'desc';
}

function sortUsersBy(users: SerializedUser[], parameter: SortParameter): SerializedUser[] {
    if (!_.every(users, user => _.has(user, parameter.key))) {
        throw new Error(`Key ${parameter.key} does not exist in one or more users.`);
    }

    return _.orderBy(users, [parameter.key], [parameter.order]);
}

export default sortUsersBy;
