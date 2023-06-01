const passport = require("../../config/google_auth");

const getGoogleAccount = (req, res, next) => {
  console.log("geldim");
  passport.authenticate("google");
};
const postGoogleAccount = (req, res, next) => {
  passport.authenticate("google", {
    failureRedirect: "/auth/login",
    failureMessage: true,
  }),
    function (req, res) {
      res.redirect("/");
    };
};

module.exports = {
  getGoogleAccount,
  postGoogleAccount,
};
