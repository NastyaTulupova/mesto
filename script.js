let editButton = document.querySelector('.profile__edit-button');
let popUp = document.querySelector('.popup');
let closeButton = popUp.querySelector('.popup__close-icon');

editButton.addEventListener('click', showForm);

function showForm() {
  if (popUp.classList.contains('popup_opened') === false) {
  popUp.classList.add('popup_opened');
  }
  else console.log('У контейнера popUp уже имеется класс popup_opened');
  }

  closeButton.addEventListener('click', closeForm);

  function closeForm() {
    if (popUp.classList.contains('popup_opened') === true) {
      popUp.classList.remove('popup_opened');
  }
  else console.log('У контейнера popUp нет класса popup_opened');
}

// Находим форму в DOM
let form = document.querySelector('.form');
let formInputContainer = form.querySelector('.form__input-container');

// Находим поля формы в DOM
let nameInput = formInputContainer.querySelector('#name');
let jobInput = formInputContainer.querySelector('#job');

function handleFormSubmit (evt) {
    evt.preventDefault();

    let profile = document.querySelector('.profile');
    let profileTitle = profile.querySelector('.profile__title');
    let profileSubtitle = profile.querySelector('.profile__subtitle');

    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closeForm();
}

form.addEventListener('submit', handleFormSubmit);
