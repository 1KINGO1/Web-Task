import {state} from "./app";
import renderUsers from "./renderUsers";
import renderUsersTable from "./renderUsersTable";
import renderStatisticPageCount from "./renderStatisticPageCount";

export default function () {
    const teacherAge = document.getElementById('teacher-age') as HTMLSelectElement;
    const region = document.getElementById('teacher-region') as HTMLSelectElement;
    const sex = document.getElementById('teacher-sex') as HTMLSelectElement;
    const hasPhoto = document.getElementById('teacher-only-with-photo') as HTMLInputElement;
    const isFavorite = document.getElementById('teacher-only-favorite') as HTMLInputElement;

    function updateUsers() {
        renderUsers();
        renderUsersTable();
        state.tablePage = 0;
        state.usersPage = 0;
        renderStatisticPageCount();
    }

    teacherAge.addEventListener('change', function () {
        state.filters.ageRange = teacherAge.value;
        updateUsers();
    });

    region.addEventListener('change', function () {
        state.filters.region = region.value;
        updateUsers();
    });

    sex.addEventListener('change', function () {
        state.filters.gender = sex.value.toLowerCase();
        updateUsers();
    });

    hasPhoto.addEventListener('change', function () {
        state.filters.picture_large = hasPhoto.checked;
        updateUsers();
    });

    isFavorite.addEventListener('change', function () {
        state.filters.favorite = isFavorite.checked;
        updateUsers();
    });
}
