import '../css/app.css';
import '../scss/index.scss';

import {serializeUserArray} from "./utils/serializeUserArray";
import renderUsers from "./renderUsers";
import addModalCloseHandler from "./addModalCloseHandler";
import addAddTeacherOpenHandler from "./addAddTeacherOpenHandler";
import addFilterHandler from "./addFilterHandler";
import renderStatisticSort from "./renderStatisticSort";
import addAddTeacherSubmitHandler from "./addAddTeacherSubmitHandler";
import renderFavorite from "./renderFavorite";
import addSearchHandler from "./addSearchHandler";
import {fetchUsers} from "./services/usersService";
import {SerializedUser} from "./types/SerializedUser";
import addDowloadMoreButtonHandler from "./addDowloadMoreButtonHandler";

export interface State {
    addTeacherModalOpen: boolean;
    teacherInfoModalOpen: boolean;
    filters: {
        ageRange: string | null;
        region: string | null;
        gender: string | null;
        picture_large: boolean | null;
        favorite: boolean | null;
    },
    statisticsSort: {
        full_name: null | SortOrder;
        specialty: null | SortOrder;
        age: null | SortOrder;
        region: null | SortOrder;
        gender: null | SortOrder;
    },
    searchValue: string,
    tablePage: number,
    usersPage: number
}

type SortOrder = 'asc' | 'desc';

let users: SerializedUser[] = [];
const state: State = {
    addTeacherModalOpen: false,
    teacherInfoModalOpen: false,
    filters: {
        ageRange: null,
        region: null,
        gender: null,
        picture_large: null,
        favorite: null
    },
    statisticsSort: {
        full_name: null,
        specialty: null,
        age: null,
        region: null,
        gender: null,
    },
    searchValue: '',
    tablePage: 0,
    usersPage: 0
}

function getUsers(){
    return users;
}

function setUsers(newUsers: SerializedUser[]){
    users = newUsers;
}

const init = async () => {
    users = serializeUserArray(await fetchUsers());

    renderUsers();
    renderStatisticSort();
    renderFavorite();

    addDowloadMoreButtonHandler();

    addModalCloseHandler();
    addAddTeacherOpenHandler();
    addFilterHandler();
    addAddTeacherSubmitHandler();
    addSearchHandler();
}

init();


export {state, getUsers, setUsers};
