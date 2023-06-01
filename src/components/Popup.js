export default class Popup {

    constructor(popupSelector) {
        this.popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this.closePopupByOverlay = this.closePopupByOverlay.bind(this);
        this.closePopup = this.closePopup.bind(this);
    }


    openPopup() {
        this.popup.classList.add('popup_opened'); //общая функция открытия попапа
        document.addEventListener('keydown', this._handleEscClose);
        this.popup.addEventListener('click', this.closePopupByOverlay);
        
    }
    
    closePopup () {                             //общая функция закрытия
        this.popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
        this.popup.removeEventListener('click', this.closePopupByOverlay);
    }

    _handleEscClose(event) {                              //закрытие по Esc

        if (event.key === 'Escape') {
            
            this.closePopup();
        };
    };
    
    closePopupByOverlay(event) {                               //закрытие по клику
    
        if (event.target === event.currentTarget) {
            this.closePopup();
        };
    
    }

    setEventListeners() {

        this.closeButton = this.popup.querySelector('.popup__close');
        this.closeButton.addEventListener('click', this.closePopup);
        
    }

}