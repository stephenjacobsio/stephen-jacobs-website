import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import path from "path";

// Load environment variables
dotenv.config();

// Entity imports
import { entities } from "./entities";

// Set up the data source
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "stephen",
  password: "",
  database: "stephenjacobsio",
  synchronize: false,
  logging: process.env.NODE_ENV !== "production",
  entities: entities,
  migrations: [path.join(__dirname, "./migrations/*.ts")],
  subscribers: [],
  ssl: process.env.NODE_ENV === "production"
    ? { rejectUnauthorized: false }
    : undefined,
});

// Initialize the data source
AppDataSource.initialize()
  .then(() => {
    console.log("📘 Database connected successfully.");
  })
  .catch((error) => {
    console.error("❌ Error during database initialization:", error);
    process.exit(1);
  });