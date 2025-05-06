import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import compression from "compression";
import { AppDataSource } from "./data-source";
import routes from "./routes";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const port = process.env.PORT || 5002;

// Add compression middleware
app.use(compression());

// Set security-related headers with Helmet
app.use(helmet());

// Enable CORS
app.use(cors());

// Middleware for parsing JSON
app.use(express.json());

// HTTP request logger
app.use(morgan("dev"));

// Add cache control headers
app.use((req: Request, res: Response, next: NextFunction) => {
  // Cache GET requests for 5 minutes
  if (req.method === 'GET') {
    res.setHeader('Cache-Control', 'public, max-age=300');
  } else {
    // For non-GET requests, set no-cache
    res.setHeader('Cache-Control', 'no-store');
  }
  next();
});

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Stephen Jacobs Portfolio API",
      version: "1.0.0",
      description: "API documentation for Stephen Jacobs' portfolio website",
      contact: {
        name: "Stephen Jacobs",
        email: "contact@sjacobs.io",
        url: "https://stephenjacobs.io",
      },
    },
    servers: [
      {
        url: `${process.env.SERVER_URL || `http://localhost:${port}/api/v1`}`,
        description: "Development Server",
      },
    ],
  },
  apis: ["./routes/*.ts", "./entities/*.ts"], // Path to your API and entity files for Swagger documentation
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Versioned API routes
app.use("/api/v1", routes);

// 404 Not Found middleware
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Error handling middleware
app.use((err: unknown, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err instanceof Error) {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
  } else {
    console.error("Unknown error:", err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// Initialize the database and start the server
AppDataSource.initialize()
  .then(() => {
    console.log("✅ Database connected successfully");

    app.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
      console.log(`📚 API documentation available at http://localhost:${port}/api-docs`);
    });
  })
  .catch((err) => {
    console.error("❌ Error during database initialization:", err);
    process.exit(1);
  });