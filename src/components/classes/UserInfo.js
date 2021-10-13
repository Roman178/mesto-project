export class UserInfo {
  constructor(profileTitleSelector, profileSubtitleSelector) {
    this.profileTitle = document.querySelector(profileTitleSelector);
    this.profileSubtitle = document.querySelector(profileSubtitleSelector);
  }

  getUserInfo(getUserApi, callback) {
    if (!this.profileTitle.textContent || !this.profileSubtitle.textContent) {
      getUserApi.then((user) => {
        callback(user);
      });
    } else {
      callback({
        name: this.profileTitle.textContent,
        about: this.profileSubtitle.textContent,
      });
    }
  }

  setUserInfo() {}
}
