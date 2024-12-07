const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://vemulajagadeesh1:pL9ECfVAySq59irh@namastenode.t951a.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
