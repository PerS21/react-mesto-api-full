class Api {
    constructor(baseUrl, token) {
        this._baseUrl = baseUrl;
        this._token = token;

        this._headers = {
            'jwt': this._token,
            'Content-Type': 'application/json; charset=utf-8',
        }
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }

    getCards() {
        const token = localStorage.getItem('jwt'); 
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                'jwt': token,
                'Content-Type': 'application/json; charset=utf-8',
            },
            credentials: 'include',
            })
            .then(this._checkResponse)
    }

    getUser() {
        const token = localStorage.getItem('jwt'); 
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                'jwt': token,
                'Content-Type': 'application/json; charset=utf-8',
            },
            credentials: 'include',
            })
            .then(this._checkResponse)
            .then(user => {
                return user
            })
    }

    addCard(name, link) {
        const token = localStorage.getItem('jwt'); 
        return fetch(`${this._baseUrl}/cards`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'jwt': token,
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify({
                    name: name,
                    link: link,
                })

            })
            .then(this._checkResponse)
    }

    deleteCard(cardId) {
        const token = localStorage.getItem('jwt'); 
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
                method: 'DELETE',
                headers: {
                    'jwt': token,
                    'Content-Type': 'application/json; charset=utf-8',
                },
                credentials: 'include',
            })
            .then(this._checkResponse)
    }

    patchUserInfo(name, about) {
        const token = localStorage.getItem('jwt'); 
        return fetch(`${this._baseUrl}/users/me`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'jwt': token,
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify({
                    name: name,
                    about: about,
                })
            })
            .then(this._checkResponse)
    }

    patchUserImg(avatar) {
        const token = localStorage.getItem('jwt'); 
        return fetch(`${this._baseUrl}/users/me/avatar`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'jwt': token,
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify({
                    avatar: avatar,
                })
            })
            .then(this._checkResponse)
    }

    putLike(id) {
        const token = localStorage.getItem('jwt'); 
        return fetch(`${this._baseUrl}/cards/${id}/likes/`, {
                method: 'PUT',
                headers: {
                    'jwt': token,
                    'Content-Type': 'application/json; charset=utf-8',
                },
                credentials: 'include',
            })
            .then(this._checkResponse)
    }

    deleteLike(id) {
        const token = localStorage.getItem('jwt'); 
        return fetch(`${this._baseUrl}/cards/${id}/likes/`, {
                method: 'DELETE',
                headers: {
                    'jwt': token,
                    'Content-Type': 'application/json; charset=utf-8',
                },
                credentials: 'include',
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

const api = new Api('http://localhost:3001');
export default api;