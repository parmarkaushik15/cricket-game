import { Storage } from "../utils/storage.js";
import { v4 as uuidv4 } from "uuid";

// -----------------------------
// Create Tournament
// -----------------------------
export const createTournament = async (req, res) => {
  try {
    const data = {
      _id: uuidv4(), // ✅ Always generate ID in JSON mode
      ...req.body,
      createdAt: new Date(),
      pointsTable: req.body.pointsTable || [], // Default empty points table
    };

    const tournament = await Storage.create("Tournament", data);
    res.status(201).json(tournament);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// -----------------------------
// Get All Tournaments
// -----------------------------
export const getAllTournaments = async (req, res) => {
  try {
    const tournaments = await Storage.getAll("Tournament");
    res.json(tournaments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// -----------------------------
// Get Tournament by ID
// -----------------------------
export const getTournamentById = async (req, res) => {
  try {
    const { id } = req.params;
    const tournaments = await Storage.getAll("Tournament");
    const tournament = tournaments.find((t) => t._id === id);

    if (!tournament) return res.status(404).json({ message: "Tournament not found" });
    res.json(tournament);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// -----------------------------
// Update Tournament (info / points table)
// -----------------------------
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

// -----------------------------
// Delete Tournament
// -----------------------------
export const deleteTournament = async (req, res) => {
  try {
    const { id } = req.params;
    const tournaments = await Storage.getAll("Tournament");
    const filtered = tournaments.filter((t) => t._id !== id);

    if (filtered.length === tournaments.length) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    // Manual JSON save since Storage has no delete
    const fs = (await import("fs")).default;
    const path = (await import("path")).default;
    const DATA_DIR = path.resolve("src/data");
    fs.writeFileSync(
      path.join(DATA_DIR, `Tournament.json`),
      JSON.stringify(filtered, null, 2)
    );

    res.json({ message: "Tournament deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
