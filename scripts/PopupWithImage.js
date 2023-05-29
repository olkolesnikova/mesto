import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {

    constructor(popupSelector) {
        super(popupSelector);

        this.zoomImage = this.popup.querySelector('.popup__zoom-image');
        this.zoomImageCaption = this.popup.querySelector('.popup__image-caption');
    };

    openPopup(cardData) {

        super.openPopup();

        this.zoomImage.src = cardData.link;
        this.zoomImageCaption.textContent = cardData.name;
        this.zoomImageCaption.alt = cardData.name;


    }

}