export class UserInfo {
  constructor(profileTitleSelector, profileSubtitleSelector, profileImgAvatar) {
    this.profileTitle = document.querySelector(profileTitleSelector);
    this.profileSubtitle = document.querySelector(profileSubtitleSelector);
    this.profileImgAvatar = document.querySelector(profileImgAvatar);
  }

  getUserInfo(getUserApi, callback) {
    if (!this.profileTitle.textContent || !this.profileSubtitle.textContent) {
      getUserApi().then((user) => {
        callback(user);
      });
    } else {
      callback({
        name: this.profileTitle.textContent,
        about: this.profileSubtitle.textContent,
      });
    }
  }

  setUserInfo(user) {
    this.profileTitle.textContent = user.name;
    this.profileSubtitle.textContent = user.about;
  }

  setAvatar(user) {
    this.profileImgAvatar.src = user.avatar;
  }
}
