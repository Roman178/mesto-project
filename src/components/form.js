import { closePopup } from "./modal";
import { createCard } from "./card";
import { updateUser, addCard } from "../api/api";

export function handleFormEditSubmit(
  e,
  title,
  subtitle,
  inputTitle,
  inputSubtitle,
  currPopup
) {
  e.preventDefault();

  updateUser(inputTitle.value, inputSubtitle.value)
    .then((response) => {
      console.log(response);
      title.textContent = response.name;
      subtitle.textContent = response.about;
      closePopup(currPopup);
    })
    .catch((err) => console.error(err));
}

export function handleFormAddSubmit(
  e,
  inputText,
  inputUrl,
  elementToPrependCard,
  currForm,
  currPopup
) {
  e.preventDefault();

  addCard(inputText.value, inputUrl.value)
    .then((response) => {
      const newCard = createCard({ ...response });
      elementToPrependCard.prepend(newCard);
      currForm.reset();
      closePopup(currPopup);
    })
    .catch((err) => console.error(err));
}
