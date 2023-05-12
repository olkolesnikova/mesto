export class FormValidator {

    constructor(config, formElement) {
        this._config = config;
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;

        this._formElement = formElement;
    }


    _showInputError = (formElement, inputElement, errorMessage, config) => {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);

    }

    _hideInputError = (formElement, inputElement, config) => {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    _isValid = (formElement, inputElement, config) => {

        if (inputElement.checkValidity()) {
            this._hideInputError(formElement, inputElement, config); //валидный
        } else {
            this._showInputError(formElement, inputElement, inputElement.validationMessage, config); //невалидный

        }

    };

    _hasInvalidInput = (inputList) => {

        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };

    _setEventListeners = (formElement, config) => {
        const inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        const buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);

        this._toggleButtonState(inputList, buttonElement, config);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(formElement, inputElement, config);

                this._toggleButtonState(inputList, buttonElement, config);
            });
        });
    };

    _toggleButtonState = (inputList, buttonElement, config) => {


        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._config.inactiveButtonClass);
            buttonElement.setAttribute('disabled', '');
        } else {
            buttonElement.classList.remove(this._config.inactiveButtonClass);
            buttonElement.removeAttribute('disabled');
        }
    };

    enableValidation = (config) => {
        const formList = Array.from(document.querySelectorAll(this._config.formSelector));

        formList.forEach((formElement) => {
            formElement.addEventListener('submit', (event) => {
                event.preventDefault();
            });

            this._setEventListeners(formElement, config);
        });
    };


}

const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const profileFormElement = document.querySelector('.popup-edit-profile');
const cardFormElement = document.querySelector('.popup-add-card');

const profileValidator = new FormValidator(config, profileFormElement);
const cardFormValidator = new FormValidator(config, cardFormElement);

profileValidator.enableValidation();
cardFormValidator.enableValidation();