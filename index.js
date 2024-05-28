import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var posts = [];

app.use(bodyParser.urlencoded({ extended: true }));
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

app.get("/posts", (req, res) => {
    res.render("posts.ejs",  { posts: posts });
});

app.post("/create-post", (req, res) => {
    const article = {
        title: req.body["title"],
        date: new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: '2-digit'}),
        htmlContent: req.body["content"],
      };

    posts.push(article);
    res.render("posts.ejs", { posts: posts });
});

app.get("/create-post", (req, res) => {
    res.render("create-post.ejs");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});