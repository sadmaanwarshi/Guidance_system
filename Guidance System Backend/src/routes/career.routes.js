import express from "express";

import {
  generateCareerMatches
} from "../controllers/career.controller.js";

const router = express.Router();

router.get(
  "/matches/:studentId",
  generateCareerMatches
);

export default router;