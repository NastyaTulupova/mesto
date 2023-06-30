class Section {
  constructor({renderer}, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  renderItems(items, user) {
    items.forEach((item) => {
      this._renderer(item, user);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

export { Section };
