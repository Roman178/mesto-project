import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popapSlector, handleSubmit) {
    super(popapSlector);
    this._form = this._popup.querySelector(".form");
    this._handleSubmit = handleSubmit;
  }

  getInputValues() {
    this._inputs = [...this._form.querySelectorAll(".form__input")];
    return this._inputs;
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
