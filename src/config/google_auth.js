var GoogleStrategy = require("passport-google-oauth20");
const passport = require("passport");
require("dotenv").config();
const User = require("../models/userModel");
const session = require("express-session");


const options = {
  clientID:process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.WEB_SITE_URL +"auth/google/callback",
  scope: ["profile","email"],
  state: true,
};



passport.use(
  new GoogleStrategy(
    options,
     async (req, accessToken, refreshToken, profile, done) => {
      //console.log(profile);
      const _findUser = await User.findOne({email: profile.emails[0].value});

      if(!_findUser){
        const newUser = new User();
        newUser.name = profile.name.givenName;
        newUser.surname = profile.name.familyName;
        newUser.email = profile.emails[0].value; 
        newUser.emailIsActive = profile.emails[0].verified;
        newUser.password = profile.id;
        newUser.save();
        const info={
          user: _findUser,
          provider:"Google"
        }
       
        return done(null, info);
      }else{
        const info={
          user: _findUser,
          provider: "Google"
        }
        
        return done(null,info);
      }
    
    }
  )
);






module.exports = passport;
