const express = require("express");

/* creating new expressJs application from express method */
const app = express();

app.use("/", (req, res) => {
  res.send("hello from the server");
});

app.use("/test", (req, res) => {
  res.send("hello from the dashboard");
});

app.use("/hello", () => {
  res.send("Hello Hello Hello");
});

app.listen(7777, () => {
  console.log("server is running on port 7777");
});
