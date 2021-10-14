import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popapSlector, handleSubmit) {
    super(popapSlector);
    this._form = this._popup.querySelector(".form");
    this._handleSubmit = handleSubmit;
    // this._handleSubmit = this._handleSubmit.bind(this);
  }

  getInputValues() {
    this._inputs = [...this._form.querySelectorAll(".form__input")];
    return this._inputs;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._handleSubmit);
  }

  close() {
    super.close();
    this._form.reset();
  }
}
