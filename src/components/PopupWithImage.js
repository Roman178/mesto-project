import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open({ imgSrcUrl, namePlaceText }) {
    this._popup.querySelector(".popup__img").src = imgSrcUrl;
    this._popup.querySelector(".popup__caption").textContent = namePlaceText;
    super.open();
  }
}
