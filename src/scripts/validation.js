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
