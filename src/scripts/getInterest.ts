import {SerializedUser} from "./types/SerializedUser";
import {searchManyBy, SearchParam} from "./searchBy";

function getInterest(users: SerializedUser[], params: SearchParam[]) {
    const filteredUsers = searchManyBy(users, params);

    return Math.floor((filteredUsers.length / users.length) * 100);
}

export default getInterest;
