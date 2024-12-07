const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  try {
    await user.save();
    res.send("user data saved successfully");
  } catch (err) {
    res.status(400).send("Error while Saving the user:" + err.message);
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
