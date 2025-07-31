import { Storage } from "../utils/storage.js";

// Create tournament
export const createTournament = async (req, res) => {
  try {
    const tournament = await Storage.create("Tournament", req.body);
    res.status(201).json(tournament);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all tournaments with points table
export const getAllTournaments = async (req, res) => {
  try {
    const tournaments = await Storage.getAll("Tournament");
    res.json(tournaments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update points table or tournament info
export const updateTournament = async (req, res) => {
  try {
    const { id } = req.params;
    const tournament = await Storage.update("Tournament", id, req.body);

    if (!tournament) return res.status(404).json({ message: "Tournament not found" });

    res.json(tournament);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
