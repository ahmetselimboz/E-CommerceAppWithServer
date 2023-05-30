const { validationResult } = require("express-validator");
const User = require("../../models/userModel");
const passport = require("passport");
require("../../config/passport_local")(passport);
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jsonwebtoken = require("jsonwebtoken");
const { resourceLimits } = require("worker_threads");

const getLogin = (req, res, next) => {
  //console.log(res.locals.login_error[0] );

  res.render("login", {
    layout: false,
  });
};

const postLogin = (req, res, next) => {
  const hatalar = validationResult(req);

  if (!hatalar.isEmpty()) {
    req.flash("validation_error", hatalar.array());
    req.flash("email", req.body.email);

    res.redirect("/auth/login");
  } else {
    try {
      var hata = [];

      passport.authenticate("local", {
        successRedirect: "/homepage",
        failureRedirect: "/auth/login",
        failureFlash: true,
      })(req, res, next);

      
    } catch (error) {}
  }
};

const getRegister = (req, res, next) => {
  res.render("register", {
    layout: false,
  });
};
const postRegister = async (req, res, next) => {
  console.log(req.body);
  const hatalar = validationResult(req);

  if (!hatalar.isEmpty()) {
    req.flash("validation_error", hatalar.array());
    req.flash("email", req.body.email);
    req.flash("name", req.body.name);
    req.flash("surname", req.body.surname);

    res.redirect("/auth/register");
  } else {
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

        const jwtInfo = {
          id: newUser.id,
          email: newUser.email,
        };

        const jwtToken = jsonwebtoken.sign(
          jwtInfo,
          process.env.CONFIRM_MAIL_JWT_SECRET,
          { expiresIn: "1d" }
        );

        const url = process.env.WEB_SITE_URL + "auth/verify?id=" + jwtToken;

        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD,
          },
        });

        await transporter.sendMail(
          {
            from: "Kitap Dağı <info@kitapdagi.com>",
            to: newUser.email,
            subject: "Emailinizi lütfen onaylayın",
            text: "Emailiniz onaylamak için lütfen şu linke tıklayın: " + url,
          },
          (error, info) => {
            if (error) {
              console.log("Sending mail error: " + error);
            }
            console.log("Mail sended");
            console.log(info);
            transporter.close();
          }
        );

        req.flash("success_message", [
          { msg: "Lütfen mail kutunuzu kontrol ediniz" },
        ]);

        res.redirect("/auth/login");
      }
    } catch (error) {}
  }
};

const emailVerify = (req, res, next) => {
  const token = req.query.id;

  if (token) {
    try {
      jsonwebtoken.verify(
        token,
        process.env.CONFIRM_MAIL_JWT_SECRET,
        async (e, decoded) => {
          if (e) {
            req.flash(
              "error",
              "Gönderilen kod hatalı veya süresi geçmiş. Lütfen tekrar kayıt olunuz."
            );
            res.redirect("/login");
          } else {
            const tokenID = decoded.id;
            const result = await User.findByIdAndUpdate(tokenID, {
              emailIsActive: true,
            });

            if (result) {
              req.flash("success_message", [
                { msg: "Email başarıyla onaylandı. Giriş yapabilirsiniz." },
              ]);
              res.redirect("/auth/login");
            } else {
              req.flash("error", [
                "Bir hata oluştu. Lütfen tekrar kayıt olunuz.",
              ]);
              res.redirect("/auth/login");
            }
          }
        }
      );
    } catch (err) {}
  } else {
    console.log("There is no token");
  }
};

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
  getLogin,
  postLogin,
  getRegister,
  postRegister,
  emailVerify,
  getLogOut,
};
