import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import swaggerJSDoc from "swagger-jsdoc";
import converter from "openapi-to-postmanv2";

// __dirname setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Swagger definition (same as swagger.js)
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
        url: "http://localhost:5000",
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
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/**/*.js", "./src/controllers/**/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

// Convert OpenAPI -> Postman Collection
converter.convert(
  { type: "json", data: swaggerSpec },
  {},
  (err, conversionResult) => {
    if (!conversionResult.result) {
      console.error("❌ Conversion failed:", conversionResult.reason || err);
      return;
    }

    const outputPath = path.join(__dirname, "../postman_collection.json");
    fs.writeFileSync(
      outputPath,
      JSON.stringify(conversionResult.output[0].data, null, 2)
    );
    console.log("✅ Postman collection generated at postman_collection.json");
  }
);
