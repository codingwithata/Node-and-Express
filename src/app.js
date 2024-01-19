const express = require("express");
const morgan = require("morgan");
const getZoos = require("./utils/getZoos");
const validateZip = require("./middleware/validateZip");

const app = express();

// Routes
app.get("/check/:zip", validateZip, (req, res) => {
  const zip = req.params.zip;
  const zoos = getZoos(zip);
  if (zoos) {
    res.send(`${zip} exists in our records.`);
  } else {
    res.send(`${zip} does not exist in our records.`);
  }
});

app.get("/zoos/:zip", validateZip, (req, res) => {
  const zip = req.params.zip;
  const zoos = getZoos(zip);
  if (zoos) {
    res.send(`${zip} zoos: ${zoos.join("; ")}`);
  } else {
    res.send(`${zip} has no zoos.`);
  }
});

app.get("/zoos/all", (req, res) => {
  if (req.query.admin === "true") {
    const allZoos = getZoos("all");
    res.send(`All zoos: ${allZoos.join("; ")}`);
  } else {
    res.status(403).send("You do not have access to that route.");
  }
});

// Error handler for undefined routes
app.use((req, res, next) => {
  res.status(404).send(`That route could not be found!`);
});

module.exports = app;
