import { Card } from "./Card.js";
import { initialCards, configFormSelector } from "./Constants.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";

// кнопки/ нажатия
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");

// Находим формы в DOM
const editForm = document.querySelector(".form_type_edit");
const addForm = document.querySelector(".form_type_add");

//Открытие карточки в режиме просмотра изображения
const popupWithImage = new PopupWithImage(".popup_type_image");

//функция создания карточки через класс:
const createCard = (data) => {
  const card = new Card(data, "#item", () => {
    popupWithImage.open(data);
  });
  return card.generateCard();
};

//создание карточек из массива (создание секции)
const cardContainer = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardContainer.addItem(createCard(item));
    },
  },
  ".gallery"
);

cardContainer.renderItems();

//Получение инфы из профиля
const userInfo = new UserInfo({
  userNameSelector: ".profile__title",
  userJobSelector: ".profile__subtitle"
});

//Создание Popup редактирования
const popupEditProfile = new PopupWithForm(".popup_type_edit", {
  submitCallback: (data) => {
    userInfo.setUserInfo(data);
    popupEditProfile.close();
  }
});


/*const handleEditFormSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputJob.value;
  closePopup(popupEdit);
};*/

//Открытие Popup редактирования
buttonEdit.addEventListener("click", () => {
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  popupEditProfile.open();
});

//создание Popup добавления карточки
const popupAddCards = new PopupWithForm(".popup_type_add", {
  submitCallback: ({link, title}) => {
    cardContainer.addItem(createCard({
      name: title,
      link: link,
    }));
    evt.target.reset();
    validationFormAdd.disabledButton();
    popupAddCards.close();
  }
})

buttonAdd.addEventListener("click", () => {
  popupAddCards.open();
});

/*const handleAddFormSubmit = (evt) => {
  evt.preventDefault();

  renderCard({
    name: inputPlaceName.value,
    link: inputLink.value,
  });

  closePopup(popupAdd);
  evt.target.reset();
  validationFormAdd.disabledButton();
};*/

//addForm.addEventListener("submit", handleAddFormSubmit);

//editForm.addEventListener("submit", handleEditFormSubmit);

popupAddCards.setEventListeners();
popupEditProfile.setEventListeners();
popupWithImage.setEventListeners();

//Валидация на формы Профиля и Места
const validationFormEdit = new FormValidator(configFormSelector, editForm);
validationFormEdit.enableValidation();

const validationFormAdd = new FormValidator(configFormSelector, addForm);
validationFormAdd.enableValidation();
