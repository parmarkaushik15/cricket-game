import express from "express";
import { createMatch, getAllMatches } from "../controllers/matchController.js";

const router = express.Router();

router.post("/", createMatch);
router.get("/", getAllMatches);

export default router;
