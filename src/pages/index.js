import "../pages/index.css";
import { openPopup, closePopup } from "../components/modal";
import {
  handleFormEditSubmit,
  handleFormAddSubmit,
  handleFormUpdtAvatar,
} from "../components/form";
import {
  showInputError,
  toggleButtonState,
  enableValidation,
} from "../components/validation";
import { createCard } from "../components/card";
import { getCards, getUser, updateUser } from "../api/api";

import { ApiClass } from "../api/ApiClass";

const api = new ApiClass({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-1",
  headers: {
    authorization: "e57c7ce8-a3e3-4b01-ae89-02cce4158d9f",
    "Content-Type": "application/json",
  },
});

api.getInitialCards().then((cards) => console.log(cards));
// api.addLike("6165e0e4b9c1250012049633").then((data) => console.log(data));

// Элементы
const cardsList = document.querySelector(".photo-cards-grid__list");

const editOpenBtn = document.querySelector(".profile__edit-btn");
const popupEdit = document.querySelector(".popup_type_edit");
const editCloseBtn = popupEdit.querySelector(".popup__btn-close");

const formEdit = popupEdit.querySelector(".form");
const inputName = formEdit.querySelector("#user-name");
const inputAbout = formEdit.querySelector("#about");
const submitBtnFormEdit = formEdit.querySelector(".form__btn-save");

export const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileImgAvatar = document.querySelector(".profile__avatar");

const addOpenBtn = document.querySelector(".profile__add-btn");
const popupAdd = document.querySelector(".popup_type_add");
const addCloseBtn = popupAdd.querySelector(".popup__btn-close");

const formAdd = popupAdd.querySelector(".form");
const inputPlace = formAdd.querySelector("#place-name");
const inputLink = formAdd.querySelector("#place-link");
const submitBtnFormAdd = formAdd.querySelector(".form__btn-save");

const updAvatarOpenBtn = document.querySelector(".profile__btn-change-avatar");
const popupAvatar = document.querySelector(".popup_type_avatar");
const formAvatar = popupAvatar.querySelector(".form");
const inputAvatarLink = formAvatar.querySelector("#avatar-link");
const updAvatarCloseBtn = popupAvatar.querySelector(".popup__btn-close");
const submitBtnFormAva = formAvatar.querySelector(".form__btn-save");

// Обработка кнопок попапа обновления аватара
updAvatarOpenBtn.addEventListener("click", () => {
  openPopup(popupAvatar);
  toggleButtonState(
    [inputAvatarLink],
    formAvatar.querySelector(".form__btn-save")
  );
});

updAvatarCloseBtn.addEventListener("click", () => {
  closePopup(popupAvatar);
});

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
    popupEdit,
    submitBtnFormEdit
  )
);

formAdd.addEventListener("submit", (evt) =>
  handleFormAddSubmit(
    evt,
    inputPlace,
    inputLink,
    cardsList,
    formAdd,
    popupAdd,
    submitBtnFormAdd
  )
);

formAvatar.addEventListener("submit", (evt) => {
  handleFormUpdtAvatar(
    evt,
    inputAvatarLink,
    formAvatar,
    popupAvatar,
    profileImgAvatar,
    submitBtnFormAva
  );
});

// Валидация
enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  saveBtnSelector: ".form__btn-save",
  btnInactiveSelector: "form__btn-save_inactive",
  inputErrorClass: "form__input_invalid",
  errorClass: "form__input-error_invisible",
});

Promise.all([getUser(), getCards()])
  .then((values) => {
    //Вставка данных в профиль
    profileTitle.textContent = values[0].name;
    profileTitle.id = values[0]._id;
    profileSubtitle.textContent = values[0].about;
    profileImgAvatar.src = values[0].avatar;

    // Вставка карточек в разметку
    values[1].forEach((data) => {
      const card = createCard(data);
      return cardsList.append(card);
    });
  })
  .catch((err) => console.error(err));
