const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session')
const passport = require('passport');



const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, "./src/views/frontend"));

require('./src/config/bookApi');


require('./src/config/database');
const MongoDBStore = require('connect-mongodb-session')(session);

const sessionStore = new MongoDBStore({
    uri: process.env.MONGODB_CONNECTION_STRING,
    collection: "sessions"
})


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    },
    store: sessionStore
}))





app.use(flash());
app.use((req,res,next)=>{
    res.locals.id = req.flash("id");
    next();
})

app.use(passport.initialize());
app.use(passport.session());


const frRouter = require('./src/routers/frontend/frRouters');
const frRouter = require('./src/routers/frontend/authRouters');

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) =>{
    res.redirect('/homepage');
})

app.use('/', frRouter);
app.use('/auth', authRouter);

app.listen(process.env.PORT, ()=>{
    console.log(`Server is standing to ${process.env.PORT} port`);
})