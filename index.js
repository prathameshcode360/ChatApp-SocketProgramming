import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

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

  // Listen for "new-message" event from the client
  socket.on("new-message", (message) => {
    console.log("Received message:", message);
    // broadcast message to all clients
    socket.broadcast.emit("broadcast-message", message);
  });

  // Handle client disconnection
  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

// Start the server and listen on port 4002
server.listen(4002, () => {
  console.log("Server is listening on port 4002");
});
