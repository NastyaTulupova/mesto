import {Card} from './Card.js';
import { initialCards, configFormSelector } from './Constants.js';
import { FormValidator } from './FormValidator.js';

const gallery = document.querySelector('.gallery');

const popups = document.querySelectorAll('.popup');
const popupAdd = document.querySelector('.popup_type_add');
const popupEdit = document.querySelector('.popup_type_edit');
const popupImage = document.querySelector('.popup_type_image');

const profile = document.querySelector('.profile');

// кнопки/ нажатия
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

// Находим формы в DOM
const editForm = document.querySelector('.form_type_edit');
const addForm = document.querySelector('.form_type_add');

// Находим поля формы редактирования в DOM
const inputName = editForm.querySelector('#name-input');
const inputJob = editForm.querySelector('#job-input');

// Поля формы добавления:
const inputPlaceName = addForm.querySelector('#place-name-input');
const inputLink = addForm.querySelector('#link-input');

const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');


//Открытие карточки в режиме просмотра изображения
const handleImageOpen = (card) => {
  popupImage.querySelector('.popup__image').src = card.link;
    popupImage.querySelector('.popup__figcaption').textContent = card.name;
    popupImage.querySelector('.popup__image').alt = card.name;
    showPopup(popupImage);
}

  //функция создания карточки через класс:
const createCard = (data) => {
  const card = new Card(data, '#item', handleImageOpen);
  return card.generateCard();
}

//отрисовка карточки в галерее
const renderCard = (data) => {
  gallery.prepend(createCard(data));
}

//создание карточек из массива
const cardList = initialCards.map((data) => createCard(data));
gallery.prepend(...cardList);

//Работа с попапами:
const showPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

const closePopupByEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  };
}

const handleEditFormSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputJob.value;
  closePopup(popupEdit);
}

buttonEdit.addEventListener('click', () => {
  showPopup(popupEdit);
  inputName.value = profileTitle.textContent;
  inputJob.value = profileSubtitle.textContent;
});

buttonAdd.addEventListener('click', () => showPopup(popupAdd));

document.querySelectorAll('.popup__close-icon').forEach(button => {
  const buttonsPopup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(buttonsPopup));
});

const handleAddFormSubmit = (evt) => {
  evt.preventDefault();

  renderCard({name: inputPlaceName.value,
    link: inputLink.value});
  closePopup(popupAdd);
  evt.target.reset();
  evt.submitter.classList.add('form__button_invalid')
  evt.submitter.disabled = true;
}

addForm.addEventListener('submit', handleAddFormSubmit);

editForm.addEventListener('submit', handleEditFormSubmit);

//Закрытие попапа по клику на оверлей:
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    };
  });
});

//Валидация на формы Профиля и Места
const validationFormEdit = new FormValidator(configFormSelector, editForm);
validationFormEdit.enableValidation();

const validationFormAdd = new FormValidator(configFormSelector, addForm);
validationFormAdd.enableValidation();
