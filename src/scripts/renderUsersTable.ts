import {state} from "./app";
import sortUsersBy from "./utils/sortUsersBy";
import {SerializedUser} from "./types/SerializedUser";
import getFilteredUsers from "./utils/getFilteredUsers";
import renderStatisticPageCount from "./renderStatisticPageCount";
import Chart from 'chart.js';
import {Course} from "./types/Course";

let chart: Chart | null = null;

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

    //Render chart

    const ctx = document.querySelector('.statistics__chart') as HTMLCanvasElement;
    if (!ctx) return;

    const specialities = users.map(user => user.course).reduce((acc, course) => {
        acc[course]  = (acc[course] || 0) + 1;
        return acc;
    }, {} as Record<Course, number>);

    const data = {
        labels: Object.keys(specialities),
        datasets: [{
            label: 'Specialities',
            data: Object.values(specialities),
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(153, 102, 255)',
                'rgb(255, 159, 64)',
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(153, 102, 255)',
                'rgb(255, 159, 64)',
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(153, 102, 255)',
                'rgb(255, 159, 64)',
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(153, 102, 255)',
                'rgb(255, 159, 64)',
            ],
            hoverOffset: 4
        }]
    };

    const config = {
        type: 'pie',
        data: data,
    };


    if (chart) {
        (chart.data.datasets as any)[0].data = Object.values(specialities);
        chart.update();
    }
    else {
        chart = new Chart(ctx, config);
    }
}
