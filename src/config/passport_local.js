const LocalStrategy = require("passport-local").Strategy;
const User = require('../models/userModel');
const bcrypt = require("bcrypt");

module.exports = function (passport){
    const options = {
        usernameField: "email",
        passwordField: "password"
    }

    passport.use(new LocalStrategy(options, async (email,password, done)=>{
   
        try {
            const _findUser = await User.findOne({email:email});

            if(!_findUser){
                return done(null, false, {message: 'Bu mailde bir kullanıcı kaydı bulunamadı'});

            }
            const checkPassword = await bcrypt.compare(password, _findUser.password);
            if(!checkPassword){
                return done(null, false, {message: "Şifrenizin doğru olduğundan emin olunuz"})
            }else{
                if(_findUser && _findUser.emailIsActive == false){
                    return done(null, false, {message:"Lütfen emailinizi onaylayınız"});
                }else{

                    return done(null, _findUser);
                }
            }

        } catch (error) {
            return done(error);
        }
    }));

    passport.serializeUser(function (user, done){
        process.nextTick(function(){
            done(null, {id: user.id});
        });
    });

    
    passport.deserializeUser(function (user, done){

        process.nextTick(function () {
            const userInfo = User.findById(user.id);
            userInfo.then(value => {
                
                return done(null, value);
            }).catch(err => {
                return done(err, value);
            });

        });
    });
}