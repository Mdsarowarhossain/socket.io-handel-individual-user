// server.js

const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const users = {};

io.on("connection", (socket) => {
  // Listen for the "storeUserID" event
  socket.on("storeUserID", (userID) => {
    // Store the user ID and socket ID in an object
    users[userID] = socket.id;
    console.log(`Stored user ID ${userID} with socket ID ${socket.id}`);
  });
  socket.on("disconnect", () => {
    // Remove the user ID from the "users" object when the socket disconnects
    const userID = Object.keys(users).find((key) => users[key] === socket.id);
    if (userID) {
      delete users[userID];
      console.log(`Deleted user ID ${userID} with socket ID ${socket.id}`);
    }
  });
});
setInterval(() => {
  io.to(users.user123).emit("hi", "after 5 sec");
}, 5000);
setInterval(() => {
  io.to(users.user124).emit("hi", "after 2 sec");
}, 2000);
server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
