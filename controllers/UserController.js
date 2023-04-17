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
    const {email, password, username} = req.body
    try {
        const newUser = new User({email, password, username})
        const existedUser = await User.findOne({email, username})
        if (existedUser) res.send(`User ${username} already exists! try to login`)
        else {
            await newUser.save()
            res.status(200).send(newUser)
        }
    } catch (error) {
        res.status(400).send("Failed to create new user ===> ", error)
    }
}

userController.findUserByEmailAndPassword = async (req, res) => {
        const {username, email, password} = req.body
    try {
        // TODO add fiture that enable the user to send either username or email
        const user = await User.findOne({email}) 
        if (!user) return res.status(400).send({error: "Invalid Email or Password"}) 
        if (user) {
            const isMatch = user.comparePassword(password)
            if (!isMatch) return res.status(400).send({error: "Invalid Email or Password"})
        }
        // TODO delete the field instead of returning it as null
        user.password = null;
        res.status(201).send({message: `${user.username} successfuly logged in`, user})
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = userController;