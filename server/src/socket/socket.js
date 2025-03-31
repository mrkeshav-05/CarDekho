// import { Server } from "socket.io";

// const initializeSocket = (server) => {
//   const io = new Server(server, {
//     cors: {
//       origin: "*", // Allow frontend to connect
//       methods: ["GET", "POST"]
//     }
//   });

//   io.on("connection", (socket) => {
//     console.log(`User connected: ${socket.id}`);
//     socket.on("sendMessage", (data) => {
//       io.emit("receiveMessage", data); // Broadcast message to all clients
//     });
//     socket.on("disconnect", () => {
//       console.log(`User disconnected: ${socket.id}`);
//     });
//   });
//   return io;
// };

// export default initializeSocket;


import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import express from "express";
const frontendUrl = process.env.FRONTEND_URL;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: frontendUrl, // Change this to your frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  },
});

export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);

  const userId = socket.handshake.query.userId;
	if (userId != "undefined") userSocketMap[userId] = socket.id;

  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
})
export { server, io, app };