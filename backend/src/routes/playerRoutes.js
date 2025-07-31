import express from "express";
import { createPlayer, getAllPlayers } from "../controllers/playerController.js";

const router = express.Router();

router.post("/", createPlayer);
router.get("/", getAllPlayers);

export default router;
