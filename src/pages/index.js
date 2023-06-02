import { Card } from "../components/Card.js";
import { initialCards, config } from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from '../components/Section.js';
import Popup from '../components/Popup.js'
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";


import '../pages/index.css';

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
editProfilePopup.setEventListeners();

const addNewCard = new PopupWithForm('.popup-add-card', handlerAddCardSubmit);
addNewCard.setEventListeners();

const imagePopup = new PopupWithImage('.popup-open-image');
imagePopup.setEventListeners();

const profileInfo = new UserInfo('.profile__name', '.profile__description');

const openZoomImage = (cardData) => {
    imagePopup.openPopup(cardData);

}

const cardList = new Section({
    items: initialCards,
    renderer: (cardData) => {
        cardList.addItem(createCard(cardData));
    }
}, '.elements');

cardList.renderItems();

const profileFormElement = document.querySelector('.popup-edit-profile');
const cardFormElement = document.querySelector('.popup-add-card');

const profileValidator = new FormValidator(config, profileFormElement);
const cardFormValidator = new FormValidator(config, cardFormElement);

profileValidator.enableValidation();
cardFormValidator.enableValidation();

function createCard(item) {
    const card = new Card(item, '#card-template', openZoomImage);
    const cardElement = card.generateCard();
    return cardElement;
}

function openEditForm() {

    editProfilePopup.openPopup(); //открытие формы редактирования
    const userData = profileInfo.getUserInfo();
    editProfilePopup.setInputValues(userData);
    
};

function submitEditProfileForm(userData) {

    profileInfo.setUserInfo({
        name: userData.name,
        description: userData.description
    });

    editProfilePopup.closePopup();
}

function handlerAddCardSubmit(addCardData) {                       //сохранение карточки
    
    const cardData = {
        name: addCardData.name,
        link: addCardData.link
    };

    cardList.addItem(createCard(cardData));
    addNewCard.closePopup();
    cardFormValidator.toggleButtonState();

}

editButton.addEventListener('click', () => openEditForm());
//editProfileForm.addEventListener('submit', submitEditProfileForm);
addCardFormButton.addEventListener('click', () => {
    addNewCard.openPopup();
    cardFormValidator.resetValidation();
});

//addCardForm.addEventListener('submit', handlerAddCardSubmit); //сохранение новой карточки

