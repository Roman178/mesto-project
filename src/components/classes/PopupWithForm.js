import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popapSlector, handleSubmit) {
    super(popapSlector);
    this._form = this._popup.querySelector(".popup__container-form");
    this._handleSubmit = handleSubmit;
  }
}
