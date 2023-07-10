import express from "express";
import {getDashboard, pushForm} from "../controllers/general.js"

const router = express.Router();

router.get("/dashboard", getDashboard);

router.post("/form", pushForm);

export default router;
