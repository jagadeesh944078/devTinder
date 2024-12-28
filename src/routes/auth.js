const express = require("express");
const { validationSignup } = require("../utils/validation");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

authRouter.post("/signup", async (req, res) => {
  try {
    validationSignup(req);
    const { firstName, lastName, emailId, passWord, age, gender } = req.body;
    const passwordHash = await bcrypt.hash(passWord, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      passWord: passwordHash,
      age,
      gender,
    });
    await user.save();
    res.send("user data saved successfully");
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, passWord } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credinatials");
    }
    const isPasswordValid = await user.validatePassowrd(passWord);
    if (isPasswordValid) {
      /* Create the Jwt token */
      const token = await user.getJwt();

      /* add the token and send the response back to the server */
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send(user);
    } else {
      throw new Error("Invalid Crediantials");
    }
  } catch (err) {
    res.status(400).send("Error :" + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("logout successfull");
});

module.exports = authRouter;
