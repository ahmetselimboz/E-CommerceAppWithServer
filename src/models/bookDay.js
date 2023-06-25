const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bookSchema = new Schema(
  {
    dayBookId:{
        type:String,
        trim:true
    },
    currentDate:{
        type:Date,
        trim:true
    }

  },
  { collection: "bookOfDay", timestamps: true }
);

const bookOfDay = mongoose.model("bookOfDay", bookSchema);

module.exports = bookOfDay;
