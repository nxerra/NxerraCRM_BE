// routes/user.routes.js
import express from "express";

const router = express.Router();

router.get("/api/health", (req, res) => {
  res.status(200).json({ message: "API is healthy" });
});

export default router;
