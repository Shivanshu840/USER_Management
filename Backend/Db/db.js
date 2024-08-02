require('dotenv').config();
const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL)
.then(()=>{
    console.log("Database connected successfully");
}).catch((err)=>{
    console.log("Internal Server Error: ");
})

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,]
        },
    useremail:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,

    },
    password: {
        type: String,
        required: true,

    }
})



const USER = mongoose.model("USER",userSchema);

module.exports ={
     USER,
}