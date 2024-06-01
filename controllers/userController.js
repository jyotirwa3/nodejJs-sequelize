const User = require('../models/user')
const bcrypt = require('bcrypt')
const sendMail = require('../services/mail')
const { forgetPass } = require('../utils/emailFormat')
const Product = require('../models/product')
exports.signup = async (req, res) => {
    try {

        const hashPass = await bcrypt.hash(req.body.password, 10)
        req.body.password = hashPass
        let user = await User.create(req.body)

        if (user) {

            // res.json({ success: true, message: "data has been inserted!", user })
            // res.json(user)
            res.redirect('/login')
        }

    } catch (error) {

    }
}

exports.index = async (req, res) => {
    const user = await User.findAll();
    res.json({ user })
}

exports.userProduct = async (req, res) => {
    const user = await User.findAll({include:Product});
    res.json({ user })
}

exports.update = async (req, res) => {
    let { id } = req.params;
    let user = await User.findByPk(id)
    user = await user.update(req.body)
    res.send(user)
}

exports.trash = async (req, res) => {
    let { id } = req.params;
    let user = await User.findByPk(id)
    user = await user.destroy()
    res.send(user)
}

exports.signin = async (req, res) => {
    const { email } = req.body;
    let user = await User.findOne({ where: { email: email } })
    if (!user) {
        res.send("user not found")
    }
    const passMatch = await bcrypt.compare(req.body.password, user.password)
    if (!passMatch) {
        res.send("password not match")
    }
    res.send(user)
    // res.redirect('/')
}

let map = new Map()

exports.sendOtp = async (req, res) => {
    const { email } = req.body;
    let user = await User.findOne({ email: email })
    if (!user) {
        res.json("user not found")
    }
    let otp = Math.floor(100000 + Math.random() * 900000);
    map.set(email, otp)
    await sendMail(email, otp, 'forget password', forgetPass(otp))
    res.send("otp send successfully!")
}

exports.passwordReset = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    if (map.has(email)) {
        let oldOtp = map.get(email)
        console.log(oldOtp)
        if (oldOtp == otp) {
            let hashPass = await bcrypt.hash(newPassword, 10)
            let user = await User.findOne({ where: { email } })
            console.log(user)
            user.update({ password: hashPass })
            res.send("updated password")
        } else {
            res.json("otp not match")
        }
    }else{
        res.json("email not found")
    }
}