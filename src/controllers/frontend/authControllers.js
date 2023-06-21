const { validationResult } = require("express-validator");
const User = require("../../models/userModel");
const passport = require("passport");
require("../../config/passport_local")(passport);
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jsonwebtoken = require("jsonwebtoken");
const _ = require("passport-local-mongoose");
const Books = require("../../models/bookModel");
const Favorite = require("../../models/_favouriteModel");

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
      passport.authenticate("local", {
        successRedirect: "/homepage",
        failureRedirect: "/auth/login",
        failureFlash: true,
        successFlash: true,
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
  //console.log(req.body);
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

        const url = "process.env.WEB_SITE_URL" + "auth/verify?id=" + jwtToken;

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
            //console.log(info);
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
              res.redirect("/auth/email-confirmed");
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

const getEmailConfirmed = (req, res, next) => {
  res.render("emailConfirm", { layout: false });
};

const getLogOut = (req, res, next) => {
  req.flash("error", ["Bir hata oluştu. Lütfen tekrar kayıt olunuz."]);
  req.logout(function (err) {
    if (err) {
      return next(err);
    }

    req.session.destroy((error) => {
      res.clearCookie("connect.sid");

      res.redirect("/homepage");

      // res.redirect('/login');
    });
  });
};

const getForgetPassword = (req, res, next) => {
  res.render("forget_password", {
    layout: false,
  });
};

const postForgetPassword = async (req, res, next) => {
  const hatalar = validationResult(req);
  if (!hatalar.isEmpty()) {
    req.flash("validation_error", hatalar.array());
    req.flash("email", req.body.email);
    res.redirect("/auth/forget-password");
  } else {
    try {
      const _user = await User.findOne({
        email: req.body.email,
        emailIsActive: true,
      });

      if (_user) {
        const jwtPasswordInfo = {
          id: _user.id,
          email: _user.email,
        };

        const secret =
          process.env.FORGET_PASSWORD_SECRET + "-" + _user.password;

        const jwtPasswordToken = jsonwebtoken.sign(jwtPasswordInfo, secret, {
          expiresIn: "1d",
        });

        const url =
          process.env.WEB_SITE_URL +
          "auth/new-password?" +
          "id=" +
          _user.id +
          "&token=" +
          jwtPasswordToken;

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
            to: _user.email,
            subject: "Şifre Yenileme",
            text: "Şifrenizi yenilemek için lütfen şu linke tıklayın: " + url,
          },
          (error, info) => {
            if (error) {
              console.log("Sending mail error: " + error);
            }
            console.log("Mail sended");

            transporter.close();
          }
        );

        req.flash("success_message", [
          { msg: "Lütfen mail kutunuzu kontrol ediniz" },
        ]);

        res.redirect("/auth/login");
      } else {
        req.flash("validation_error", [
          { msg: "Bu mail kayıtlı değil veya emailiniz doğrulanmamış." },
        ]);
        req.flash("email", req.body.email);
        res.redirect("/auth/forget-password");
      }
    } catch (error) {}
  }
};

const getNewPassword = async (req, res, next) => {
  const tokenId = req.query.id;
  const token = req.query.token;
  //console.log(token);
  if (tokenId && token) {
    const _user = await User.findById(tokenId);

    const secret = process.env.FORGET_PASSWORD_SECRET + "-" + _user.password;

    if (token) {
      try {
        jsonwebtoken.verify(token, secret, async (e, decoded) => {
          if (e) {
            req.flash("error", "Kod hatalı veya süresi geçmiş");
            res.redirect("/auth/forget-password");
          } else {
            res.render("new-password", {
              id: tokenId,
              token: token,
              layout: false,
            });
          }
        });
      } catch (error) {}
    } else {
      console.log("token yok");
    }
  } else {
    req.flash("validation_error", [
      { msg: "Lütfen mailinizdeki linke tekrar tıklayın. Token bulunamadı." },
    ]);
    res.redirect("/auth/forget-password");
  }
};

