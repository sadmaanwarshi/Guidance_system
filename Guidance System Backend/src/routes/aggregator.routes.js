import express from "express";

import {
  getAggregatedProfile
} from "../controllers/aggregator.controller.js";

const router = express.Router();

router.get("/:studentId", getAggregatedProfile);

export default router;