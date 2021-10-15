export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);

    this._closePopupByOutside = this._closePopupByOutside.bind(this);
    this._closePopupByEsc = this._closePopupByEsc.bind(this);
  }

  _closePopupByEsc(evt) {
    if (evt.key !== "Escape") return;
    this.close();
  }

  _closePopupByOutside(evt) {
    if (
      evt.target.closest(".popup__container") ||
      evt.target.closest(".popup__figure")
    ) {
      return;
    } else {
      this.close();
    }
  }

  open() {
    this._popup.classList.add("popup_opened");
    setTimeout(() => {
      window.addEventListener("mousedown", this._closePopupByOutside);
      window.addEventListener("keydown", this._closePopupByEsc);
    }, 0);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    window.removeEventListener("keydown", this._closePopupByEsc);
    window.removeEventListener("mousedown", this._closePopupByOutside);
  }

  setEventListeners() {
    this._popup
      .querySelector(".popup__btn-close")
      .addEventListener("click", () => {
        this.close();
      });
  }
}
