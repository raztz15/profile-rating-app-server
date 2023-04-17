const Profile = require('../models/profile')

const profileController = {}

profileController.getAllProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find({});
        res.json({ data: profiles, status: "success" });
    } catch (error) {
        console.log("Couldn't load profiles ", error);
    }
}

profileController.createNewProfile = async (req, res) => {
    const { name, lastName, age, technology } = req.body
    const profile = new Profile({ name, lastName, age, technology });
    try {
        if (profile) {
            const newProfile = await profile.save();
            res.status(200).send({ data: newProfile, message: `${newProfile.name} added successfuly` });
        }
    } catch (error) {
        res.status(400).send({ profile: profile, errorMessage: "Failed to create Profile" });
    }
}

profileController.updateProfile = async (req, res) => {
    try {
        const profile = await Profile.findByIdAndUpdate(req.params.id, req.body);
        if (profile) res.send({ data: profile, status: "Profile has updated!" });
        else res.status(400).send({ message: `${req.body.name} was not found in the system` });
    } catch (error) {
        res.status(500).json({ error: error.errorMessage });
    }
}

profileController.deleteProfile = async (req, res) => {
    try {
        const deleteProfile = await Profile.findByIdAndRemove(req.params.id);
        if (deleteProfile) res.send({ delete: deleteProfile, message: `${deleteProfile.name} has deleted from the system!` });
        else res.send({ message: "This profile is not in the system" });
    } catch (error) {
        res.status(400).send({ message: "Couldn't delete the user from the system" });
    }
}

module.exports = profileController