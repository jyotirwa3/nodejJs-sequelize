const express = require('express');
const db = require('./config/db');
const app = express()
const PORT = 5000

const session = require('express-session');
const passport = require('passport')
const { localStrategy } = require('./middlewares/userValidate')
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute')
const adminRoute = require('./routes/adminRoute');
const pageRoute = require('./routes/pageRoute')

/// req data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// session and passport
app.use(session({ secret: "jyoti" }))
localStrategy(passport)
app.use(passport.initialize())
app.use(passport.session())
//end session and passport


app.set('view engine', 'ejs')
app.set("views", __dirname + '/views')
app.use(express.static('public'))

app.use('/api/user', userRoute)
app.use('/api/product', productRoute)
app.use('/admin', adminRoute)



// //// views user pages /////


app.use('/', pageRoute)


// call db
app.listen(PORT, async () => {
    console.log(`listen port number = ${PORT}`)
    await db.sync()
        .then(() => {
            console.log('database connected👍');
        })
        .catch(err => {
            console.error('database not connected 😒', err);
        });
})