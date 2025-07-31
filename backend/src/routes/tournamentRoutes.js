import express from "express";
import { createTournament, getAllTournaments } from "../controllers/tournamentController.js";

const router = express.Router();

router.post("/", createTournament);
router.get("/", getAllTournaments);

export default router;
