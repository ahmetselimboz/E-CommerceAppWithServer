const passport = require("../../config/google_auth");
const http = require("http");

const getGoogleAccount = passport.authenticate("google", {
  scope: ["email", "profile"],
});

const googleSuccess = (req, res, next)=>{
  console.log('Successs');
  console.log(req.user);
  req.logIn(next, function (err) {

      
      var status = true;
      var truemesaj = " ";
      //console.log(res.locals.login_error[0] );
     res.json({
        durum: status,
        user: req.user,
        mesaj: truemesaj,
      });
     
    
  });
       
}


const postGoogleAccount = 
  
  passport.authenticate(
    "google", () =>{
      http.get("http://localhost:3000/mobile/auth/google/success/")
      //http.request({method:"POST",  path: "http://localhost:3000/mobile/auth/google/success/"})
    }
    
    

    // 
      
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
