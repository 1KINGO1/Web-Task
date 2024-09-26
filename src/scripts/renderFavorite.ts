import {state, users} from "./app";
import sortUsersBy from "./utils/sortUsersBy";
import {SerializedUser} from "./types/SerializedUser";

export default function () {
    const wrapper = document.getElementById("favorite-item-wrapper") as HTMLDivElement;

    wrapper.innerHTML = "";

    let stringToInsert = "";

    users.filter(user => user.favorite).forEach((user: SerializedUser) => {
        const firstName = user?.full_name?.split(" ")[0] ?? "N";
        const lastName = user?.full_name?.split(" ")[1] ?? "N";
        stringToInsert += `<div class="teacher-list__item${user.favorite ? " favorite" : ""}" id="${user.id}">
                    <div class="teacher-list__item-photo">
                        ${user.picture_large ? `<img src="${user.picture_large}" alt="Teacher photo">` : `<p>${firstName[0]}. ${lastName[0]}</p>`}
                    </div>
                    <div class="teacher-list__item-info">
                        <p class="teacher-list__item-name">${firstName}</p>
                        <p class="teacher-list__item-second-name">${lastName}</p>
                        <p class="teacher-list__item-subject">${user.course}</p>
                        <p class="teacher-list__item-region">${user.country}</p>
                    </div>
                    <img src="/images/star.svg" alt="star" class="star">
                </div>
      `
    });
    wrapper.innerHTML = stringToInsert;
}
