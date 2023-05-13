export class Card {

    constructor (cardData, templateSelector, openZoomImage) {
        this._cardData = cardData;
          
        this._openZoomImage = openZoomImage;
            
        this._templateSelector = templateSelector;
    }
    
    _getTemplate() {
    
        const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
        
        return cardElement;
    }
    
    generateCard() {
    
        this._element = this._getTemplate();

        this._cardImage = this._element.querySelector('.element__image');
        
        this._element.querySelector('.element__name').textContent = this._cardData.name;
        this._cardImage.alt = this._cardData.name;
        this._cardImage.src = this._cardData.link;
    
        this._likeButton = this._element.querySelector('.element__button-like');
            
        this._deleteButton = this._element.querySelector('.element__button-trash');
    
        this._setEventListeners();
    
        return this._element;
    
    }
    
    _handlerLike = () => {
        this._likeButton.classList.toggle('element__button-like_type_active'); //клик по сердечку
    }
    
    _handlerDeleteCard = () => { //удаление карточки
        this._element.remove();
    }
    
    _setEventListeners() {
    
        this._likeButton.addEventListener('click', () => this._handlerLike());
    
        this._deleteButton.addEventListener('click', () => this._handlerDeleteCard());
    
        this._cardImage.addEventListener('click', () => this._openZoomImage(this._cardData));
        
    }
    
    }