import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { connectDB } from "./utils/db.js";
import matchRoutes from "./routes/matchRoutes.js";
import playerRoutes from "./routes/playerRoutes.js";
import tournamentRoutes from "./routes/tournamentRoutes.js";
import Match from "./models/Match.js";
import { SHOT_TYPES, SHOT_DIRECTIONS, BALL_TYPES, getRandom } from "./constants/cricketConstants.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/matches", matchRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/tournaments", tournamentRoutes);

const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("Player connected:", socket.id);

  socket.on("joinMatch", (matchId) => {
    socket.join(matchId);
  });

  socket.on("ballEvent", async (data) => {
    // Auto-generate if not provided
    data.shot = data.shot || getRandom(SHOT_TYPES);
    data.direction = data.direction || getRandom(SHOT_DIRECTIONS);
    data.ballType = data.ballType || getRandom(BALL_TYPES);

    io.to(data.matchId).emit("ballUpdate", data);

    const match = await Match.findById(data.matchId);
    if (!match) return;

    const batsman = match.scorecard.find(b => b.batsman === data.batsman);
    if (batsman) {
      batsman.runs += data.runs;
      batsman.balls += 1;
      batsman.wagonWheel.push(Math.floor(Math.random() * 360));
    }

    const bowler = match.bowling.find(b => b.bowler === data.bowler);
    if (bowler) {
      bowler.runs += data.runs;
      bowler.heatmap.push({
        pitchLength: Math.random() * 22,
        pitchWidth: (Math.random() * 6) - 3,
        outcome: data.event
      });
    }

    if (["FOUR","SIX","WICKET"].includes(data.event)) {
      match.highlights.push({ ballNumber: data.ballNumber, event: data.event, videoUrl: data.videoUrl || "" });
    }

    await match.save();
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
