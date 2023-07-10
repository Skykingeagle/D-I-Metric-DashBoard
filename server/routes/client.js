import express from "express";
import {
  getDept,
  getEmp,
  getRegion,
  getPos,
  getSources,
  getPerformance,
  getSat,
} from "../controllers/client.js";

const router = express.Router();

router.get("/overview", getDept);

router.get("/employees", getEmp);

router.get("/region", getRegion);

router.get("/position", getPos);

router.get("/performance", getPerformance);

router.get("/sources", getSources);

router.get("/satisfaction", getSat);

export default router;
