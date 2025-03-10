const express = require("express");
const path = require("path");
const app = express();
const moongoose = require("mongoose");
const PORT = 3000;
const cors = require('cors');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const bodyParser = require('body-parser');
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


let med1 = moongoose.model("med1",meditative);



app.get("/allcategories", (req, res) => {
    const chat = async () => {
        let r = await med1.find({});
        console.log(r);
        res.json(r);
    }
    chat();
})

app.post("/newRequest",(req,res)=>{
    let {videoTitle,videoDesp,thumbnailLink,youtubeLink,category} = req.body;
    console.log(videoTitle+" "+videoDesp+" "+thumbnailLink+" "+youtubeLink+" "+category);
    let medi1 = new med1({
        videoTitle: videoTitle,
        videoDesp: videoDesp,
        thumbnailLink: thumbnailLink,
        youtubeLink: youtubeLink,
        category: category
    })
    medi1.save();
    res.redirect("http://localhost:5173/");
})

app.get("/meditativeKnowledge",(req,res)=>{
    const chat = async () => {
        let r = await med1.find({category: "Meditative Knowledge"});
        console.log(r);
        res.json(r);
    }
    chat();
})