const express = require("express");
const res = require("express/lib/response");
const app = express();

const authors = require("./authors");

app.get("/", (req, res, _next) => {
  res.send("Authors API");
  console.log(authors.authors[0].name);
});

app.get("/authors/:authorId", (req, res) => {
  const author = authors.authors[req.params.authorId].name;

  const nationality = authors.authors[req.params.authorId].nationality;

  if (!author) {
    return res.json({
      message: "Sorry, this user does not exist!",
    });
  }

  res.json(author + ", " + nationality); // On répond toujours à la fin, pas de code après
});

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
