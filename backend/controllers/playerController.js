import Player from "../models/Player.js";

export const createPlayer = async (req, res) => {
  try {
    const player = await Player.create(req.body);
    res.json(player);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllPlayers = async (req, res) => {
  const players = await Player.find();
  res.json(players);
};
