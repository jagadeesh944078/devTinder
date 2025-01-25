const socket = require("socket.io");
const crypto = require("crypto");

const getSecretRoomId = (userId, targetUserId) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("_"))
    .digest("hex");
};

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", ({ userId, targetUserId, firstName }) => {
      const roomId = getSecretRoomId(userId, targetUserId);
      console.log(firstName + " joined room " + roomId);
      socket.join(roomId);
    });
    socket.on(
      "sendMessage",
      ({ firstName, lastName, userId, targetUserId, text }) => {
        const roomId = getSecretRoomId(userId, targetUserId);
        console.log(firstName + " " + text);
        io.to(roomId).emit("messageReceived", { firstName, lastName, text });
      }
    );
    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
