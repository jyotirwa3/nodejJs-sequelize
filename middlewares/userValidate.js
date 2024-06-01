const User = require('../models/user');
const bcrypt = require('bcrypt')

const strategy = require('passport-local').Strategy;
exports.localStrategy = (passport) => {
    passport.use(new strategy({ usernameField: "email" }, async (email, password, done) => {
        const user = await User.findOne({ where: { email: email } })
        if (!user) {
            return done(null, false)
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return done(null, false)
        }
        return done(null, user)
    }))
    passport.serializeUser((user, done) => {
        return done(null, user.id)
    })
    passport.deserializeUser(async (id, done) => {
        const user = await User.findByPk(id);
        return done(null, user)
    })
}