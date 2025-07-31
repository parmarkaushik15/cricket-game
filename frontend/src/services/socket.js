import { io } from "socket.io-client";

import { API_BASE as ENV_API, SOCKET_URL as ENV_SOCKET } from '@env';

export const API_BASE = ENV_API || "http://localhost:5000/api";
export const SOCKET_URL = ENV_SOCKET || "http://localhost:5000"; 

export const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  reconnection: true
});

export const joinMatch = (matchId) => {
  socket.emit("joinMatch", matchId);
};

export const sendBallEvent = (data) => {
  socket.emit("ballEvent", data);
};
