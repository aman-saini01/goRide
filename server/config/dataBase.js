const mongoose = require("mongoose")
require("dotenv").config()
exports.dbConnect = () => {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(console.log("DB connection successfully"))
            .catch((err)=>{
                console.log(err)
                console.log("DB connection failed")
                process.exit(1)
            })
}
