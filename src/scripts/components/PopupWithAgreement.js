import Popup from "./Popup.js";

class PopupWithAgreement extends Popup {
  constructor(selectorPopup, { submitCallback }) {
    super(selectorPopup);
    this._submitCallback = submitCallback;
    this._buttonAgreement = this._popup.querySelector(
      ".popup__button-agreement"
    );
  }

  open(card, cardId) {
    super.open();
    this.id = cardId;
    this.card = card;
  }

  //Отображение статуса загрузки на кнопке сохранения
  renderLoading(loading, text) {
    if (loading) {
      this.defaultText = this._buttonAgreement.textContent;
      this._buttonAgreement.textContent = text;
    } else {
      this._buttonAgreement.textContent = this.defaultText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonAgreement.addEventListener("click", () => {
      this._submitCallback(this.id, this.card);
    });
  }
}

export { PopupWithAgreement };
