const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "adfsaf",
    lastName: "S",
    emailId: "Shasdfsshi@gmail.com",
    passWord: "password123",
  });
  try {
    await user.save();
    res.send("user data saved successfully");
  } catch (err) {
    res.status(400).send("Error while Saving the user:" + err.message);
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
