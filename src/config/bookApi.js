const axios = require("axios");
const Books = require("../models/bookModel");

var value = [];

function book() {
  try {
    const response = axios.get(
      "https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=NAF05od30BpNhBNEmIuTNGOAIpUU72a7"
    );
    response
      .then((result) => {
        
        //console.log(result);
        for (i = 0; i < result.data.results.lists.length; i++) {
          for (j = 0; j < result.data.results.lists[i].books.length; j++) {
            value = result.data.results.lists[i].books[j].buy_links;

            var d = new Books();
            d.author = result.data.results.lists[i].books[j].author;
            d.book_image = result.data.results.lists[i].books[j].book_image;
            d.book_image_width =
              result.data.results.lists[i].books[j].book_image_width;
            d.book_image_height =
              result.data.results.lists[i].books[j].book_image_height;

            d.description = result.data.results.lists[i].books[j].description;
            d.price = result.data.results.lists[i].books[j].price;
            d.publisher = result.data.results.lists[i].books[j].publisher;
            d.title = result.data.results.lists[i].books[j].title;
            d.rating = "";
            d.buy_links = [];

            for (let index = 0; index < value.length; index++) {
              if (value[index] !== undefined) {
                d.buy_links[index] = value[index];
                d.buy_links[index].lastPrice = "0";
              }
            }
            //d.save();
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

//book();
