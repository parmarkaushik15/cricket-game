import { Storage } from "../utils/storage.js";
import { v4 as uuidv4 } from "uuid";

// Create a new match
export const createMatch = async (req, res) => {
  try {
    const data = {
      _id: uuidv4(), // ✅ Always add ID for JSON mode
      ...req.body,
      createdAt: new Date(),
    };
    const match = await Storage.create("Match", data);
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

// Get single match by ID
export const getMatchById = async (req, res) => {
  try {
    const { id } = req.params;
    const matches = await Storage.getAll("Match");
    const match = matches.find((m) => m._id === id);

    if (!match) return res.status(404).json({ message: "Match not found" });
    res.json(match);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update match (score updates, highlights, etc.)
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

// Delete match
export const deleteMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const matches = await Storage.getAll("Match");
    const filtered = matches.filter((m) => m._id !== id);

    if (filtered.length === matches.length) {
      return res.status(404).json({ message: "Match not found" });
    }

    // Save JSON manually since generic Storage lacks delete
    const fs = (await import("fs")).default;
    const path = (await import("path")).default;
    const DATA_DIR = path.resolve("src/data");
    fs.writeFileSync(
      path.join(DATA_DIR, `Match.json`),
      JSON.stringify(filtered, null, 2)
    );

    res.json({ message: "Match deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
