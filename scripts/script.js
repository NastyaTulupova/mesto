const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const gallery = document.querySelector('.gallery');
const itemTemplate = document.querySelector('#item').content;

const popUp = document.querySelector('.popup');
const popupAdd = document.querySelector('.popup_type_add');
const popupEdit = document.querySelector('.popup_type_edit');
const popupImage = document.querySelector('.popup_type_image');

const profile = document.querySelector('.profile');

// кнопки/ нажатия
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const galleryItems = document.querySelectorAll('.gallery__item');
const buttonCloseEdit = document.querySelector('.popup__close-icon_type_edit');
const buttonCloseAdd = document.querySelector('.popup__close-icon_type_add');
const buttonCloseImage = document.querySelector('.popup__close-icon_type_image');

// Находим форму в DOM
const form = document.querySelector('.form');
const addForm = document.querySelector('.form_type_add');
const formInputContainer = form.querySelector('.form__input-container');

// Находим поля формы в DOM
let inputName = formInputContainer.querySelector('#name');
let inputJob = formInputContainer.querySelector('#job');

// Поля формы добавления:
let inputPlaceName = addForm.querySelector('#place-name');
let inputLink = addForm.querySelector('#link');

let profileTitle = profile.querySelector('.profile__title');
let profileSubtitle = profile.querySelector('.profile__subtitle');

let galleryTitle = document.querySelector('.gallery__title');
let galleryImage = document.querySelector('.gallery__image');

//создание карточки из темплейта + слушатели:
const createCard = (element) => {
  const card = itemTemplate.querySelector('.gallery__item').cloneNode(true);
  card.querySelector('.gallery__title').textContent = element.name;
  card.querySelector('.gallery__image').src = element.link;

//слушатель на удаление
  card.querySelector('.gallery__trash').addEventListener('click', () => {
    card.remove();
  });

//слушатель на лайк
  const buttonGalleryLike = card.querySelector('.gallery__heart');
  buttonGalleryLike.addEventListener('click', () => {
    buttonGalleryLike.classList.toggle('gallery__heart_active');
  });

 //слушатель на открытие картинки
 card.querySelector('.gallery__image').addEventListener('click', () => {
  const popupForShow = popupImage;
  popupForShow.querySelector('.popup__image').src = card.querySelector('.gallery__image').src;
  popupForShow.querySelector('.popup__figcaption').textContent = card.querySelector('.gallery__title').textContent;
  showForm(popupForShow);
 });
  return card;
}

const cardList = initialCards.map(element => {
  const cardElement = createCard(element);
  return cardElement;
});

const renderCard = (element) => {
  gallery.prepend(createCard(element));
}

gallery.prepend(...cardList);


//Работа с формами:
const showForm = (popup) => {

  if (popup === popupEdit) {
    popup.classList.add('popup_opened');
    inputName.value = profileTitle.textContent;
    inputJob.value = profileSubtitle.textContent;
  }

  else { popup.classList.add('popup_opened'); }
}


const closeForm = (popup) => {
  popup.classList.remove('popup_opened');
}

const handleFormSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputJob.value;
  closeForm(popupEdit);
}

const handleAddFormSubmit = (evt) => {
  evt.preventDefault();
  const newCard = itemTemplate.querySelector('.gallery__item').cloneNode(true);
  newCard.querySelector('.gallery__title').textContent = inputPlaceName.value;
  newCard.querySelector('.gallery__image').src = inputLink.value;
  renderCard(newCard);
  closeForm(popupAdd);
}

buttonEdit.addEventListener('click', () => showForm(popupEdit));
buttonAdd.addEventListener('click', () => showForm(popupAdd));

buttonCloseAdd.addEventListener('click', () => closeForm(popupAdd));
buttonCloseEdit.addEventListener('click', () => closeForm(popupEdit));
buttonCloseImage.addEventListener('click', () => closeForm(popupImage));

form.addEventListener('submit', handleFormSubmit);
addForm.addEventListener('submit', handleAddFormSubmit);
