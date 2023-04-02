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
console.log(cardTemplate);


//функция создания карточки
const createCardElement = (cardData) => {
    const cardElement = cardTemplate.content.querySelector('.element').cloneNode(true);
    console.log(cardElement);

    const cardImage = cardElement.querySelector('.element__image');
    const cardName = cardElement.querySelector('.element__name');
    cardImage.src = cardData.link;
    cardName.textContent = cardData.name;

    const likeButton = cardElement.querySelector('.element__button-like');

    const handlerLike = function() {
        likeButton.classList.toggle('element__button-like_type_active');
    }

    likeButton.addEventListener('click', handlerLike);
    return cardElement;
    //console.log(cardData);
}

const renderCardElement = (cardElement) => {
    cardContainer.prepend(cardElement);
}

//перебор исходного массиаа
initialCards.forEach((card) => {
    renderCardElement(createCardElement(card));
});



const editButton = document.querySelector('.profile__edit-button');
const editProfileForm = document.querySelector('.popup');
const closeFormButton = editProfileForm.querySelector('.popup__close');
const nameProfile = document.querySelector('.profile__name');
const descriptionProfile = document.querySelector('.profile__description');
const submitFormButton = editProfileForm.querySelector('.popup__submit');
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const descriptionInput = editProfileForm.querySelector('.popup__input_type_description');
const addCardForm = document.querySelector('.popup__add-card');
const addCardFormButton = document.querySelector('.profile__add-button');
const closeAddFormButton = addCardForm.querySelector('.popup__close');

function openEditForm() {
    editProfileForm.classList.add('popup_opened'); //открытие формы редактирования
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

function openAddCardForm() {
    addCardForm.classList.add('popup_opened'); //открытие формы добавления карточки
}

function closeAddCardForm() {
    addCardForm.classList.remove('popup_opened');
}

editButton.addEventListener('click', openEditForm);
closeFormButton.addEventListener('click', closeEditForm);
editProfileForm.addEventListener('submit', submitForm);

addCardFormButton.addEventListener('click', openAddCardForm);
closeAddFormButton.addEventListener('click', closeAddCardForm);


