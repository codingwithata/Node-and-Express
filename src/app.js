const express = require("express");
const morgan = require("morgan");
const getZoos = require("./utils/getZoos");

const app = express();

const check = (req, res, next) => {
  const zip = req.params.zip;
  const zoos = getZoos(zip);
  if (zoos) {
    next(`${zip} exists in our records.`);
  } else {
    next(`${zip} does not exist in our records.`);
  }
};

const zoo = (req, res, next) => {
  const zip = req.params.zip;
  const zoos = getZoos(zip);
  if (zoos) {
    next(`${zip}: ${zoos}`);
  } else {
    next(`${zip} does not exist in our records.`);
  }
};

app.use(morgan("dev"));

app.get("/check/:zip", check);

app.get("/zoos/:zip", zoo);

app.use((req, res, next) => {
  res.send(`The route ${req.path} does not exist!`);
});
module.exports = app;
