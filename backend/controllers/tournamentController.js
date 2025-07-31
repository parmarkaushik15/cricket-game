import Tournament from "../models/Tournament.js";

export const createTournament = async (req, res) => {
  try {
    const tournament = await Tournament.create(req.body);
    res.json(tournament);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllTournaments = async (req, res) => {
  const tournaments = await Tournament.find();
  res.json(tournaments);
};
