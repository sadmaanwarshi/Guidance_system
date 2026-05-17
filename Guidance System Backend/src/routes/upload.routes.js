import express from "express";

import upload from "../middleware/upload.middleware.js";

import {
  uploadDocument
} from "../controllers/upload.controller.js";

const router = express.Router();

router.post(
  "/document",
  upload.single("document"),
  uploadDocument
);

export default router;