const axios = require("axios");

const dizi = ["Elma", "Armut", "Portakal"];

try {
    const response = axios.get(
      "https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=NAF05od30BpNhBNEmIuTNGOAIpUU72a7"
    );
    response
      .then((result) => {

        // for(i=0;i<result.data.results.lists.length;i++){
        //     for(j=0;j<result.data.)
        // }
        var value = result.data;
        // console.log(value);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error.data.fault);
  }

module.exports = dizi;
