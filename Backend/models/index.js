const mongoose = require("mongoose");
const uri = "mongodb+srv://rohitrandy002:qq3OGPBD2UhICNAt@cluster0.ij3af6j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


function main() {
    mongoose.connect(uri).then(() => {
        console.log("MongoDB connected Succesfully")
    
    }).catch((err) => {
        console.log("Error: ", err)
    })
}

module.exports = { main };