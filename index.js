// server/index.js
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // allow all for testing
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  // Listen for chat messages
  socket.on("send_message", (data) => {
    console.log("📩 Message received:", data);
    io.emit("receive_message", data); // Broadcast to everyone
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

server.listen(4000, () => {
  console.log("✅ Server running on http://localhost:4000");
});
