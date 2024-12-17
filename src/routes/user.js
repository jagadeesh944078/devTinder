const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "intersted",
    }).populate(
      "fromUserId",
      "firstName lastName photoUrl age gender about skills"
    );
    // }).populate("fromUserId", ["firstName", "lastName"]);

    res.json({
      message: "data fetched successfully",
      data: connectionRequests,
    });
  } catch (err) {
    res.status(400).send("Err: " + err.status);
  }
});

module.exports = userRouter;
