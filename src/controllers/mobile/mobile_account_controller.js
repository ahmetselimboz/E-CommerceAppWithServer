const passport = require("../../config/google_auth");

const getGoogleAccount = passport.authenticate("google", {
  scope: ["email", "profile"],
});




  
  




module.exports = {
  getGoogleAccount,
  //postGoogleAccount,
};
