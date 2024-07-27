const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config()
const Mongo = process.env.MONGODB



function main() {
    mongoose.connect(Mongo).then(() => {
        console.log("MongoDB connected Succesfully")
    
    }).catch((err) => {
        console.log("Error: ", err)
    })
}

module.exports = { main };