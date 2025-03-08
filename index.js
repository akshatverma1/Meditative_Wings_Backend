const express = require("express");
const path = require("path");
const app = express();
const moongoose = require("mongoose");
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));



app.listen(PORT,()=>{
    console.log("Server is Running in Port 3000");
})


async function connectDB(){
    console.log("Connecting....");
    await moongoose.connect("mongodb://127.0.0.1:27017/meditative");
    
}
try{
    connectDB().then((result) => {
        console.log("Connection Sucessfully");
    })}
    catch(err){console.log(err)};
    


app.get("/",(req,res)=>{
    res.render("home");
})
app.get("/about",(req,res)=>{
    res.render("route");
})

app.get("/data",async (req,res)=>{
    let data = await student.find();
    console.log(data);
})