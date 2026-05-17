import express from "express";

import {
  registerStudent,
  loginStudent,
  getCurrentStudent
} from "../controllers/auth.controller.js";

import authMiddleware
from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerStudent);

router.post("/login", loginStudent);

router.get(
  "/me",
  authMiddleware,
  getCurrentStudent
);

export default router;