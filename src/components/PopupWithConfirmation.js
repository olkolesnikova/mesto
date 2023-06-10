import Popup from "./Popup.js";
import PopupWithForm from "./PopupWithForm.js";

export default class PopupWithConfirmation extends Popup {

    constructor(popupSelector) {
        super(popupSelector);

        this.form = this.popup.querySelector('.popup__form');
    }

    

setEventListeners() {

    super.setEventListeners();

    this.form.addEventListener('submit', (event) => {
        event.preventDefault();
        this.submitConfirmation();
    })

}

openPopup(submitConfirmation) {
    super.openPopup();
    this.submitConfirmation = submitConfirmation;
}

}