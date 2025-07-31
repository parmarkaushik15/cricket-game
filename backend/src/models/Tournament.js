import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema({
  name: String,
  type: { type: String, enum: ["T20", "ODI", "Test"] },
  teams: [String],
  pointsTable: [
    {
      team: String,
      matches: { type: Number, default: 0 },
      won: { type: Number, default: 0 },
      lost: { type: Number, default: 0 },
      points: { type: Number, default: 0 },
      netRunRate: { type: Number, default: 0 }
    }
  ]
});

export default mongoose.model("Tournament", tournamentSchema);
