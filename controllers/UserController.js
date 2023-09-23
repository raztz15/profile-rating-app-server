const User = require('../models/User')

const userController = {}

userController.getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send("Internal server error ===> ", error)
    }
}

userController.createUser = async (req, res) => {
    const { email, password, username } = req.body
    try {
        if (email && password && username) {
            const newUser = new User({ email, password, username })
            const existedUser = await User.findOne({ email, username })
            if (existedUser) res.send(`User ${username} already exists! try to login`)
            else {
                await newUser.save()
                res.status(200).send(newUser)
            }
        }
        else res.status(400).send({ error: "Can't send empty string" })
    } catch (error) {
        res.status(400).send("Failed to create new user ===> ", error)
    }
}

userController.findUserByEmailAndPassword = async (req, res) => {
    const { username, email, password } = req.body
    try {
        // TODO add feature that enable the user to send either username or email
        if (email && password) {
            console.log(username, email, password);
            const user = await User.findOne({ email })
            if (!user) return res.status(400).send({ error: "Invalid Email or Password" })
            if (user) {
                const isMatch = user.comparePassword(password)
                if (!isMatch) return res.status(400).send({ error: "Invalid Email or Password" })
            }
            // TODO delete the field instead of returning it as null
            user.password = null;
            const cleanUser = { _id: user._id, username: user.username, email: user.email }
            res.status(201).send({ message: `${user.username} successfuly logged in`, user: cleanUser })
        }
        else res.status(400).send({ error: "Can't send empty string" })
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = userController;