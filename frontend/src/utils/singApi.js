class SingApi {
    constructor(baseUrl, token) {
        this._baseUrl = baseUrl;
        this._token = token;

        this._headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        }
    }

    signUp(mail, password) {
        return fetch(`${this._baseUrl}/signup`, {
                method: 'POST',
                credentials: 'include',
                headers: this._headers,
                body: JSON.stringify({
                    password: password,
                    email: mail
                })
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
    }

    signIn(mail, password) {
        return fetch(`${this._baseUrl}/signin`, {
                method: 'POST',
                credentials: 'include',
                headers: this._headers,
                body: JSON.stringify({
                    password: password,
                    email: mail
                })
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
    }

    check() {
        return fetch(`${this._baseUrl}/users/me`, {
                method: 'Get',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((res) => {
                return res.json();
            })
    }

}

const singApi = new SingApi('http://api.pers.nomoredomains.monster;');
export default singApi;