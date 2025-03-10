const express = require("express");
const path = require("path");
const app = express();
const moongoose = require("mongoose");
const PORT = 3000;
const cors = require('cors');


app.use(cors());


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));


app.listen(PORT, (req, res) => {
    console.log("Server is Running on PORT 3000");
})

app.get("/", (req, res) => {
    res.render("home.ejs");
})

async function connectDB() {
    await moongoose.connect("mongodb+srv://meditativedatabase:pkjYRYQhf0YPyyfs@meditativecluster.h6fcg.mongodb.net/?retryWrites=true&w=majority&appName=Meditativecluster");
}
try {
    connectDB().then((result) => {
        console.log("MongoDB is Connected");
    })
} catch (error) {
    console.log(error);
}

const meditative = moongoose.Schema({
    videoTitle: String,
    videoDesp: String,
    thumbnailLink: String,
    youtubeLink: String,
    category: String
})

let video = moongoose.model("video", meditative);

let video1 = new video({
    videoTitle: "Exaple",
    videoDesp: "Exaple",
    thumbnailLink: "Exaple",
    youtubeLink: "Exaple",
    category: "Exaple"
})

try {
    video1.save().then((result) => {
        console.log("Saved");
    });
} catch (err) {
    console.log(err);
}


app.get("/allcategories", (req, res) => {
    const chat = async () => {
        let r = await video.find({});
        console.log(r);
        res.json(r);
    }
    chat();
})


