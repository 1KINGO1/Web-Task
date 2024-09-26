export default function (callback: () => void) {
  const addTeacherButtons = document.querySelectorAll('.nav__add-teacher-button');
  addTeacherButtons.forEach((addTeacherButton) => {
    addTeacherButton.addEventListener('click', callback);
  });
}
