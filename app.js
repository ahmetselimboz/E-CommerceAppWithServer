const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");

const ejs = require("ejs");
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "/src/uploads")))
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./src/views/frontend"));

//require('./src/config/bookApi');

require("./src/config/database");
const MongoDBStore = require("connect-mongodb-session")(session);

const sessionStore = new MongoDBStore({
  uri: process.env.MONGODB_CONNECTION_STRING,
  collection: "sessions",
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
    store: sessionStore,
  })
);



app.use(flash());
app.use((req, res, next) => {
  res.locals.validation_error = req.flash("validation_error");
  res.locals.success_message = req.flash("success_message");
  res.locals.email = req.flash("email");
  res.locals.name = req.flash("name");
  res.locals.surname = req.flash("surname");
  res.locals.login_error = req.flash("error");
  next();
});





app.use(passport.initialize());
app.use(passport.session());
//app.use(passport.authenticate('session'));



const frRouter = require("./src/routers/frontend/frRouters");
const authRouter = require("./src/routers/frontend/authRouters");
const mobile_frRouter = require("./src/routers/mobile/mobile_frRouters");
const mobile_authRouter = require("./src/routers/mobile/mobile_authRouters");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// app.get("/", (req, res, next) => {
 
//   res.redirect("/");
// });

app.use("/", frRouter);
app.use("/auth", authRouter);
app.use("/mobile", mobile_frRouter);
app.use("/mobile/auth", mobile_authRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is standing to ${process.env.PORT} port`);
});

