const express = require("express");
const morgan = require("morgan");
const app = express();
const getZoos = require("./utils/getZoos");
const validateZip = require("./middleware/validateZip");

// Routes

app.get("/check/:zip", validateZip, (req, res, next) => {
  const zip = req.params.zip;
  res.send(`check/${zip}`);
});

app.get("/zoos/all", (req, res, next) => {
  res.send("zoos/all");
});

app.get("/zoos/:zip", validateZip, (req, res, next) => {
  const zip = req.params.zip;
  res.send(`zoos/${zip}`);
});

//* Error Handling: ROUTE NOT FOUND:

app.use((req, res, next) => {
  res.send(`That route could not be found!`);
});

//* Error Handler

app.use((err, req, res, next) => {
  console.error(err);
  res.send(err);
});

app.use(morgan("dev"));

module.exports = app;
