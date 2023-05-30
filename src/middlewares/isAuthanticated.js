const yes = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        req.flash('error', ["Lütfen giriş yapın"]);
       res.redirect("/auth/login")
    }
}

const no = function(req, res, next){
    if(!req.isAuthenticated()){
        return next();
    }else{
        res.redirect("/homepage")
       
    }
}

module.exports ={
    yes,
    no
}

