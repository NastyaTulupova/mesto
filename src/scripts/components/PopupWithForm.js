import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, { submitCallback }) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._popupFormElement = this._popup.querySelector(".form");
    this._inputsList = Array.from(
      this._popupFormElement.querySelectorAll(".form__item")
    );
    this._buttonSubmit = this._popupFormElement.querySelector(".form__button");
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

  //Отображение статуса загрузки на кнопке сохранения
  renderLoading(loading, text) {
    if (loading) {
      this.defaultText = this._buttonSubmit.textContent;
      this._buttonSubmit.textContent = text;
    } else {
      this._buttonSubmit.textContent = this.defaultText;
    }
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
