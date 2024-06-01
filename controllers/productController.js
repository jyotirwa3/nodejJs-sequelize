const Product = require("../models/product")
const User = require("../models/user")

exports.create = async (req, res) => {
    const product = await Product.create(req.body)
    // res.json(product)
    res.redirect('/product')
}

exports.index = async (req, res) => {
    let products = await Product.findAll({
        include: User,
        where: { UserId: req.body.UserId },
    });
    res.send(products);
}

exports.trash = async (req, res) => {
    const id = req.params.id
    const product = await Product.findByPk(id)
    product.destroy()
    res.redirect("/product")
}