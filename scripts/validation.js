function disabledButton(buttonElement, config) {
  buttonElement.disabled = 'disabled';
  buttonElement.classList.add(config.inactiveButtonClass);
}

function enabledButton(buttonElement, config) {
  buttonElement.disabled = false;
  buttonElement.classList.remove(config.inactiveButtonClass);
}

// Состояние кнопки Сохранить:
function toggleButtonState(buttonElement, isActive, config) {
  if (!isActive) {
    disabledButton(buttonElement, config);
  }
  else {
    enabledButton(buttonElement, config);
  }
}

//Показ ошибки:
function showError(inputElement, errorElement, config) {
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

function hideError(inputElement, errorElement, config) {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

//При наступлении ввода в инпут проверяем инпут на валидность:
function checkInputValidity(inputElement, formElement, config) {
  console.log(inputElement.validationMessage);
  console.log('validityState', inputElement.validity);

  const isInputValid = inputElement.validity.valid;
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  if (!errorElement) return;

  if (!isInputValid) {
    showError(inputElement, errorElement, config)
  } else {
    hideError(inputElement, errorElement, config)
  }

  console.log(errorElement);
}

function setEventListener(formElement, config) {

  // В каждой форме ищем инпуты:
  const inputsList = formElement.querySelectorAll(config.inputSelector);
  const submitButtonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(submitButtonElement, formElement.checkValidity());


  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    console.log('Форма отправлена!');
  });

  // Навешиваем слушатель на каждый импут в конкретной форме:
  [...inputsList].forEach((inputItem) => {
    inputItem.addEventListener('input', () => {
      toggleButtonState(submitButtonElement, formElement.checkValidity(), config);
      checkInputValidity(inputItem, formElement, config);
    })
  })
}

//Находим все формы, перебираем их и вешаем слушатель по сабмиту на каждую форму:
function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  [...forms].forEach((formItem) => {
    setEventListener(formItem, config);
  })
}

const configFormSelector = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_invalid',
  inputErrorClass: 'form__item_state_invalid',
  errorClass: 'error'
}

enableValidation(configFormSelector);
