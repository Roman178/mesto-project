import { closePopup } from "./modal";
import { createCard } from "./card";
import { updateUser, addCard, updateAvatar } from "../api/api";

export function handleFormEditSubmit(
  e,
  title,
  subtitle,
  inputTitle,
  inputSubtitle,
  currPopup,
  submitBtn
) {
  e.preventDefault();

  const initialText = submitBtn.textContent;
  submitBtn.textContent = "Сохранение...";

  updateUser(inputTitle.value, inputSubtitle.value)
    .then((response) => {
      title.textContent = response.name;
      subtitle.textContent = response.about;
      closePopup(currPopup);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      submitBtn.textContent = initialText;
    });
}

export function handleFormAddSubmit(
  e,
  inputText,
  inputUrl,
  elementToPrependCard,
  currForm,
  currPopup,
  submitBtn
) {
  e.preventDefault();

  const initialText = submitBtn.textContent;
  submitBtn.textContent = "Сохранение...";
  addCard(inputText.value, inputUrl.value)
    .then((response) => {
      const newCard = createCard({ ...response });
      elementToPrependCard.prepend(newCard);
      currForm.reset();
      closePopup(currPopup);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      submitBtn.textContent = initialText;
    });
}

export function handleFormUpdtAvatar(
  e,
  avaInput,
  avaForm,
  avaPopup,
  avaImg,
  submitBtn
) {
  e.preventDefault();

  const initialText = submitBtn.textContent;
  submitBtn.textContent = "Сохранение...";
  updateAvatar(avaInput.value)
    .then((response) => {
      avaImg.src = response.avatar;
      avaForm.reset();
      submitBtn.textContent = initialText;
      closePopup(avaPopup);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      submitBtn.textContent = initialText;
    });
}
