class User {
    constructor({ id, userName, displayName, avatar, email, password }) {
        this.id = id || null;
        this.userName = userName;
        this.displayName = displayName;
        this.avatar = avatar || null;
        this.email = email;
        this.password = password;
    }
}

module.exports = User;
