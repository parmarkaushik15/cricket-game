import { Storage } from "../utils/storage.js";

// Create a new match
export const createMatch = async (req, res) => {
  try {
    const match = await Storage.create("Match", req.body);
    res.status(201).json(match);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all matches
export const getAllMatches = async (req, res) => {
  try {
    const matches = await Storage.getAll("Match");
    res.json(matches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update match (for score updates, highlights, etc.)
export const updateMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const match = await Storage.update("Match", id, req.body);

    if (!match) return res.status(404).json({ message: "Match not found" });

    res.json(match);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
