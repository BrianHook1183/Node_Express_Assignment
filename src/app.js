const express = require("express");
const morgan = require("morgan");
const app = express();
const getZoos = require("./utils/getZoos");
const validateZip = require("./middleware/validateZip");

// Routes

app.get("/check/:zip", (req, res, next) => {
  const zip = req.params.zip;
  res.send(`check/${zip}`);
});

app.get("/zoos/all", (req, res, next) => {
  res.send("zoos/all");
});

app.get("/zoos/:zip", (req, res, next) => {
  const zip = req.params.zip;
  res.send(`zoos/${zip}`);
});

app.use(morgan("dev"));

module.exports = app;
