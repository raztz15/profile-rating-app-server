const exporess = require("express");
// opening routes for the app
const router = exporess.Router();

router.get("/", (req, res) => {
  res.send("Hello New App");
});

// let other files connect to this file
module.exports = router;
