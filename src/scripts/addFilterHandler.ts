import {state} from "./app";
import renderUsers from "./renderUsers";

export default function () {
    const teacherAge = document.getElementById('teacher-age') as HTMLSelectElement;
    const region = document.getElementById('teacher-region') as HTMLSelectElement;
    const sex = document.getElementById('teacher-sex') as HTMLSelectElement;
    const hasPhoto = document.getElementById('teacher-only-with-photo') as HTMLInputElement;
    const isFavorite = document.getElementById('teacher-only-favorite') as HTMLInputElement;

    teacherAge.addEventListener('change', function () {
        state.filters.ageRange = teacherAge.value;
        renderUsers();
    });

    region.addEventListener('change', function () {
        state.filters.region = region.value;
        renderUsers();
    });

    sex.addEventListener('change', function () {
        state.filters.gender = sex.value.toLowerCase();
        renderUsers();
    });

    hasPhoto.addEventListener('change', function () {
        state.filters.picture_large = hasPhoto.checked;
        renderUsers();
    });

    isFavorite.addEventListener('change', function () {
        state.filters.favorite = isFavorite.checked;
        renderUsers();
    });
}
