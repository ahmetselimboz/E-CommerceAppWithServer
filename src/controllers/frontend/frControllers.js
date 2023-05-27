const Books = require("../../models/bookModel");
const Comments = require("../../models/commentModel");
//const moment = require('momentjs');

const getHomePage = async (req, res, next) => {
 const book = await Books.find({}).limit(21);
res.json(book);
  /*res.render("index", {
    api: book,
    layout: "./layout/nonAuthorized.ejs",
  });*/

};

const getDetails = async (req, res, next) => {
  const id = req.params.id;
  var sum = 0;
  var rating = 0;
  var roundRat = 0;

  const value = await Books.find({}).skip(21).limit(28);
  const book = await Books.findById(id);
  const comment2 = await Comments.find({ bookId: id });
  const comment = await Comments.find({ bookId: id })
    .sort({ createdAt: "desc" })
    .limit(4);
  const commentNumber = await Comments.find({ bookId: id }).count();

  for (let index = 0; index < comment2.length; index++) {
    sum = sum + Number(comment2[index].rank);
  }
  sayi = sum / comment2.length;
  rating = sayi.toFixed(1);
  if (rating.toString() === "NaN") {
    rating = "0";
  }
  roundRat = Math.round(rating);

  await Books.findByIdAndUpdate(id, { rating: rating.toString() });
  res.render("details", {
    data: {
      api: book,
      val: value,
      com: { info: comment, number: commentNumber },
      rat: roundRat,
    },
    layout: "./layout/nonAuthorized.ejs",
  });
};

const postComment = (req, res, next) => {
  const com = new Comments();
  com.adSoyad = req.body.adSoyad;
  com.title = req.body.title;
  com.bookId = req.body.id;
  com.rank = req.body.rank;
  com.desc = req.body.desc;
  com.save();

  res.redirect(`/details/${req.body.id}`);
};

const getAllComments = async (req, res, next) => {
  const id = req.params.id;
  numbers = [];
  var rat = 0;
  var rating = 0;

  const comCount = await Comments.find({ bookId: id }).count();
  const comment = await Comments.find({ bookId: id }).sort({
    createdAt: "desc",
  });
  const book = await Books.findById(id);

  for (v = 1; v <= 5; v++) {
    const num = await Comments.find({ bookId: id, rank: v }).count();
    //console.log(num);
    numbers.push(v);
    numbers.push(num);
  }
  rat = Math.round(book.rating);

  //console.log(numbers);

  res.render("allComments", {
    data: { com: { info: comment, count: comCount, num: numbers, rating: rat }, book: book },

    layout: "./layout/nonAuthorized.ejs",
  });
};

module.exports = {
  getHomePage,
  getDetails,
  postComment,
  getAllComments,
};
