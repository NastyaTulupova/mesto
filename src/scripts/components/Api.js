class Api {
  constructor() {}

  _checkResponse(res) {
    if (res.ok) {
      // console.log(res.json());
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getUserInfoServer() {
    return fetch("https://nomoreparties.co/v1/cohort-70/users/me", {
      headers: {
        authorization: "e59ea592-c0c2-42e6-8473-e454683560cc",
      },
    })
      .then((res) => this._checkResponse(res))
      .then((result) => {
        console.log(result);
      });
  }

  getInitialCardsServer() {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-70/cards", {
      headers: {
        authorization: "e59ea592-c0c2-42e6-8473-e454683560cc",
      },
    })
      .then((res) => this._checkResponse(res))
      .then((result) => {
        console.log(result);
      });
  }

  setUserInfoServer(data) {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-70/users/me", {
      method: "PATCH",
      headers: {
        authorization: "e59ea592-c0c2-42e6-8473-e454683560cc",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
      .then((res) => this._checkResponse(res))
      .then((result) => {
        console.log(result);
      });
  }

  addNewCardServer(data) {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-70/cards", {
      method: "POST",
      headers: {
        authorization: "e59ea592-c0c2-42e6-8473-e454683560cc",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
      .then((res) => this._checkResponse(res))
      .then((result) => {
        console.log(result);
      });
  }
}

export { Api };
