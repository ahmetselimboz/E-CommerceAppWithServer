const Books = require("../../models/bookModel");

const getHomePage = async (req, res, next) => {
  const book = await Books.find({}).limit(21);


  res.render("index", {
    api: book,
    layout: "./layout/nonAuthorized.ejs",
  });
 
};

const getDetails = async (req, res, next) => {
  const id = req.params.id;

  const value = await Books.find({}).skip(21).limit(28);
  const book = await Books.findById(id).limit(21);

  
    res.render("details", {
      data: { api: book, val: value },
      layout: "./layout/nonAuthorized.ejs",
    });
};

const postDetails = (req, res, next) => {
 
};

module.exports = {
  getHomePage,
  getDetails,
  postDetails,
};
