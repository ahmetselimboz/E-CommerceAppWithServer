const Books = require("../../models/bookModel");
const Comments = require("../../models/commentModel");

const getMobileHomepage = async (req, res, next) => {
  const book = await Books.find({}).limit(21);
  res.json(book);
};

const postComment = async (req, res, next) => {
  //console.log(req.params);
  //const id = req.params.id;
  const id = req.body.id;
  console.log(id);
  let toplamYildiz = 0;
  let ondalikliToplam = 0;
  let rating = 0;
  //console.log(id);
  const enYeniDortYorum = await Comments.find({ bookId: id })
    .sort({ createdAt: "desc" })
    .limit(4);
  // console.log(enYeniDortYorum);
  const YorumSayisi = await Comments.find({ bookId: id }).count();

  const yorumlar = await Comments.find({ bookId: id });
  //console.log(yorumlar);
  for (let index = 0; index < yorumlar.length; index++) {
    toplamYildiz = toplamYildiz + Number(yorumlar[index].rank);
  }
  ondalikliToplam = toplamYildiz / yorumlar.length;
  rating = ondalikliToplam.toFixed(1);

  //console.log(rating);

  await Books.findByIdAndUpdate(id, { rating: rating.toString() });

  res.json({ yorum_Sayisi: YorumSayisi, yorumlar: enYeniDortYorum });
  
};

const postNewComment = (req, res, next) => {
  const com = new Comments();
  com.adSoyad = req.body.adSoyad;
  com.title = req.body.title;
  com.bookId = req.body.id;
  com.rank = req.body.rank;
  com.desc = req.body.desc;
  com.save();

  res.redirect(`/details/${req.body.id}`);
};

module.exports = {
  getMobileHomepage,
  postComment,
  postNewComment,
};
