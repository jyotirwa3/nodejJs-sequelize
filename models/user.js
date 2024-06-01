const {STRING, INTEGER, TEXT } = require("sequelize");

const db = require('../config/db');

const User = db.define("User", {
    username: STRING,
    email: STRING,
    password: TEXT,
}, {
    timestamps: false
});

module.exports = User;
