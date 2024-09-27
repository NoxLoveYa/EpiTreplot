class User {
    constructor({ id, username, email, password }) {
        this.id = id || null;
        this.username = username;
        this.email = email;
        this.password = password;
    }
}

module.exports = User;
