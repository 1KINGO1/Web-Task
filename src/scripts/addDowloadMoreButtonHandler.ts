import {fetchUsers} from "./services/usersService";
import {getUsers, setUsers} from "./app";
import {connect, serializeUserArray} from "./utils/serializeUserArray";
import renderUsers from "./renderUsers";
import renderUsersTable from "./renderUsersTable";
import renderStatisticPageCount from "./renderStatisticPageCount";

const downloadMoreButton = document.getElementById('download-more') as HTMLButtonElement;

export default function () {
    downloadMoreButton.addEventListener('click', async () => {
        const newUsers = await fetchUsers();
        setUsers(connect(getUsers(), serializeUserArray(newUsers)));

        renderUsers();
        renderUsersTable();
        renderStatisticPageCount();
    });
}
