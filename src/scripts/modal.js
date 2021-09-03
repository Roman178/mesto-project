function closePopupByOutside(evt) {
  if (
    evt.target.closest(".popup__container") ||
    evt.target.closest(".popup__figure")
  ) {
    return;
  } else {
    closePopup(document.querySelector(".popup_opened"));
  }
}

function closePopupByEsc(evt) {
  if (evt.key !== "Escape") return;
  closePopup(document.querySelector(".popup_opened"));
}

export function openPopup(currentPopup) {
  currentPopup.classList.add("popup_opened");
  setTimeout(() => {
    window.addEventListener("mousedown", closePopupByOutside);
    window.addEventListener("keydown", closePopupByEsc);
  }, 0);
}

export function closePopup(currentPopup) {
  currentPopup.classList.remove("popup_opened");
  window.removeEventListener("keydown", closePopupByEsc);
  window.removeEventListener("mousedown", closePopupByOutside);
}
