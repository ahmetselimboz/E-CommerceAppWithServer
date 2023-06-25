const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema(
  {
    fotoId:{
      type:String,
      trim:true,
    },
    name: {
      type: String,
      default: "defaultUser.png",
    },
  },
  { collection: "image", timestamps: true }
);

// UserSchema.plugin(passportLocalMongoose);

const Image = mongoose.model("imsge", ImageSchema);
module.exports = Image;
