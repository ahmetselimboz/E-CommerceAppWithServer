const LoaclStrategy = require("passport-local").Strategy;
const User = require('../models/userModel');
const bcrypt = require("bcrypt");

module.exports =function (passport){
    const options = {
        usernameField: "email",
        passwordField: "passport"
    }

    passport.use(new LoaclStrategy(options, async (email,password, done)=>{

        try {
            const _findUser = await User.findOne({email:email});

            if(!_findUser){
                return done(null, false, {message: 'Böyle bir kullanıcı bulunamadı'});

            }
            const checkPassword = await bcrypt.compare(sifre, _findUser.password);
            if(!checkPassword){
                return done(null, false, {message: "Hatalı şifre girdiniz"})
            }else{
                if(_findUser && _findUser.emailIsActive == false){
                    return done(null, false, {message:"Lütfen emailinizi onaylayınız"});
                }else{
                    return done(null, _findUser);
                }
            }

        } catch (error) {
            return done(err);
        }
    }));

    passport.serializedUser(function (user, done){
        process.nextTick(function(){
            done(null, {id: user.id});
        });
    });

    
    passport.deserializedUser(function (user, done){

        process.nextTick(function (){
            userInfo.then(value => {
                return done(null, value);
            }).catch(err => {
                return done(err, value);
            });
        });
    });
}