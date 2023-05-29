export class Section {

    constructor({ items, renderer }, selector) {
        this.rendererItems = items;
        this.renderer = renderer;
        this.container = document.querySelector(selector);
    }

    renderItems() {
        this.rendererItems.forEach((item) => {
            this.renderer(item);
        });
    }

    addItem(cardElement) {
        this.container.prepend(cardElement);

    }
}