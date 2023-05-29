export default class UserInfo {

    constructor({ profileName, profileDescription }) {

        this.profileName = document.querySelector('.profile__name');
        this.profileDescription = document.querySelector('.profile__description');

        this.editPopup = document.querySelector('.popup-edit-profile');
        this.inputList = Array.from(this.editPopup.querySelectorAll('.popup__input'));
    }

    getUserInfo() {

        return {
            name: this.profileName.textContent,
            description: this.profileDescription.textContent
        }
    }

    setUserInfo(data) {

        this.profileName.textContent = document.querySelector('.popup__input_type_name').value;
        this.profileDescription.textContent = document.querySelector('.popup__input_type_description').value;

    }



}

