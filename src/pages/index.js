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
const editProfileForm = new PopupWithForm(
  ".popup_type_edit",
  // передача ф-ции handleSubmit
  (e, submitBtn) => {
    e.preventDefault();

    const textBtn = submitBtn.textContent;
    submitBtn.textContent = "Сохранение...";
    const inputValues = editProfileForm.getInputValues();
    api.updateUser(...inputValues.map((input) => input.value)).then((user) => {
      userInfo.setUserInfo(user);
      submitBtn.textContent = textBtn;
      editProfileForm.close();
    });
  }
);

// Созд-е попапа с формой изменения аватарки
const changeAvaForm = new PopupWithForm(
  ".popup_type_avatar",
  // передача ф-ции handleSubmit
  (e, submitBtn) => {
    e.preventDefault();

    const textBtn = submitBtn.textContent;
    submitBtn.textContent = "Сохранение...";
    const inputValues = changeAvaForm.getInputValues();
    api.updateAvatar(inputValues[0].value).then((user) => {
      userInfo.setAvatar(user);
      submitBtn.textContent = textBtn;
      changeAvaForm.close();
    });
  }
);

// создание валидатора формы редактирования профиля
const validatorEditProfileForm = new FormValidator(
  formConfigs,
  editProfileForm.getFormDomEl()
);

// создание валидатора формы изменения аватарки
const validatorChangeAvaForm = new FormValidator(
  formConfigs,
  changeAvaForm.getFormDomEl()
);

// установка слушателей на элементы попапов (клики, сабмиты).
popupImg.setEventListeners();
editProfileForm.setEventListeners();
changeAvaForm.setEventListeners();

// включение валидации форм
validatorEditProfileForm.enableValidation();
validatorChangeAvaForm.enableValidation();

// кнопки редактирования профиля и изм-я аватарки
const editOpenBtn = document.querySelector(".profile__edit-btn");
const updAvatarOpenBtn = document.querySelector(".profile__btn-change-avatar");

// добавляем слушателей на 2 кнопки выше
updAvatarOpenBtn.addEventListener("click", () => {
  // кастомный ивент слушается когда открывается попап, запускается ф-ция проверки инпутов и рендера ошибки (или не рендера, если данные валидны)
  changeAvaForm.getFormDomEl().dispatchEvent(formIsOpened);
  changeAvaForm.open();
});

editOpenBtn.addEventListener("click", () => {
  userInfo.getUserInfo(api.getUser, (userData) => {
    const profileInputs = editProfileForm.getInputValues();
    profileInputs.forEach((input) => {
      if (input.name === "userName") input.value = userData.name;
      if (input.name === "about") input.value = userData.about;
    });
  });
  editProfileForm.getFormDomEl().dispatchEvent(formIsOpened);
  editProfileForm.open();
});

// скачиваем данные
Promise.all([api.getUser(), api.getInitialCards()]).then(([user, cards]) => {
  // т.к. эл-ты рисуются на основании скаченных данных, объявляем экз Section
  const cardsContainer = new Section(
    {
      items: cards.reverse(),

      renderer: (item) => {
        const card = new Card(
          {
            data: item,
            handleCardClick: () => {
              popupImg.open({ imgSrcUrl: item.link, namePlaceText: item.name });
            },
          },
          "#template-card",
          api,
          user._id
        );
        const cardElement = card.generate();
        cardsContainer.addItem(cardElement);
      },
    },
    ".photo-cards-grid__list"
  );

  // создаем секцию
  cardsContainer.createSection();

  // устанавливаем данные в профиль пользователя
  userInfo.setUserInfo(user);
  userInfo.setAvatar(user);

  // Созд-е попапа с формой добавления карточки. Создается здесь, т.к. нужен user id.
  const addCardForm = new PopupWithForm(".popup_type_add", (e, submitBtn) => {
    e.preventDefault();
    const textBtn = submitBtn.textContent;
    submitBtn.textContent = "Сохранение...";
    const inputValues = addCardForm.getInputValues();
    api.addCard(...inputValues.map((input) => input.value)).then((data) => {
      const card = new Card(
        {
          data,
          handleCardClick: () => {
            popupImg.open({ imgSrcUrl: data.link, namePlaceText: data.name });
          },
        },
        "#template-card",
        api,
        user._id
      );
      const cardElement = card.generate();
      cardsContainer.addItem(cardElement);
      submitBtn.textContent = textBtn;
      addCardForm.close();
    });
  });
  addCardForm.setEventListeners();

  const validatorAddCardForm = new FormValidator(
    formConfigs,
    addCardForm.getFormDomEl()
  );
  validatorAddCardForm.enableValidation();

  const addOpenBtn = document.querySelector(".profile__add-btn");
  addOpenBtn.addEventListener("click", () => {
    addCardForm.getFormDomEl().dispatchEvent(formIsOpened);
    addCardForm.open();
  });
});
