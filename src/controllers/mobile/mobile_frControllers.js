const Books = require("../../models/bookModel");
const Comments = require("../../models/commentModel");
const bookOfDayFunc = require("../../config/bookOfDayConfig");

const getMobileHomepage = async (req, res, next) => {

  if (req.session) {
    req.session.destroy();
  }
  const book = await Books.find({}).limit(21);
  res.json(book);
};

const postComment = async (req, res, next) => {
  if (req.session) {
    req.session.destroy();
  }
  //console.log(req.params);
  //const id = req.params.id;
  const id = req.body.id;
  let toplamYildiz = 0;
  let ondalikliToplam = 0;
  let rating = 0;
  //console.log(id);
  const enYeniDortYorum = await Comments.find({ bookId: id })
    .sort({ createdAt: "desc" })
    .limit(4);
  // console.log(enYeniDortYorum);
  const YorumSayisi = await Comments.find({ bookId: id }).count();
  const onerilenKitap = await Books.find({}).skip(21).limit(7);
  const yorumlar = await Comments.find({ bookId: id }).sort({
    createdAt: "desc",
  });
  //console.log(yorumlar);
  for (let index = 0; index < yorumlar.length; index++) {
    toplamYildiz = toplamYildiz + Number(yorumlar[index].rank);
  }
  ondalikliToplam = toplamYildiz / yorumlar.length;
  rating = ondalikliToplam.toFixed(1);

  //console.log(rating);

  await Books.findByIdAndUpdate(id, { rating: rating.toString() });

  res.json({
    yorum_Sayisi: YorumSayisi,
    yorumlar: yorumlar,
    onerilenKitap: onerilenKitap,
  });
};

const postNewComment = (req, res, next) => {
  if (req.session) {
    req.session.destroy();
  }
  console.log("istek geldi");
  console.log(req.body);
  const com = new Comments();
  com.nameSurname = req.body.nameSurname;
  com.title = req.body.title;
  com.bookId = req.body.id;
  com.rank = req.body.rank;
  com.desc = req.body.desc;
  com.save();

  console.log("veri geldi");
  //res.redirect(`/details/${req.body.id}`);
};

const getPage = async (req, res, next) => {
  var title;
  var book;

  if (req.params) {
    if (req.params.name == "edebiyat") {
      title = "Edebiyat";
      book = await Books.find({}).skip(0).limit(46);
    } else if (req.params.name == "bilim-kurgu") {
      title = "Bilim Kurgu";
      book = await Books.find({}).skip(46).limit(46);
    } else if (req.params.name == "cocuk") {
      title = "Çocuk";
      book = await Books.find({}).skip(92).limit(46);
    } else if (req.params.name == "kisisel-gelisim") {
      title = "Kişisel Gelişim";
      book = await Books.find({}).skip(148).limit(46);
    } else if (req.params.name == "tarih") {
      title = "Tarih";
      book = await Books.find({}).skip(194).limit(46);
    } else if (req.params.name == "psikoloji") {
      title = "Psikoloji";
      book = await Books.find({}).skip(0).limit(46);
    } else if (req.params.name == "felsefe") {
      title = "Felsefe";
      book = await Books.find({}).skip(46).limit(46);
    } else if (req.params.name == "cok-satan-kitaplar") {
      title = "Çok Satan Kitaplar";
      book = await Books.find({}).skip(92).limit(46);
    } else if (req.params.name == "indirimdekiler") {
      title = "İndirimdekiler";
      book = await Books.find({}).skip(148).limit(46);
    }

    if (title && book) {
      res.send({
        title: title,
        book: book,
      });
    } else {
      res.send({
        status: false,
      });
    }
  }
};

const getBookOfDay = async (req, res, next) => {
  const bookday = await bookOfDayFunc();

  const book = await Books.findById(bookday.dayBookId);

  res.send({
    book: [book],
  });
};

const getSearch = async (req, res, next) => {
  if (req.params) {
    console.log(req.params);
    const _findBook = await Books.find({ title: { $regex: req.params.name, $options:"i" } });

    if (_findBook) {
      res.send({
        title: "Arama Sonuçları",
        book: _findBook,
      });
    } else {
      res.send({
        status: false,
      });
    }


  }
};

module.exports = {
  getMobileHomepage,
  postComment,
  postNewComment,
  getPage,
  getBookOfDay,
  getSearch
};
