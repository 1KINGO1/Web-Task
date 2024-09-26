import '../css/app.css';
import '../scss/index.scss';

import {connect, serializeUserArray} from "./utils/serializeUserArray";
import {additionalUsers, randomUserMock} from "./mock/mock";
import UnserializedUser from "./types/UnserializedUser";
import renderUsers from "./renderUsers";
import addModalCloseHandler from "./addModalCloseHandler";
import addAddTeacherOpenHandler from "./addAddTeacherOpenHandler";
import addFilterHandler from "./addFilterHandler";
import renderUsersTable from "./renderUsersTable";
import renderStatisticSort from "./renderStatisticSort";
import addAddTeacherSubmitHandler from "./addAddTeacherSubmitHandler";
import renderFavorite from "./renderFavorite";
import addSearchHandler from "./addSearchHandler";

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
    searchValue: string
}

type SortOrder = 'asc' | 'desc';

const users = connect(
    serializeUserArray(randomUserMock as any as UnserializedUser[]),
    serializeUserArray(additionalUsers as any as UnserializedUser[])
);

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
    searchValue: ''
}

export {state, users};

renderUsers();
renderUsersTable();
renderStatisticSort();
renderFavorite();

addModalCloseHandler();
addAddTeacherOpenHandler();
addFilterHandler();
addAddTeacherSubmitHandler();
addSearchHandler();

