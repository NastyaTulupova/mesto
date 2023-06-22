class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".gallery__image");
  }

  //подготовка данных для карточки из темплейта
  _getTemplate() {
    const card = document
      .querySelector(this._templateSelector)
      .content.querySelector(".gallery__item")
      .cloneNode(true);

    return card;
  }

  generateCard() {
    this._element.querySelector(".gallery__title").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._buttonTrash = this._element.querySelector(".gallery__trash");
    this._buttonLike = this._element.querySelector(".gallery__heart");

    this._setEventListeners();
    return this._element;
  }

  _likeCard() {
    this._buttonLike.classList.toggle("gallery__heart_active");
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    //слушатель на удаление
    this._buttonTrash.addEventListener("click", () => this._deleteCard());

    //слушатель на лайк
    this._buttonLike.addEventListener("click", () => this._likeCard());

    //слушатель на открытие картинки
    this._cardImage.addEventListener("click", () =>
      this._handleCardClick({
        link: this._link,
        name: this._name,
      })
    );
  }
}

export { Card };
