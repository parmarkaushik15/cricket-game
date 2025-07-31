import { Storage } from "../utils/storage.js";
import { v4 as uuidv4 } from "uuid";

// -----------------------------
// Create Player
// -----------------------------
export const createPlayer = async (req, res) => {
  try {
    const data = {
      _id: uuidv4(), // ✅ Always generate ID for JSON mode
      ...req.body,
      createdAt: new Date(),
    };
    const player = await Storage.create("Player", data);
    res.status(201).json(player);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// -----------------------------
// Get All Players
// -----------------------------
export const getAllPlayers = async (req, res) => {
  try {
    const players = await Storage.getAll("Player");
    res.json(players);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// -----------------------------
// Get Player By ID
// -----------------------------
export const getPlayerById = async (req, res) => {
  try {
    const { id } = req.params;
    const players = await Storage.getAll("Player");
    const player = players.find((p) => p._id === id);

    if (!player) return res.status(404).json({ message: "Player not found" });
    res.json(player);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// -----------------------------
// Update Player
// -----------------------------
export const updatePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const player = await Storage.update("Player", id, req.body);

    if (!player) return res.status(404).json({ message: "Player not found" });
    res.json(player);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// -----------------------------
// Delete Player
// -----------------------------
export const deletePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const players = await Storage.getAll("Player");
    const filtered = players.filter((p) => p._id !== id);

    if (filtered.length === players.length) {
      return res.status(404).json({ message: "Player not found" });
    }

    // Manual JSON save since Storage has no delete method
    const fs = (await import("fs")).default;
    const path = (await import("path")).default;
    const DATA_DIR = path.resolve("src/data");
    fs.writeFileSync(
      path.join(DATA_DIR, `Player.json`),
      JSON.stringify(filtered, null, 2)
    );

    res.json({ message: "Player deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
