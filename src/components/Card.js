export class Card {

    constructor(cardData, templateSelector, openZoomImage, onDeleteClick, onLikeClick, userId) {
        this._cardData = cardData;

        this.name = cardData.name;
        this.link = cardData.link;
        this.owner = cardData.owner;
        this.ownerId = cardData.owner._id;
        this.userId = userId;
        this.cardId = cardData._id;
        this.likes = cardData.likes;
        this._openZoomImage = openZoomImage;

        this.onDeleteClick = onDeleteClick;
        this.onLikeClick = onLikeClick;

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

        this.likesCounter = this._element.querySelector('.element__counter');

        this.checkDeleteButtonOnCard();

        this.updateLikes(this.likes);

        this._setEventListeners();

        return this._element;

    }

    _handlerLike = () => {
        this._likeButton.classList.toggle('element__button-like_type_active'); //клик по сердечку
    }

    handlerDeleteCard = () => { //удаление карточки
        this._element.remove();
    }

    _handlerCardClick = () => {
        this._openZoomImage(this._cardData);
    }

    delete() {
        this._element.remove();
    }

    handlerDeleteClick() {
        this.onDeleteClick(this);
    }

    checkDeleteButtonOnCard() {

        if (!(this.userId === this.ownerId)) {
            this._deleteButton.remove();
        }
    }

    handlerLikeClick() {
        this.onLikeClick(this);
    }

    updateLikes(likes) {

        this.likes = likes;

        this.isLiked = this.likes.some((like) => like._id === this.userId);
        this._likeButton.classList.toggle('element__button-like_type_active', this.isLiked);
        this.likesCounter.textContent = this.likes.length;
    }

    _setEventListeners() {

        this._likeButton.addEventListener('click', () => this.handlerLikeClick());

        this._cardImage.addEventListener('click', () => this._handlerCardClick());

        this._deleteButton.addEventListener('click', () => this.handlerDeleteClick());
    }

}