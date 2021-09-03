export function showInputError(
  inputEl,
  form,
  inputErrorClass = "form__input_invalid",
  errorClass = "form__input-error_invisible"
) {
  const errorEl = form.querySelector(`#${inputEl.id}-error`);
  errorEl.textContent = inputEl.validationMessage;
  if (!inputEl.validity.valid) {
    inputEl.classList.add(inputErrorClass);
    errorEl.classList.remove(errorClass);
  } else {
    inputEl.classList.remove(inputErrorClass);
    errorEl.classList.add(errorClass);
  }
}

export function toggleButtonState(
  inputList,
  btn,
  btnInactiveSelector = "form__btn-save_inactive"
) {
  if (inputList.map((i) => i.validity.valid).includes(false)) {
    btn.classList.add(btnInactiveSelector);
    btn.disabled = true;
  } else {
    btn.classList.remove(btnInactiveSelector);
    btn.disabled = false;
  }
}

export function enableValidation({
  formSelector,
  inputSelector,
  saveBtnSelector,
  btnInactiveSelector,
  inputErrorClass,
  errorClass,
}) {
  document.querySelectorAll(formSelector).forEach((f) => {
    const inputList = [...f.querySelectorAll(inputSelector)];
    const submitBtn = f.querySelector(saveBtnSelector);

    inputList.forEach((i) => {
      i.addEventListener("input", (evt) => {
        toggleButtonState(inputList, submitBtn, btnInactiveSelector);
        showInputError(i, f, inputErrorClass, errorClass);
      });
      i.addEventListener("blur", (evt) => {
        showInputError(i, f, inputErrorClass, errorClass);
      });
      i.addEventListener("focus", (evt) => {
        showInputError(i, f, inputErrorClass, errorClass);
      });
    });
  });
}
