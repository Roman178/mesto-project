import "../pages/index.css";
import { initialCards } from "./initial-data";
import { openPopup, closePopup } from "./modal";
import { handleFormEditSubmit, handleFormAddSubmit } from "./form";
import { showInputError } from "./validation";

// Глобальные переменные и функции
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

const popupImage = document.querySelector(".popup_type_image");
const imageCloseBtn = popupImage.querySelector(".popup__btn-close");
const pic = popupImage.querySelector(".popup__img");
const caption = popupImage.querySelector(".popup__caption");

function toggleLike(currLikeBtn) {
  currLikeBtn.classList.toggle("card__like-btn_liked");
}

function deleteCard(el) {
  el.closest(".photo-cards-grid__photo-card").remove();
}

function createCard(data) {
  const cardTemplateContent = document.querySelector("#template-card").content;
  const card = cardTemplateContent
    .querySelector(".photo-cards-grid__photo-card")
    .cloneNode(true);
  const cardImg = card.querySelector(".card__img");
  const cardTitle = card.querySelector(".card__title");
  const likeBtn = card.querySelector(".card__like-btn");
  const deleteBtn = card.querySelector(".photo-cards-grid__delete-btn");

  cardImg.src = data.link;
  cardImg.alt = data.name;
  cardImg.addEventListener("click", () => {
    pic.src = data.link;
    pic.alt = data.name;
    caption.textContent = data.name;
    openPopup(popupImage);
  });
  cardTitle.textContent = data.name;
  likeBtn.addEventListener("click", () => toggleLike(likeBtn));
  deleteBtn.addEventListener("click", () => deleteCard(deleteBtn));

  return card;
}

// Вставка карточек в разметку
initialCards.forEach((data) => {
  const card = createCard(data);
  return cardsList.append(card);
});

// Обработка попапа картинки
imageCloseBtn.addEventListener("click", () => {
  closePopup(popupImage);
});

// Обработка попапа реактирования профиля
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

// Обработка попапа добавления фото
addOpenBtn.addEventListener("click", () => {
  openPopup(popupAdd);
  toggleButtonState(
    [...formAdd.querySelectorAll(".form__input")],
    formAdd.querySelector(".form__btn-save")
  );
});
addCloseBtn.addEventListener("click", () => closePopup(popupAdd));

formAdd.addEventListener("submit", (evt) =>
  handleFormAddSubmit(
    evt,
    inputPlace,
    inputLink,
    createCard,
    cardsList,
    formAdd,
    popupAdd
  )
);

// Валидация
function toggleButtonState(
  inputList,
  btn,
  btnInactiveSelector = "form__btn-save_inactive"
) {
  if (inputList.map((i) => i.validity.valid).includes(false)) {
    btn.classList.add(btnInactiveSelector);
    btn.disabled = true;
  } else {
    btn.classList.remove(btnInactiveSelector);
    btn.disabled = false;
  }
}

function enableValidation({
  formSelector,
  inputSelector,
  saveBtnSelector,
  btnInactiveSelector,
  inputErrorClass,
  errorClass,
}) {
  document.querySelectorAll(formSelector).forEach((f) => {
    const inputList = [...f.querySelectorAll(inputSelector)];
    const submitBtn = f.querySelector(saveBtnSelector);

    inputList.forEach((i) => {
      i.addEventListener("input", (evt) => {
        toggleButtonState(inputList, submitBtn, btnInactiveSelector);
        showInputError(i, f, inputErrorClass, errorClass);
      });
      i.addEventListener("blur", (evt) => {
        showInputError(i, f, inputErrorClass, errorClass);
      });
      i.addEventListener("focus", (evt) => {
        showInputError(i, f, inputErrorClass, errorClass);
      });
    });
  });
}

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  saveBtnSelector: ".form__btn-save",
  btnInactiveSelector: "form__btn-save_inactive",
  inputErrorClass: "form__input_invalid",
  errorClass: "form__input-error_invisible",
});
