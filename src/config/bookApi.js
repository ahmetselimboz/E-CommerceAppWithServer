const axios = require("axios");

var value = [];

async function  book() {
  try {
    const response = await axios.get(
      "https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=NAF05od30BpNhBNEmIuTNGOAIpUU72a7"
    );
    response
      .then((result) => {
        for (i = 0; i < 7; i++) {
          for (j = 0; j < 15; j++) {
            return value.push(result.data.results.lists[i].books[j]);
          }
        }
       
       
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error.data.fault);
  }
}



module.exports = {
  book
};
