const express = require("express");
const path = require("path");
const app = express();

const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.listen(PORT,()=>{
    console.log("Server is Running in Port 3000");
})
app.get("/",(req,res)=>{
    res.render("home");
})