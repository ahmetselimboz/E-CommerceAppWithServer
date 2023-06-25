  const bookOfDay = require("../models/bookDay");
  const Books = require("../models/bookModel");
  




const bookOfDayFunc = async ()=>{

  
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
  
    const currentTime = year + "-" + month + "-" + date;
    const  dbDate = await bookOfDay.findById("6498b263dc7754c8373d70e6");
   
    let bookssss = new Date(dbDate.currentDate);
    let bookssly = new Date(currentTime);

    if (bookssly>bookssss) {
      function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      var randNum = getRndInteger(0, 230);
  
      const book = await Books.findOne({}).skip(randNum);

      
      return await bookOfDay.findByIdAndUpdate("6498b263dc7754c8373d70e6", {
        dayBookId: book.id,
        currentDate: bookssly
      });
       
    } else {
        
        return await bookOfDay.findById("6498b263dc7754c8373d70e6");
       
    }
}
   
  
module.exports = bookOfDayFunc;
