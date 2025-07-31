import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { connectDB } from "./src/utils/db.js";
import matchRoutes from "./src/routes/matchRoutes.js";
import playerRoutes from "./src/routes/playerRoutes.js";
import tournamentRoutes from "./src/routes/tournamentRoutes.js";
import { setupMatchSocket } from "./src/sockets/matchSocket.js";

dotenv.config();
if (process.env.STORAGE_TYPE === "DB") {
  connectDB(); // Only connect if DB mode
}

const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/matches", matchRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/tournaments", tournamentRoutes);

// HTTP + Socket.io Server
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Initialize socket logic
setupMatchSocket(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
