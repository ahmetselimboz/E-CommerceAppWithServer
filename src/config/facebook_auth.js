var FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
require("dotenv").config();
const User = require("../models/userModel");



passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.WEB_SITE_URL + "auth/facebook/callback",
      profileFields: ["name", "emails"]
    },
    async (accessToken, refreshToken, profile, done) => {
        //console.log(profile);
        
      const _findUser = await User.findOne({ email: profile.emails[0].value });

      if (!_findUser) {
        
        const newUser = new User();
        newUser.name = profile.name.givenName;
        newUser.surname = profile.name.familyName;
        newUser.email = profile.emails[0].value;
        newUser.emailIsActive = true;
        newUser.password = profile.id;
        newUser.save();
        const info={
          user: _findUser,
          provider: "Facebook"
        }
        return done(null, info);

      } else {
        const info={
          user: _findUser,
          provider: "Facebook"
        }
        return done(null, info);
      }
    }
  )
);

module.exports = passport;
