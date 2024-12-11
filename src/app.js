const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
const { validationSignup } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

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
    const isPasswordValid = await bcrypt.compare(passWord, user.passWord);
    if (isPasswordValid) {
      /* Create the Jwt token */
      const token = jwt.sign({ _id: user._id }, "Jagadeesh@#$%2705");

      /* add the token and send the response back to the server */
      res.cookie("token", token);

      res.send("Login Successfull!!");
    } else {
      throw new Error("Invalid Crediantials");
    }
  } catch (err) {
    res.status(400).send("Error :" + err.message);
  }
});

app.get("/profile", async (req, res) => {
  try {
    const cookie = req.cookies;
    const { token } = cookie;
    if (!token) {
      throw new Error("invalid token");
    }
    const decoded = jwt.verify(token, "Jagadeesh@#$%2705");
    const user = await User.findById(decoded._id);
    if (!user) {
      throw new Error("user doesnot exist");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("Error :" + err.message);
  }
});

/* get the user by email id */
app.get("/user", async (req, res) => {
  const userEmailId = req.body.emailId;
  try {
    const user = await User.findOne({});
    res.send(user);
    // const users = await User.find({ emailId: userEmailId });
    // if (users.length === 0) {
    //   res.send("user not found");
    // } else {
    //   res.send(users);
    // }
  } catch (err) {
    res.status(400).status("something went wrong");
  }
});

/* get all users */
app.get("/feed", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.send(allUsers);
  } catch (err) {
    res.send(400).status("something went wrong");
  }
});

/* delete the user */
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("deleted the user successfully");
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

/* Update the User by UserId */
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["photourl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update Not Allowed");
    }
    if (data.skills.length > 10) {
      throw new Error("Skills can't be more than 10");
    }
    /* this user will return before updating data in mongodb if you keep after then update data returns */
    const user = await User.findOneAndUpdate(
      { _id: userId },
      data,
      {
        returnDocument: "before",
      },
      { runValidatore: true }
    );
    console.log(user, "id");
    res.send("updated user data successfully");
  } catch (err) {
    res.status(400).send("Update Failed:" + err.message);
  }
});

/* Update the user by emailId */
app.patch("/user", async (req, res) => {
  const emailId = req.body.emailId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["photourl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update Not Allowed");
    }
    if (data.skills.length > 10) {
      throw new Error("Skills can't be more than 10");
    }
    const user = await User.findOneAndUpdate({ emailId: emailId }, data);
    console.log(user, "email");
    res.status("user updated by emailid successfully");
  } catch (err) {
    res.status(400).send("something went wrong");
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
