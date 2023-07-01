import "./index.css";
import { Card } from "../scripts/components/Card.js";
import { configFormSelector } from "../scripts/utils/constants.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { Section } from "../scripts/components/Section.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { UserInfo } from "../scripts/components/UserInfo.js";
import { Api } from "../scripts/components/Api.js";
import { PopupWithAgreement } from "../scripts/components/PopupWithAgreement.js";

// кнопки/ нажатия
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");

// Находим формы в DOM
const editForm = document.querySelector(".form_type_edit");
const addForm = document.querySelector(".form_type_add");

//Открытие карточки в режиме просмотра изображения
const popupWithImage = new PopupWithImage(".popup_type_image");

const api = new Api();
let userCurrentId;

//функция создания карточки через класс:
const createCard = (data, user) => {
  const card = new Card(data, user, "#item", () => {
    popupWithImage.open(data);
    });

  /*  handleCardLike: (cardId) => {
      api
        .putLikeCardServer(cardId)
        .then((res) => {
          card.renderCardsLike(res);
        })
        .catch((error) => console.log(`Произошла ошибка ${error}`));
    },

    handleCardDeleteLike: (cardId) => {
      api.deleteLikeCardServer(cardId)
      .then((res) => {
        card.renderCardsLike(res);
      })
      .catch((error) => console.log(`Произошла ошибка ${error}`));
    }*/

  return card.generateCard();
};

//создание карточек из массива (создание секции)
const cardContainer = new Section(
  {
    renderer: (item, userId) => {
      cardContainer.addItem(createCard(item, userId));
    },
  },
  ".gallery"
);

//Получение инфы из профиля
const userInfo = new UserInfo({
  userNameSelector: ".profile__title",
  userJobSelector: ".profile__subtitle",
  userAvatarSelector: ".profile__avatar",
});

//Создание Popup редактирования
const popupEditProfile = new PopupWithForm(".popup_type_edit", {
  submitCallback: (data) => {
    api
      .setUserInfoServer(data)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupEditProfile.close();
      })
      .catch((error) => console.log(`Произошла ошибка ${error}`));
  },
});

//Открытие Popup редактирования
buttonEdit.addEventListener("click", () => {
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  popupEditProfile.open();
});

//создание Popup добавления карточки
const popupAddCards = new PopupWithForm(".popup_type_add", {
  submitCallback: (item) => {
    api.addNewCardServer(item).then((newCard) => {
      cardContainer.addItem(createCard(newCard, userCurrentId));
      validationFormAdd.disabledButton();
      popupAddCards.close();
    });
  },
});

buttonAdd.addEventListener("click", () => {
  popupAddCards.open();
});

// //создание Popup удаления карточки
const popupDeleteCard = new PopupWithAgreement(".popup_type_agreement", {
  submitCallback: (cardId, card) => {
    api.deleteCardServer(cardId)
    .then(() => {
      card.deleteCard();
      popupDeleteCard.close();
    })
    .catch((error) => console.log(`Произошла ошибка ${error}`));
    }
  });

popupAddCards.setEventListeners();
popupEditProfile.setEventListeners();
popupWithImage.setEventListeners();

//Валидация на формы Профиля и Места
const validationFormEdit = new FormValidator(configFormSelector, editForm);
validationFormEdit.enableValidation();

const validationFormAdd = new FormValidator(configFormSelector, addForm);
validationFormAdd.enableValidation();

// Ответы от сервера
Promise.all([api.getUserInfoServer(), api.getInitialCardsServer()])
  .then(([resUser, resCard]) => {
    userCurrentId = resUser._id;
    console.log("get", resUser);
    console.log("get", resCard);
    userInfo.setUserInfo(resUser);
    userInfo.setUserAvatar(resUser);
    cardContainer.renderItems(resCard.reverse(), userCurrentId);
  })
  .catch((error) => console.log(`Произошла ошибка ${error}`));
