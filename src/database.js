const mongoose = require("mongoose");
require("dotenv").config()


module.exports.connectMongoDb = async () => {
    try{
      await  mongoose.connect(process.env.DBURL,
            {
              useNewUrlParser: true,
              useUnifiedTopology: true
            }
          );
          console.log("Connected to MongoDB")
    }catch(e){
        console.log('Database not connected', e)
    }
}

