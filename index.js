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

const meditativeTwo = moongoose.Schema({
    authorName: String,
    tweetContent: String,
    tweetTags: String
})
let med1 = moongoose.model("med1", meditative);
let med2 = moongoose.model("med2", meditativeTwo);


app.get("/allcategories", (req, res) => {
    const chat = async () => {
        let r = await med1.find({});
        console.log(r);
        res.json(r);
    }
    chat();
})

app.post("/newRequest", async (req, res) => {
    let { videoTitle, videoDesp, thumbnailLink, youtubeLink, category } = await req.body;
    console.log(videoTitle + " " + videoDesp + " " + thumbnailLink + " " + youtubeLink + " " + category);
    let medi1 = await new med1({
        videoTitle: videoTitle,
        videoDesp: videoDesp,
        thumbnailLink: thumbnailLink,
        youtubeLink: youtubeLink,
        category: category
    })
    await medi1.save();
    res.redirect("https://meditative-wings-fe-brown.vercel.app/");
})

app.post("/newTweetPost", async (req, res) => {
    let { authorName, tweetContent, tweetTag } = await req.body;
    console.log(authorName+" "+tweetContent+" "+tweetTag);
    let medi2 = await new med2({
        authorName: authorName,
        tweetContent: tweetContent,
        tweetTags: tweetTag
    })
    await medi2.save();
    res.redirect("https://meditative-wings-fe-brown.vercel.app/");
})


app.get("/meditativeKnowledge", (req, res) => {
    const chat = async () => {
        let r = await med1.find({ category: "Meditative Knowledge" }).sort({ _id: -1 });
        console.log(r);
        res.json(r);
    }
    chat();
})

app.get("/meditativeThoughts", (req, res) => {
    const chat = async () => {
        let r = await med1.find({ category: "Meditative Thoughts" });
        console.log(r);
        res.json(r);
    }
    chat();
})


app.get("/meditativeMovie", (req, res) => {
    const chat = async () => {
        let r = await med1.find({ category: "Meditative Movie" });
        console.log(r);
        res.json(r);
    }
    chat();
})


app.get("/meditativeWritings", (req, res) => {
    const chat = async () => {
        let r = await med1.find({ category: "Meditative Writings" });
        console.log(r);
        res.json(r);
    }
    chat();
})

app.get("/lifeUnderstanding", (req, res) => {
    const chat = async () => {
        let r = await med1.find({ category: "Life Understanding" });
        console.log(r);
        res.json(r);
    }
    chat();
})

app.get("/meditativeShayari", (req, res) => {
    const chat = async () => {
        let r = await med1.find({ category: "Meditative Shayari" });
        console.log(r);
        res.json(r);
    }
    chat();
})

app.get("/meditativeShayariMovie", (req, res) => {
    const chat = async () => {
        let r = await med1.find({ category: "Meditative Shayari Movie" });
        console.log(r);
        res.json(r);
    }
    chat();
})

app.get("/meditativeShayariWritings", (req, res) => {
    const chat = async () => {
        let r = await med1.find({ category: "Meditative Shayari Writings" });
        console.log(r);
        res.json(r);
    }
    chat();
})

app.get("/meditativeWingsMedia", (req, res) => {
    const chat = async () => {
        let r = await med1.find({ category: "Meditative Wings Media" });
        console.log(r);
        res.json(r);
    }
    chat();
})

app.get("/search/:ids", (req, res) => {
    let { ids } = req.params;
    console.log(ids);

    const searching = async () => {
        try {
            let r = await med1.find({ _id: ids });
            console.log(r);
            res.json(r);

        } catch (error) {
            console.log(error)
        }
    }
    searching();
})



app.get("/tweetdata",async (req,res) =>{
    const chat = async () => {
        let r = await med2.find();
        console.log(r);
        res.json(r);
    }
    chat();
})