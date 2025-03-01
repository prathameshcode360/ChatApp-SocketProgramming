import express from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";

const app = express();
// 1.creating server
const server = http.createServer(app);

// 2.creating socket server
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// 3.use socket event
io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("new_message", (message) => {
    socket.broadcast.emit("broadcast_message", message);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(4001, () => {
  console.log("server is running on port 4001");
});
