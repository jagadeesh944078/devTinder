const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const http = require("http");
// require("./utils/cronjob");

/* for resovling the cors issue */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
/* whenever iam reading request i want that data to be parsed into the json then i want to get it */
app.use(express.json());
/* whenever you need cookie you need to parse and use it */
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const initializeSocket = require("./utils/socket");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

const server = http.createServer(app);
initializeSocket(server);

connectDB()
  .then(() => {
    console.log("connect to the db successfully");
    server.listen(process.env.PORT, () => {
      console.log("server is running on port 7777");
    });
  })
  .catch(() => {
    console.log("error while connecting to the db");
  });
