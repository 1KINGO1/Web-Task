import {state} from "./app";
import renderUsers from "./renderUsers";

export default function () {
    const button = document.getElementById("search-button") as HTMLButtonElement;
    const input = document.getElementById("search-input") as HTMLInputElement;

    button.addEventListener("click", () => {
        state.searchValue = input.value ?? '';
        renderUsers();
    });
}
