import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import connetctToDB from "./mongoose.config.js";
import chatModel from "./chat.scheams.js";

// Initialize an Express application
const app = express();

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Initialize a Socket.io server with CORS configuration
const io = new Server(server, {
  cors: {
    origin: "*", // Allow requests from any origin
    methods: ["GET", "POST"], // Allow only GET and POST requests
  },
});

// Handle client connection and disconnection events
io.on("connection", (socket) => {
  console.log("User Connected");

  // recieve username
  socket.on("join", (data) => {
    console.log(data);
    socket.username = data.username;

    // Send old messages after user joins
    chatModel
      .find()
      .sort({ timeStamp: 1 })
      .limit(50)
      .then((messages) => {
        socket.emit("old_messages", { messages: messages });
      })
      .catch((error) => {
        console.log(error);
      });
  });

  // Listen for "new-message" event from the client
  socket.on("new-message", (message) => {
    console.log("Received message:", message);

    // attach username with the message
    let userMessage = {
      username: socket.username,
      message: message,
    };
    // saving chat into database
    const newChat = new chatModel({
      username: socket.username,
      message: message,
      time: new Date(),
    });
    newChat.save();

    // broadcast message to all clients
    socket.broadcast.emit("broadcast-message", userMessage);
  });

  // Handle client disconnection
  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

// Start the server and listen on port 4002
server.listen(4002, () => {
  console.log("Server is listening on port 4002");
  connetctToDB();
});
