import { openPopup, closePopup } from "./modal";
import { profileTitle } from "../pages/index";
import { deleteCardApi, addLike, removeLike } from "../api/api";

const popupImage = document.querySelector(".popup_type_image");
const imageCloseBtn = popupImage.querySelector(".popup__btn-close");
const pic = popupImage.querySelector(".popup__img");
const caption = popupImage.querySelector(".popup__caption");

function toggleLike(currLikeBtn, likeCounter, cardId) {
  if (currLikeBtn.classList.contains("card__like-btn_liked")) {
    removeLike(cardId)
      .then((response) => {
        currLikeBtn.classList.remove("card__like-btn_liked");
        likeCounter.textContent = response.likes.length;
      })
      .catch((err) => console.error(err));
  } else {
    addLike(cardId)
      .then((response) => {
        currLikeBtn.classList.add("card__like-btn_liked");
        likeCounter.textContent = response.likes.length;
      })
      .catch((err) => console.error(err));
  }
}

function deleteCard(el, cardId) {
  console.log(cardId);
  el.closest(".photo-cards-grid__photo-card").remove();
  deleteCardApi(cardId)
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}

export function createCard(data) {
  const cardTemplateContent = document.querySelector("#template-card").content;
  const card = cardTemplateContent
    .querySelector(".photo-cards-grid__photo-card")
    .cloneNode(true);
  const cardImg = card.querySelector(".card__img");
  const cardTitle = card.querySelector(".card__title");
  const likeBtn = card.querySelector(".card__like-btn");
  const likeCounter = card.querySelector(".card__like-counter");

  if (data.owner._id === profileTitle.id) {
    const deleteBtnTemplate = card.querySelector("#delete-btn").content;
    const deleteBtn = deleteBtnTemplate
      .querySelector(".photo-cards-grid__delete-btn")
      .cloneNode(true);
    deleteBtn.addEventListener("click", () => deleteCard(deleteBtn, data._id));
    card.prepend(deleteBtn);
  }

  cardImg.src = data.link;
  cardImg.alt = data.name;
  cardImg.addEventListener("click", () => {
    pic.src = data.link;
    pic.alt = data.name;
    caption.textContent = data.name;
    openPopup(popupImage);
  });
  cardTitle.textContent = data.name;

  likeCounter.textContent = data.likes.length;
  if (data.likes.some((likeOwner) => likeOwner._id === profileTitle.id)) {
    likeBtn.classList.add("card__like-btn_liked");
  }
  likeBtn.addEventListener("click", () =>
    toggleLike(likeBtn, likeCounter, data._id)
  );

  return card;
}

// Обработка кнопки закрытия попапа картинки
imageCloseBtn.addEventListener("click", () => {
  closePopup(popupImage);
});
