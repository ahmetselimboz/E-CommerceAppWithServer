const TwitterStrategy = require("@superfaceai/passport-twitter-oauth2");
const passport = require("passport");
require("dotenv").config();
const User = require("../models/userModel");

passport.use(
  new TwitterStrategy(
    {
      clientType: "confidential",
      clientID: process.env.TWITTER_CONSUMER_KEY,
      clientSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: "http://localhost:3000/auth/twitter/callback",
    
    },
    async (token, tokenSecret, profile, done) => {
      //console.log(profile);
      const _findUser = await User.findOne({password: profile.id});

      if(!_findUser){
        const name = profile.displayName;
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
        newUser.email = "example@gmail.com";
        newUser.password = profile.id;
        newUser.emailIsActive = true;
        newUser.save();
        const info={
          user: _findUser,
          provider: "Twitter"
        }
        return done(null, info);
      }else{
        const info={
          user: _findUser,
          provider: "Twitter"
        }
        return done(null, info);
      }
    }
  )
);

module.exports = passport;
