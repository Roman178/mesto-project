export class CardClass {
  constructor({ data, handleCardClick }, cardSelector, api, userId) {
    this._data = data;
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;
    this._api = api;
    this._userId = userId;

    this.toggleLike = this.toggleLike.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
  }

  toggleLike() {
    if (this._likeBtn.classList.contains("card__like-btn_liked")) {
      this._api
        .removeLike(this._data._id)
        .then((response) => {
          this._likeBtn.classList.remove("card__like-btn_liked");
          this._likeCounter.textContent = response.likes.length;
        })
        .catch((err) => console.error(err));
    } else {
      this._api
        .addLike(this._data._id)
        .then((response) => {
          this._likeBtn.classList.add("card__like-btn_liked");
          this._likeCounter.textContent = response.likes.length;
        })
        .catch((err) => console.error(err));
    }
  }

  deleteCard() {
    this._api
      .deleteCardApi(this._data._id)
      .then(() => {
        this._card.remove();
      })
      .catch((err) => console.error(err));
  }

  setEventListeners() {
    this._cardImg.addEventListener("click", this._handleCardClick);
    this._likeBtn.addEventListener("click", this.toggleLike);
    if (this._deleteBtn) {
      this._deleteBtn.addEventListener("click", this.deleteCard);
    }
  }

  generate() {
    this._cardTemplateContent = document.querySelector(
      this._cardSelector
    ).content;
    this._card = this._cardTemplateContent
      .querySelector(".photo-cards-grid__photo-card")
      .cloneNode(true);
    this._cardImg = this._card.querySelector(".card__img");
    this._cardTitle = this._card.querySelector(".card__title");
    this._likeBtn = this._card.querySelector(".card__like-btn");
    this._likeCounter = this._card.querySelector(".card__like-counter");

    this._cardImg.src = this._data.link;
    this._cardImg.alt = this._data.name;
    this._cardTitle.textContent = this._data.name;
    this._likeCounter.textContent = this._data.likes.length;

    if (this._data.owner._id === this._userId) {
      this._deleteBtnTemplate = this._card.querySelector("#delete-btn").content;
      this._deleteBtn = this._deleteBtnTemplate
        .querySelector(".photo-cards-grid__delete-btn")
        .cloneNode(true);
      this._card.prepend(this._deleteBtn);
    }

    if (this._data.likes.some((likeOwner) => likeOwner._id === this._userId)) {
      this._likeBtn.classList.add("card__like-btn_liked");
    }

    this.setEventListeners();

    return this._card;
  }
}
