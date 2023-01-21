const exporess = require("express");
const { route } = require(".");
const Profile = require("../models/profile");
// opening routes for the app
const router = exporess.Router();

// All profiles Route
router.get("/profiles", (req, res) => {
  res.send("Profiles");
});

//  new Profile Route
router.get("/profiles/new", (req, res) => {
  res.send("New Profile", { profile: new profile() });
});

// create new profile
router.post("/", async (req, res) => {
  const profile = new Profile({
    name: req.body.name,
    lastName: req.body.lastName,
    age: req.body.age,
    technology: req.body.technology,
  });
  try {
    const newProfile = await profile.save();
    res.redirect("profiles");
  } catch (error) {
    req.send({ profile: profile, errorMessage: "Failed to create Profile" });
  }
});
// let other files connect to this file
module.exports = router;
