class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _getRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка HTTP: ${res.status}`);
  }

  getProfileData() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(this._getRes);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then(this._getRes);
  }

  getInitialData() {
    return Promise.all([this.getProfileData(), this.getInitialCards()]);
  }

  editProfileAvatar({ avatar }) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._getRes);
  }

  editProfileInfo({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._getRes);
  }

  addCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._getRes);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._getRes);
  }

  changeLikeCardStatus(cardId, like) {
    const methodName = like ? 'PUT' : 'DELETE';
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: methodName,
      headers: this._headers,
    }).then(this._getRes);
  }
}

let url = '';
const { NODE_ENV } = process.env;
if ( NODE_ENV === 'production' ) {
  url = 'https://api.vladimirfilippov.students.nomoredomains.sbs';
} else {
  url = 'http://localhost:3001';
}

const token = localStorage.getItem('jwt');

const api = new Api({
  url: url,
  headers: {
    // 'Accept': 'application/json',
    'Content-Type': 'application/json',
    'authorization': `Bearer ${token}`,
  },
});

export default api;
