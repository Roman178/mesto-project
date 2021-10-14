export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);

    this.addItem = this.addItem.bind(this);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  createSection() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
}
