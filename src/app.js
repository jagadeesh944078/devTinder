const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

/* creating new expressJs application from express method */
const app = express();

/* Here Order Is Very Important */

app.use("/admin", adminAuth);

/* Error Handler */
app.get("/admin/getAllData", (req, res) => {
  // try {
  throw new Error("dsfg");
  res.send("got the admin data");
  // } catch (err) {
  //   res.status(500).send("some error contact support team");
  // }
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("deleted the user data");
});

app.use(
  "/user",
  userAuth,
  (req, res, next) => {
    next();
    res.send("Response Recorded");
  },
  (req, res) => {
    console.log("2nd response");
    res.send("2nd response");
  }
);

app.get("/user", (req, res) => {
  res.send({ firstName: "Jagadeesh", lastName: "vemul" });
});

app.post("/user", (req, res) => {
  res.send("saved the user data successfully");
});

app.delete("/user", (req, res) => {
  res.send("deleted the data successfully");
});

app.use("/test", (req, res) => {
  res.send("hello from the dashboard");
});

app.use("/hello", () => {
  res.send("Hello Hello Hello");
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("somethig went wrong");
  }
  res.send("hello from the server");
});

app.listen(7777, () => {
  console.log("server is running on port 7777");
});
