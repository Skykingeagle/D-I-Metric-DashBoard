import express from "express";
import {getPayRate, getPredPay, getPredMale, getPredFemale} from "../controllers/management.js"

const router = express.Router();

router.get("/payrate", getPayRate);

router.get("/rate", getPredPay);

router.get("/male", getPredMale)

router.get("/female", getPredFemale)



export default router;
