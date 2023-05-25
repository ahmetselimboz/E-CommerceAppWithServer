const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    bookId:{
        type:String,
        trim:true
    },
    adSoyad:{
        type:String, 
        trim:true
    },
    title:{
        type:String,
        trim: true
    },
    rank:{
        type:String,
        trim:true,
    },
    desc:{
        type:String,
        trim: true
    }
},{collection: "Comments", timestamps:true})

const Comment = mongoose.model('Comments', CommentSchema);

module.exports = Comment;