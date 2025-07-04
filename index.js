import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import cors from "cors";
import authRoutes from "./src/routes/auth.routes.js";
import modRoutes from "./src/routes/moderator.routes.js";
import clientRoutes from "./src/routes/client.routes.js";
import invoiceRoutes from "./src/routes/invoice.routes.js";
import leadRoutes from "./src/routes/lead.routes.js";
import { setupSwaggerDocs } from "./src/docs/swagger.js";

dotenv.config();
if (process.env.NODE_ENV !== "test") {
  connectDB();
}

const app = express();
app.use(morgan("dev"));
const { json, urlencoded } = bodyParser; // Destructure from default
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(json());
app.use(express.json());

// -------- all api routes ----------
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/mod", modRoutes);
app.use("/api/v1/clients", clientRoutes);
app.use("/api/v1/invoices", invoiceRoutes);
app.use("/api/v1/leads", leadRoutes);

// --------- api status check -------------
// ..........................................
app.get("/api/v1/hello", (req, res) => {
  res.status(200).json({
    message:
      "Hello Developer, Your server is running well. You can move forward for development. Thank You",
  });
});

// --------- Swagger setup -------------
setupSwaggerDocs(app); // 👈 Swagger initialized here

// --------- Server listener -------------
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Boyaah, Server running on port ${PORT}`);
    console.log(`Swagger available at http://localhost:${PORT}/api-docs`);
  });
}
