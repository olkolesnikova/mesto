export default class UserInfo {

    constructor({ profileName, profileDescription, avatar }) {

        this.profileName = document.querySelector('.profile__name');
        this.profileDescription = document.querySelector('.profile__description');
        this.avatar = document.querySelector('.profile__avatar');

        this.editPopup = document.querySelector('.popup-edit-profile');
        this.inputList = Array.from(this.editPopup.querySelectorAll('.popup__input'));
    }

    getUserInfo() {

        return {
            name: this.profileName.textContent,
            description: this.profileDescription.textContent,
            avatar: this.avatar.src
            
        }
    }

    setUserInfo(data) {

        this.profileName.textContent = data.name;
        this.profileDescription.textContent = data.description;
        this.avatar.src = data.avatar;

        
    }

   
}

