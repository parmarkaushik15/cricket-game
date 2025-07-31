import { Storage } from "../utils/storage.js";

export const createPlayer = async (req, res) => {
  try {
    const player = await Storage.create("Player", req.body);
    res.json(player);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllPlayers = async (req, res) => {
  try {
    const players = await Storage.getAll("Player");
    res.json(players);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
