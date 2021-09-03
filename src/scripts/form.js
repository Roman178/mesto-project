import { closePopup } from "./modal";

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
  createCardFunc,
  elementToPrependCard,
  currForm,
  currPopup
) {
  e.preventDefault();

  const data = { name: inputText.value, link: inputUrl.value };
  const newCard = createCardFunc(data);
  elementToPrependCard.prepend(newCard);
  currForm.reset();
  closePopup(currPopup);
}
