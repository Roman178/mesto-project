import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popupSlector, handleSubmit) {
    super(popupSlector);
    this._form = this._popup.querySelector(".form");
    this._inputs = this._form.querySelectorAll(".form__input");
    this._handleSubmit = handleSubmit;
  }

  getInputValues() {
    this._inpitsValue = {};
    this._inputs.forEach(
      (input) => (this._inpitsValue[input.name] = input.value)
    );
    return this._inpitsValue;
  }

  setInputsValues(data) {
    this._inputs.forEach((input) => {
      data.forEach((item) => {
        if (item.inputName === input.name) input.value = item.value;
      });
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      this._handleSubmit(evt, this._form.querySelector(".form__btn-save"));
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  getFormDomEl() {
    return this._form;
  }
}
