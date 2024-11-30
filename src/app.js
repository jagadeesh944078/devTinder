const express = require("express");

/* creating new expressJs application from express method */
const app = express();

/* Here Order Is Very Important */
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

app.use("/", (req, res) => {
  res.send("hello from the server");
});

app.listen(7777, () => {
  console.log("server is running on port 7777");
});
