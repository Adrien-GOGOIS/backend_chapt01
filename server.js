const express = require("express");
const res = require("express/lib/response");
const app = express();

app.get("/", (req, res, _next) => {
  res.send("Authors API");
});

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
