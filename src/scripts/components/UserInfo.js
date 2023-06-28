class UserInfo {
  constructor({ userNameSelector, userJobSelector, userAvatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }
  // получение информации из профиля
  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userJob.textContent,
    };
  }

  //Добавление инфы из формы в профиль
  setUserInfo({ name, about }) {
    this._userName.textContent = name;
    this._userJob.textContent = about;
  }

  setUserAvatar (userInfo) {
    this._userAvatar.src = userInfo.avatar;
  }
}

export { UserInfo };
