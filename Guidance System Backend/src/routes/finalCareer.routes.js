import express from "express";

import {
  generateFinalCareerReport
} from "../controllers/finalCareer.controller.js";

const router = express.Router();

router.get(
  "/report/:studentId",
  generateFinalCareerReport
);

export default router;