import express from "express";

import {
  completeProfile,
  getProfile,
  updateProfile
} from "../controllers/profile.controller.js";

const router = express.Router();

router.post("/complete", completeProfile);

router.get("/:studentId", getProfile);

router.put("/:studentId", updateProfile);

export default router;