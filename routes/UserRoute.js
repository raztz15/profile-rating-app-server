const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
  const { username, password, email, name } = req.body;
  try {
    const user = new User({ username, password, email, name });
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;