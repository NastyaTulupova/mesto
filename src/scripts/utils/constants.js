const autorisationCredits = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-70",
  headers: {
    authorization: "e59ea592-c0c2-42e6-8473-e454683560cc",
    "Content-Type": "application/json",
  },
};

const configFormSelector = {
  formSelector: ".form",
  inputSelector: ".form__item",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_invalid",
  activeButtonClass: "form__button_valid",
  inputErrorClass: "form__item_type_error",
  errorClass: "error",
};

export { configFormSelector, autorisationCredits };
