const exporess = require("express");
var ObjectId = require("mongoose").Types.ObjectId;
const { route } = require(".");
const Profile = require("../models/profile");
// opening routes for the app
const router = exporess.Router();

// All profiles Route
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find({});
    res.json({ data: profiles, status: "success" });
  } catch (error) {
    console.log("Couldn't load profiles ", error);
  }
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
    res.status(200);
    res.send({
      data: newProfile,
      message: `${newProfile.name} added successfuly`,
    });
  } catch (error) {
    res.send({ profile: profile, errorMessage: "Failed to create Profile" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const profile = await Profile.findByIdAndUpdate(req.params.id, req.body);
    if (profile) {
      console.log("profile ===> ", profile);
      res.send({ data: profile, status: "Profile has updated!" });
    } else
      res
        .status(400)
        .send({ message: `${req.body.name} was not found in the system` });
  } catch (error) {
    res.status(500).json({ error: error.errorMessage });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleteProfile = await Profile.findByIdAndRemove(req.params.id);
    if (deleteProfile) {
      res.send({
        delete: deleteProfile,
        message: `${deleteProfile.name} has deleted from the system!`,
      });
    } else {
      res.send({ message: "This profile is not in the system" });
    }
  } catch (error) {
    res
      .status(400)
      .send({ message: "Couldn't delete the user from the system" });
  }
});

// let other files connect to this file
module.exports = router;
