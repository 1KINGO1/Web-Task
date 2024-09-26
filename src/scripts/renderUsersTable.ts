import {state, users} from "./app";
import sortUsersBy from "./utils/sortUsersBy";
import {SerializedUser} from "./types/SerializedUser";

export default function () {
    const table = document.querySelector(".statistics__table") as HTMLTableElement;
    if (!table) return;

    const tbody = table.querySelector("tbody");
    if (!tbody) return;

    tbody.innerHTML = ``;

    const sortKey = Object.keys(state.statisticsSort).find(key => state.statisticsSort[key as keyof typeof state.statisticsSort]);

    const sortedUsers = sortKey ? sortUsersBy(
        users,
        {
            key: sortKey as keyof SerializedUser,
            order: state.statisticsSort[sortKey as keyof typeof state.statisticsSort] as "asc" | "desc"
        }) : users;

    let stringToInsert = "";

    sortedUsers.forEach(user => {
        stringToInsert += `
        <tr>
            <td>${user.full_name}</td>
            <td>${user.course}</td>
            <td>${user.age}</td>
            <td>${user.gender}</td>
            <td>${user.country}</td>
        </tr>
        `;
    });

    tbody.innerHTML = stringToInsert;
}
