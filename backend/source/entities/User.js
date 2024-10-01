class User {
    constructor({ id, username, surname, displayName, avatar, email, password }) {
        this.id = id || null;
        this.username = username;
        this.surname = surname;
        this.displayName = displayName;
        this.avatar = avatar || null;
        this.email = email;
        this.password = password;
    }
}

module.exports = User;
