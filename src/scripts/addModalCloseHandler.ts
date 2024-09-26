import {state} from "./app";

export default function addModalCloseHandler() {
    const closeHandler = () => {
        state.addTeacherModalOpen = false;
        state.teacherInfoModalOpen = false;
        const addTeacherModal = document.getElementById("add-teacher-modal") as HTMLElement;
        const teacherInfoModal = document.getElementById("teacher-info-modal") as HTMLElement;

        addTeacherModal.classList.remove('open');
        teacherInfoModal.classList.remove('open');

        document.body.style.overflowY = 'auto';
    }

    const modalWrappers = document.querySelectorAll('.modal__wrapper');
    modalWrappers.forEach((modalWrapper) => {
        modalWrapper.addEventListener('click', closeHandler);
    });

    const modalCloseButtons = document.querySelectorAll('.modal__close');
    modalCloseButtons.forEach((modalCloseButton) => {
        modalCloseButton.addEventListener('click', closeHandler);
    });

    const modalBlocks = document.querySelectorAll('.modal__block');
    modalBlocks.forEach((modalBlock) => {
        modalBlock.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
}
