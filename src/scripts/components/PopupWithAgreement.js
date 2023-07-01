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

  setEventListeners() {
    super.setEventListeners();
    this._buttonAgreement.addEventListener("click", () => {
      this._submitCallback(this.id, this.card);
    });
  }
}

export { PopupWithAgreement };
