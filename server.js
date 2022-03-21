const express = require("express");

const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});

const { Pool } = require("pg");

const app = express();

const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });

// import tableau d'auteurs
// const authors = require("./authors");

// Page d'accueil
app.get("/", (req, res, _next) => {
  res.send("Authors API");
  console.log(authors.authors[0].name);
}); // Comment

let author;

// Route pour affichage de l'auteur
app.get("/authors/:id", async (req, res) => {
  try {
    author = await Postgres.query(
      "SELECT * FROM authors WHERE authors.author_id=$1",
      [req.params.id]
    );
    res.json(author.rows);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "An error happened",
    });
  }
});

let books;

// Route pour affichage du bouquin
app.get("/authors/:id/books", async (req, res) => {
  try {
    books = await Postgres.query(
      "SELECT books FROM authors WHERE authors.author_id=$1",
      [req.params.id]
    );
    res.json(books.rows[0].books.join(", "));
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "An error happened",
    });
  }
});

// Routes JSON
app.get("/json/authors/:id", async (req, res, _next) => {
  try {
    author = await Postgres.query(
      "SELECT name, nationality FROM authors WHERE authors.author_id=$1",
      [req.params.id]
    );
    res.json(author.rows[0].name + ", " + author.rows[0].nationality);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "An error happened",
    });
  }
});

app.get("/json/authors/:id/books", async (req, res, _next) => {
  try {
    books = await Postgres.query(
      "SELECT books FROM authors WHERE authors.author_id=$1",
      [req.params.id]
    );
    res.json(books.rows[0].books.join(", "));
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "An error happened",
    });
  }
});

// Route erreur 404
app.get("*", (req, res) => {
  res.status(404).send("Author not found");
});

// démarrage serveur
app.listen(8000, () => {
  console.log("Listening on port 8000");
});
