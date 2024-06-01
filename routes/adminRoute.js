const { Router } = require('express')
const { isExist } = require('../middlewares/auth')
const router = Router()
router.get('/', isExist, (req, res) => {
    res.send("<h1>admin panel</h1>")
})
module.exports = router