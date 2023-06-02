const passport = require("../../config/google_auth");

const getGoogleAccount = passport.authenticate("google", {
  scope: ["email","profile"],
});

const postGoogleAccount = passport.authenticate("google", {
  successRedirect: "/homepage",
  failureRedirect: "/auth/login",
  failureMessage: true,
});

module.exports = {
  getGoogleAccount,
  postGoogleAccount,
};
