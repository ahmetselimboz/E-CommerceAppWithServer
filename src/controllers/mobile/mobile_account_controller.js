const passport = require("../../config/google_auth");

const getGoogleAccount = passport.authenticate("google", {
  scope: ["email", "profile"],
});

const googleSuccess = (req, res, next)=>{
  console.log('Successs');

        var status = true;
        var truemesaj = " ";
   
        res.json({
          durum: status,
          user: req.user,
          mesaj: truemesaj,
        });
}


const postGoogleAccount = 
  
  passport.authenticate(
    "google",{
      successRedirect: "/mobile/auth/google/success",
      //failureRedirect: "/auth/login",
      failureMessage: true,
    }
   

    // (err, user, info) =>{
      
    //   if (!user) {
    //     console.log("geldimfalse");
    //     var status = false;
    //     var truemesaj = "";
  
    //     var falseUser = {
    //       _id: "",
    //       name: "",
    //       surname: "",
    //       email: "",
    //       emailIsActive: false,
    //       password: "",
    //       createdAt: "",
    //       updatedAt: "",
    //       __v: 0,
    //     };
  
    //     res.json({
    //       durum: status,
    //       user: falseUser,
    //       mesaj: truemesaj,
    //     });
    //     if(req.session){
    //       req.session.destroy();
    //     }
    //   }else{
    //     console.log("geldimtrue");
    //       var status = true;
    //       var truemesaj = " ";
     
    //       res.json({
    //         durum: status,
    //         user: req.user,
    //         mesaj: truemesaj,
    //       });
    //       if(req.session){
    //         req.session.destroy();
    //       }
    //   }
  
      
    // }
  );




module.exports = {
  getGoogleAccount,
  postGoogleAccount,
  googleSuccess
};
