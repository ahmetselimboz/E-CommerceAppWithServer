const { Logger } = require("mongodb");
const Books = require("../../models/bookModel");
const Comments = require("../../models/commentModel");
//const moment = require('momentjs');
const { validationResult } = require("express-validator");
const axios = require("axios");

const getHomePage = async (req, res, next) => {

//   var num = ["00","25","50","75","99"]

// function  getRndInteger(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) ) + min;
// }
 


//   console.log(getRndInteger(10,70) + ","+ num[getRndInteger(0,4)]+" TL");

  const book = await Books.find({}).limit(21);

  if (req.user) {
    res.render("index", {
      api: book,
      user: req.user,
      layout: "./layout/authorized.ejs",
    });
  } else {
    res.render("index", {
      api: book,

      layout: "./layout/nonAuthorized.ejs",
    });
  }
};

const getDetails = async (req, res, next) => {
  const id = req.params.id;
  var sum = 0;
  var rating = 0;
  var roundRat = 0;
  var user;

  const value = await Books.find({}).skip(21).limit(7);
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

  if (req.user) {
    res.render("details", {
      data: {
        api: book,
        val: value,
        user: req.user,
        com: { info: comment, number: commentNumber },
        rat: roundRat,
      },
      user: req.user,
      layout: "./layout/authorized.ejs",
    });
  } else {
    res.render("details", {
      data: {
        api: book,
        val: value,
        user: req.user,
        com: { info: comment, number: commentNumber },
        rat: roundRat,
      },
      layout: "./layout/nonAuthorized.ejs",
    });
  }
};

const postComment = (req, res, next) => {
  //console.log(user.id);
  const hatalar = validationResult(req);

  if (!hatalar.isEmpty()) {
    req.flash("validation_error", hatalar.array());
    //console.log(hatalar.array());
    res.redirect("/details/" + req.body.id);
    //   res.render('register', {
    //     layout: "./layout/auth_layout.ejs", hatalar: hatalar.array()
    // })
  } else {
    const com = new Comments();
    com.nameSurname = `${req.user.user.name} ${req.user.user.surname}`;
    com.title = req.body.title;
    com.bookId = req.body.id;
    com.rank = req.body.rank;
    com.desc = req.body.desc;
    com.save();

    res.redirect(`/details/${req.body.id}`);
  }
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

  // res.render("allComments", {
  //   data: {
  //     com: { info: comment, count: comCount, num: numbers, rating: rat },
  //     book: book,
  //   },

  //   layout: "./layout/nonAuthorized.ejs",
  // });

  if (req.user) {
    res.render("allComments", {
      data: {
        com: { info: comment, count: comCount, num: numbers, rating: rat },
        book: book,
      },
      user: req.user,
      layout: "./layout/nonAuthorized.ejs",
    });
  } else {
    res.render("allComments", {
      data: {
        com: { info: comment, count: comCount, num: numbers, rating: rat },
        book: book,
      },

      layout: "./layout/nonAuthorized.ejs",
    });
  }
};

const getPage = async (req, res, next) => {
  var title;
  var book
  //console.log(req.params);
  if (req.params) {
  
  if (req.params.name == "edebiyat") {
    title = "Edebiyat";
    if (req.params.pg == "1") {
      book = await Books.find({}).skip(0).limit(20);
    }else if(req.params.pg == "2"){
      book = await Books.find({}).skip(20).limit(20);
    }else if(req.params.pg == "3"){
      book = await Books.find({}).skip(40).limit(12);
    }
  }else  if (req.params.name == "bilim-kurgu") {
    title = "Bilim Kurgu";
    if (req.params.pg == "1") {
      book = await Books.find({}).skip(52).limit(20);
    }else if(req.params.pg == "2"){
      book = await Books.find({}).skip(72).limit(20);
    }else if(req.params.pg == "3"){
      book = await Books.find({}).skip(92).limit(12);
    }
  }else  if (req.params.name == "cocuk") {
    title = "Çocuk";
    if (req.params.pg == "1") {
      book = await Books.find({}).skip(104).limit(20);
    }else if(req.params.pg == "2"){
      book = await Books.find({}).skip(124).limit(20);
    }else if(req.params.pg == "3"){
      book = await Books.find({}).skip(136).limit(12);
    }
  }else  if (req.params.name == "kisisel-gelisim") {
    title = "Kişisel Gelişim";
    if (req.params.pg == "1") {
      book = await Books.find({}).skip(148).limit(20);
    }else if(req.params.pg == "2"){
      book = await Books.find({}).skip(168).limit(20);
    }else if(req.params.pg == "3"){
      book = await Books.find({}).skip(188).limit(12);
    }
  }else if (req.params.name == "tarih") {
    title = "Tarih";
    if (req.params.pg == "1") {
      book = await Books.find({}).skip(0).limit(20);
    }else if(req.params.pg == "2"){
      book = await Books.find({}).skip(20).limit(20);
    }else if(req.params.pg == "3"){
      book = await Books.find({}).skip(40).limit(12);
    }
  }else if (req.params.name == "psikoloji") {
    title = "Psikoloji";
    if (req.params.pg == "1") {
      book = await Books.find({}).skip(52).limit(20);
    }else if(req.params.pg == "2"){
      book = await Books.find({}).skip(72).limit(20);
    }else if(req.params.pg == "3"){
      book = await Books.find({}).skip(92).limit(12);
    }
  }else if (req.params.name == "felsefe") {
    title = "Felsefe";
    if (req.params.pg == "1") {
      book = await Books.find({}).skip(104).limit(20);
    }else if(req.params.pg == "2"){
      book = await Books.find({}).skip(124).limit(20);
    }else if(req.params.pg == "3"){
      book = await Books.find({}).skip(136).limit(12);
    }
  }
  else if (req.params.name == "yeni-cikan-kitaplar") {
    title = "Yeni Çıkan Kitaplar";
    if (req.params.pg == "1") {
      book = await Books.find({}).skip(104).limit(20);
    }else if(req.params.pg == "2"){
      book = await Books.find({}).skip(124).limit(20);
    }else if(req.params.pg == "3"){
      book = await Books.find({}).skip(136).limit(12);
    }
  }
  else if (req.params.name == "indirimdekiler") {
    title = "İndirimdekiler";
    if (req.params.pg == "1") {
      book = await Books.find({}).skip(0).limit(20);
    }else if(req.params.pg == "2"){
      book = await Books.find({}).skip(20).limit(20);
    }else if(req.params.pg == "3"){
      book = await Books.find({}).skip(40).limit(12);
    }
  }
  


 
    //console.log(title);
    if (req.user) {
      res.render("defaultPage", {
        title: title,
        params: req.params,
        user: req.user,
        api: book,
        layout: "./layout/authorized.ejs",
      });
    } else {
      res.render("defaultPage", {
        title: title,
        api: book,
        params: req.params,
        layout: "./layout/nonAuthorized.ejs",
      });
    }
  }
};

module.exports = {
  getHomePage,
  getDetails,
  postComment,
  getAllComments,
  getPage,
};
