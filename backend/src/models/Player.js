import mongoose from "mongoose";
import { BATTING_STYLES, BOWLING_STYLES } from "../constants/cricketConstants.js";

const playerSchema = new mongoose.Schema({
  name: String,
  country: String,
  role: { type: String, enum: ["Batsman", "Bowler", "Allrounder", "WK"] },
  battingStyle: { type: String, enum: BATTING_STYLES },
  bowlingStyle: { type: String, enum: BOWLING_STYLES },
  stats: {
    matches: { type: Number, default: 0 },
    runs: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
    strikeRate: { type: Number, default: 0 },
    average: { type: Number, default: 0 }
  }
});

export default mongoose.model("Player", playerSchema);
