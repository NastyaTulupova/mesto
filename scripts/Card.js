class Card {
  constructor(data, templateSelector, handleImageOpen) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleImageOpen = handleImageOpen;
  }

  //подготовка данных для карточки из темплейта
_getTemplate() {
  const card = document
  .querySelector(this._templateSelector)
  .content
  .querySelector('.gallery__item')
  .cloneNode(true);

  return card;
}

 generateCard() {
  this._element = this._getTemplate();

  this._element.querySelector('.gallery__title').textContent = this._name;
  this._element.querySelector('.gallery__image').src = this._link;
  this._element.querySelector('.gallery__image').alt = this._name;

  this._buttonTrash = this._element.querySelector('.gallery__trash');
  this._buttonLike = this._element.querySelector('.gallery__heart');

  this._setEventListeners();
  return this._element;
}

_setEventListeners() {
  //слушатель на удаление
  this._buttonTrash.addEventListener('click', () => {
    this._element.remove();
  });

   //слушатель на лайк
   this._buttonLike.addEventListener('click', () => {
    this._buttonLike.classList.toggle('gallery__heart_active');
   });

   //слушатель на открытие картинки
   this._element.querySelector('.gallery__image').addEventListener('click', () => {
    this._handleImageOpen({
      link: this._link,
      name: this._name,
    })});
  };
  };

  export { Card };
