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
    this._inputValues = {};
    this._inputsList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    console.log(this._inputValues);
    return this._inputValues;
  }

  //установка в инпут переданных данных
  setInputValues = (data) => {
    this._inputsList.forEach((input) => {
      input.value = data[input.name];
    });
  };

  close() {
    this._popupFormElement.reset();
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupFormElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues());
      this.close();
    });
  }
}

export { PopupWithForm };
