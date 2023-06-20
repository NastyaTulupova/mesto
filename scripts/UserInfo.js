class UserInfo {
  constructor({userNameSelector, userJobSelector}) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob =  document.querySelector(userJobSelector);
  }
  // получение информации из профиля
    getUserInfo() {
      return {
      name: this._userName.textContent,
      job: this._userJob.textContent,
      }
    }

    //Добавление инфы из формы в профиль
    setUserInfo({name, job}) {
this._userName.textContent = name;
this._userJob.textContent = job;
    }
  };

export {UserInfo};
