const express = require('express');
const { isExist } = require('../middlewares/auth');
const Product = require('../models/product');
const router = express.Router();
//// views user pages /////
router.get('/', (req, res) => {
    res.render('index')
})
router.get('/signup', (req, res) => {
    res.render('sign-up')
})
router.get('/login', (req, res) => {
    res.render('sign-in')
})
//// end views user pages /////

//// views product pages /////

router.get('/product', isExist, async (req, res) => {
    let product = await Product.findAll({
        where: { UserId: req.body.UserId },
        raw: true,
    });
    res.render("product", { product });
})

router.get('/addproduct', isExist, (req, res) => {
    res.render('addProduct')
})
//// end views user pages /////

module.exports = router