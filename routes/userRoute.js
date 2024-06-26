const { Router } = require('express')
const userController = require('../controllers/userController')
const passport = require('passport')
const { isExist } = require('../middlewares/auth')
const router = Router()
router.post('/signup', userController.signup)
router.post('/login', userController.signin)
router.get('/', userController.index)
router.get('/userProduct', userController.userProduct)
router.patch('/:id', userController.update)
router.delete('/:id', userController.trash)
router.post('/passportLogin', passport.authenticate("local"), (req, res) => {
    // res.send("logged in")
    res.redirect('/')
})
router.post('/forget',userController.sendOtp)
router.post('/changePass',userController.passwordReset)
module.exports = router