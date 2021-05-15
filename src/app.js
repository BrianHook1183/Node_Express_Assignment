const express = require("express");
const morgan = require("morgan");
const app = express();
const getZoos = require("./utils/getZoos");
const validateZip = require("./middleware/validateZip");

//* Routes

app.get("/check/:zip", validateZip, (req, res, next) => {
  const zip = req.params.zip;
  const zooResponse = getZoos(zip);
  res.send(
    zooResponse ?
    `${zip} exists in our records.` :
    `${zip} does not exist in our records.`
  );
});

app.get("/zoos/all", (req, res, next) => {
  const admin = req.query.admin;
  if (admin === "true") {
    const zooResponse = getZoos().join("; ");
    res.send(`All zoos: ${zooResponse}`);
  } else {
    next("You do not have access to that route.");
  }
});

app.get("/zoos/:zip", validateZip, (req, res, next) => {
  const zip = req.params.zip;
  const zooResponse = getZoos(zip).join("; ");
  res.send(
    zooResponse ?
    `${zip} zoos: ${zooResponse}` :
    `${zip} has no zoos.`
  );
});

//* Error Handling

//ROUTE NOT FOUND:
app.use((req, res, next) => {
  res.send(`That route could not be found!`);
});

// Error Handler
app.use((err, req, res, next) => {
  res.send(err);
});

app.use(morgan("dev"));

module.exports = app;