const postNewPassword = async (req, res, next) => {
  const hatalar = validationResult(req);
  //console.log(req.body);
  if (!hatalar.isEmpty()) {
    req.flash("validation_error", hatalar.array());

    res.redirect(
      "/auth/new-password?id=" + req.body.id + "&token=" + req.body.token
    );
  } else {
    const _user = await User.findById(req.body.id);

    const secret = process.env.FORGET_PASSWORD_SECRET + "-" + _user.password;

    if (req.body.token) {
      try {
        jsonwebtoken.verify(req.body.token, secret, async (e, decoded) => {
          if (e) {
            req.flash("error", "Kod hatalı veya süresi geçmiş");
            res.redirect("/auth/forget-password");
          } else {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const result = await User.findByIdAndUpdate(req.body.id, {
              password: hashedPassword,
            });

            if (result) {
              req.flash("success_message", [
                { msg: "Şifreniz başarıyla yenilendi" },
              ]);
              res.redirect("/auth/login");
            } else {
              req.flash("error", [
                "Lütfen tekrar şifre adımlarını gerçekleştirin",
              ]);
              res.redirect("/auth/login");
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("There is no token");
    }
  }
};

const getProfile = async (req, res, next) => {
  if (req.user) {
    var finduser = await User.findOne({ _id: req.user.user.id });
  }
  const userrr = {
    user: finduser,
  };

  res.render("userProfile", {
    layout: "./layout/profileLayout.ejs",
    user: userrr,
  });
};

const postProfile = async (req, res, next) => {
  //console.log(req.body);

  if (req.body) {
    const hatalar = validationResult(req);

    if (!hatalar.isEmpty()) {
      req.flash("validation_error", hatalar.array());

      res.redirect("/auth/profile");
    } else {
      await User.findByIdAndUpdate(req.body.id, {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
      });
      req.flash("success_message", [
        { msg: "Profil bilgileriniz güncellendi" },
      ]);
      res.redirect("/");
    }
  } else {
    res.redirect("/auth/profile");
  }
};

const getUpdatePassword = (req, res, next) => {
  //console.log(req.user.user);
  res.render("updatePassword", {
    layout: "./layout/profileLayout.ejs",
    user: req.user,
  });
};

const postUpdatePassword = async (req, res, next) => {
  //console.log(req.body);
  if (req.body) {
    const hatalar = validationResult(req);

    if (!hatalar.isEmpty()) {
      req.flash("validation_error", hatalar.array());
      //console.log("Validasyon hatası");
      res.redirect("/auth/updatePassword");
    } else {
      try {
        const _findUser = await User.findById(req.body.id);
        //console.log(_findUser);
        if (!_findUser) {
          req.flash("error", ["Böyle bir kullanıcı kaydı bulunamadı"]);
          //console.log("User yok");
          res.redirect("/auth/updatePassword");
        } else {
          //console.log("Şifre karşılaştırılılıyor");
          const checkPassword = await bcrypt.compare(
            req.body.oldpass,
            _findUser.password
          );
          //console.log(checkPassword);
          //console.log("Şifre karşılaştırıldı");
          if (!checkPassword) {
            req.flash("error", ["Şifrenizin doğru olduğundan emin olunuz"]);
            //console.log("Şifre Yanlış");
            res.redirect("/auth/updatePassword");
          } else {
            await User.findByIdAndUpdate(req.body.id, {
              password: await bcrypt.hash(req.body.newpass, 10),
            });
            req.flash("success_message", [{ msg: "Şifre Güncellendi" }]);
            //console.log("Şifre Güncellendi");
            res.redirect("/");
          }
        }
      } catch (error) {}
    }
  } else {
    const hatalar = validationResult(req);

    if (!hatalar.isEmpty()) {
      req.flash("validation_error", hatalar.array());
      //console.log("Validasyon hatası");
      res.redirect("/auth/updatePassword");
    }
  }
};

const getFavorites = async (req, res, next) => {
  if (req.user.user) {

    const findFavor = await Favorite.findOne({ userId: req.user.user.id });
    if (!findFavor) {
      res.render("favorites", {
        book: 0,
        user: req.user,
        layout: "./layout/authorized.ejs",
      });
    } else {
      res.render("favorites", {
        book: findFavor.book,
        user: req.user,
        layout: "./layout/authorized.ejs",
      });
    }
  }
};

const addFavorite = async (req, res, next) => {
  if (req.body) {
    //console.log(req.body);
    const findFavor = await Favorite.findOne({ userId: req.body.user });
    const findBook = await Books.findOne({ _id: req.body.book });

    if (!findBook) {
      req.flash("error", ["Favorilere kaydedilemedi. Lütfen tekrar deneyiniz"]);
      //console.log("Hata1");
      res.redirect("/");
    } else {
      if (!findFavor && req.body.user) {
        const newFavorite = new Favorite();
        if (newFavorite.book.length == 0) {
          var value = 0;
        } else {
          var value = newFavorite.book.length + 1;
        }
        newFavorite.userId = req.body.user;
        newFavorite.book[value] = findBook;
        newFavorite.save();
        req.flash("success_message", [
          { msg: "Kitap favorilerinize kaydedildi" },
        ]);
        res.redirect("/auth/favorites");
      } else {
        for (let index = 0; index < findFavor.book.length; index++) {
          if (findFavor.book[index].id == req.body.book) {
            req.flash("error", [
              "Eklemek istediğiniz kitap zaten favorilerinizde mevcut",
            ]);
            return res.redirect("/details/" + req.body.book);
          }
        }
        if (findFavor.book.length == 0) {
          var value = 0;
        } else {
          var value = findFavor.book.length;
        }

        findFavor.book[value] = findBook;
        findFavor.save();
        req.flash("success_message", [
          { msg: "Kitap favorilerinize kaydedildi" },
        ]);
        res.redirect("/auth/favorites");
      }
    }
  }
};

const deleteFavorite = async (req, res, next) => {
  //console.log(req.params);

  if (req.params) {
    await Favorite.updateOne(
      { userId: req.params.userId },
      { $pull: { book: { _id: req.params.bookId } } }
    );
    req.flash("success_message", [
      { msg: "Kitap favorilerinizden kaldırıldı" },
    ]);
    res.redirect("/auth/favorites");
  }
};

module.exports = {
  getLogin,
  postLogin,
  getRegister,
  postRegister,
  getEmailConfirmed,
  emailVerify,
  getLogOut,
  getForgetPassword,
  postForgetPassword,
  getNewPassword,
  postNewPassword,
  getProfile,
  postProfile,
  getUpdatePassword,
  postUpdatePassword,
  getFavorites,
  addFavorite,
  deleteFavorite,
};
