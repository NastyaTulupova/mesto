let buttonEdit = document.querySelector('.profile__edit-button');
let popUp = document.querySelector('.popup');
let buttonClose = popUp.querySelector('.popup__close-icon');
// Находим форму в DOM
let form = document.querySelector('.form');
let formInputContainer = form.querySelector('.form__input-container');

// Находим поля формы в DOM
let inputName = formInputContainer.querySelector('#name');
let inputJob = formInputContainer.querySelector('#job');

let profile = document.querySelector('.profile');
let profileTitle = profile.querySelector('.profile__title');
let profileSubtitle = profile.querySelector('.profile__subtitle');

function showForm() {
  popUp.classList.add('popup_opened');
  inputName.value = profileTitle.textContent;
  inputJob.value = profileSubtitle.textContent;
}

function closeForm() {
  popUp.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputJob.value;
  closeForm();
}

buttonEdit.addEventListener('click', showForm);
buttonClose.addEventListener('click', closeForm);
form.addEventListener('submit', handleFormSubmit);
