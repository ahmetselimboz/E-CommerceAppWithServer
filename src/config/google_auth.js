var GoogleStrategy = require('passport-google-oauth20');
const passport = require("passport");
require("dotenv").config();

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: process.env.WEB_SITE_URL + "auth/google/callback",
//       passReqToCallback: true,
//     },

//     function (request, accessToken, refreshToken, profile, done) {
//       console.log(profile);
//       return done(null, profile);
//     }
//   )
// );






passport.use(new GoogleStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: 'https://localhost:3000/oauth2/redirect/google',
    scope: [ 'profile' ],
    state: true
  },
  function verify(accessToken, refreshToken, profile, done) {
   
  }
));

console.log(process.env.GOOGLE_CLIENT_ID);







module.exports = passport;