export default class Popup {
constructor(popupSelector) {
this._popup = document.querySelector(popupSelector);
this._buttonClose = this._popup.querySelector(".popup__close-icon");
}

open() {
  this._popup.classList.add("popup_opened");
  document.addEventListener("keydown", this._handleEscClose);
};

close() {
  this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  };

_handleEscClose = (evt) => {
  if (evt.key === "Escape") {
  this.close();
  }
};

_handleOverlayClose = (evt) => {
  if (evt.target === evt.currentTarget) {
    this.close();
  }
};

setEventListeners = () => {
  this._buttonClose.addEventListener('click', () => {
    this.close();
  });

  this._popup.addEventListener("click", this._handleOverlayClose);

/*document.querySelectorAll(".popup__close-icon").forEach((button) => {
  const buttonsPopup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(buttonsPopup));
});*/
}}
