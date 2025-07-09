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
import dealRoutes from "./src/routes/deal.routes.js";
import companyRoutes from "./src/routes/company.routes.js";
import pipelineRoutes from "./src/routes/pipeline.routes.js";
import campaignRoutes from "./src/routes/campaign.routes.js";
import teamRoutes from "./src/routes/team.routes.js";
import projectRoutes from "./src/routes/project.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import taskRoutes from './src/routes/task.routes.js';
import { setupSwaggerDocs } from "./src/docs/swagger.js";

dotenv.config();
if (process.env.NODE_ENV !== "test") {
  connectDB();
}

const app = express();
app.use(morgan("dev"));
const { json, urlencoded } = bodyParser; // Destructure from default
app.use(urlencoded({ extended: true }));
// app.use(cors());
app.use(cors({
  origin: "http://localhost:4200", // Replace with your frontend URL in production
  credentials: true // If you're using cookies/sessions
}));
app.use(json());
app.use(express.json());

// -------- all api routes ----------
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/mod", modRoutes);
app.use("/api/v1/clients", clientRoutes);
app.use("/api/v1/invoices", invoiceRoutes);
app.use("/api/v1/leads", leadRoutes);
app.use("/api/v1/deals", dealRoutes);
app.use("/api/v1/companies", companyRoutes);
app.use("/api/v1/pipelines", pipelineRoutes);
app.use('/api/v1/campaigns', campaignRoutes);
app.use("/api/v1/teams", teamRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/auth/user", userRoutes);
app.use('/api/v1/tasks', taskRoutes);


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
  const PORT = process.env.PORT || 5005;
  app.listen(PORT, () => {
    console.log(`Boyaah, Server running on port ${PORT}`);
    console.log(`Swagger available at http://localhost:${PORT}/api-docs`);
  });
}
