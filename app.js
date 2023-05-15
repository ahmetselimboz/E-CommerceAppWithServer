const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');



const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, "./src/views/frontend"));






app.get("/", (req, res, next) =>{
    res.send({
        mesaj: "Merhaba"
    })
})

const frRouter = require('./src/routers/frontend/frRouters');

app.use('/', frRouter);

app.listen(process.env.PORT, ()=>{
    console.log(`Server is standing to ${process.env.PORT} port`);
})