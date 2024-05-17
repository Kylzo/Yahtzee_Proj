import { Server as SocketServer } from "socket.io";
import http from "http";

const chatMiddleware = () => {
  const server = http.createServer();

  const io = new SocketServer(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  io.on("connection", (socket) => {
    console.log("Nouveau client connecté: " + socket.id);

    socket.on("chat_message", (message) => {
      console.log("Nouveau message: ", message);

      io.emit("chat_message", message);
    });

    socket.on("disconnect", () => {
      console.log("Client déconnecté: " + socket.id);
    });
  });

  server.listen(4000, () => {
    console.log("Socket server is running on port 4000");
  });

  return io;
};

export default chatMiddleware;
