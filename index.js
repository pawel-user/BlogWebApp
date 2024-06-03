import express from "express";
import bodyParser from "body-parser";
import fs from "fs";

const app = express();
const port = 3000;

var posts = [];
var paths = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", (req, res) => {
  res.render("index.ejs");
});

for (var i=0; i<posts.length; i++) {
  var path = paths[i];
  app.get(`/${path}`, (req, res) => {
    res.render(path + ".ejs", { article: posts[i] });
  });
};

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
  res.render("posts.ejs", { posts: posts });
});

app.post("/create-post", (req, res) => {
  const article = {
    title: req.body["title"],
    date: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    }),
    htmlContent: req.body["content"],
  };
  var path = article.title.replaceAll(" ", "").toLowerCase();
  var data = `<%- include("partials/template.ejs") %>`;

  posts.push(article);
  paths.push(path);
  fs.writeFile(`./views/${path}.ejs`, data, (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });

  //res.render(`${path}.ejs`, { article: article });
  res.render("posts.ejs", { posts: posts });
});

app.get("/create-post", (req, res) => {
  res.render("create-post.ejs");
});

app.get("/hellopeppa", (req,res) => {
  res.render("hellopeppa.ejs", {article: posts[0]});
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
