export class CardClass {
  constructor({ data, handleCardClick }, cardSelector) {
    this._data = data;
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;
  }

  generate(item) {}
}
