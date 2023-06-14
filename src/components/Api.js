export default class Api {

    constructor(config) {
        this.url = config.url;
        this.headers = config.headers;
        this.authorization = config.headers.authorization;
    }

    getCards() {

        return fetch(`${this.url}/cards`, {
            headers: {
                authorization: this.authorization,
                'Content-type': 'application/json',
            },
        })
            .then(this.handleResponse);
    }

    getUserInfo() {

        return fetch(`${this.url}/users/me`, {
            headers: {
                authorization: this.authorization,
                'Content-type': 'application/json',
            },
        })
            .then(this.handleResponse);
    }

    editProfileData(data) {

        return fetch(`${this.url}/users/me`, {

            method: 'PATCH',
            headers: {
                authorization: this.authorization,
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                name: data.name,
                about: data.description,
                avatar: data.avatar
            })
        })
            .then(this.handleResponse);
    }

    addNewCard(data) {

        return fetch(`${this.url}/cards`, {

            method: 'POST',
            headers: {
                authorization: this.authorization,
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(this.handleResponse);

    }

    deleteCard(cardId) {

        return fetch(`${this.url}/cards/${cardId}`, {

            method: 'DELETE',
            headers: {
                authorization: this.authorization,
                'Content-type': 'application/json',
            }
        })
            .then(this.handleResponse);

    }

    addLike(cardId) {

        return fetch(`${this.url}/cards/${cardId}/likes`, {

            method: 'PUT',
            headers: {
                authorization: this.authorization,
                'Content-type': 'application/json',
            }
        })
            .then(this.handleResponse);

    }

    deleteLike(cardId) {

        return fetch(`${this.url}/cards/${cardId}/likes`, {

            method: 'DELETE',
            headers: {
                authorization: this.authorization,
                'Content-type': 'application/json',
            }
        })
            .then(this.handleResponse);

    }

    updateUserAvatar(avatar) {

        return fetch(`${this.url}/users/me/avatar`, {

            method: 'PATCH',
            headers: {
                authorization: this.authorization,
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                avatar: avatar.link
            })
        })
            .then(this.handleResponse);

    }


    handleResponse(res) {

        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }
    }


    
