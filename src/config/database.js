
const mongoose = require('mongoose');

const uri = process.env.MONGODB_CONNECTION_STRING;
// Prints "MongoServerError: bad auth Authentication failed."
mongoose.connect(uri, {
  serverSelectionTimeoutMS: 5000
  
}).then(()=>console.log('Connected Database')).catch(err => console.log(err.reason));


// const kPrimaryColor = Color(0xFF0C9869);
// const kTextColor = Color(0xFF3C4046);
// const kBackgroundColor = Color(0xFFF9F8FD);