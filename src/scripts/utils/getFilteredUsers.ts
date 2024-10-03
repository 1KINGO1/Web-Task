import {getUsers, State, state} from "../app";
import {searchManyBy, searchManyByValue, SearchParam} from "./searchBy";

export default function getFilteredUsers() {
    const users = getUsers();
    let filteredUsers;

    if (state.searchValue) {
        filteredUsers = searchManyByValue(users, state.searchValue);
    }

    const filterParams: SearchParam[] =
        Object.keys(state.filters)
            .filter(key => state.filters[key as keyof State["filters"]] !== null && state.filters[key as keyof State["filters"]] !== false)
            .map(key => {
                if (key === "ageRange") {
                    return {
                        key: "age",
                        greaterThanEquals: state.filters.ageRange?.split("-")[0],
                        lessThanEquals: state.filters.ageRange?.split("-")[1]
                    } as SearchParam;
                }

                if (key === "picture_large") {
                    return {
                        key,
                        has: true
                    } as SearchParam;
                }

                if (key === "favorite") {
                    return {
                        key,
                        equals: true
                    } as SearchParam;
                }

                return {
                    key,
                    equals: state.filters[key as keyof State["filters"]]
                } as SearchParam;
            });

    filteredUsers = searchManyBy(filteredUsers ?? users, filterParams);

    return filteredUsers;
}
