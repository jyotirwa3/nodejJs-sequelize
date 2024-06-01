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
const Product = require('./models/product');
const { isExist } = require('./middlewares/auth');

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


//// views user pages /////
app.get('/', (req, res) => {
    res.render('index')
})
app.get('/signup', (req, res) => {
    res.render('sign-up')
})
app.get('/login', (req, res) => {
    res.render('sign-in')
})
//// end views user pages /////

//// views product pages /////

app.get('/product', isExist, async (req, res) => {
    let product = await Product.findAll({
        where: { UserId: req.body.UserId },
        raw: true,
    });
    res.render("product", { product });
})

app.get('/addproduct', isExist, (req, res) => {
    res.render('addProduct')
})
//// end views user pages /////


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