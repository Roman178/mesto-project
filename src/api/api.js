const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-1",
  headers: {
    authorization: "e57c7ce8-a3e3-4b01-ae89-02cce4158d9f",
    "Content-Type": "application/json",
  },
};

export async function getCards() {
  const res = await fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  });
  if (res.ok) {
    const data = await res.json();
    return data;
  }

  return Promise.reject(`Ошибка ${res.status}`);
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
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка обновления данных профиля ${res.status}`);
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
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка добавления карточки ${res.status}`);
}
