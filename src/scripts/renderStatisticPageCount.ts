import {getUsers, state, State} from "./app";
import {searchManyBy, searchManyByValue, SearchParam} from "./utils/searchBy";
import renderFavorite from "./renderFavorite";
import renderUsersTable from "./renderUsersTable";
import getFilteredUsers from "./utils/getFilteredUsers";

const pageSelectWrapper = document.getElementById("statistics-page-select") as HTMLDivElement;

pageSelectWrapper.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    if (target.classList.contains("page-select-button")) {
        state.tablePage = parseInt(target.dataset.page as string);
        renderUsersTable();
        renderStatisticPageCount();
    }
})

export default function renderStatisticPageCount() {
    const users = getFilteredUsers();

    const userCount = users.length;
    const userPerPage = 10;
    const currentPage = state.tablePage;

    const pageCount = Math.ceil(userCount / userPerPage);

    let contentToAdd = ``;

    if (currentPage > 1) {
        contentToAdd += `<button class="page-select-button" data-page="0">First</button>`;
        contentToAdd += `<span>...</span>`;
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            if (i < 0 || i >= pageCount) continue;
            contentToAdd += `<button class="page-select-button ${currentPage === i ? "active" : ""}" data-page="${i}">${i + 1}</button>`;
        }
        if (currentPage < pageCount - 2) {
            contentToAdd += `<span>...</span>`;
        }
        if (currentPage < pageCount - 1) {
            contentToAdd += `<button class="page-select-button" data-page="${pageCount - 1}">Last</button>`;
        }
    }
    else if (pageCount <= 4) {
        for (let i = 0; i < pageCount - 1; i++) {
            contentToAdd += `<button class="page-select-button ${currentPage === i ? "active" : ""}" data-page="${i}">${i + 1}</button>`;
        }
    } else {
        for (let i = 0; i < 3; i++) {
            contentToAdd += `<button class="page-select-button ${currentPage === i ? "active" : ""}" data-page="${i}">${i + 1}</button>`;
        }
        contentToAdd += `<span>...</span>`;
        contentToAdd += `<button class="page-select-button" data-page="${pageCount - 1}">Last</button>`;
    }

    pageSelectWrapper.innerHTML = contentToAdd;
}
