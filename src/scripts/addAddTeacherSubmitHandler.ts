import {SerializedUser} from "./types/SerializedUser";
import {serializeUserArray} from "./utils/serializeUserArray";
import {users} from "./app";
import renderUsers from "./renderUsers";
import renderUsersTable from "./renderUsersTable";
import {Course} from "./types/Course";

export default function () {
    const addTeacherModal = document.getElementById('add-teacher-modal') as HTMLFormElement;
    const addTeacherForm = addTeacherModal.getElementsByTagName("form")[0] as unknown as HTMLFormElement;

    addTeacherForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(addTeacherForm);

        for (let pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }


        const full_name = formData.get('full_name') as string ?? null;
        const speciality = formData.get('speciality') as string ?? null;
        const country = formData.get('country') as string ?? null;
        const state = formData.get('region') as string ?? null;
        const birth_date = formData.get('birth_date') as string ?? null;
        const email = formData.get('email') as string ?? null;
        const phone = formData.get('phone') as string ?? null;
        const gender = formData.get('sex') as string ?? null;
        const bg_color = formData.get('bg_color') as string ?? null;
        const teacher_notes = formData.get('teacher-notes') as string ?? null;



        const user: SerializedUser = serializeUserArray([
            {
                full_name,
                course: speciality as Course,
                age: new Date().getFullYear() - new Date(birth_date).getFullYear(),
                state,
                city: state,
                email,
                country,
                phone,
                gender,
                bg_color,
                note: teacher_notes
            }
        ])[0];

        users.push(user);

        renderUsers();
        renderUsersTable();

        addTeacherModal.classList.remove('open');
        document.body.style.overflowY = 'auto';
    });
}
