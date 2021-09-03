import "../pages/index.css";
import { initialCards } from "./initial-data";
import { openPopup, closePopup } from "./modal";
import { handleFormEditSubmit, handleFormAddSubmit } from "./form";
import {
  showInputError,
  toggleButtonState,
  enableValidation,
} from "./validation";
import { createCard } from "./card";

// Элементы
const cardsList = document.querySelector(".photo-cards-grid__list");

const editOpenBtn = document.querySelector(".profile__edit-btn");
const popupEdit = document.querySelector(".popup_type_edit");
const editCloseBtn = popupEdit.querySelector(".popup__btn-close");

const formEdit = popupEdit.querySelector(".form");
const inputName = formEdit.querySelector("#user-name");
const inputAbout = formEdit.querySelector("#about");

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

const addOpenBtn = document.querySelector(".profile__add-btn");
const popupAdd = document.querySelector(".popup_type_add");
const addCloseBtn = popupAdd.querySelector(".popup__btn-close");

const formAdd = popupAdd.querySelector(".form");
const inputPlace = formAdd.querySelector("#place-name");
const inputLink = formAdd.querySelector("#place-link");

// Обработка кнопок попапа реактирования профиля
editOpenBtn.addEventListener("click", function () {
  inputName.value = profileTitle.textContent;
  inputAbout.value = profileSubtitle.textContent;
  openPopup(popupEdit);
  toggleButtonState(
    [inputName, inputAbout],
    formEdit.querySelector(".form__btn-save")
  );
  [inputName, inputAbout].forEach((i) => showInputError(i, formEdit));
});

editCloseBtn.addEventListener("click", function () {
  closePopup(popupEdit);
});

// Обработка кнопок попапа добавления фото
addOpenBtn.addEventListener("click", () => {
  openPopup(popupAdd);
  toggleButtonState(
    [...formAdd.querySelectorAll(".form__input")],
    formAdd.querySelector(".form__btn-save")
  );
});

addCloseBtn.addEventListener("click", () => closePopup(popupAdd));

// Слушатели на сабмит форм
formEdit.addEventListener("submit", (evt) =>
  handleFormEditSubmit(
    evt,
    profileTitle,
    profileSubtitle,
    inputName,
    inputAbout,
    popupEdit
  )
);

formAdd.addEventListener("submit", (evt) =>
  handleFormAddSubmit(evt, inputPlace, inputLink, cardsList, formAdd, popupAdd)
);

// Валидация
enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  saveBtnSelector: ".form__btn-save",
  btnInactiveSelector: "form__btn-save_inactive",
  inputErrorClass: "form__input_invalid",
  errorClass: "form__input-error_invisible",
});

// Вставка карточек в разметку
initialCards.forEach((data) => {
  const card = createCard(data);
  return cardsList.append(card);
});
