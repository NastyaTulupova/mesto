import "./index.css";
import { Card } from "../scripts/components/Card.js";
import { configFormSelector, autorisationCredits } from "../scripts/utils/constants.js";
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
const pencilAvatar = document.querySelector(".profile__avatar");

// Находим формы в DOM
const editForm = document.querySelector(".form_type_edit");
const addForm = document.querySelector(".form_type_add");
const avatarForm = document.querySelector(".form_type_avatar");

//Открытие карточки в режиме просмотра изображения
const popupWithImage = new PopupWithImage(".popup_type_image");

const api = new Api(autorisationCredits);
let userCurrentId;

// Ответы от сервера
Promise.all([api.getUserInfoServer(), api.getInitialCardsServer()])
  .then(([resUser, resCard]) => {
    userCurrentId = resUser._id;
    userInfo.setUserInfo(resUser);
    userInfo.setUserAvatar(resUser);
    cardContainer.renderItems(resCard.reverse(), userCurrentId);
  })
  .catch((error) => console.log(`Произошла ошибка ${error}`));

//функция создания карточки через класс:
const createCard = (data, user) => {
  const card = new Card({
    data: data,
    userId: user,
    templateSelector: "#item",

    handleCardClick: () => {
      popupWithImage.open(data);
    },

    handleCardDelete: (cardId, cardElement) => {
      popupDeleteCard.open(cardId, cardElement);
    },

    handleCardLike: (cardId) => {
      api
        .putLikeCardServer(cardId)
        .then((res) => {
          card.renderCardsLike(res);
        })
        .catch((error) => console.log(`Произошла ошибка ${error}`));
    },

    handleCardDeleteLike: (cardId) => {
      api
        .deleteLikeCardServer(cardId)
        .then((res) => {
          card.renderCardsLike(res);
        })
        .catch((error) => console.log(`Произошла ошибка ${error}`));
    },
  });

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
    popupEditProfile.renderLoading(true, "Сохранение...");
    api
      .setUserInfoServer(data)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupEditProfile.close();
      })
      .catch((error) => console.log(`Произошла ошибка ${error}`))
      .finally(() => {
        popupEditProfile.renderLoading(false);
      });
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
    popupAddCards.renderLoading(true, "Сохранение...");
    api
      .addNewCardServer(item)
      .then((newCard) => {
        cardContainer.addItem(createCard(newCard, userCurrentId));
        validationFormAdd.disabledButton();
        popupAddCards.close();
      })
      .catch((error) => console.log(`Произошла ошибка ${error}`))
      .finally(() => {
        popupAddCards.renderLoading(false);
      });
  },
});

//открытие popup добавления карточки
buttonAdd.addEventListener("click", () => {
  popupAddCards.open();
});

// создание Popup удаления карточки
const popupDeleteCard = new PopupWithAgreement(".popup_type_agreement", {
  submitCallback: (cardId, card) => {
    api
      .deleteCardServer(cardId)
      .then(() => {
        card.deleteCard();
        popupDeleteCard.close();
      })
      .catch((error) => console.log(`Произошла ошибка ${error}`));
  },
});

// создание Popup редактирования аватара
const popupEditAvatar = new PopupWithForm(".popup_type_avatar", {
  submitCallback: (item) => {
    popupEditAvatar.renderLoading(true, "Сохранение...");
    api
      .setUserAvatarServer(item)
      .then((resUser) => {
        userInfo.setUserAvatar(resUser);
        popupEditAvatar.close();
      })
      .catch((error) => console.log(`Произошла ошибка ${error}`))
      .finally(() => {
        popupEditAvatar.renderLoading(false);
      });
  },
});

//слушатель на иконку карандаша в аватаре
pencilAvatar.addEventListener("click", () => {
  popupEditAvatar.open();
  validationFormAvatar.disabledButton();
});

popupAddCards.setEventListeners();
popupEditProfile.setEventListeners();
popupWithImage.setEventListeners();
popupEditAvatar.setEventListeners();
popupDeleteCard.setEventListeners();

//Валидация на формы Профиля, Места, аватара
const validationFormEdit = new FormValidator(configFormSelector, editForm);
validationFormEdit.enableValidation();

const validationFormAdd = new FormValidator(configFormSelector, addForm);
validationFormAdd.enableValidation();

const validationFormAvatar = new FormValidator(configFormSelector, avatarForm);
validationFormAvatar.enableValidation();
