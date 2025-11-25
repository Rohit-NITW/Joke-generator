import express from "express"
import axios from "axios"
import bodyParser from "body-parser"

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));



app.get("/",(req,res)=>{
    res.render("index.ejs");
})

app.post("/getJoke",async (req,res)=>{
    try{
    const response = await axios.get("https://v2.jokeapi.dev/joke/"+req.body.category+"?type="+req.body.type);
    const result = response.data;
    res.render("index.ejs", {
        joke : result,
    })}
    catch (error) {
        console.log("Axios error:", error.message);

        return res.render("index.ejs", {
            error: "Something went wrong while contacting JokeAPI!",
            joke: null
        });
    }
})

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})
