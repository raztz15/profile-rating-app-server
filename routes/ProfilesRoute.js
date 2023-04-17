const exporess = require("express");
var ObjectId = require("mongoose").Types.ObjectId;
const { route } = require(".");
const Profile = require("../models/profile");
const profileController = require('../controllers/ProfileController')
// opening routes for the app
const router = exporess.Router();

// All profiles Route
router.get("/", profileController.getAllProfiles)

// create new profile
router.post("/", profileController.createNewProfile);

// Update profile route
router.put("/:id", profileController.updateProfile);

// Delete profile route
router.delete("/:id", profileController.deleteProfile);

// let other files connect to this file
module.exports = router;
