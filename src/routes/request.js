const express = require("express");
const { userAuth } = require("../middlewares/auth");
const requestRouter = express.Router();

requestRouter.get("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user.firstName + " connection request made");
  } catch (err) {
    res.status(400).send("Err :" + err.message);
  }
});

module.exports = requestRouter;
