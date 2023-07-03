class Card {
  constructor({
    data,
    userId,
    templateSelector,
    handleCardClick,
    handleCardDelete, handleCardLike,  handleCardDeleteLike
  }) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this.cardId = data._id;
    this.cardData = data;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._putLike= handleCardLike;
    this._deleteLike = handleCardDeleteLike;
    this._idCardUser = data.owner._id;
    this._userId = userId;
  };

  //подготовка данных для карточки из темплейта
  _getTemplate() {
    const card = document
      .querySelector(this._templateSelector)
      .content.querySelector(".gallery__item")
      .cloneNode(true);

    return card;
  }

  generateCard() {
    this.element = this._getTemplate();
    this.element.querySelector(".gallery__title").textContent = this._name;
    this._cardImage = this.element.querySelector(".gallery__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardLikesCount = this.element.querySelector(".gallery__like-counter");

    this._buttonTrash = this.element.querySelector(".gallery__trash");
    this._buttonLike = this.element.querySelector(".gallery__heart");

    this.renderCardsLike(this.cardData);
    console.log("id", this._idCardUser, this._userId);

    if (this._idCardUser !== this._userId) {
      this._buttonTrash.remove();
    }

    this._setEventListeners();

    return this.element;
  }

  // Есть ли лайк на карточке?
  isLikedCard() {
    return this._likes.some((like) => like._id === this._userId
    )}

  toggleLike() {
    if (this.isLikedCard()) {
      this._deleteLike(this.cardId);
    } else
    this._putLike(this.cardId);
  }

  //отображение кол-ва лайков
  renderCardsLike(card) {
    this._likes = card.likes;
    if (this._likes.length === 0) {
      this._cardLikesCount.textContent = "0";
    } else {
      this._cardLikesCount.textContent = this._likes.length;
    }
    if (this.isLikedCard()) {
      this._buttonLike.classList.add("gallery__heart_active");
    } else {
      this._buttonLike.classList.remove("gallery__heart_active");
    }
  }

  deleteCard() {
    this.element.remove();
    this.element = null;
  }

  _setEventListeners() {
    //слушатель на удаление
    this._buttonTrash.addEventListener("click", () =>
      this._handleCardDelete(this, this.cardId)
    );

    //слушатель на лайк
    this._buttonLike.addEventListener("click", () => this.toggleLike());

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
