import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Stephen Jacobs Website API",
      version: "1.0.0",
      description: "API documentation for the backend services of Stephen Jacobs' website",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  apis: [
    "./backend/routes/*.ts",
    "./backend/controllers/*.ts",
    "./backend/entities/*.ts",
  ],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

export const setupSwaggerDocs = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Swagger docs available at http://localhost:3000/api-docs");
};