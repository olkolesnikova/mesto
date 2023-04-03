const initialCards = [
    {
        name: 'Архыз',
        link: './images/photo-grid_1.jpg'
    },
    {
        name: 'Челябинская область',
        link: './images/photo-grid_2.jpg'
    },
    {
        name: 'Иваново',
        link: './images/photo-grid_3.jpg'
    },
    {
        name: 'Камчатка',
        link: './images/photo-grid_4.jpg'
    },
    {
        name: 'Холмогорский район',
        link: './images/photo-grid_5.jpg'
    },
    {
        name: 'Байкал',
        link: './images/photo-grid_6.jpg'
    }
];

const cardTemplate = document.getElementById('card-template');
const cardContainer = document.querySelector('.elements')
const editCardPopup = document.querySelector('.popup-add-card');

//функция создания карточки
const createCardElement = (cardData) => {
    const cardElement = cardTemplate.content.querySelector('.element').cloneNode(true);
    const cardImage = cardElement.querySelector('.element__image');
    const cardName = cardElement.querySelector('.element__name');
    cardImage.src = cardData.link;
    cardName.textContent = cardData.name;

    const likeButton = cardElement.querySelector('.element__button-like');

    const handlerLike = function() {
        likeButton.classList.toggle('element__button-like_type_active'); //клик по сердечку
    }

    const deleteButton = cardElement.querySelector('.element__button-trash');

    const handlerDeleteCard = function() { //удаление карточки
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

const editButton = document.querySelector('.profile__edit-button');
const editProfileForm = document.querySelector('.popup'); //попап редактирования профиля
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


function openEditForm() {
    openPopupForm(editProfileForm); //открытие формы редактирования
    nameInput.value = nameProfile.textContent;
    descriptionInput.value = descriptionProfile.textContent;
};

function closeEditForm() {
    editProfileForm.classList.remove('popup_opened');
};

function submitForm(evt) {
    evt.preventDefault();

    nameProfile.textContent = nameInput.value;
    descriptionProfile.textContent = descriptionInput.value;

    editProfileForm.classList.remove('popup_opened');

}

/* function openAddCardForm() {
    addCardForm.classList.add('popup_opened'); //открытие формы добавления карточки
} */

function closeAddCardForm() {
    addCardForm.classList.remove('popup_opened');
}

function handlerAddCardSubmit(event) {
    event.preventDefault();

    const nameInput = addCardForm.querySelector('.popup__input_type_title');
    const linkInput = addCardForm.querySelector('.popup__input_type_link');
    
    const name = nameInput.value;
    const link = linkInput.value;

    const cardData = {
        name,
        link
    };

    renderCardElement(createCardElement(cardData));
    closeAddCardForm();

}

function openPopupForm(popupForm) {
    popupForm.classList.add('popup_opened');
}

editButton.addEventListener('click', openEditForm);
closeFormButton.addEventListener('click', closeEditForm);
editProfileForm.addEventListener('submit', submitForm);

addCardFormButton.addEventListener('click', openPopupForm(addCardForm));
closeAddFormButton.addEventListener('click', closeAddCardForm);

addCardForm.addEventListener('submit', handlerAddCardSubmit); //сохранение новой карточки

