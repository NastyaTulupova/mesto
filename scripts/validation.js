function disabledButton(buttonElement) {
buttonElement.disabled = 'disabled';
buttonElement.classList.add('form__button_invalid');
}

function enabledButton(buttonElement) {
  buttonElement.disabled = false;
  buttonElement.classList.remove('form__button_invalid');
  }

// Состояние кнопки Сохранить:
function toggleButtonState(buttonElement, isActive) {
  if (!isActive) {
    disabledButton(buttonElement);}
    else {
      enabledButton(buttonElement);
    }
  }

//Показ ошибки:
function showError(inputElement, errorElement) {
  inputElement.classList.add('form__item_state_invalide');
  errorElement.textContent = inputElement.validationMessage;
}

function hideError(inputElement, errorElement) {
  inputElement.classList.remove('form__item_state_invalide');
  errorElement.textContent = inputElement.validationMessage;
}

//При наступлении ввода в инпут проверяем инпут на валидность:
function checkInputValidity(inputElement, formElement) {
  console.log(inputElement.validationMessage);
  const isInputValid = inputElement.validity.valid;
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  if (!errorElement) return;

  if (!isInputValid) {
    showError(inputElement, errorElement);
  }
  else {
    hideError(inputElement, errorElement);
  }

  console.log(errorElement);
}

function setEventListener(formElement) {

  // В каждой форме ищем инпуты:
  const inputsList = formElement.querySelectorAll('.form__item');
  const submitButtonElement = formElement.querySelector('.form__button');

  toggleButtonState(submitButtonElement, formElement.checkValidity());


  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    console.log('Форма отправлена!');
  });

  // Навешиваем слушатель на каждый импут в конкретной форме:
  [...inputsList].forEach((inputItem) => {
    inputItem.addEventListener('input', () => {
      toggleButtonState(submitButtonElement, formElement.checkValidity());
      checkInputValidity(inputItem, formElement);
    })
  })
}

//Находим все формы, перебираем их и вешаем слушатель по сабмиту на каждую форму:
function enableValidation() {
  const forms = document.querySelectorAll('.form');
  [...forms].forEach((formItem) => {
    setEventListener(formItem);
  })
}

enableValidation();
