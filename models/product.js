const { STRING, INTEGER } = require('sequelize')
const db = require('../config/db')
const User = require('./user')

const productSchema = {
    title:STRING,
    category:STRING,
    image:STRING,
    price:INTEGER
}

const Product = db.define("Product", productSchema, {
    timestamps: false
})

User.hasMany(Product);
Product.belongsTo(User)

module.exports = Product

