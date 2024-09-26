import {state, State} from "./app";
import renderUsersTable from "./renderUsersTable";

export default function () {
    const table = document.querySelector('.statistics__table') as HTMLTableElement;
    const headers = table.querySelectorAll('th');

    headers.forEach(header => {
        const property = header.getAttribute('data-property') as keyof State['statisticsSort'];

        header.addEventListener('click', () => {
            console.log("click");
            const order = state.statisticsSort[property] === 'asc' ? 'desc' : 'asc';

            Object.keys(state.statisticsSort).forEach(key => {
                state.statisticsSort[key as keyof State["statisticsSort"]] = null;
            });

            state.statisticsSort[property] = order;

            headers.forEach(h => {
                h.getElementsByTagName('span')[0].innerHTML = '▲';
            })

            header.getElementsByTagName('span')[0].innerHTML = order === 'asc' ? '▲' : '▼';

            renderUsersTable();
        });
    });
}
