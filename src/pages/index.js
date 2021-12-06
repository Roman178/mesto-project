import "../pages/index.css";

import { Api } from "../api/Api.js";
import { Card } from "../components/Card";
import { Section } from "../components/Section";
import { PopupWithImage } from "../components/PopupWithImage";
import { PopupWithForm } from "../components/PopupWithForm";
import { UserInfo } from "../components/UserInfo";
import { FormValidator } from "../components/FormValidator";

import {
  formConfigs,
  userConfigs,
  apiConfigs,
  formIsOpened,
} from "../constants/configs.js";

// Создание эксемпляров Api, UserInfo, PopupWithImage
const api = new Api(apiConfigs);
const userInfo = new UserInfo(...userConfigs);
const popupImg = new PopupWithImage(".popup_type_image");

// Созд-е попапа с формой редактирования профиля
const editProfilePopup = new PopupWithForm(
  ".popup_type_edit",
  // передача ф-ции handleSubmit
  (e, submitBtn) => {
    e.preventDefault();

    const textBtn = submitBtn.textContent;
    submitBtn.textContent = "Сохранение...";
    const inputValues = editProfilePopup.getInputValues();
    api
      .updateUser(inputValues.userName, inputValues.about)
      .then((user) => {
        userInfo.setUserInfo(user);
        editProfilePopup.close();
      })
      .catch((error) => console.error(error))
      .finally(() => (submitBtn.textContent = textBtn));
  }
);

// Созд-е попапа с формой изменения аватарки
const changeAvaPopup = new PopupWithForm(
  ".popup_type_avatar",
  // передача ф-ции handleSubmit
  (e, submitBtn) => {
    e.preventDefault();

    const textBtn = submitBtn.textContent;
    submitBtn.textContent = "Сохранение...";
    const inputValues = changeAvaPopup.getInputValues();
    api
      .updateAvatar(inputValues.avatarLink)
      .then((user) => {
        userInfo.setAvatar(user);
        changeAvaPopup.close();
      })
      .catch((error) => console.error(error))
      .finally(() => (submitBtn.textContent = textBtn));
  }
);

// создание валидатора формы редактирования профиля
const validatorEditProfileForm = new FormValidator(
  formConfigs,
  editProfilePopup.getFormDomEl()
);

// создание валидатора формы изменения аватарки
const validatorChangeAvaForm = new FormValidator(
  formConfigs,
  changeAvaPopup.getFormDomEl()
);

// установка слушателей на элементы попапов (клики, сабмиты).
popupImg.setEventListeners();
editProfilePopup.setEventListeners();
changeAvaPopup.setEventListeners();

// включение валидации форм
validatorEditProfileForm.enableValidation();
validatorChangeAvaForm.enableValidation();

// кнопки редактирования профиля и изм-я аватарки
const editOpenBtn = document.querySelector(".profile__edit-btn");
const updAvatarOpenBtn = document.querySelector(".profile__btn-change-avatar");

// добавляем слушателей на 2 кнопки выше
updAvatarOpenBtn.addEventListener("click", () => {
  // кастомный ивент слушается когда открывается попап, запускается ф-ция проверки инпутов и рендера ошибки (или не рендера, если данные валидны)
  changeAvaPopup.getFormDomEl().dispatchEvent(formIsOpened);
  changeAvaPopup.open();
});

editOpenBtn.addEventListener("click", () => {
  const { name, about } = userInfo.getUserInfo();
  editProfilePopup.setInputsValues([
    { value: name, inputName: "userName" },
    { value: about, inputName: "about" },
  ]);

  editProfilePopup.getFormDomEl().dispatchEvent(formIsOpened);
  editProfilePopup.open();
});

// скачиваем данные
Promise.all([api.getUser(), api.getInitialCards()])
  .then(([user, cards]) => {
    function getCardElement(data) {
      const card = new Card(
        {
          data,
          handleCardClick: () => {
            popupImg.open({
              imgSrcUrl: data.link,
              namePlaceText: data.name,
            });
          },
        },
        "#template-card",
        api,
        user._id
      );
      return card.generate();
    }

    // т.к. эл-ты рисуются на основании скаченных данных, объявляем экз Section
    const cardsContainer = new Section(
      {
        items: cards.reverse(),

        renderer: (item) => {
          const cardElement = getCardElement(item);
          cardsContainer.addItem(cardElement);
        },
      },
      ".photo-cards-grid__list"
    );

    // создаем секцию
    cardsContainer.renderItems();

    // устанавливаем данные в профиль пользователя
    userInfo.setUserInfo(user);
    userInfo.setAvatar(user);

    // Созд-е попапа с формой добавления карточки. Создается здесь, т.к. нужен user id.
    const addCardPopup = new PopupWithForm(
      ".popup_type_add",
      (e, submitBtn) => {
        e.preventDefault();
        const textBtn = submitBtn.textContent;
        submitBtn.textContent = "Сохранение...";
        const inputValues = addCardPopup.getInputValues();
        api
          .addCard(inputValues.placeName, inputValues.placeLink)
          .then((data) => {
            const cardElement = getCardElement(data);
            cardsContainer.addItem(cardElement);
            addCardPopup.close();
          })
          .catch((error) => console.error(error))
          .finally(() => (submitBtn.textContent = textBtn));
      }
    );
    addCardPopup.setEventListeners();

    const validatorAddCardForm = new FormValidator(
      formConfigs,
      addCardPopup.getFormDomEl()
    );
    validatorAddCardForm.enableValidation();

    const addOpenBtn = document.querySelector(".profile__add-btn");
    addOpenBtn.addEventListener("click", () => {
      addCardPopup.getFormDomEl().dispatchEvent(formIsOpened);
      addCardPopup.open();
    });
  })
  .catch((error) => console.error(error));
