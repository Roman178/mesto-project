export class UserInfo {
  constructor(
    profileTitleSelector,
    profileSubtitleSelector,
    profileImgAvatarSelector
  ) {
    this.profileTitle = document.querySelector(profileTitleSelector);
    this.profileSubtitle = document.querySelector(profileSubtitleSelector);
    this.profileImgAvatar = document.querySelector(profileImgAvatarSelector);
  }
  getUserInfo() {
    return {
      name: this.profileTitle.textContent,
      about: this.profileSubtitle.textContent,
    };
  }

  setUserInfo(user) {
    this.profileTitle.textContent = user.name;
    this.profileSubtitle.textContent = user.about;
  }

  setAvatar(user) {
    this.profileImgAvatar.src = user.avatar;
  }
}
