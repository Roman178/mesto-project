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

const popupImage = document.querySelector(".popup_type_image");
const imageCloseBtn = popupImage.querySelector(".popup__btn-close");
const pic = popupImage.querySelector(".popup__img");
const caption = popupImage.querySelector(".popup__caption");

function openPopup(currentPopup) {
  currentPopup.classList.add("popup_opened");
}

function closePopup(currentPopup) {
  currentPopup.classList.remove("popup_opened");
}

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
    // Замыкание
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
    popupEdit.querySelector(".form__btn-save")
  );
});

editCloseBtn.addEventListener("click", function () {
  closePopup(popupEdit);
});

function handleFormEditSubmit(e, form) {
  e.preventDefault();
  console.log(e);
  console.dir(form);

  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputAbout.value;
  closePopup(popupEdit);
}
formEdit.addEventListener("submit", (evt) =>
  handleFormEditSubmit(evt, formEdit)
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

function handleFormAddSubmit(e) {
  e.preventDefault();

  const inputPlace = formAdd.querySelector("#place-name");
  const inputLink = formAdd.querySelector("#place-link");
  const data = { name: inputPlace.value, link: inputLink.value };
  const newCard = createCard(data);

  cardsList.prepend(newCard);
  formAdd.reset();

  closePopup(popupAdd);
}
formAdd.addEventListener("submit", handleFormAddSubmit);

// Валидация
function toggleButtonState(inputList, btn) {
  if (inputList.map((i) => i.validity.valid).includes(false)) {
    btn.classList.add("form__btn-save_inactive");
    btn.disabled = true;
  } else {
    btn.classList.remove("form__btn-save_inactive");
    btn.disabled = false;
  }
}

function showInputError(inputEl, form) {
  if (!inputEl.validity.valid) {
    inputEl.classList.add("form__input_invalid");
  } else {
    inputEl.classList.remove("form__input_invalid");
  }
}

document.querySelectorAll(".form").forEach((f) => {
  const inputList = [...f.querySelectorAll(".form__input")];
  const submitBtn = f.querySelector(".form__btn-save");

  inputList.forEach((i) => {
    i.addEventListener("input", (evt) => {
      toggleButtonState(inputList, submitBtn);
      showInputError(i, f);
    });
    i.addEventListener("blur", (evt) => {
      showInputError(i, f);
    });
    i.addEventListener("focus", (evt) => {
      showInputError(i, f);
    });
  });
});
