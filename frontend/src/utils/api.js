class Api {
    constructor(baseUrl, token) {
        this._baseUrl = baseUrl;
        this._token = token;

        this._headers = {
            authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNWM0MjMzNDFiMjgwNjJjYzIyZWQzMSIsImlhdCI6MTYzMzQzNjIyMywiZXhwIjoxNjM0MDQxMDIzfQ.lWCh9sVMMtD04ZuCHnEYfs2xYEhgIWz2IeK0a0I7zVY',
            'Content-Type': 'application/json; charset=utf-8'
        }
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }

    getCards(jwt) {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                "Authorization": `Bearer ${jwt}`,
            },
            })
            .then(this._checkResponse)
    }

    getUser(jwt) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                "Authorization": `Bearer ${jwt}`,
            },
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
        return fetch(`${this._baseUrl}/cards/${id}/likes/`, {
                method: 'PUT',
                headers: this._headers,
            })
            .then(this._checkResponse)
    }

    deleteLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes/`, {
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

const api = new Api('http://api.pers.nomoredomains.monster');
export default api;