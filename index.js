import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import cors from "cors";

dotenv.config();
if (process.env.NODE_ENV !== "test") {
  connectDB();
}

const app = express();
app.use(cors());
app.use(express.json());

// ---------------- Check for backend run -------------
// ----------------------------------------------------
app.get("/api/v1/hello", (req, res) => {
  res.status(200).json({
    message:
      "Hello Developer, Your server is running well. You can move forward for development. Thank You",
  });
});

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Boyaah, Server running on port ${PORT}`));
}
