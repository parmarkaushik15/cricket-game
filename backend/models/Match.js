import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  teams: [String],
  type: { type: String, enum: ["T20", "ODI", "Test"] },
  overs: Number,
  scorecard: [
    {
      batsman: String,
      runs: { type: Number, default: 0 },
      balls: { type: Number, default: 0 },
      wagonWheel: [Number]
    }
  ],
  bowling: [
    {
      bowler: String,
      overs: { type: Number, default: 0 },
      runs: { type: Number, default: 0 },
      wickets: { type: Number, default: 0 },
      heatmap: [
        {
          pitchLength: Number,
          pitchWidth: Number,
          outcome: String
        }
      ]
    }
  ],
  highlights: [
    {
      ballNumber: String,
      event: String,
      videoUrl: String
    }
  ]
});

export default mongoose.model("Match", matchSchema);
