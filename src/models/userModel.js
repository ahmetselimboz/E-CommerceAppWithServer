const mongoose =  require('mongoose')
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength:30
    },
    surname:{
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength:30
    },
    email:{
        type: String,
        required: true,
        trim:true,
        unique:true,
        lowercase: true
    },
    emailIsActive:{
        type: Boolean,
        default: false
    },
    password:{
        type: String,
        required: true,
        trim: true
       
    }
}, {collection:'users', timestamps:true});

// UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', UserSchema);
module.exports = User;
