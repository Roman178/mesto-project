export const formConfigs = {
  inputSelector: ".form__input",
  sbmtBtnSelector: ".form__btn-save",
  btnInactiveSelector: "form__btn-save_inactive",
  inputErrorClass: "form__input_invalid",
  errorClass: "form__input-error_invisible",
};

export const userConfigs = [
  ".profile__title",
  ".profile__subtitle",
  ".profile__avatar",
];

export const apiConfigs = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-1",
  headers: {
    authorization: "e57c7ce8-a3e3-4b01-ae89-02cce4158d9f",
    "Content-Type": "application/json",
  },
};

export const formIsOpened = new CustomEvent("formIsOpened");
