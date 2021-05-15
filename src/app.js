const express = require("express");
const morgan = require("morgan");
const app = express();
const getZoos = require("./utils/getZoos");
const validateZip = require("./middleware/validateZip");



app.use(morgan("dev"));

module.exports = app;
