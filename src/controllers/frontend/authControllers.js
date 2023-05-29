const { validationResult } = require("express-validator");
const User = require('../../models/userModel');
const passport = require('passport');
require('../../config/passport_local')(passport);
const bcrypt = require('bcrypt');

const getLogin = (req,res,next) =>{
    res.render('login', {
        layout: false
    });
}

const postLogin = (req,res,next) =>{
    const hatalar = validationResult(req);

    if (!hatalar.isEmpty()) {
        req.flash("validation_error", hatalar.array());
        req.flash("email", req.body.email);

        res.redirect("/auth/login");
    }else{
        passport.authenticate("local", {
            successRedirect: "/homepage",
            failureRedirect: '/auth/login',  
            failureFlash: true
        })(req, res, next);
    }
}


const getRegister = (req,res,next) =>{
    res.render('register', {
        layout: false
    });
}
const postRegister = async (req,res,next) =>{
    console.log(req.body);
    const hatalar = validationResult(req);

    if(!hatalar.isEmpty()){
        req.flash('validation_error', hatalar.array());
        req.flash('email', req.body.email);
        req.flash('name', req.body.name);
        req.flash('surname', req.body.surname);

        res.redirect("/auth/register");
    }else{
        try {
            const _user = await User.findOne({email: req.body.email});

            if (_user && _user.emailIsActive == true) {
                req.flash("validation_error", [{msg: "Bu mail zaten kayıtlı"}]);
                req.flash('email', req.body.email);
                req.flash('name', req.body.name);
                req.flash('surname', req.body.surname);
                res.redirect('/auth/register');
            }else if((_user && _user.emailIsActive == false) || _user == null){

                if (_user) {
                    await User.findByIdAndRemove({_id: _user.id});
                }
                
                const newUser = new User({
                    name: req.body.name,
                    surname: req.body.surname,
                    email: req.body.email,
                    password: await bcrypt.hash(req.body.password, 10)
                });

                await newUser.save();
                console.log("kullanici kaydedildi");
                req.flash('success_message', [{ msg: 'Kayıt işlemi gerçekleşti' }]);
                res.redirect("/auth/login");
            }
        } catch (error) {
            
        }
    }

}

module.exports = {
    getLogin,
    postLogin,
    getRegister,
    postRegister,
}