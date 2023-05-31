import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

    constructor(popupSelector, handlerSubmit) {
        super(popupSelector);

        this.handlerSubmit = handlerSubmit;
        this.form = this.popup.querySelector('.popup__form');

        this.inputList = Array.from(this.form.querySelectorAll('.popup__input'));
    }

    getInputValues() {

        const inputValues = {};

        this.inputList.forEach((inputElement) => {
            inputValues[inputElement.name] = inputElement.value;
        });

        return inputValues;
    }

    setInputValues(data) {

        this.inputList.forEach((inputElement) => {
            inputElement.value = data[inputElement.name];
        });

    }

    setEventListeners() {
        super.setEventListeners();

        this.form.addEventListener('submit', (event) => {
            event.preventDefault();

            this.handlerSubmit(this.getInputValues());
        });
    }

    closePopup() {
        super.closePopup();
        this.form.reset();

    }
}