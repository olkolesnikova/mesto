import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

    constructor(popupSelector, onSubmit) {
        super(popupSelector);

        this.onSubmit = onSubmit;
        this.handleSubmit = this.handleSubmit.bind(this);
        
        this.form = this.popup.querySelector('.popup__form');

        this.inputList = Array.from(this.form.querySelectorAll('.popup__input'));

        this.submitButton = this.form.querySelector('.popup__submit')
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

        this.form.addEventListener('submit', this.handleSubmit);
    }

    async handleSubmit(evt) {
        evt.preventDefault();
        const originalText = this.submitButton.textContent;
        
        try {
          this.submitButton.textContent = 'Сохранение...';
          await this.onSubmit(this.getInputValues());
          this.closePopup();
        } finally {
          this.submitButton.textContent = originalText;
        }
      }
      
    

    closePopup() {
        super.closePopup();
        this.form.reset();

    }
}