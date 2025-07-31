import axios from "axios";

const API_BASE = "http://localhost:5000/api"; // replace with your server IP if on device

export const getMatches = async () => {
  const res = await axios.get(`${API_BASE}/matches`);
  return res.data;
};

export const getPlayers = async () => {
  const res = await axios.get(`${API_BASE}/players`);
  return res.data;
};

export const getTournaments = async () => {
  const res = await axios.get(`${API_BASE}/tournaments`);
  return res.data;
};
