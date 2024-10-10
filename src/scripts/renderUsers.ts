import {state} from "./app";
import * as L from "leaflet";
import renderFavorite from "./renderFavorite";
import getFilteredUsers from "./utils/getFilteredUsers";
import renderUsersTable from "./renderUsersTable";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

const topTeachersList = document.getElementById("top-teachers-teacher-list") as HTMLDivElement;

export default function renderUsers() {
    topTeachersList.innerHTML = "";

    let filteredUsers = getFilteredUsers();

    let stringToInsert = ``;
    // render users
    filteredUsers.forEach(user => {
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
                </div>`;
    });

    topTeachersList.innerHTML = stringToInsert;

    // Add favorite handler
    filteredUsers.forEach(user => {
        const userElement = document.getElementById(user.id);
        if (!userElement) return;

        const starElement = userElement.querySelector(".star") as HTMLImageElement;
        starElement.addEventListener("click", (e) => {
            e.stopPropagation();
            user.favorite = !user.favorite;
            userElement.classList.toggle("favorite");
            renderFavorite();
        });
    });

    // Add user info handler
    filteredUsers.forEach(user => {
        const userElement = document.getElementById(user.id);
        if (!userElement) return;

        userElement.addEventListener("click", () => {
            if (state.teacherInfoModalOpen) return;

            state.teacherInfoModalOpen = true;

            const modal = document.getElementById("teacher-info-modal");
            if (!modal) return;

            modal.classList.add('open');
            document.body.style.overflowY = 'hidden';

            const modalContent = modal.querySelector(".modal__body") as HTMLDivElement;

            const now = dayjs();
            let thisYearBirthday = dayjs(`${now.year()}-${dayjs(user.b_date).format('MM-DD')}`);


            if (thisYearBirthday.isBefore(now)) {
                thisYearBirthday = thisYearBirthday.add(1, 'year');
            }
            const diff = thisYearBirthday.diff(now);
            console.log(thisYearBirthday.format('YYYY-MM-DD'));
            const timeLeft = dayjs.duration(diff).format('M [month], D [days], H [hours]');

            modalContent.innerHTML = `
                <div class="teacher-info__head">
                    <div class="teacher-info__avatar">
                        <img src="${user.picture_large}" alt="User avatar">
                    </div>
                    <div class="teacher-info__info">
                        <p class="name">${user.full_name ?? "Unknown"}</p>
                        <p class="subject">${user.course ?? "Unknown"}</p>
                        <p>${user.state ?? "Unknown"}, ${user.country ?? "Unknown"}</p>
                        <p>${user.age ?? "Unknown"}, ${user.gender ?? "Unknown"}</p>
                        <p>Left for next birthday: ${timeLeft}</p>
                        <p class="email">${user.email ?? "Not provided"}</p>
                        <p>${user.phone ?? "Not provided"}</p>
                    </div>
                </div>
                <div class="teacher-info__map" style="display: none; height: 500px"></div>
                <div class="teacher-info__notes">
                    ${user.note ?? "Empty"}
                </div>
                <div class="teacher-info__footer">
                    <button class="teacher-info__toggle-map-button">
                        Toggle map
                    </button>
                </div>`;

            const toggleButton = modalContent.querySelector(".teacher-info__toggle-map-button") as HTMLButtonElement;

            let isMapOpen = false;
            toggleButton.addEventListener("click", () => {
                const header = modalContent.querySelector(".teacher-info__head") as HTMLDivElement;

                isMapOpen = !isMapOpen;

                if (isMapOpen) {
                    header.style.display = "none";
                    const mapElement = modalContent.querySelector(".teacher-info__map") as HTMLDivElement;
                    mapElement.style.display = "block";

                    const lat = +(user?.coordinates?.latitude ?? 0);
                    const lng = +(user?.coordinates?.longitude ?? 0);

                    let map = L.map(mapElement).setView([lat, lng], 13);

                    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    }).addTo(map);

                    L.marker([lat, lng]).addTo(map)
                        .bindPopup('Teacher location')
                        .openPopup();
                }
                else {
                    header.style.display = "flex";
                    const mapElement = modalContent.querySelector(".teacher-info__map") as HTMLDivElement;
                    mapElement.style.display = "none";
                }
            });
        });
    });

    renderUsersTable();
}
