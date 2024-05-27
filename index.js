import express from "express";
import bodyParser from "body-parser";


const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/bio", (req, res) => {
    res.render("bio.ejs");
});

app.get("/portfolio", (req, res) => {
    res.render("portfolio.ejs");
});

app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});

app.post("/posts", (req, res) => {
    res.render("posts.ejs");
});

app.get("/create-post", (req, res) => {
    res.render("create-post.ejs");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});