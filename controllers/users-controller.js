const User = require("../models/users-model")
const bcrypt = require("bcrypt")

const createUser = async (userData) => {
    /*
        userData = {
            username: "exampleUser123",
            password: "examplePass319280"
        }

    */
    try {
        const salt = await bcrypt.genSalt();

        const hashedPassword = await bcrypt.hash(userData.password, salt);

        // create a user in our database
        // first would should create a variable that stores the username and the hashed password
        const secureUserData = {
            username: userData.username,
            password: hashedPassword
        }

        const newUser = await User.create(secureUserData);

        return newUser
    } catch (error) {
        throw error
    }
}
// in router
// createUser(req.body.password) -> userData

module.exports = { createUser }