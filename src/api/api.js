const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-1",
  headers: {
    authorization: "e57c7ce8-a3e3-4b01-ae89-02cce4158d9f",
    "Content-Type": "application/json",
  },
};

function checkResponse(res, text) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`${text} ${res.status}`);
}

export async function getCards() {
  const res = await fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  });
  return checkResponse(res, "Ошибка загрузки карточек");
}

export function getUser() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(`Ошибка getUser ${res.status}`);
  });
}

export function updateUser(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  }).then((res) => {
    return checkResponse(res, "Ошибка обновления данных профиля");
  });
}

export async function addCard(name, link) {
  const res = await fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  });
  return checkResponse(res, "Ошибка добавления карточки");
}

export function deleteCardApi(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    return checkResponse(res, "Ошибка удаления карточки");
  });
}

export async function addLike(cardId) {
  const res = await fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  });
  return checkResponse(res, "Ошибка добавления лайка");
}

export async function removeLike(cardId) {
  const res = await fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
  return checkResponse(res, "Ошибка удаления лайка");
}

export async function updateAvatar(avaLink) {
  const res = await fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avaLink,
    }),
  });
  return checkResponse(res, "Ошибка обновления аватарки");
}
