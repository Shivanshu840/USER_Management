const express = require("express");
const cors = require("cors");
const registerroute = require("./routes/Register");
const userprofile = require("./routes/client")
const app = express();
require('dotenv').config();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000

app.use("/register",registerroute);
app.use("/userprofile",userprofile);


app.listen(PORT,()=>{
    console.log(`server is running on this ${PORT}`);
})

module.exports = app;