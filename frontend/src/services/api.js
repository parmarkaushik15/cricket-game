import axios from "axios";

import { API_BASE as ENV_API, SOCKET_URL as ENV_SOCKET } from '@env';

export const API_BASE = ENV_API || "http://localhost:5000/api";
export const SOCKET_URL = ENV_SOCKET || "http://localhost:5000"; 

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
