const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password, email, name } = req.body;
  try {
    const user = new User({ username, password, email, name });
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/login', async (req, res) => {
  const {email, password} = req.body
  try {
    const user = await User.findOne({email})
    if (!user) res.status(400).send({error: "Invalid Email or Password"})
    const isMatch = user.comparePassword(password)
    if(!isMatch) res.status(400).send({error: "Invalid Email or Password"})
    // req.session.id = user._id
    res.status(201).send({message: `${user.username} successfuly logged in`, user})
  } catch (error) {
    console.log("error ===> ", error);
    res.status(400).send(error)
  }
})

module.exports = router;