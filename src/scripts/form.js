import { closePopup } from "./modal";
import { createCard } from "./card";

export function handleFormEditSubmit(
  e,
  title,
  subtitle,
  inputTitle,
  inputSubtitle,
  currPopup
) {
  e.preventDefault();

  title.textContent = inputTitle.value;
  subtitle.textContent = inputSubtitle.value;
  closePopup(currPopup);
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

  const data = { name: inputText.value, link: inputUrl.value };
  const newCard = createCard(data);
  elementToPrependCard.prepend(newCard);
  currForm.reset();
  closePopup(currPopup);
}
