import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();

// create http server
const server = createServer(app);

// create socket/io server
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.get("/message", (req, res) => {
  io.on("connection", (socket) => {
    console.log("connected", socket.id);

    socket.on("privet-message", (data) => {
      socket.on("private-message", ({ to, message }) => {
        io.to(to).emit("private-message", {
          message,
        });
      });
    });
  });
});

server.listen(3000, () => {
  console.log("server on port 3000....");
});
