
const getRegister = (req,res,next) =>{
    res.render('register', {
        layout: false
    });
}

const getLogin = (req,res,next) =>{
    res.render('login', {
        layout: false
    });
}

module.exports = {
    getLogin,
    getRegister
}