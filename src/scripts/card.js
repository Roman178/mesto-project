import { openPopup, closePopup } from "./modal";

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

export function createCard(data) {
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

// Обработка кнопки закрытия попапа картинки
imageCloseBtn.addEventListener("click", () => {
  closePopup(popupImage);
});
