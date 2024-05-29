import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwtMiddleware from "./middlewares/jwt.middleware.js";
import playerRoutes from "./routes/player.route.js";
import authRoutes from "./routes/auth.route.js";
import gameRoutes from "./routes/game.route.js";
import roleRoutes from "./routes/role.route.js";
import scoreRoutes from "./routes/score.route.js";
import chatRoutes from "./routes/chat.route.js";
import dotenv from "dotenv";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, PATCH, DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  })
);

app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", gameRoutes);
app.use("/api", roleRoutes);
app.use("/api", scoreRoutes);

app.use(jwtMiddleware);

app.use("/api", playerRoutes);
app.use("/api/chat", chatRoutes);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.join("general");
  console.log("User joined general room");

  socket.on("join_private_room", (room) => {
    socket.join(room);
    console.log(`User joined private room: ${room}`);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("general_chat_message", (msg) => {
    console.log("General message: ", msg);
    io.to("general").emit("chat_message", msg);
  });

  socket.on("private_chat_message", (msg) => {
    console.log(`Private message in ${msg.room}: ${msg.message}`);
    io.to(msg.room).emit("chat_message", msg);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
