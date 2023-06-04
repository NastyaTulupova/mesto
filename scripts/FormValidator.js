class FormValidator {
  constructor(config, form) {
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._activeButtonClass = config.activeButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._formSelector = config.formSelector;
    this._form = form;
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
    this._inputsList = this._form.querySelectorAll(this._inputSelector);
  }

  _disabledButton() {
    this._buttonElement.disabled = 'disabled';
    this._buttonElement.classList.add(this._inactiveButtonClass);
  }

  _enabledButton() {
    this._buttonElement.disabled = false;
    this._buttonElement.classList.add(this._activeButtonClass);
    this._buttonElement.classList.remove(this._inactiveButtonClass);
  }

  // Состояние кнопки Сохранить:
  _toggleButtonState() {
    this._isActive = this._form.checkValidity();

    if (!this._isActive) {
      this._disabledButton();
    }
    else {
      this._enabledButton();
    }
  }

  //Показ ошибки:
  _showError(inputElement, errorElement) {
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideError(inputElement, errorElement) {
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.textContent = '';
  }

  //При наступлении ввода в инпут проверяем инпут на валидность:
  _checkInputValidity(inputElement) {
    const isInputValid = inputElement.validity.valid;
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);

    if (!errorElement) return;

    if (!isInputValid) {
      this._showError(inputElement, errorElement)
    } else {
      this._hideError(inputElement, errorElement)
    }
  }

  _setEventListener() {

    // В каждой форме ищем инпуты:
    //const submitButtonElement = this._formElement.querySelector(this._submitButtonSelector);

    this._toggleButtonState();

    // Навешиваем слушатель на каждый импут в конкретной форме:
    [...this._inputsList].forEach((inputItem) => {
      inputItem.addEventListener('input', () => {
        this._toggleButtonState();
        this._checkInputValidity(inputItem);
      })
    })
  }

  //Находим все формы, перебираем их и вешаем слушатель по сабмиту на каждую форму:
  enableValidation() {
    this._setEventListener();
    /* const forms = document.querySelectorAll(this._formSelector);

     [...forms].forEach((formItem) => {
       _setEventListener(formItem);
     })*/
  }

}

export { FormValidator };
