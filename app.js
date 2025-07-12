// app.js  for test file
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {connectDB} from "./src/config/db.js";
import userRoutes from "./src/routes/test.routes.js";

dotenv.config();
if (process.env.NODE_ENV !== "test") {
  connectDB();
}

const app = express();
app.use(cors());
app.use(express.json());
app.use(userRoutes);
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5005;
  app.listen(PORT, () => console.log(`Boyaah, Server running on port ${PORT}`));
}
export default app;
