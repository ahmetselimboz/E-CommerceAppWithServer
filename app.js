const express = require('express');
const app = express();
require('dotenv').config();


app.get("/", (req, res, next) =>{
    res.send({
        mesaj: "Merhaba"
    })
})


app.listen(process.env.PORT, ()=>{
    console.log(`Server is standing to ${process.env.PORT} port`);
})