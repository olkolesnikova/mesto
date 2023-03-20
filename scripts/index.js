const editButton = document.querySelector('.profile__edit-button');
const editProfileForm = document.querySelector('.popup');
const closeFormButton = editProfileForm.querySelector('.popup__close');
const nameProfile = document.querySelector('.profile__name');
const descriptionProfile = document.querySelector('.profile__description');
const submitFormButton = editProfileForm.querySelector('.popup__submit');
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const descriptionInput = editProfileForm.querySelector('.popup__input_type_description');

function openEditForm() {
    editProfileForm.classList.add('popup_opened');
    nameInput.value = nameProfile.innerHTML;
    descriptionInput.value = descriptionProfile.innerHTML; 
};

function closeEditForm() {
    editProfileForm.classList.remove('popup_opened');
};

function submitForm(evt) {
    evt.preventDefault();

    nameProfile.innerHTML = nameInput.value;
    descriptionProfile.innerHTML = descriptionInput.value;
    
    editProfileForm.classList.remove('popup_opened');

}

editButton.addEventListener('click', openEditForm);
closeFormButton.addEventListener('click', closeEditForm);
editProfileForm.addEventListener('submit', submitForm);

