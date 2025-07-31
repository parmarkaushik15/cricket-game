import { SHOT_TYPES, SHOT_DIRECTIONS, BALL_TYPES, getRandom } from "../constants/cricketConstants.js";
import { Storage } from "../utils/storage.js";
import dotenv from "dotenv";

dotenv.config();
const STORAGE_TYPE = process.env.STORAGE_TYPE || "JSON";

export const setupMatchSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("Player connected:", socket.id);

    // Join a match room
    socket.on("joinMatch", (matchId) => {
      socket.join(matchId);
      console.log(`Player ${socket.id} joined match ${matchId}`);
    });

    // Handle ball event
    socket.on("ballEvent", async (data) => {
      try {
        // Auto-generate if not provided
        data.shot = data.shot || getRandom(SHOT_TYPES);
        data.direction = data.direction || getRandom(SHOT_DIRECTIONS);
        data.ballType = data.ballType || getRandom(BALL_TYPES);

        // Broadcast event to all players in the match
        io.to(data.matchId).emit("ballUpdate", data);

        // ----------------------
        // STORAGE LOGIC
        // ----------------------

        // Get all matches from storage
        const matches = await Storage.getAll("Match");
        const matchIndex = matches.findIndex((m) => m._id === data.matchId);

        if (matchIndex === -1) {
          console.log("Match not found:", data.matchId);
          return;
        }

        const match = matches[matchIndex];

        // Update batsman stats
        const batsman = match.scorecard?.find((b) => b.batsman === data.batsman);
        if (batsman) {
          batsman.runs += data.runs;
          batsman.balls += 1;
          batsman.wagonWheel = batsman.wagonWheel || [];
          batsman.wagonWheel.push(Math.floor(Math.random() * 360)); // random direction
        }

        // Update bowler stats
        const bowler = match.bowling?.find((b) => b.bowler === data.bowler);
        if (bowler) {
          bowler.runs += data.runs;
          bowler.heatmap = bowler.heatmap || [];
          bowler.heatmap.push({
            pitchLength: Math.random() * 22,
            pitchWidth: (Math.random() * 6) - 3,
            outcome: data.event
          });
        }

        // Add highlights if required
        match.highlights = match.highlights || [];
        if (["FOUR","SIX","WICKET"].includes(data.event)) {
          match.highlights.push({
            ballNumber: data.ballNumber,
            event: data.event,
            videoUrl: data.videoUrl || ""
          });
        }

        // Update storage
        if (STORAGE_TYPE === "DB") {
          // Use DB update
          await Storage.update("Match", data.matchId, match);
        } else {
          // JSON mode
          matches[matchIndex] = match;
          const { saveJSON } = await import("../utils/storage.js");
          saveJSON("Match", matches);
        }
      } catch (err) {
        console.error("Error in ballEvent socket:", err.message);
      }
    });

    socket.on("disconnect", () => {
      console.log("Player disconnected:", socket.id);
    });
  });
};
