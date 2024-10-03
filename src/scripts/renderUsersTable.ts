import {getUsers, state} from "./app";
import sortUsersBy from "./utils/sortUsersBy";
import {SerializedUser} from "./types/SerializedUser";
import getFilteredUsers from "./utils/getFilteredUsers";
import renderStatisticPageCount from "./renderStatisticPageCount";

export default function () {
    const users = getFilteredUsers();

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

    sortedUsers.slice(10 * state.tablePage, 10 * state.tablePage + 10).forEach(user => {
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

    renderStatisticPageCount();
}
