const axios = require('axios')


const getHomePage =  (req, res, next) =>{

    try {
        
        const response =  axios.get("https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=29lQ4dwCehTz8q61Y7jNtx71Cgq6YSun");
        response.then((result) => {
        var value = result.data.results;
        

        res.render("index", {api:value, layout: false});
    }).catch((err) => {
        console.log(err);
    });

    } catch (error) {
        console.log(error.data.fault);
    }



    
   

   

}

module.exports = {
    getHomePage
}