class Api {
    constructor(baseUrl, token) {
        this._baseUrl = baseUrl;
        this._token = token;

        this._headers = {
            authorization: this._token,
            'Content-Type': 'application/json'
        }
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }

    getCards() {
        return fetch(`${this._baseUrl}/cards`, {
                headers: this._headers,
            })
            .then(this._checkResponse)
    }

    getUser() {
        return fetch(`${this._baseUrl}/users/me`, {
                headers: this._headers,
            })
            .then(this._checkResponse)
            .then(user => {
                return user
            })
    }

    addCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    name: name,
                    link: link,
                })

            })
            .then(this._checkResponse)
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
                method: 'DELETE',
                headers: this._headers,
            })
            .then(this._checkResponse)
    }

    patchUserInfo(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    name: name,
                    about: about,
                })
            })
            .then(this._checkResponse)
    }

    patchUserImg(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    avatar: avatar,
                })
            })
            .then(this._checkResponse)
    }

    putLike(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
                method: 'PUT',
                headers: this._headers,
            })
            .then(this._checkResponse)
    }

    deleteLike(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
                method: 'DELETE',
                headers: this._headers,
            })
            .then(this._checkResponse)
    }

    changeLikeCardStatus(id, like) {
        if (like) {
            return this.putLike(id)
        } else {
            return this.deleteLike(id)
        }
    }
}

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-25', 'da22e24c-dd01-4958-b7cb-8f4974dde69d');
export default api;