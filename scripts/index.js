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

/* zoomImageCloseButton.addEventListener('click', () => {
    closePopup(zoomImagePopup)
}); */

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
        zoomImage.alt = cardData.link;

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

function handlerAddCardSubmit(event) {
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

const openPopup = (popup) => {
    popup.classList.add('popup_opened'); //общая функция открытия попапа
}

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openEditForm);
//closeFormButton.addEventListener('click', () => closePopup(editProfileForm));
editProfileForm.addEventListener('submit', submitForm);

addCardFormButton.addEventListener('click', () => openPopup(addCardForm));
//closeAddFormButton.addEventListener('click', () => closePopup(addCardForm));

addCardForm.addEventListener('submit', handlerAddCardSubmit); //сохранение новой карточки

closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

/* const formElement = document.querySelector('.popup__form-edit');
const inputElement = formElement.querySelector('.popup__input');
const errorElement = formElement.querySelector(`.${inputElement.id}-error`); */



const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    
    inputElement.classList.add(config.errorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
    
}

const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
}

const isValid = (formElement, inputElement, config) => {
    
    if (inputElement.checkValidity()) {
        hideInputError(formElement, inputElement, config); //валидный
    } else {
        showInputError(formElement, inputElement, inputElement.validationMessage, config); //невалидный
       
    }

};

const hasInvalidInput = (inputList) => {

    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    console.log(inputList)
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    console.log(buttonElement);

    toggleButtonState(inputList, buttonElement, config);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement);

            toggleButtonState(inputList, buttonElement, config);
        });
    });
};

const toggleButtonState = (inputList, buttonElement, config) => {
    
    
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(config.inactiveButtonClass);
        console.log(buttonElement);
        buttonElement.setAttribute('disabled', '');
    } else {
        buttonElement.classList.remove(config.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
};

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    console.log(formList);

    
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (event) => {
            event.preventDefault();
        });
    
    setEventListeners(formElement, config);
    });
};

//enableValidation();

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error'
  });