const express = require("express");
const res = require("express/lib/response");
const app = express();

// import tableau d'auteurs
const authors = require("./authors");

// Page d'accueil
app.get("/", (req, res, _next) => {
  res.send("Authors API");
  console.log(authors.authors[0].name);
});

// Route pour affichage de l'auteur
app.get("/authors/:authorId", (req, res) => {
  const author = authors.authors[req.params.authorId].name;
  const nationality = authors.authors[req.params.authorId].nationality;

  if (!author) {
    return res.json({
      message: "Sorry, this user does not exist!",
    });
  }

  res.json(author + ", " + nationality);
});

// Route pour affichage du bouquin
app.get("/authors/:authorId/books", (req, res) => {
  const book = authors.authors[req.params.authorId].books;

  if (!book) {
    return res.json({
      message: "Sorry, this user does not exist!",
    });
  }

  res.json(book.join(", "));
});

// démarrage serveur
app.listen(8000, () => {
  console.log("Listening on port 8000");
});
