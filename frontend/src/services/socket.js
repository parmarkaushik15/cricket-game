import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000"; // use LAN IP for mobile device

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
