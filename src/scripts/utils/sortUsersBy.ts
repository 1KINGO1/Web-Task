import {SerializedUser} from "../types/SerializedUser";

interface SortParameter {
    key: keyof SerializedUser;
    order: 'asc' | 'desc';
}

function sortUsersBy(users: SerializedUser[], parameter: SortParameter): SerializedUser[] {
    return users.sort((a, b) => {
        if (a[parameter.key] === undefined || b[parameter.key] === undefined) {
            throw new Error(`Key ${parameter.key} does not exist in the SerializedUser.`);
        }

        const value1 = a[parameter.key] as any;
        const value2 = b[parameter.key] as any;

        if (parameter.order === 'asc') {
            return value1 > value2 ? 1 : -1;
        } else {
            return value1 < value2 ? 1 : -1;
        }
    });
}

export default sortUsersBy;
