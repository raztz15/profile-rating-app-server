const express = require('express');
const User = require('../models/User');
const userController = require('../controllers/UserController')

const router = express.Router();

router.get('/all-users', userController.getAllUsers)

router.post('/register', userController.createUser)

router.post('/login', userController.findUserByEmailAndPassword)

module.exports = router;