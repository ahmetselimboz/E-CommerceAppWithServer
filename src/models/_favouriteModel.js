const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const buySchema = new Schema({ name: String, url: String, linkPrice: String });

const favoriteBookSchema = new Schema({
  bookId: {
    type: String,
    //required: true,
    trim: true,
  },
  author: {
    type: String,
    trim: true,
  },
  book_image: {
    type: String,
    trim: true,
  },
  price: {
    type: String,
    trim: true,
  },
  publisher: {
    type: String,
    trim: true,
  },
  title: {
    type: String,
    trim: true,
  },
  buy_links: {
    type: [buySchema],
    trim: true,
  },
  rating: {
    type: String,
    trim: true,
  },
});
const favoriteSchema = new Schema(
  {
    userId: { type: String, trim: true },
    book: {
      type: [favoriteBookSchema],

      trim: true,
    },
  },
  { collection: "favourites", timestamps: true }
);

const Favourites = mongoose.model("Favourites", favoriteSchema);

module.exports = Favourites;
