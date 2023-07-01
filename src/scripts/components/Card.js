class Card {
  constructor(data, userId, templateSelector,
    handleCardClick, handleDeleteLike, handleCardDelete //, handleCardLike,
    ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._likesCounter = data.likes.length;
    this.cardData= data;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
   // this._handleCardLike = handleCardLike;
    this._handleDeleteLike = handleDeleteLike;
    this._idCardUser = data.owner._id;
    this._userId = userId;
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
    this.element = this._getTemplate();
    this.element.querySelector(".gallery__title").textContent = this._name;
    this._cardImage = this.element.querySelector(".gallery__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardLikesCount = this.element.querySelector(
      ".gallery__like-counter"
    );

    this._buttonTrash = this.element.querySelector(".gallery__trash");
    this._buttonLike = this.element.querySelector(".gallery__heart");

    this.renderCardsLike(this.cardData);

    if (this._idCardUser !== this._userId) {
      this._buttonTrash.remove();
    }

    this._setEventListeners();

    return this.element;
  }

  _likeCard() {
    this._buttonLike.classList.toggle("gallery__heart_active");
  }

  //отображение кол-ва лайков
  renderCardsLike(card) {
    this._likes = card.likes;
    if (this._likesCounter.length === 0) {
      this._cardLikesCount.textContent = "0";
    } else {
      this._cardLikesCount.textContent = this._likesCounter;
    }
  }

  deleteCard() {
    this.element.remove();
    this.element = null;
  }

  _setEventListeners() {
    //слушатель на удаление
    this._buttonTrash.addEventListener("click", () => this._handleCardDelete(this, this.idCard));

    //слушатель на лайк
    this._buttonLike.addEventListener("click", () => this._likeCard());

    //слушатель на открытие картинки
    this._cardImage.addEventListener("click", () =>
      this.handleCardClick({
        link: this._link,
        name: this._name,
      })
    );
  }
}

export { Card };
