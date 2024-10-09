class User {
    constructor({ id, username, displayName, avatar, email, password }) {
        this.id = id || null;
        this.username = username;
        this.displayName = displayName;
        this.avatar = avatar || null;
        this.email = email;
        this.password = password;
    }
}

module.exports = User;
