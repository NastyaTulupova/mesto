const gallery = document.querySelector('.gallery');
const itemTemplate = document.querySelector('#item').content;

const popups = document.querySelectorAll('.popup');
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

// Находим формы в DOM
const editForm = document.querySelector('.form_type_edit');
const addForm = document.querySelector('.form_type_add');
const formInputContainer = document.querySelector('.form__input-container');

// Находим поля формы редактирования в DOM
const inputName = editForm.querySelector('#name-input');
const inputJob = editForm.querySelector('#job-input');

// Поля формы добавления:
const inputPlaceName = addForm.querySelector('#place-name-input');
const inputLink = addForm.querySelector('#link-input');

const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');


//подготовка данных для карточки из темплейта
const prepareCardData = (name, link) => {
  const card = itemTemplate.querySelector('.gallery__item').cloneNode(true);
  card.querySelector('.gallery__title').textContent = name;
  card.querySelector('.gallery__image').src = link;
  card.querySelector('.gallery__image').alt = name;
  return card;
}

//создание карточки + слушатели:
const createCard = (name, link) => {
  const card = prepareCardData(name, link);

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
    popupImage.querySelector('.popup__image').src = card.querySelector('.gallery__image').src;
    popupImage.querySelector('.popup__figcaption').textContent = card.querySelector('.gallery__title').textContent;
    popupImage.querySelector('.popup__image').alt = card.querySelector('.gallery__title').textContent;
    showPopup(popupImage);
  });
  return card;
}

//отрисовка карточки в галерее
const renderCard = (name, link) => {
  gallery.prepend(createCard(name, link));
}

const cardList = initialCards.map(({ name, link }) => createCard(name, link));

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

const handleAddFormSubmit = (evt) => {
  evt.preventDefault();

  renderCard(inputPlaceName.value, inputLink.value);
  closePopup(popupAdd);
  evt.target.reset();
  evt.submitter.classList.add('form__button_invalid')
  evt.submitter.disabled = true;
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

editForm.addEventListener('submit', handleEditFormSubmit);
addForm.addEventListener('submit', handleAddFormSubmit);

//Закрытие попапа по клику на оверлей:
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    };
  });
});
