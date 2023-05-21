const axios = require('axios')


const getHomePage =  (req, res, next) =>{

    try {
        
        const response =  axios.get("https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=29lQ4dwCehTz8q61Y7jNtx71Cgq6YSun");
        response.then((result) => {
        var value = result.data.results;
        //console.log(result.data.results.lists[1]);

        res.render("index", {api:value, layout: "./layout/nonAuthorized.ejs"});
    }).catch((err) => {
        console.log(err);
    });

    } catch (error) {
        console.log(error.data.fault);
    }
}

const getDetails = (req,res,next)=>{
    res.render("details", {layout: "./layout/nonAuthorized.ejs"});
    
}

module.exports = {
    getHomePage,
    getDetails
}