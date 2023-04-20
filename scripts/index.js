const cardTemplate = document.getElementById('card-template');
const cardContainer = document.querySelector('.elements');

const zoomImage = document.querySelector('.popup__zoom-image');
const zoomCardCaption = document.querySelector('.popup__image-caption');

const zoomImagePopup = document.querySelector('.popup-open-image');
const zoomImageCloseButton = zoomImagePopup.querySelector('.popup__close');

const editButton = document.querySelector('.profile__edit-button');
const editProfileForm = document.querySelector('.popup-edit-profile'); //попап редактирования профиля
const closeFormButton = editProfileForm.querySelector('.popup__close');
const nameProfile = document.querySelector('.profile__name');
const descriptionProfile = document.querySelector('.profile__description');
const submitFormButton = editProfileForm.querySelector('.popup__submit');
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const descriptionInput = editProfileForm.querySelector('.popup__input_type_description');
const addCardForm = document.querySelector('.popup-add-card'); //попап добавления карточки
const addCardFormButton = document.querySelector('.profile__add-button');
const closeAddFormButton = addCardForm.querySelector('.popup__close');
const editCardSubmit = addCardForm.querySelector('.popup__submit'); //кнопка Сохранить на втором попапе

const titleInput = addCardForm.querySelector('.popup__input_type_title');
const linkInput = addCardForm.querySelector('.popup__input_type_link');

const closeButtons = document.querySelectorAll('.popup__close');

//функция создания карточки
const createCardElement = (cardData) => {
    const cardElement = cardTemplate.content.querySelector('.element').cloneNode(true);
    const cardImage = cardElement.querySelector('.element__image');
    const cardName = cardElement.querySelector('.element__name');

    const likeButton = cardElement.querySelector('.element__button-like');
    const deleteButton = cardElement.querySelector('.element__button-trash');

    cardImage.src = cardData.link;
    cardName.textContent = cardData.name;
    cardImage.alt = cardData.name;

    const openZoomImage = (cardData) => {
        openPopup(zoomImagePopup);

        zoomImage.src = cardData.link;
        zoomCardCaption.textContent = cardData.name;
        zoomImage.alt = cardData.name;

    }

    cardImage.addEventListener('click', () => openZoomImage(cardData));

    const handlerLike = () => {
        likeButton.classList.toggle('element__button-like_type_active'); //клик по сердечку
    }

    const handlerDeleteCard = () => { //удаление карточки
        cardElement.remove();
    }

    likeButton.addEventListener('click', handlerLike);
    deleteButton.addEventListener('click', handlerDeleteCard);

    return cardElement;

}

const renderCardElement = (cardElement) => {
    cardContainer.prepend(cardElement);
}

//перебор исходного массиаа
initialCards.forEach((card) => {
    renderCardElement(createCardElement(card));
});

function openEditForm() {
    openPopup(editProfileForm); //открытие формы редактирования
    nameInput.value = nameProfile.textContent;
    descriptionInput.value = descriptionProfile.textContent;
};

function submitForm(evt) {
    evt.preventDefault();

    nameProfile.textContent = nameInput.value;
    descriptionProfile.textContent = descriptionInput.value;
    closePopup(editProfileForm);
}

function handlerAddCardSubmit(event) {                       //сохранение карточки
    event.preventDefault();

    const name = titleInput.value;
    const link = linkInput.value;

    const cardData = {
        name,
        link
    };

    renderCardElement(createCardElement(cardData));

    closePopup(addCardForm);
    event.target.reset();


}

const popupList = document.querySelectorAll('.popup');

/* const closePopupByEsc = (popup) => {                        //закрытие по Esc
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape') {
            closePopup(popup);
        };
    });
}; */

/* const closePopupByOverlay = (popup) => {                    //закрытие по клику

    popup.addEventListener('click', (event) => {
        if (event.target === event.currentTarget && popup.classList.contains('popup_opened')) {
            closePopup(popup);
        };
    });
     
}; */

function closePopupByEscape(event) {                              //закрытие по Esc

    const openedPopup = document.querySelector('.popup_opened');

    if (event.key === 'Escape') {
        closePopup(openedPopup);
    };
  };
  

 document.addEventListener('click', (event) => {
    //console.log(event.target);
    console.log(event);
    //console.log(event.currentTarget);
 });

function closePopupByOverlay(event) {                               //закрытие по клику

    const openedPopup = document.querySelector('.popup_opened');

    if (event.target === event.currentTarget) {
        closePopup(openedPopup);
    };

    console.log(openedPopup);
    console.log(event.target);
    console.log(event.currentTarget);

}

/* popupList.forEach((popup) => {
    closePopupByEscape(popup);
    closePopupByOverlay(popup);
});
 */

function openPopup (popup) {
    popup.classList.add('popup_opened'); //общая функция открытия попапа
    document.addEventListener('keydown', closePopupByEscape);
    popup.addEventListener('click', closePopupByOverlay);
    
}

const closePopup = (popup) => {                             //общая функция закрытия
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEscape);
    popup.removeEventListener('click', closePopupByOverlay);
    
}

editButton.addEventListener('click', openEditForm);
editProfileForm.addEventListener('submit', submitForm);
addCardFormButton.addEventListener('click', () => openPopup(addCardForm));
addCardForm.addEventListener('submit', handlerAddCardSubmit); //сохранение новой карточки

closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

