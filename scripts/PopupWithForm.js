import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, { submitCallback }) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._popupFormElement = this._popup.querySelector(".form");
    this._inputsList = Array.from(
      this._popupFormElement.querySelectorAll(".form__item")
    );
  }

  //сбор данных всех полей формы.
  _getInputValues() {
    this._cardData = {};
    this._inputsList.forEach((input) => {
      this._cardData[input.name] = input.value;
    });
    return this._cardData;
  }

  //установка в инпут переданных данных
setInputValues = (data) => {
  this._inputsList.forEach((input, i) => {
    input.value = Object.values(data)[i];
  });
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupFormElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.close();
      this._callbackSubmitForm(this._getInputValues());
    });
  }

  close() {
    super.close();
  }
}

export {PopupWithForm};
