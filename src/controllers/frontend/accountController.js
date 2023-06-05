const passGo = require("../../config/google_auth");
const passFace = require("../../config/facebook_auth");
const passTwit = require("../../config/twitter_auth");
const axios = require('axios');

const getGoogleAccount = passGo.authenticate("google", {
  scope: ["profile", "email"],
});

const postGoogleAccount = passGo.authenticate("google", {
  successRedirect: "/homepage",
  failureRedirect: "/auth/login",
  failureMessage: true,
});

const getFacebook = passFace.authenticate("facebook", {
  //authType: "reauthenticate",
  //display: 'popup',
  scope: "email",
});

const postFacebook = passFace.authenticate("facebook", {
  successRedirect: "/homepage",
  failureRedirect: "/auth/login",
});

const getTwitter = passTwit.authenticate("twitter",{
  scope: ['tweet.read', 'tweet.write', 'users.read']
});

const postTwitter = 
  passTwit.authenticate("twitter", {
    successRedirect:"/",
    failureRedirect:"/auth/login"
  });






module.exports = {
  getGoogleAccount,
  postGoogleAccount,
  getFacebook,
  postFacebook,
  getTwitter,
  postTwitter,
};
