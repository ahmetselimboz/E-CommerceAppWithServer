const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
.then(()=>console.log('Connected Database'))
.catch(err => console.log('Database Error: ' + err));