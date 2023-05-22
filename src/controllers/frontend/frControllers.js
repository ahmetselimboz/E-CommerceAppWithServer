const bookApi = require('../../config/bookApi');


const axios = require("axios");

const getHomePage = (req, res, next) => {
  try {
    const response = axios.get(
      "https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=NAF05od30BpNhBNEmIuTNGOAIpUU72a7"
    );
    response
      .then((result) => {
        var value = result.data.results;
        //console.log(value.lists[0]);
        //req.flash('id', value.lists[0].books[0].primary_isbn10);

        //console.log(result.data.results.lists[1]);


        res.render("index", {
          api: value,
          layout: "./layout/nonAuthorized.ejs",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error.data.fault);
  }
};

const getDetails = (req, res, next) => {
  // req.flash('id', "45854");

  console.log(bookApi);

  // const id = res.locals.id;
  // console.log(id);
  res.render("details", {val:req.session.book, layout: "./layout/nonAuthorized.ejs" });
};

const postDetails = (req, res, next) => {

  req.session.book = {
    id: req.body.id,
    title: req.body.title,
    author: req.body.author,
    img: req.body.img,
    publisher: req.body.publisher,
    desc: req.body.desc,
    width: req.body.image_width,
    height: req.body.image_height
  };

  console.log(req.session.book);

  res.render("details", {val:req.session.book, layout: "./layout/nonAuthorized.ejs" });
};

module.exports = {
  getHomePage,
  getDetails,
  postDetails,
};
