import { Card } from "./Card.js";
import { initialCards, config } from "./constants.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from './Section.js';
import Popup from './Popup.js'
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import UserInfo from "./UserInfo.js";

const cardContainer = document.querySelector('.elements');
const zoomCardCaption = document.querySelector('.popup__image-caption');
const editButton = document.querySelector('.profile__edit-button');
const editProfileForm = document.querySelector('.popup-edit-profile'); //попап редактирования профиля
const nameProfile = document.querySelector('.profile__name');
const descriptionProfile = document.querySelector('.profile__description');
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const descriptionInput = editProfileForm.querySelector('.popup__input_type_description');
const addCardForm = document.querySelector('.popup-add-card'); //попап добавления карточки
const addCardFormButton = document.querySelector('.profile__add-button');
const titleInput = addCardForm.querySelector('.popup__input_type_title');
const linkInput = addCardForm.querySelector('.popup__input_type_link');
const closeButtons = document.querySelectorAll('.popup__close');

const zoomImagePopup = document.querySelector('.popup-open-image');
const zoomImage = zoomImagePopup.querySelector('.popup__zoom-image');

const editProfilePopup = new PopupWithForm('.popup-edit-profile', submitEditProfileForm);


const addNewCard = new PopupWithForm('.popup-add-card', handlerAddCardSubmit);
addNewCard.setEventListeners();

const imagePopup = new PopupWithImage('.popup-open-image');

const profileInfo = new UserInfo('.profile__name', '.profile__description');
console.log(profileInfo);

const openZoomImage = (cardData) => {
    imagePopup.openPopup(cardData);

}

const cardList = new Section({
    items: initialCards,
    renderer: (cardData) => {
        const card = new Card(cardData, '#card-template', openZoomImage);
        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
    }
}, '.elements');

cardList.renderItems();

const profileFormElement = document.querySelector('.popup-edit-profile');
const cardFormElement = document.querySelector('.popup-add-card');

const profileValidator = new FormValidator(config, profileFormElement);
const cardFormValidator = new FormValidator(config, cardFormElement);

profileValidator.enableValidation();
cardFormValidator.enableValidation();

function openEditForm() {
    editProfilePopup.openPopup(); //открытие формы редактирования
    /* nameInput.value = nameProfile.textContent;
    descriptionInput.value = descriptionProfile.textContent; */
    const userData = profileInfo.getUserInfo();
    console.log(userData);
    editProfilePopup.setInputValues(userData);
    //editProfilePopup.setInputValues(userData);
};

function submitEditProfileForm(event) {
    event.preventDefault();

    /* nameProfile.textContent = nameInput.value;
    descriptionProfile.textContent = descriptionInput.value; */

    profileInfo.setUserInfo({
        name: nameInput.value,
        description: descriptionInput.value
    });

    editProfilePopup.setEventListeners();

    editProfilePopup.closePopup();
}

/* const renderCardElement = (cardElement) => {
    cardContainer.prepend(cardElement);
} */

function handlerAddCardSubmit(event) {                       //сохранение карточки
    event.preventDefault();

    const name = titleInput.value;
    const link = linkInput.value;

    const inputs = Array.from(event.target.querySelectorAll('.popup__input'));
    const button = event.target.querySelector('.popup__submit');


    const cardData = {
        name: titleInput.value,
        link: linkInput.value
    };

    const card = new Card(cardData, '#card-template', openZoomImage);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);

    //renderCardElement(createdCardElement(cardData));

    addNewCard.closePopup();
    //event.target.reset();

    cardFormValidator.toggleButtonState();

}

/* function closePopupByEscape(event) {                              //закрытие по Esc

    const openedPopup = document.querySelector('.popup_opened');

    if (event.key === 'Escape') {
        closePopup(openedPopup);
    };
};

function closePopupByOverlay(event) {                               //закрытие по клику

    const openedPopup = document.querySelector('.popup_opened');

    if (event.target === event.currentTarget) {
        closePopup(openedPopup);
    };

} */

/* function openPopup(popup) {
    popup.classList.add('popup_opened'); //общая функция открытия попапа
    document.addEventListener('keydown', closePopupByEscape);
    popup.addEventListener('click', closePopupByOverlay);

}

function closePopup (popup) {                             //общая функция закрытия
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEscape);
    popup.removeEventListener('click', closePopupByOverlay);

} */

editButton.addEventListener('click', () => openEditForm());
//editProfileForm.addEventListener('submit', submitEditProfileForm);
addCardFormButton.addEventListener('click', () => addNewCard.openPopup());
//addCardForm.addEventListener('submit', handlerAddCardSubmit); //сохранение новой карточки

/* closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
}); */






/* const createdCardElement = (cardData) => {
    const card = new Card(cardData, '#card-template', openZoomImage);
    return card.generateCard();

}

initialCards.forEach((cardData) => {

    renderCardElement(createdCardElement(cardData));

}); */




