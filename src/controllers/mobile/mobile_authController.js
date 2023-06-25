const { validationResult } = require("express-validator");
const User = require("../../models/userModel");
const passport = require("passport");
require("../../config/passport_local")(passport);
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jsonwebtoken = require("jsonwebtoken");
const Favorite = require("../../models/_favouriteModel");


const postLogin = (req, res, next) => {
  console.log("geldim");
  try {
      passport.authenticate("local", function (err, user, info) {
        //console.log(req);
        //console.log(user);
        if (err) {
          //console.log("cp1");
          //console.log(err);
        }
        if (!user) {
          req.session.destroy();
        }

        console.log(user);
        if (!user) {
          console.log("geldimfalse");
          var status = false;
          var truemesaj = "";

          var falseUser = {
            _id: "",
            name: "",
            surname: "",
            email: "",
            emailIsActive: false,
            password: "",
            createdAt: "",
            updatedAt: "",
            __v: 0,
          };

          res.json({
            durum: status,
            user: falseUser,
            mesaj: info.message,
          });
          /*  if(req.session){
            req.session.destroy();
          }*/
        }

        req.logIn(user, function (err) {
          console.log("cp1");
          if (err) {
            //console.log("cp3");
            //console.log(err);
          } else {
            console.log("geldimtrue");
            var status = true;
            var truemesaj = " ";
            //console.log(res.locals.login_error[0] );
            res.json({
              durum: status,
              user: req.user,
            mesaj: truemesaj,
          });
          if (req.session) {
            req.session.destroy();
          }
        }
      });
    })(req, res, next);

  } catch (error) {}
};


const postRegister = async (req, res, next) => {
  if (req.session) {
    req.session.destroy();
  }
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
      deger = true;
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
      res.json(deger);

      //req.flash("success_message", [{ msg: "Lütfen mail kutunuzu kontrol ediniz" }]);

      //res.redirect("/auth/login");
    }
  } catch (error) {
    deger = false;
    res.json(deger);
  }
};

// const emailVerify = (req, res, next) => {
//   const token = req.query.id;

//   if (token) {
//     try {
//       jsonwebtoken.verify(
//         token,
//         process.env.CONFIRM_MAIL_JWT_SECRET,
//         async (e, decoded) => {
//           if (e) {
//             req.flash(
//               "error",
//               "Gönderilen kod hatalı veya süresi geçmiş. Lütfen tekrar kayıt olunuz."
//             );
//             res.redirect("/login");
//           } else {
//             const tokenID = decoded.id;
//             const result = await User.findByIdAndUpdate(tokenID, {
//               emailIsActive: true,
//             });

//             if (result) {

//               res.redirect("/auth/email-confirmed");
//             } else {
//               req.flash("error", [
//                 "Bir hata oluştu. Lütfen tekrar kayıt olunuz.",
//               ]);
//               res.redirect("/auth/login");
//             }
//           }
//         }
//       );
//     } catch (err) {}
//   } else {
//     console.log("There is no token");
//   }
// };

// const getEmailConfirmed = (req, res, next)=>{
//   res.render("emailConfirm",
//   {layout:false})
// }

const getLogOut = (req, res, next) => {
  var durum = false;

  delete req.user;
  req.session.destroy();
  if (!req.user) {
    console.log("Çıkış yapıldı");
    durum = true;
    res.json(durum);
  } else {
    console.log("Çıkış yapılamadi");
    durum = false;
    res.json(durum);
  }
};

const postForgetPassword = async (req, res, next) => {
  if (req.session) {
    req.session.destroy();
  }
  var deger = false;

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

      const secret = process.env.FORGET_PASSWORD_SECRET + "-" + _user.password;

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
      deger = true;

      res.json({
        durum: deger,
        mesaj: "Lütfen mail kutunuzu kontrol ediniz",
      });
    } else {
      res.json({
        durum: deger,
        mesaj: "Bu mail kayıtlı değil veya emailiniz doğrulanmamış.",
      });
    }
  } catch (error) {}
};

const getNewPassword = async (req, res, next) => {
  if (req.session) {
    req.session.destroy();
  }
  const tokenId = req.query.id;
  const token = req.query.token;

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
  if (req.session) {
    req.session.destroy();
  }
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
              // req.flash("success_message", [
              //   { msg: "Şifreniz başarıyla yenilendi" },
              // ]);
              res.json({
                durum: true,
              });
            } else {
              // req.flash("error", [
              //   "Lütfen tekrar şifre adımlarını gerçekleştirin",
              // ]);
              res.json({
                durum: false,
              });
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

const refreshLocalDb = async (req, res, next) => {
  if (req.session) {
    req.session.destroy();
  }
  if (req.body.email) {
    const _user = await User.findOne({ email: req.body.email });

    if (_user) {
      res.json(_user.password);
    } else {
      console.log("Request deki email ile eşleşme yok");
    }
  } else {
    console.log("Request de email yok");
  }
};

const postNewGoogle = async (req, res, next) => {
  console.log(req.body);

  if (req.body) {
    const _findUser = await User.findOne({ email: req.body.email });

    if (!_findUser) {
      const name = req.body.name;
      var nameArray = "";
      var sonuc1 = name.split(" ");

      for (let index = 0; index < sonuc1.length; index++) {
        if (sonuc1[index] !== sonuc1[sonuc1.length - 1]) {
          nameArray = nameArray + sonuc1[index];
          nameArray = nameArray + " ";
        }
      }
      const newUser = new User();
      newUser.name = nameArray;
      newUser.surname = sonuc1[sonuc1.length - 1];
      newUser.email = req.body.email;
      newUser.password = req.body.password;
      newUser.emailIsActive = true;
      newUser.save();

      return res.json(true);
    } else {
      return res.json(false);
    }
  }
  return res.json(false);
};


const getFavorites = async (req,res,next)=>{
  var list = [];
  if (req.params) {
console.log(req.params.userId);
    const findFavor = await Favorite.findOne({ userId: req.params.userId });
    if (!findFavor) {
      res.send({
        book: list
      })
      
    } else {
      res.send({
        book: findFavor.book
      });
    }
  }
}

const addFavorite = async (req, res, next) => {
  if (req.body) {
    console.log(req.body);
    const findFavor = await Favorite.findOne({ userId: req.body.user });
    const findBook = await Books.findOne({ _id: req.body.book });

    if (!findBook) {
      
      res.send(false);

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
       
        res.send(true);
      } else {
        for (let index = 0; index < findFavor.book.length; index++) {
          if (findFavor.book[index].id == req.body.book) {
          
            res.send(true);
          }
        }
        if (findFavor.book.length == 0) {
          var value = 0;
        } else {
          var value = findFavor.book.length;
        }

        findFavor.book[value] = findBook;
        findFavor.save();
        
        res.send(true);
      }
    }
  }
};

module.exports = {

  postLogin,
 
  postRegister,
  //emailVerify,
  getLogOut,
  //getForgetPassword,
  postForgetPassword,
  getNewPassword,
  postNewPassword,
  //getEmailConfirmed
  refreshLocalDb,
  postNewGoogle,
  getFavorites,
  addFavorite
};
