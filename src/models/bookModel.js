const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const buySchema = new Schema({ name: String, url: String });
const bookSchema = new Schema(
  {
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
    buy_links: {
      type: [buySchema],
      trim: true,
    }
  },
  { collection: "books", timestamps: true }
);

const Books = mongoose.model("Book", bookSchema);

module.exports = Books;
