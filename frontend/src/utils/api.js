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
    return fetch(`${this._url}users/me`, {
      headers: this._headers,
    }).then(this._getRes);
  }

  getInitialCards() {
    return fetch(`${this._url}cards`, {
      headers: this._headers,
    }).then(this._getRes);
  }

  getInitialData() {
    return Promise.all([this.getProfileData(), this.getInitialCards()]);
  }

  editProfileAvatar(data) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._getRes);
  }

  editProfileInfo(data) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._getRes);
  }

  addCard(data) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._getRes);
  }

  deleteCard(_id) {
    return fetch(`${this._url}cards/${_id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._getRes);
  }

  changeLikeCardStatus(cardId, like) {
    const methodName = like ? 'PUT' : 'DELETE';
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: methodName,
      headers: this._headers,
    }).then(this._getRes);
  }
}

const api = new Api({
  url: 'https://vladimirfilippov.students.nomoredomains.sbs/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
