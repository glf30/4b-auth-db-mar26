const User = require("../models/users-model");
const bcrypt = require("bcrypt");

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
      password: hashedPassword,
    };

    const newUser = await User.create(secureUserData);

    return newUser;
  } catch (error) {
    throw error;
  }
};
// in router
// createUser(req.body) -> userData

const loginUser = async (userData) => {
  try {
    // verify that username exists in db
    const user = await User.findOne(
        { username: userData.username }
    );

    if(!user){
        throw "User not found";
    }

    // compare the incoming password with the hashed password in the database
    // db.compare(incomingPassword, hashedPassword)
    // incoming: userData.password
    // hashed: user.password
    const isCorrectPassword = await bcrypt.compare(userData.password, user.password);

    if(!isCorrectPassword){
        throw "Passwords do not match"
    }

    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = { createUser, loginUser };
