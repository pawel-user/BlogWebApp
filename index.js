import express from "express";
import bodyParser from "body-parser";
import fs from "fs";

const app = express();
const port = 3000;

var posts = [];
var position = posts.length;
var index = 0;


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
    endpoint: req.body["title"].replaceAll(" ", "").toLowerCase(),
    position: position,
  };
  var data = `<%- include("partials/template.ejs") %>`;

  posts.push(article);
  position++;

  console.log("position: " + position);
  console.log(posts);
  fs.writeFile(`./views/${article.endpoint}.ejs`, data, (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });

  res.render("posts.ejs", { posts: posts, position });
});

app.get("/create-post", (req, res) => {
  res.render("create-post.ejs", { posts });
});

app.get("/edit-post", (req, res) => {
  res.render("edit-post.ejs", { posts, index });
});

app.post("/edit-post", (req, res) => {

  var old_endpoint = posts[index].endpoint;

  const article = {
    title: req.body["title"],
    date: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    }),
    htmlContent: req.body["content"],
    endpoint: req.body["title"].replaceAll(" ", "").toLowerCase(),
    position: index,
  };

  var data = `<%- include("partials/template.ejs") %>`;

  posts[article.position] = article;
  console.log(posts);


  fs.writeFile(`./views/${article.endpoint}.ejs`, data, (err) => {
    if (err) throw err;
    console.log(`The new file ${article.endpoint}.ejs has been saved!`);
  });

  if (old_endpoint != article.endpoint) {
    fs.unlink(`./views/${old_endpoint}.ejs`, (err) => {
      if (err) throw err;
      console.log(`The old file views/${old_endpoint}.ejs was deleted`);
    });
  }

  res.render("posts.ejs", { posts: posts, position });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});

// A few route examples
app.get("/postname", (req, res) => {

  for (var i = 0; i < posts.length; i++) {
    if (posts[i].endpoint === "postname") {
      index = i;
    }
  }

  console.log(posts[index]);
  res.render("postname.ejs", { article: posts[index] });
});

app.get("/article", (req, res) => {

  for (var i = 0; i < posts.length; i++) {
    if (posts[i].endpoint === "article") {
      index = i;
    };
  };

  console.log(posts[index]);
  res.render("article.ejs", { article: posts[index] });
});

app.get("/example", (req, res) => {

  for (var i = 0; i < posts.length; i++) {
    if (posts[i].endpoint === "example") {
      index = i;
    };
  };
  
  console.log(posts[index]);
  res.render("example.ejs", { article: posts[index] });
});