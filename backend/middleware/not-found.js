const notFound = (req, res) =>
  res.status(404).send("Yol mevcut değil :" + req.originalUrl);

module.exports = notFound;
