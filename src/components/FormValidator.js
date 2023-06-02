export class FormValidator {

    constructor(config, formElement) {
        this._config = config;
        
        this._formElement = formElement;
        
    }


    _showInputError = (inputElement, errorMessage) => {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        console.log(errorElement);

        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._config.errorClass);

    }

    _hideInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.classList.remove(this._config.errorClass);
        errorElement.textContent = '';
    }

    _isValid = (inputElement) => {

        if (inputElement.checkValidity()) {
            this._hideInputError(inputElement); //валидный
        } else {
            this._showInputError(inputElement, inputElement.validationMessage); //невалидный

        }

    }

    _hasInvalidInput = () => {

        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    _setEventListeners = () => {
        this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);

        this.toggleButtonState();

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);

                this.toggleButtonState();
            });
        });
    }

    resetValidation() {
        this.toggleButtonState();
  
        this._inputList.forEach((inputElement) => {
          this._hideInputError(inputElement);
        });
  
      }
  
    toggleButtonState = () => {

        if (this._hasInvalidInput(this._inputList)) {
            this._buttonElement.classList.add(this._config.inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', '');
        } else {
            this._buttonElement.classList.remove(this._config.inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled');
        }
    };

    enableValidation = () => {
        this._formElement.addEventListener('submit', (event) => { 
             event.preventDefault(); 
        }); 
        this._setEventListeners();
    }

}

