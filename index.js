import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/bio", (req, res) => {
    res.render("bio.ejs");
});

app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});

app.get("/posts", (req, res) => {
    res.render("posts.ejs");
});

app.get("/create-post", (req, res) => {
    res.render("create-post.ejs");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});