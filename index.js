import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

// Initialize an Express application
const app = express();

// Create an HTTP server using Express
const server = http.createServer(app);

// Initialize a Socket.io server with CORS configuration
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Handle client connection and disconnection events
io.on("connection", (socket) => {
  console.log("User Connected");

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

// Start the server and listen on port 4002
server.listen(4002, () => {
  console.log("Server is listening on port 4002");
});
