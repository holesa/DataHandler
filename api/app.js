const express       = require("express"),
      app           = express(),
      cors          = require("cors"),
      dotenv        = require("dotenv"),
      scrapeRouter  = require("./routes/scrape");

// Configure env
dotenv.config();

app.use(cors());
const port = process.env.port;

app.use("/scrape", scrapeRouter);
      
app.listen(port, function(err,done){
    if(err) throw err;
    else{
        console.log("App is listening !!!")
    }
})