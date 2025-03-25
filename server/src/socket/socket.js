import { Server } from "socket.io";

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*", // Allow frontend to connect
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on("sendMessage", (data) => {
      io.emit("receiveMessage", data); // Broadcast message to all clients
    });
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
  return io;
};

export default initializeSocket;
