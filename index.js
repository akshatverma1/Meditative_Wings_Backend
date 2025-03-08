const express = require("express");
const path = require("path");
const app = express();
const moongoose = require("mongoose");
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));


app.listen(PORT, (req, res) => {
    console.log("Server is Running on PORT 3000");
})

app.get("/", (req, res) => {
    res.render("home.ejs");
})

async function connectDB() {
    await moongoose.connect("mongodb://127.0.0.1:27017/test");
}
try {
    connectDB().then((result) => {
        console.log("MongoDB is Connected");
    })
} catch (error) {
    console.log(error);
}

const meditative = moongoose.Schema({
    videoTitle : String,
    videoDesp :String,
    thumbnailLink :String,
    youtubeLink :String,
    category:String
})

let video = moongoose.model("video",meditative);