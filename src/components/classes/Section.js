export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);

    this._renderer = this._renderer.bind(this);
  }

  addItem(element) {
    this._container.append(element);
  }

  createElement() {
    this._items.forEach((item) => {
      const card = this._renderer(item);
      this.addItem(card);
    });
  }

  getContainer() {
    return this._container;
  }
}

const section = new Section({ items: [], renderer: card.generate }, "#");
