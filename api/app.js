const express       = require("express"),
      app           = express(),
      cors          = require("cors"),
      scrapeRouter  = require("./routes/scrape");

app.use(cors());


app.use("/scrape", scrapeRouter);
      
app.listen(8000, function(err,done){
    if(err) throw err;
    else{
        console.log("App is listening !!!")
    }
})