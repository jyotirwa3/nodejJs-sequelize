const { Sequelize } = require("sequelize");

const db = new Sequelize("rnw", "jyoti", "Jyotiteena#321", {
    host: "localhost",
    dialect: 'mysql'
})

module.exports = db
