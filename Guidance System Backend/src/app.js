import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// import studentRoutes from "./routes/student.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import aggregatorRoutes from "./routes/aggregator.routes.js";
import finalCareerRoutes
from "./routes/finalCareer.routes.js";

import careerRoutes from "./routes/career.routes.js";

import authRoutes
from "./routes/auth.routes.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/uploads", express.static("uploads"));

// app.use("/api/student", studentRoutes);

app.use("/api/upload", uploadRoutes);
app.use("/api/profile", profileRoutes);

app.use("/api/aggregator", aggregatorRoutes);

app.use("/api/career", careerRoutes);

app.use(
  "/api/final-career",
  finalCareerRoutes
);

export default app;
