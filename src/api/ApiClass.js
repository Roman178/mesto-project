export class ApiClass {
  constructor(options) {
    this._options = options;

    this.getUser = this.getUser.bind(this);
  }

  _checkResponse(res, text) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`${text} ${res.status}`);
  }

  async getInitialCards() {
    const res = await fetch(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers,
    });
    return this._checkResponse(res, "Ошибка загрузки карточек");
  }

  getUser() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(`Ошибка getUser ${res.status}`);
    });
  }

  updateUser(name, about) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._options.headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => {
      return this._checkResponse(res, "Ошибка обновления данных профиля");
    });
  }

  async addCard(name, link) {
    const res = await fetch(`${this._options.baseUrl}/cards`, {
      method: "POST",
      headers: this._options.headers,
      body: JSON.stringify({
        name,
        link,
      }),
    });
    return this._checkResponse(res, "Ошибка добавления карточки");
  }

  deleteCardApi(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._options.headers,
    }).then((res) => {
      return this._checkResponse(res, "Ошибка удаления карточки");
    });
  }

  async addLike(cardId) {
    const res = await fetch(`${this._options.baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._options.headers,
    });
    return this._checkResponse(res, "Ошибка добавления лайка");
  }

  async removeLike(cardId) {
    const res = await fetch(`${this._options.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._options.headers,
    });
    return this._checkResponse(res, "Ошибка удаления лайка");
  }

  async updateAvatar(avaLink) {
    const res = await fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._options.headers,
      body: JSON.stringify({
        avatar: avaLink,
      }),
    });
    return this._checkResponse(res, "Ошибка обновления аватарки");
  }
}
