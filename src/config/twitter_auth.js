const TwitterStrategy = require("@superfaceai/passport-twitter-oauth2");
const passport = require("passport");
require("dotenv").config();
const User = require("../models/userModel");

passport.use(
  new TwitterStrategy(
    {
    clientType: 'confidential',
      clientID: process.env.TWITTER_CONSUMER_KEY,
      clientSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: "http://localhost:3000/auth/twitter/callback",
      userProfileURL  : "https://api.twitter.com/2/users/me",
      passReqToCallback : true,
    },
    async (token, tokenSecret, profile, done) => {
      console.log(profile);
      return done(null, profile);
    }
  )
);



module.exports = passport;
