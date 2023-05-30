const { validationResult } = require("express-validator");
const User = require("../../models/userModel");
const passport = require("passport");
require("../../config/passport_local")(passport);
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
const jsonwebtoken = require('jsonwebtoken');
const { log } = require("console");
const { boolean } = require("webidl-conversions");



// const getLogin = (req, res, next) => {
//  res.redirect("/mobile/login");
// };

const postLogin = (req, res, next) => {
  const hatalar = validationResult(req);

  if (!hatalar.isEmpty()) {
    req.flash("validation_error", hatalar.array());
    req.flash("email", req.body.email);

    res.redirect("/auth/login");
  } else {
    try {
        passport.authenticate("local", {
            successRedirect: "/homepage",
            failureRedirect: "/auth/login",
            failureFlash: true,
          })(req, res, next);
        
    } catch (error) {
        
    }
   
  }
};

const getRegister = (req, res, next) => {
  res.render("register", {
    layout: false,
  });
};
const postRegister = async (req, res, next) => {
  console.log("istek geldi");
  console.log(req.body);
  var deger = false;
    try {
      const _user = await User.findOne({ email: req.body.email });

      if (_user && _user.emailIsActive == true) {
        req.flash("validation_error", [{ msg: "Bu mail zaten kayıtlı" }]);
        req.flash("email", req.body.email);
        req.flash("name", req.body.name);
        req.flash("surname", req.body.surname);
        res.redirect("/auth/register");
      } else if ((_user && _user.emailIsActive == false) || _user == null) {
        if (_user) {
          await User.findByIdAndRemove({ _id: _user.id });
        }

        const newUser = new User({
          name: req.body.name,
          surname: req.body.surname,
          email: req.body.email,
          password: await bcrypt.hash(req.body.password, 10),
        });

        await newUser.save();
        console.log("kullanici kaydedildi");
        deger=true;
        const jwtInfo ={
          id: newUser.id,
          email: newUser.email
        }

        const jwtToken = jsonwebtoken.sign(jwtInfo, process.env.CONFIRM_MAIL_JWT_SECRET , {expiresIn: "1d"});

        const url = process.env.WEB_SITE_URL + "verify?id=" + jwtToken;

        let transporter = nodemailer.createTransport({
          service:"gmail",
          auth:{
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD
          }
        })

        await transporter.sendMail({
          from: "Kitap Dağı <info@kitapdagi.com>",
          to: newUser.email,
          subject: "Emailinizi lütfen onaylayın",
          text: "Emailiniz onaylamak için lütfen şu linke tıklayın: "+ url
        },(error, info)=>{
          if (error) {
            console.log("Sending mail error: " + error);
          }
          console.log("Mail sended");
          console.log(info);
          transporter.close();
        })
res.json(deger);

        //req.flash("success_message", [{ msg: "Lütfen mail kutunuzu kontrol ediniz" }]);

        //res.redirect("/auth/login");
      }
    } catch (error) {
      deger=false;
      res.json(deger);
    }
  
};

const emailVerify = (req,res,next)=>{

}



const getLogOut = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success_message", [{ msg: "Başarıyla çıkış yapıldı" }]);
    res.redirect("/homepage");
  });
};

module.exports = {

  postLogin,
  getRegister,
  postRegister,
  emailVerify,
  getLogOut,
};