function validateZip(req, res, next) {
  const zip = req.params.zip;

  // Zip code validation
  if (/^\d{5}$/.test(zip)) {
    next(); // Move to the next middleware function
  } else {
    res.status(400).send(`Zip (${zip}) is invalid!`);
  }
}

module.exports = validateZip;
