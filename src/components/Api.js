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
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }

            })
                        

    }
}