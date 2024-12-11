const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
const { validationSignup } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

/* whenever iam reading request i want that data to be parsed into the json then i want to get it */
app.use(express.json());
/* whenever you need cookie you need to parse and use it */
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    validationSignup(req);
    const { firstName, lastName, emailId, passWord } = req.body;
    const passwordHash = await bcrypt.hash(passWord, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      passWord: passwordHash,
    });
    await user.save();
    res.send("user data saved successfully");
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

app.post("/login", async (req, res) => {
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

      res.send("Login Successfull!!");
    } else {
      throw new Error("Invalid Crediantials");
    }
  } catch (err) {
    res.status(400).send("Error :" + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error :" + err.message);
  }
});

app.get("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user.firstName + " connection request made");
  } catch (err) {
    res.status(400).send("Err :" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("connect to the db successfully");
    app.listen(7777, () => {
      console.log("server is running on port 7777");
    });
  })
  .catch(() => {
    console.log("error while connecting to the db");
  });
