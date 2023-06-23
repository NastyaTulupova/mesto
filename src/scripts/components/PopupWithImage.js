import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".popup__image");
    this._popupFigcaption = this._popup.querySelector(".popup__figcaption");
  }

  //Открытие карточки в режиме просмотра изображения
  open(image) {
    super.open();
    this._popupImage.src = image.link;
    this._popupFigcaption.textContent = image.name;
    this._popupImage.alt = image.name;
  }
}

export { PopupWithImage };
