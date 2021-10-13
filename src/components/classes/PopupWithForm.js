import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popapSlector, handleSubmit) {
    super(popapSlector);
    this._form = this._popup.querySelector(".form");
    this._handleSubmit = handleSubmit;
    // this._handleSubmit = this._handleSubmit.bind(this);
  }

  _getInputValues() {
    const inputs = this._form.querySelectorAll(".form__input");
    this._inputList = {};
    inputs.forEach((input) => (this._inputList[input.name] = input.value));

    return this._inputList;
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
