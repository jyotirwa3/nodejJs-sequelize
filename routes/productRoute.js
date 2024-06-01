const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const { isExist } = require('../middlewares/auth')

router.post('/', isExist,productController.create)
router.get('/', isExist, productController.index)
router.get('/:id', isExist, productController.trash)
module.exports = router