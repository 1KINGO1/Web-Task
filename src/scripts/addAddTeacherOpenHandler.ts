export default function () {
    const buttons = document.querySelectorAll(".nav__add-teacher-button");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const modal = document.getElementById("add-teacher-modal");
            if (!modal) return;

            modal.classList.add('open');
            document.body.style.overflowY = 'hidden';
        });
    });
}
