import { Card } from "../components/Card.js";
import { initialCards, config } from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from '../components/Section.js';
import Popup from '../components/Popup.js'
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Api from "../components/Api.js";


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
const profileAvatar = document.querySelector('.profile__avatar-hover');

const zoomImagePopup = document.querySelector('.popup-open-image');
const zoomImage = zoomImagePopup.querySelector('.popup__zoom-image');

const trashButton = document.querySelector('.element__button-trash');



const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-68',
    headers: {
        authorization: '71e140ff-2f6f-4fd2-8662-cbadd1dca0b9'
    }
})

let userId = null;

const cardsPromise = api.getCards()
    .then((cards) => {
        cards.forEach((data) => {

            cardList.addItem(createCard(data));

        })

    })
    .catch((err) => {
        console.log(err);
    })

const userInformation = api.getUserInfo()
    .then((res) => {
        userId = res._id;
        console.log(userId);
    });


const editProfilePopup = new PopupWithForm('.popup-edit-profile', submitEditProfileForm);
editProfilePopup.setEventListeners();

const addNewCard = new PopupWithForm('.popup-add-card', handlerAddCardSubmit);
addNewCard.setEventListeners();

const imagePopup = new PopupWithImage('.popup-open-image');
imagePopup.setEventListeners();

const editProfileAvatar = new PopupWithForm('.popup-edit-avatar', submitEditAvatarForm);
editProfileAvatar.setEventListeners();

const profileInfo = new UserInfo('.profile__name', '.profile__description');

const openZoomImage = (cardData) => {
    imagePopup.openPopup(cardData);

}

const popupConfirmation = new PopupWithConfirmation('.popup-with-confirmation'); //попап подтверждения

const onDeleteClick = (card) => {

    popupConfirmation.openPopup(() => {

        api.deleteCard(card.cardId)
            .then(() => {
                card.delete();
            })
            .catch((err) => console.log(err));

        popupConfirmation.closePopup();
    });

}

function onLikeClick(card) {

    if (card.isLiked) {
        api.deleteLike(card.cardId)
            .then((data) => {

                card.updateLikes(data.likes);
            })
            .catch((err) => console.log(err));
    } else {
        api.addLike(card.cardId)
            .then((data) => {

                card.updateLikes(data.likes);
            })
            .catch((err) => console.log(err));
    }


}

popupConfirmation.setEventListeners();

const cardList = new Section({

    renderer: (cardData) => {
        cardList.addItem(createCard(cardData));
    }
}, '.elements');

//cardList.renderItems(initialCards);

const profileFormElement = document.querySelector('.popup-edit-profile');
const cardFormElement = document.querySelector('.popup-add-card');
const editAvatarElement = document.querySelector('.popup-edit-avatar');

const profileValidator = new FormValidator(config, profileFormElement);
const cardFormValidator = new FormValidator(config, cardFormElement);
const editAvatarValidator = new FormValidator(config, editAvatarElement);

profileValidator.enableValidation();
cardFormValidator.enableValidation();
editAvatarValidator.enableValidation();

function createCard(data) {
    const card = new Card(data, '#card-template', openZoomImage, onDeleteClick, onLikeClick, userId);
    const cardElement = card.generateCard();
    return cardElement;
}

function openEditForm() {

    editProfilePopup.openPopup(); //открытие формы редактирования
    const userData = profileInfo.getUserInfo();
    editProfilePopup.setInputValues(userData);

};

function submitEditProfileForm(userData) {

    /* profileInfo.setUserInfo({
        name: userData.name,
        description: userData.description
    });

    editProfilePopup.closePopup(); */

    api.editProfileData({ name: nameInput.value, description: descriptionInput.value, avatar: profileAvatar.src })
        .then((data) => {
            profileInfo.setUserInfo({
                name: data.name,
                description: data.about,
                avatar: data.avatar

            })
        })
        .catch((err) => console.log(err));
    editProfilePopup.closePopup();

}

profileAvatar.addEventListener('click', () => editProfileAvatar.openPopup());

function submitEditAvatarForm(data) {

    api.updateUserAvatar(data)
        .then((data) => {
            profileInfo.setUserInfo({
                name: data.name,
                description: data.about,
                avatar: data.avatar
            });
            editProfileAvatar.closePopup();
        })
        .catch((err) => console.log(err));
}



function handlerAddCardSubmit(addCardData) {                       //сохранение карточки

    /* const cardData = {
        name: addCardData.name,
        link: addCardData.link
    };

    cardList.addItem(createCard(cardData)); */

    api.addNewCard({ name: addCardData.name, link: addCardData.link })
        .then((data) => {
            cardList.addItem(createCard(data));
            addNewCard.closePopup();
        })
        .catch((err) => console.log(err))


    cardFormValidator.toggleButtonState();

}


editButton.addEventListener('click', () => openEditForm());
//editProfileForm.addEventListener('submit', submitEditProfileForm);
addCardFormButton.addEventListener('click', () => {
    addNewCard.openPopup();
    cardFormValidator.resetValidation();
});

Promise.all([api.getUserInfo(), api.getCards()])
    .then(([user, cards]) => {
        profileInfo.setUserInfo({ name: user.name, description: user.about, avatar: user.avatar, id: user._id })
        cards.reverse();
    })
    .catch((err) => console.log(err));



