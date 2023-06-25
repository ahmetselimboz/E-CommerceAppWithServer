const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const buySchema = new Schema({ name: String, url: String, linkPrice: String });

const favoriteBookSchema = new Schema({
  _id: {
    type: String,
    //required: true,
    trim: true,
  },
  buy_links: {
    type: [buySchema],
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
  book_image_width: {
    type: String,
    trim: true,
  },
  book_image_height: {
    type: String,
    trim: true,
  },
  description: {
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

  rating: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: String,
    trim: true,
    default: " ",
  },

  updatedAt: {
    type: String,
    trim: true,
    default: " ",
  },

  __v: {
    type: Number,
    trim: true,
    default: " ",
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
