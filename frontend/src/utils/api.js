class Api {
  constructor({ url }) {
    this._url = url;
  }

  _getRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка HTTP: ${res.status}`);
  }

  getInitialData() {
    return Promise.all([this.getProfileData(), this.getInitialCards()]);
  }

  getProfileData() {
    return fetch(`${this._url}/users/me`, {
      headers: getHeaders()
    }).then(this._getRes);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: getHeaders()
    }).then(this._getRes);
  }

  editProfileAvatar({ avatar }) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._getRes);
  }

  editProfileInfo({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._getRes);
  }

  addCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._getRes);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: getHeaders()
    }).then(this._getRes);
  }

  changeLikeCardStatus(cardId, like) {
    const methodName = like ? 'PUT' : 'DELETE';
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: methodName,
      headers: getHeaders()
    }).then(this._getRes);
  }
}

let url = '';
const { NODE_ENV } = process.env;
if (NODE_ENV === 'production') {
  url = 'https://react-mesto-api-f6b8.onrender.com';
} else {
  url = 'http://localhost:3001';
}

const getHeaders = () => {
  return {
    'Accept': "application/json",
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
  }
}

const api = new Api({
  url: url,
});

export default api;
