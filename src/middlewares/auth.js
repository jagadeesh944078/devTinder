const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const cookie = req.cookies;
    const { token } = cookie;
    if (!token) {
      throw new Error("Token Not Exist");
    }
    const decodedObj = await jwt.verify(token, "Jagadeesh@#$%2705");
    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not Exist");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Err :" + err.message);
  }
};

module.exports = { userAuth };
