import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

/** @type {import('swagger-jsdoc').Options} */
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Nxerra CRM API",
      version: "1.0.0",
      description: "Auto-generated documentation for NXERRA CRM API",
    },
    servers: [
      {
        url: "http://localhost:5005",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/**/*.js", "./src/controllers/**/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

/**
 * Setup Swagger Docs in Express app
 * @param {import('express').Express} app
 */
export const setupSwaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get("/swagger.json", (_req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
};
