export class UserInfo {
    constructor(profileTitleSelector, profileSubtitleSelector, profileImgAvatar) {
        this.profileTitle = document.querySelector(profileTitleSelector);
        this.profileSubtitle = document.querySelector(profileSubtitleSelector);
        this.profileImgAvatar = document.querySelector(profileImgAvatar);
    }
    getUserInfo(getUserApi, callback) {

        getUserApi().then((user) => {
            callback(user);
        });
    }

    setUserInfo(user) {
        this.profileTitle.textContent = user.name;
        this.profileSubtitle.textContent = user.about;
    }

    setAvatar(user) {
        this.profileImgAvatar.src = user.avatar;
    }
}